import os
import json
from datetime import datetime, timedelta
import requests

from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import create_engine, Column, Integer, String, DateTime, select
from sqlalchemy.orm import declarative_base, sessionmaker
from passlib.context import CryptContext
from jose import jwt
from authlib.integrations.starlette_client import OAuth
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(env_path)

SECRET_KEY = os.getenv('SECRET_KEY', 'devsecret')
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:8000')
BASE_URL = os.getenv('BASE_URL', 'http://localhost:8001')
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
GOOGLE_REDIRECT_PATH = os.getenv('GOOGLE_REDIRECT_PATH', '/api/auth/google/callback')

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

DATABASE_URL = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'data.db')}"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    password = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Rating(Base):
    __tablename__ = 'ratings'
    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True, nullable=False)
    movie_title = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    comment = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

app = FastAPI(title='Lumina Auth API')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth = OAuth()
if GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET:
    oauth.register(
        name='google',
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
        client_kwargs={'scope': 'openid email profile'},
    )
else:
    print('Warning: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set. Google OAuth disabled.')

def create_token(data: dict, expires_minutes: int = 60*24*7):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm='HS256')
    return token

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except Exception:
        return None

@app.post('/api/signup')
async def signup(req: Request):
    body = {}
    try:
        body = json.loads(req._body.decode()) if hasattr(req, '_body') else {}
    except Exception:
        pass
    data = {}
    try:
        data = await_req_json(req)
    except Exception:
        data = body or {}

    email = str(data.get('email','')).strip().lower()
    name = str(data.get('name','')).strip()
    password = str(data.get('password',''))
    if not email or not password:
        raise HTTPException(status_code=400, detail='email and password required')
    db = SessionLocal()
    exists = db.query(User).filter(User.email==email).first()
    if exists:
        raise HTTPException(status_code=400, detail='user exists')
    hashed = pwd_context.hash(password)
    u = User(email=email, name=name, password=hashed)
    db.add(u)
    db.commit()
    db.refresh(u)
    token = create_token({'sub': u.email, 'name': u.name})
    res = JSONResponse({'email': u.email, 'name': u.name})
    # set HttpOnly cookie
    res.set_cookie('access_token', token, httponly=True, samesite='lax', max_age=60*60*24*7)
    return res

@app.post('/api/login')
async def login(req: Request):
    data = await req.json()
    email = str(data.get('email','')).strip().lower()
    password = str(data.get('password',''))
    db = SessionLocal()
    u = db.query(User).filter(User.email==email).first()
    if not u or not u.password or not pwd_context.verify(password, u.password):
        raise HTTPException(status_code=400, detail='invalid credentials')
    token = create_token({'sub': u.email, 'name': u.name})
    res = JSONResponse({'email': u.email, 'name': u.name})
    res.set_cookie('access_token', token, httponly=True, samesite='lax', max_age=60*60*24*7)
    return res

@app.get('/api/me')
async def me(request: Request):
    auth = request.headers.get('authorization') or ''
    if auth.lower().startswith('bearer '):
        token = auth.split(' ',1)[1]
    else:
        token = request.cookies.get('access_token') or request.query_params.get('token')
    if not token:
        raise HTTPException(status_code=401, detail='missing token')
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail='invalid token')
    email = payload.get('sub')
    db = SessionLocal()
    u = db.query(User).filter(User.email==email).first()
    if not u:
        raise HTTPException(status_code=404, detail='user not found')
    return {'email': u.email, 'name': u.name}



TMDB_KEY = os.getenv('TMDB_API_KEY', '027275369c3c735cd19e0f038fa762b9')
TMDB_URL = 'https://api.themoviedb.org/3/search/movie'

GENRE_MAP = {
    'Action': 28,
    'Adventure': 12,
    'Animation': 16,
    'Comedy': 35,
    'Crime': 80,
    'Documentary': 99,
    'Drama': 18,
    'Family': 10751,
    'Fantasy': 14,
    'History': 36,
    'Horror': 27,
    'Music': 10402,
    'Mystery': 9648,
    'Romance': 10749,
    'Science Fiction': 878,
    'TV Movie': 10770,
    'Thriller': 53,
    'War': 10752,
    'Western': 37
}

GENRE_ID_TO_NAME = {v: k for k, v in GENRE_MAP.items()}

def get_genre_id(genre_name):
    return GENRE_MAP.get(genre_name.strip())

def get_keyword_id(keyword, api_key):
    if not keyword.strip():
        return None
    url = 'https://api.themoviedb.org/3/search/keyword'
    params = {'api_key': api_key, 'query': keyword}
    try:
        r = requests.get(url, params=params, timeout=5)
        if r.status_code == 200:
            results = r.json().get('results', [])
            if results:
                return results[0]['id'] 
    except:
        pass
    return None

def get_person_id(person_name, api_key):
    if not person_name.strip():
        return None
    url = 'https://api.themoviedb.org/3/search/person'
    params = {'api_key': api_key, 'query': person_name}
    try:
        r = requests.get(url, params=params, timeout=5)
        if r.status_code == 200:
            results = r.json().get('results', [])
            if results:
                return results[0]['id']  
    except:
        pass
    return None

@app.get('/api/movie/{movie_id}')
async def get_movie_details(movie_id: int, lang: str = 'en'):
    """Récupérer les détails d'un film depuis TMDB."""
    if not TMDB_KEY:
        raise HTTPException(status_code=500, detail='TMDB not configured')

    language = 'fr-FR' if lang == 'fr' else 'en-US'
    try:
        detail_url = f'https://api.themoviedb.org/3/movie/{movie_id}'
        params = {'api_key': TMDB_KEY, 'language': language}
        r = requests.get(detail_url, params=params, timeout=5)
        if r.status_code != 200:
            raise HTTPException(status_code=404, detail='Movie not found')
        movie = r.json()

        cast_url = f'https://api.themoviedb.org/3/movie/{movie_id}/credits'
        r2 = requests.get(cast_url, params=params, timeout=5)
        cast = []
        director = None
        if r2.status_code == 200:
            credits = r2.json()
            cast = [actor['name'] for actor in credits.get('cast', [])[:10]]  
            crew = credits.get('crew', [])
            for c in crew:
                if c.get('job') == 'Director':
                    director = c['name']
                    break

        # Où regarder (optionnel, si disponible)
        watch_url = f'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers'
        r3 = requests.get(watch_url, params=params, timeout=5)
        watch_providers = {}
        if r3.status_code == 200:
            providers = r3.json()
            # Prendre les providers pour FR ou US
            results = providers.get('results', {})
            fr = results.get('FR', {})
            watch_providers = fr.get('flatrate', [])  # Streaming

        # Trailer
        videos_url = f'https://api.themoviedb.org/3/movie/{movie_id}/videos'
        r4 = requests.get(videos_url, params={'api_key': TMDB_KEY}, timeout=5)
        trailer = None
        if r4.status_code == 200:
            videos = r4.json().get('results', [])
            for v in videos:
                if v.get('type') == 'Trailer' and v.get('site') == 'YouTube':
                    trailer = f"https://www.youtube.com/watch?v={v['key']}"
                    break

        return {
            'title': movie.get('title'),
            'overview': movie.get('overview'),
            'release_date': movie.get('release_date'),
            'genres': [g['name'] for g in movie.get('genres', [])],
            'cast': cast,
            'director': director,
            'poster_path': movie.get('poster_path'),
            'vote_average': movie.get('vote_average'),
            'watch_providers': [p['provider_name'] for p in watch_providers],
            'trailer': trailer
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@app.get('/api/recent')
async def get_recent_movies(lang: str = 'en'):
    """Récupère les films les plus récents depuis TMDB."""
    if not TMDB_KEY:
        raise HTTPException(status_code=500, detail='TMDB not configured')

    language = 'fr-FR' if lang == 'fr' else 'en-US'
    url = 'https://api.themoviedb.org/3/discover/movie'

    params = {
        'api_key': TMDB_KEY,
        'language': language,
        'sort_by': 'release_date.desc',
        'primary_release_date.lte': datetime.utcnow().strftime('%Y-%m-%d'),
        'vote_count.gte': 50,
        'include_adult': False,
        'include_video': False,
        'page': 1
    }

    try:
        r = requests.get(url, params=params, timeout=5)
        if r.status_code != 200:
            raise HTTPException(status_code=502, detail='tmdb recent error')

        data = r.json().get('results', [])

        out = []
        for m in data[:12]:
            out.append({
                'id': m.get('id'),
                'title': m.get('title'),
                'overview': m.get('overview', ''),
                'poster_path': m.get('poster_path'),
                'genres': [GENRE_ID_TO_NAME.get(gid, 'Unknown') for gid in m.get('genre_ids', [])],
                'release_date': m.get('release_date'),
                'score': int(m.get('vote_average', 0) * 10)
            })

        return out

    except Exception as e:
        raise HTTPException(status_code=502, detail=f'tmdb recent request failed: {str(e)}')


@app.get('/api/search')
async def search_movies(q: str = '', genre: str = '', mood: str = '', person: str = '', lang: str = 'en'):
    """Return a list of movies matching the query.

    - If TMDB_API_KEY is configured, proxy the request to TheMovieDB
      and map the results to a small JSON payload.
    - Otherwise, fall back to a hard‑coded dummy list (same as the
      previous mockResults) so that the frontend still works offline.
    """
    genre = (genre or '').strip()
    mood = (mood or '').strip()
    person = (person or '').strip()

    if not q and not genre and not mood and not person:
        return []

    if TMDB_KEY:
        language = 'fr-FR' if lang == 'fr' else 'en-US'
        params = {'api_key': TMDB_KEY, 'language': language, 'sort_by': 'popularity.desc', 'page': 1}

        if q:
            # Chercher le film aimé
            search_url = 'https://api.themoviedb.org/3/search/movie'
            search_params = {'api_key': TMDB_KEY, 'query': q, 'language': language, 'page': 1}
            try:
                r = requests.get(search_url, params=search_params, timeout=5)
                if r.status_code != 200:
                    raise HTTPException(status_code=502, detail='tmdb search error')
                search_results = r.json().get('results', [])
                if not search_results:
                    return []  # Aucun film trouvé
                movie = search_results[0]  # Prendre le premier
                movie_id = movie['id']
                
                # Récupérer les genres du film
                detail_url = f'https://api.themoviedb.org/3/movie/{movie_id}'
                detail_params = {'api_key': TMDB_KEY}
                r2 = requests.get(detail_url, params=detail_params, timeout=5)
                if r2.status_code == 200:
                    details = r2.json()
                    genres = details.get('genres', [])
                    genre_ids = [str(g['id']) for g in genres]
                    if genre_ids:
                        params['with_genres'] = ','.join(genre_ids)
                
                # Utiliser /movie/{id}/recommendations pour recommandations éditoriales
                rec_url = f'https://api.themoviedb.org/3/movie/{movie_id}/recommendations'
                rec_params = {'api_key': TMDB_KEY, 'language': language, 'page': 1}
                r2 = requests.get(rec_url, params=rec_params, timeout=5)
                if r2.status_code == 200:
                    data = r2.json().get('results', [])
                else:
                    # Fallback to discover with genres
                    r2 = requests.get('https://api.themoviedb.org/3/discover/movie', params=params, timeout=5)
                    if r2.status_code != 200:
                        raise HTTPException(status_code=502, detail='tmdb discover error')
                    data = r2.json().get('results', [])
            except Exception:
                raise HTTPException(status_code=502, detail='tmdb request failed')
        else:
            # Sinon, utilise /discover/movie avec filtres
            url = 'https://api.themoviedb.org/3/discover/movie'
            params = {'api_key': TMDB_KEY, 'language': language, 'sort_by': 'popularity.desc', 'page': 1}
            if genre:
                genre_id = get_genre_id(genre)
                if genre_id:
                    params['with_genres'] = genre_id
            if mood:
                keyword_id = get_keyword_id(mood, TMDB_KEY)
                if keyword_id:
                    params['with_keywords'] = keyword_id
            if person:
                person_id = get_person_id(person, TMDB_KEY)
                if person_id:
                    params['with_people'] = person_id
            try:
                r = requests.get(url, params=params, timeout=5)
                if r.status_code != 200:
                    raise HTTPException(status_code=502, detail='tmdb discover error')
                data = r.json().get('results', [])
            except Exception:
                raise HTTPException(status_code=502, detail='tmdb request failed')

        out = []
        for m in data[:20]:
            if not q or m.get('id') != movie_id:  # Exclure le film aimé si q fourni
                out.append({
                    'id': m.get('id'),
                    'title': m.get('title'),
                    'overview': m.get('overview',''),
                    'poster_path': m.get('poster_path'),
                    'genres': [GENRE_ID_TO_NAME.get(gid, 'Unknown') for gid in m.get('genre_ids', [])],
                    'score': int(m.get('vote_average',0) * 10)
                })
        return out
    # fallback static list, simulate similar movies
    dummy = [
        {'id': 27205, 'title':'Inception','overview':'A thief who steals corporate secrets through the use of dream-sharing technology...','poster_path': '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', 'genres': ['Action', 'Science Fiction', 'Thriller'], 'score':87},
        {'id': 157336, 'title':'Interstellar','overview':'A team of explorers travel through a wormhole...','poster_path': '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', 'genres': ['Adventure', 'Drama', 'Science Fiction'], 'score':88},
        {'id': 1124, 'title':'The Prestige','overview':'Two stage magicians engage in competitive rivalry...','poster_path': '/5MXyQfz8xUP3dIFPTubhTsbFY6N.jpg', 'genres': ['Drama', 'Mystery', 'Thriller'], 'score':81},
        {'id': 11324, 'title':'Shutter Island','overview':'In 1954, U.S. Marshal Teddy Daniels investigates...','poster_path': '/4y4Y2c0Z3keDIIXgzWXjmLt9hGp.jpg', 'genres': ['Drama', 'Thriller', 'Mystery'], 'score':76},
        {'id': 155, 'title':'The Dark Knight','overview':'When the menace known as the Joker wreaks havoc...','poster_path': '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'genres': ['Drama', 'Action', 'Crime'], 'score':90},
        {'id': 11036, 'title':'The Notebook','overview':'A poor yet passionate young man falls in love...','poster_path': '/rNzQyW4f8B8cQeg7Dgj3n6eT5k.jpg', 'genres': ['Romance', 'Drama'], 'score':78},
        {'id': 920, 'title':'Cars','overview':'A hot-shot race-car named Lightning McQueen gets waylaid...','poster_path': '/u3zt6vTYnUgV6zBK3OUNF9I2vZE.jpg', 'genres': ['Animation', 'Adventure', 'Comedy'], 'score':78},
        {'id': 862, 'title':'Toy Story','overview':'Led by Woody, Andy\'s toys live happily...','poster_path': '/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg', 'genres': ['Animation', 'Adventure', 'Family'], 'score':83},
        {'id': 10681, 'title':'WALL-E','overview':'In the distant future, a small waste-collecting robot...','poster_path': '/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg', 'genres': ['Animation', 'Family', 'Science Fiction'], 'score':78},
        {'id': 77931, 'title':'Turbo','overview':'A snail who dreams of being the fastest snail in the world...','poster_path': '/nPoaL2qaH3HFxbN4t4s4HE7jhq.jpg', 'genres': ['Animation', 'Adventure', 'Family'], 'score':62},
        {'id': 10193, 'title':'Toy Story 3','overview':'The toys are mistakenly delivered to a day-care center...','poster_path': '/mMltbSxwEdNE4Cv8QYLpzkH7WDD.jpg', 'genres': ['Animation', 'Adventure', 'Family'], 'score':78},
        {'id': 14160, 'title':'Up','overview':'Seventy-eight year old Carl Fredricksen travels to Paradise Falls...','poster_path': '/vpbaStTMt8qqXaEgnOR2EE4DNCI.jpg', 'genres': ['Animation', 'Adventure', 'Comedy'], 'score':78},
        {'id': 19995, 'title':'Avatar','overview':'In the 22nd century, a paraplegic Marine is dispatched...','poster_path': '/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg', 'genres': ['Action', 'Adventure', 'Fantasy'], 'score':76},
        {'id': 597, 'title':'Titanic','overview':'101-year-old Rose DeWitt Bukater tells the story...','poster_path': '/9xjZS2rlVxm8SFx8kPC3aIGCOYq.jpg', 'genres': ['Drama', 'Romance'], 'score':79},
        {'id': 24428, 'title':'The Avengers','overview':'When an unexpected enemy emerges...','poster_path': '/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg', 'genres': ['Action', 'Adventure', 'Science Fiction'], 'score':78},
        {'id': 807, 'title':'Se7en','overview':'Two detectives, a rookie and a veteran, hunt a serial killer...','poster_path': '/6yoghtyTpznpBik8EngEmJskVUO.jpg', 'genres': ['Crime', 'Mystery', 'Thriller'], 'score':83},
    ]
    similar = {
        'inception': ['Interstellar', 'The Prestige', 'Shutter Island', 'The Dark Knight'],
        'interstellar': ['Inception', 'The Prestige', 'The Dark Knight', 'WALL-E'],
        'the prestige': ['Inception', 'Interstellar', 'Shutter Island', 'The Dark Knight'],
        'shutter island': ['Inception', 'The Prestige', 'The Dark Knight', 'The Notebook'],
        'the dark knight': ['Interstellar', 'Shutter Island', 'The Prestige', 'Inception'],
        'the notebook': ['Shutter Island', 'The Prestige', 'The Dark Knight', 'Titanic'],
        'cars': ['Toy Story', 'WALL-E', 'Turbo', 'Toy Story 3', 'Up'],
        'toy story': ['Cars', 'WALL-E', 'Turbo', 'Toy Story 3', 'Up'],
        'wall-e': ['Cars', 'Toy Story', 'Turbo', 'Interstellar', 'Up'],
        'turbo': ['Cars', 'Toy Story', 'WALL-E', 'Toy Story 3', 'Up'],
        'toy story 3': ['Cars', 'Toy Story', 'WALL-E', 'Turbo', 'Up'],
        'up': ['Cars', 'Toy Story', 'WALL-E', 'Turbo', 'Toy Story 3'],
        'avatar': ['Interstellar', 'The Avengers', 'WALL-E', 'Inception'],
        'titanic': ['The Notebook', 'The Prestige', 'Shutter Island'],
        'the avengers': ['Inception', 'The Dark Knight', 'Interstellar', 'Avatar'],
        'se7en': ['The Prestige', 'Shutter Island', 'The Dark Knight', 'Inception'],
    }
    q_lower = q.lower()
    if q_lower in similar:
        similar_titles = similar[q_lower]
        return [d for d in dummy if d['title'] in similar_titles]
    else:
        # for unknown movies, return empty to avoid showing all
        return []


@app.post('/api/ratings')
async def post_rating(request: Request):
    # require authenticated user via cookie or token
    auth = request.headers.get('authorization') or ''
    if auth.lower().startswith('bearer '):
        token = auth.split(' ',1)[1]
    else:
        token = request.cookies.get('access_token')
    payload = verify_token(token) if token else None
    if not payload:
        raise HTTPException(status_code=401, detail='not authenticated')
    data = await request.json()
    movie_title = str(data.get('movie_title') or data.get('title') or '').strip()
    try:
        score = int(data.get('score', 0))
    except Exception:
        score = 0
    comment = str(data.get('comment') or '').strip()
    # Score is limited to 1-5 (stars)
    if not movie_title or score < 1 or score > 5:
        raise HTTPException(status_code=400, detail='invalid payload: score must be 1-5')
    user_email = payload.get('sub')
    db = SessionLocal()
    r = Rating(user_email=user_email, movie_title=movie_title, score=score, comment=comment)
    db.add(r)
    db.commit()
    db.refresh(r)
    return {'ok': True, 'id': r.id}


@app.get('/api/ratings')
async def get_ratings(request: Request):
    # return ratings for current user
    token = request.cookies.get('access_token')
    payload = verify_token(token) if token else None
    if not payload:
        raise HTTPException(status_code=401, detail='not authenticated')
    user_email = payload.get('sub')
    db = SessionLocal()
    rows = db.query(Rating).filter(Rating.user_email==user_email).order_by(Rating.created_at.desc()).all()
    return [{'id': r.id, 'movie_title': r.movie_title, 'score': r.score, 'comment': r.comment, 'created_at': r.created_at.isoformat()} for r in rows]

@app.get('/api/auth/google')
async def auth_google(request: Request):
    if 'google' not in oauth:
        detail = 'Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.'
        print(detail)
        raise HTTPException(status_code=500, detail=detail)
    try:
        redirect_uri = BASE_URL + GOOGLE_REDIRECT_PATH
        return await oauth.google.authorize_redirect(request, redirect_uri)
    except Exception as e:
        print('Error initiating Google authorize_redirect:', str(e))
        raise HTTPException(status_code=500, detail=f'failed to initiate google auth: {str(e)}')

@app.get(GOOGLE_REDIRECT_PATH)
async def auth_google_cb(request: Request):
    if 'google' not in oauth:
        detail = 'Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.'
        print(detail)
        raise HTTPException(status_code=500, detail=detail)
    try:
        token = await oauth.google.authorize_access_token(request)
    except Exception as e:
        print('Error authorizing access token:', str(e))
        raise HTTPException(status_code=500, detail=f'error obtaining access token: {str(e)}')

    try:
        # Try to parse id_token (OIDC). If that fails, fallback to userinfo endpoint.
        try:
            userinfo = await oauth.google.parse_id_token(request, token)
        except Exception:
            userinfo = await oauth.google.userinfo(token=token)
        email = userinfo.get('email')
        name = userinfo.get('name') or userinfo.get('given_name')
    except Exception as e:
        print('Error fetching userinfo:', str(e))
        raise HTTPException(status_code=500, detail=f'error fetching user info: {str(e)}')
    db = SessionLocal()
    u = db.query(User).filter(User.email==email).first()
    if not u:
        u = User(email=email, name=name)
        db.add(u)
        db.commit()
        db.refresh(u)
    jwt_token = create_token({'sub': u.email, 'name': u.name})
    # set HttpOnly cookie and redirect to frontend (no token in URL)
    redirect = RedirectResponse(f"{FRONTEND_URL}/account.html")
    redirect.set_cookie('access_token', jwt_token, httponly=True, samesite='lax', max_age=60*60*24*7)
    return redirect

async def await_req_json(req: Request):
    try:
        return await req.json()
    except Exception:
        # fallback for sync body
        body = await req.body()
        try:
            return json.loads(body.decode())
        except Exception:
            return {}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:app', host='0.0.0.0', port=8001, reload=True)

@app.get('/api/trending')
async def get_trending_movies(lang: str = 'en'):
    if not TMDB_KEY:
        raise HTTPException(status_code=500, detail='TMDB not configured')

    language = 'fr-FR' if lang == 'fr' else 'en-US'
    url = 'https://api.themoviedb.org/3/trending/movie/week'

    params = {
        'api_key': TMDB_KEY,
        'language': language
    }

    try:
        r = requests.get(url, params=params, timeout=5)
        if r.status_code != 200:
            raise HTTPException(status_code=502, detail='tmdb trending error')

        data = r.json().get('results', [])

        return [{
            'id': m.get('id'),
            'title': m.get('title'),
            'overview': m.get('overview', ''),
            'poster_path': m.get('poster_path'),
            'genres': [GENRE_ID_TO_NAME.get(gid, '') for gid in m.get('genre_ids', [])],
            'release_date': m.get('release_date'),
            'score': int(m.get('vote_average', 0) * 10)
        } for m in data[:12]]

    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))