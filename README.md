# MERN Stack Real-Time Chat Application
https://github.com/akashdeep023/Chat_App

## Overview
This MERN Stack Real-Time Chat Application is a web-based platform that enables users to communicate in real-time. It offers features such as user authentication, group chats, and instant messaging with real-time updates. The application is built using the MERN (MongoDB, Express, React, Node.js) stack and incorporates additional technologies for enhanced functionality and user experience.

## Technologies Used
MongoDB: NoSQL database for storing user information and chat data.

- Express.js: Backend framework for building the RESTful API.

- React.js (v19.0.0): Frontend library for building the user interface.

- Node.js: Runtime environment for executing JavaScript on the server side.

- Socket.io (v4.8.1): Real-time bidirectional event-based communication.

- Redux Toolkit (v2.5.1): State management library.

- React Router DOM (v7.1.5): Routing library for React applications.

- Axios (v1.7.9): Promise-based HTTP client for making API requests.

- Moment.js (v2.30.1): Library for parsing, validating, and formatting dates.

- React Toastify (v11.0.3): Notification library for React applications.

- Tailwind CSS (v4.0.5): Utility-first CSS framework for styling.

- Vite (v6.1.0): Build tool and development server.

## Features
- Real-Time Messaging

- Instant message delivery using Socket.io.

- Typing indicators for active conversations.

- JWT-based authentication for protected routes.

- Create and manage group chats.

- Add or remove users from groups.

- Customize user profiles with avatars and status messages.

- View online/offline status of users.

- Store and retrieve chat history.

- Search functionality within conversations.

- Mobile-friendly interface using Tailwind CSS.

- Consistent experience across various devices.

## Installation
Clone the Repository

```bash
git clone https://github.com/Mahesh0426/chat-APP-FE
cd Chat_App
Install Dependencies
```
```bash
yarn install
Set Up Environment Variables
Create a .env file in the root directory and add necessary variables:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the Application
```

````bash
yarn dev
````
