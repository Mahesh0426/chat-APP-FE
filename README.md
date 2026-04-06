# Real-Time Chat Application Frontend

A robust frontend implementation for a real-time chat application similar to Messenger, built with React, Redux Toolkit, Tailwind CSS, and Socket.IO.

## Backend Repo

https://github.com/Mahesh0426/chatApp-BE

## Features

- 🔐 User authentication UI with protected routes
- 👤 User profile management with Cloudinary avatar uploads
- 💬 Real-time messaging interface
- 🔍 User search functionality
- 📱 Online/offline status tracking
- 👁 Message seen status indicators
- 🖼 Support for text, image, and video message display
- 🎨 Responsive mobile-friendly design with Tailwind CSS

## Tech Stack

- **React.js** - Frontend UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Application routing
- **Socket.IO-client** - Real-time communication
- **Tailwind CSS** - Utility-first styling
- **Axios** - Promise-based HTTP client
- **Moment.js** - Date and time formatting
- **React Toastify** - Notification system
- **Vite** - Build tool and development server
- **yarn** - Package manager

## Core Features & Components

### Authentication

- User login and registration forms
- Secure token handling and protected route wrappers

### Main Interface

- **Sidebar**: Displays active conversations, online users, and unread message indicators
- **Message Area**: Real-time display of text, image, and video messages
- **User Profile**: Inline editing for user details and avatar updates

## Socket Events

- `connection` - Establish real-time connection
- `new message` - Receive incoming messages
- `online users` - Sync online/offline user statuses
- `sidebar` - Real-time updates for conversation list

## Getting Started

1. Clone the repository

```sh
git clone https://github.com/Mahesh0426/chat-APP-FE.git
```

2. Install dependencies:

```sh
yarn install
```

3. Create a `.env` file with the following variables:

```env
VITE_APP_API_BASE_URL='http://localhost:8000'
VITE_WEB3FORM_ACCESS_KEY='your_web3form_access_key'
VITE_CLOUDINARY_CLOUD_NAME='your_cloudinary_cloud_name'
```

4. Run the development server:

```sh
yarn dev
```

## Security Features

- Secure HTTP-only cookie consideration for API calls
- Proper CORS configuration with the backend
- Route protection checking for valid authentication states

## Development Scripts

- `yarn dev` - Start Vite development server
- `yarn build` - Build the application for production
- `yarn preview` - Preview the production build locally
- `yarn lint` - Run ESLint for code formatting checks

## Environment Requirements

- Node.js >= 18.x
