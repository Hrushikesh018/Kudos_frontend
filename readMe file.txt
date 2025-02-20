# Kudos Application

This project consists of a **frontend** and **backend**. The frontend is built with **React** and the backend is built using **Node.js** with **Express**. This README will guide you through setting up and running both parts of the project.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or above)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (if you're running the backend locally)
- [React](https://reactjs.org/) (for frontend development)
  
## Backend Setup
Install backend dependencies:
   "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mongoose": "^8.9.2"
In the kudos-backend folder, run:
npm run dev

npm install
Set up environment variables:

Create a .env file in the kudos-backend directory and add the necessary environment variables for your MongoDB and other configurations (e.g., JWT secret keys). Example:

MONGO_URI=mongodb://localhost:27017/kudos
PORT=5000
Start the backend:

In the kudos-backend directory, run:

npm run dev
This will start the backend server using nodemon, which automatically reloads the server when changes are made. By default, the backend will be running on port 5000.

Frontend Setup
Navigate to the frontend directory:

cd kudos-frontend
Install frontend dependencies:

In the kudos-frontend folder, run:

npm install
Configure the proxy for API requests:

In your frontend/package.json, add the following proxy configuration to ensure that API requests made from the frontend are forwarded to the backend during development:

"proxy": "http://localhost:5000"
This means any API requests from the frontend will automatically be directed to http://localhost:5000 (where your backend is running).

Start the frontend:

In the kudos-frontend directory, run:

npm start
This will start the frontend server using Create React App (CRA). By default, the frontend will be running on port 3000. The frontend will automatically proxy API requests to the backend server running on 5000.

Usage
Once both the frontend and backend are running:

Frontend: Open http://localhost:3000 in your browser.
Backend: API calls will be proxied to the backend at http://localhost:5000.
You can use the application to send Kudos between users, track Kudos Analytics, and display Leaderboards.



please contact me for the mongoDB password I'll let you know 

demo users : john.doe@example.com ,stevesmith@example.com