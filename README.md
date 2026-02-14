# SF-computerscience-maxandre-morcant
This is my github for the project of CSC 317

This project consists of developing a web application that recommends movies based on users’s tastes. The goal is to allow users to discover new films based on the ones they already enjoy. The application focuses on interaction and data: every action performed by the user, such as searching for a movie or leaving a rating, influences the recommendations that are generated. The idea is to create a simple recommendation system inspired by streaming platforms, but adapted to the scope of an academic project.

The application works as follows: the user can enter the title of a movie they liked. Based on that film, the application analyzes certain characteristics such as genre, actors, director, or related keywords in order to suggest one or more similar movies. Once the recommendation is displayed, the user can rate the recommended movie (for example, from 1 to 5 stars), leave a comment, and even evaluate how relevant the recommendation was in order to provide feedback on the algorithm. The user can also directly search for movies using filters such as genre (action, romance, science fiction, etc.), a specific actor, a director, or a particular mood. All these interactions generate important data: user information, a movie database, ratings, recommendation history, and evaluations of the algorithm. This data forms the core of the application and enables a personalized experience.

While thinking about the data required for this project, I realized that my idea was both simpler and more complex than I initially expected. Identifying the main categories of data (users, movies, ratings, and recommendations) was easier than anticipated, since it mainly involved considering what the user creates, views, or modifies. However, defining how the recommendation algorithm should actually work is more challenging. The concept of a “similar movie” can depend on multiple criteria, and deciding which ones to prioritize makes the project more technical. Working through the data has made the project more concrete and structured, but also slightly more ambitious than I first imagined.

At this stage, several questions remain open. Should I use an external API to retrieve movie data, or create my own database for the project? Which criteria should be used to calculate similarity between two movies? Should users be required to create an account in order to receive personalized recommendations? How can the recommendations improve over time based on user ratings? These questions will guide the next steps of the project and help refine its overall design.

Example 1:

User: Emma
Liked movie: Inception
Preferred genres: Science Fiction, Thriller

The system analyzes the movie’s characteristics (science fiction, complex plot, Christopher Nolan, psychological themes) and recommends:

Recommended movie: Interstellar
Similarity score: 88%
Emma’s rating of the movie: 5/5
Emma’s rating of the recommendation: 4/5
Comment: “Very similar atmosphere and style, I really enjoyed it.”

Example 2:

User: Daniel
Liked movie: The Notebook
Preferred genres: Romance, Drama

The system recommends:

Recommended movie: Me Before You
Similarity score: 72%
Daniel’s rating of the movie: 3/5
Daniel’s rating of the recommendation: 2/5
Comment: “It was emotional, but not as strong as The Notebook.”

Example 3:

User: Sofia
Search request: Genre = Action, Keyword = Superhero

Search results displayed:

The Dark Knight (2008)

Avengers: Endgame (2019)

Spider-Man: No Way Home (2021)

Sofia selects The Dark Knight and rates it 4/5. This rating is then stored in her profile and can influence future recommendations.
