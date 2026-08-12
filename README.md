# 1MIN — "One minute. One conversation."

1MIN is a real-time, anonymous chat platform built for quick, spontaneous conversations. It features random matchmaking with a strict 60-second time limit, as well as private, limitless rooms generated via secure, single-use invite links.

## Features

- **Random Matchmaking**: Instantly connect with a stranger for exactly 60 seconds.
- **Private Rooms**: Generate single-use, self-destructing links to chat privately with no time limit.
- **Real-Time WebSockets**: Live messaging, typing indicators, and emoji reactions powered by Socket.IO.
- **Modern UI**: A premium, responsive, glassmorphic design built with Tailwind CSS.

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Socket.IO Client
- **Backend**: Node.js, Express, Socket.IO, MongoDB (Mongoose)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Cluster (or local instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:rakibal123/1minChat.git
   cd 1minChat
   ```

2. **Install dependencies:**
   ```bash
   # Install root concurrently tools (optional)
   npm install

   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   CLIENT_URL=http://localhost:3000
   ```

4. **Run the Application:**
   From the root directory, you can start both servers simultaneously (if you have concurrently setup in the root package.json):
   ```bash
   npm run dev
   ```
   
   *Alternatively, run them separately:*
   ```bash
   # Terminal 1
   cd backend && npm run dev

   # Terminal 2
   cd frontend && npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.
