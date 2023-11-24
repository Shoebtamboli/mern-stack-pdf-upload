# MERN Stack PDF Upload Application

This application allows users to upload PDF files through a React frontend and manages the files with a Node.js/Express backend. MongoDB is used to store the file metadata, and the files themselves are stored on the server's filesystem.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Installation

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd path/to/your/backend
   ```

2. Install the necessary npm packages:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory to store environment variables:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost/pdf-upload
   ```

   Replace the `MONGO_URI` value with your MongoDB connection string if it's different.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd path/to/your/frontend
   ```

2. Install the necessary npm packages:

   ```bash
   npm install
   ```

## Running the Application

### Start the Backend Server

1. Navigate to the backend directory:

   ```bash
   cd path/to/your/backend
   ```

2. Start the server:

   ```bash
   npm start
   ```

   The backend server should now be running on [http://localhost:5000](http://localhost:5000).

### Start the Frontend React App

1. Open a new terminal and navigate to the frontend directory:

   ```bash
   cd path/to/your/frontend
   ```

2. Start the React app:

   ```bash
   npm start
   ```

   This should open your default web browser to [http://localhost:3000](http://localhost:3000), where you can interact with the application.

## Features

- **File Upload:** Users can upload PDF files through the frontend.
- **File List:** Users can view a list of all uploaded PDF files.
- **File Preview:** Users can preview any PDF file by clicking the "Preview" button next to the file's listing.

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- File Storage: Server's filesystem

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
