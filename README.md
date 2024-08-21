*Entertaiment App*
The Entertainment App is a full-stack application designed to provide users with access to a vast collection of movies and TV shows, leveraging the TMDB API for fetching media details. It features user authentication, media exploration, and personal bookmarks, offering a comprehensive and personalized media browsing experience.


#Deployment#
* frontend:-https://66c5c40a796ef10c9ff20c8b--endearing-valkyrie-d13d88.netlify.app/
* Backend:-https://capstone-project-5-3.onrender.com

*features*
*authentication: login and registration, ensuring user data protection.
*Media Exploration: Allows users to discover trending movies and TV shows, with detailed views available for each media item.
*Bookmarks: Enables users to bookmark their favorite media, creating a personalized list of favorites accessible at any time.
*Detailed Media Information: Provides in-depth details about movies and TV shows, including budget, genres, popularity, and more.


**Getting Started For Backend**
*Backend setup*
1 Navigate to the Backend Directory: Move into the backend directory of the project.
  cd entertainment-full stack project/backend(provide copy logo)
  
2.Install Dependencies: Install the necessary dependencies using npm.
npm install(provide copy logo)

3 Configure Environment Variables: Create a .env file based on the provided .env.example file. Provide your MongoDB URI and TMDB API key in the .env file.
MONGODB_URL= "Mongodb connection string our url "
TOKEN= "Secret token for authentication & cookies"
TMDB_KEY="TMDB api key "
FRONTEND_URL="Frontend url"

4 Start the Server: Run the backend server.
node index.js(provide copy logo)

*Backned Technologies*
* Node js
* Express js
* MongoDB
* dotenv
* cors

  *Backend Project Structure*
backend
├── node_modules
├── package-lock.json
├── package.json
└── server.js



  **GETTING STARTED FOR FRONTEND**

    *frontend setup*
1 Navigate to the Frontend Directory: Move into the frontend directory of the project.
cd entertainment-full stack project/frontend/AB-Movies(provide copy logo)

2 Install Dependencies: Install the necessary dependencies using npm.
npm install(provide copy logo)

3 Start the Application: Run the frontend application.
npm run dev(provide copy logo)



*frontend technologies*
*Vite
*Npm
*HTML
*CSS
*Tailwind CSS
*React.js
*Javascript
*Context API

*Frontend Project Structure*
src
├── assets
├── components
│   ├── navbar.js
│   └── authContext.js
├── pages
│   ├── HomePage
│   │   ├── Trending.jsx
│   │   └── Recommendation.jsx
│   ├── BookmarkPage.jsx
│   ├── login.jsx
│   ├── movieDetails.jsx
│   ├── Movies.jsx
│   ├── signup.jsx
│   └── tvSeries.jsx
├── App.jsx 
├── main.jsx 
├── .eslintrc.cjs
├── .gitignore
├── index.css 
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js


*Team member*
  Azeem pasha (Individual)
