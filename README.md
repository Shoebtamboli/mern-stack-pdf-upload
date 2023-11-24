# MERN Stack PDF Upload Application

This application allows users to upload PDF files through a React frontend and manages the files with a Node.js/Express backend. MongoDB is used to store the file metadata, and the files themselves are stored on the server's filesystem.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Installation

### Backend Setup

1. Create a `.env` file in the backend directory to store environment variables:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost/pdf-upload
   ```

   Replace the `MONGO_URI` value with your MongoDB connection string if it's different.

## Running the Application

1. Clone the repository

   ```bash
   git clone https://github.com/Shoebtamboli/mern-stack-pdf-upload.git
   ```

2. Run the command

   ```bash
   docker-compose up
   ```

## Features

- **File Upload:** Users can upload PDF files through the frontend.
- **File List:** Users can view a list of all uploaded PDF files.
- **File Preview:** Users can preview any PDF file by clicking the "Preview" button next to the file's listing.

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- File Storage: Server's filesystem
