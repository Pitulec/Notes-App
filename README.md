# Notes App

A full-stack notes application built with Next.js and Express.js that allows users to create, edit, delete, and manage their personal notes with markdown support.

## Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Note Management**: Create, read, update, and delete notes
- **Markdown Support**: Write notes in markdown with live preview
- **Responsive Design**: Clean, modern UI that works on all devices
- **Real-time Editing**: In-place editing with save/cancel functionality
- **User-specific Notes**: Each user can only access their own notes

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React** - UI library
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering
- **Lucide React** - Icons

### Backend
- **Express.js** - Node.js web framework
- **MySQL** - Database
- **JWT** - Authentication tokens
- **CORS** - Cross-origin resource sharing

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd notes-app
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   ```

3. **Database Setup**
   Create a MySQL database and run the following SQL commands:

   ```sql
   -- Create users table
   CREATE TABLE users (
   id INT AUTO_INCREMENT PRIMARY KEY,
   username VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Create notes table
   CREATE TABLE notes (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT NOT NULL,
   title VARCHAR(255) NOT NULL,
   content TEXT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   );
   ```

4. **Environment Variables**
   Create a `.env` file in the server directory:
   ```env
   ACCESS_TOKEN=your-jwt-secret-key
   DB_HOST=localhost
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   PORT=3000
   \`\`\`

5. **Start the application**
   ```bash
   # Start the backend server (from server directory)
   npm start

   # Start the frontend (from root directory)
   npm run dev
   ```

   The frontend will be available at `http://localhost:3001` and the backend at `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - User login

### Notes
- `GET /notes/` - Get all notes for authenticated user
- `GET /notes/:id` - Get specific note by ID
- `POST /notes/` - Create new note
- `PUT /notes/:id` - Update existing note
- `DELETE /notes/:id` - Delete note

### Request/Response Examples

**Login**
```javascript
POST /auth/login
{
"username": "john_doe",
"password": "password123"
}

Response:
{
"token": "jwt-token-here"
}
```

**Create Note**
```javascript
POST /notes/
Headers: { Authorization: "Bearer jwt-token" }
{
"title": "My First Note",
"content": "# Hello World\nThis is my first note!"
}
```

## Usage

1. **Sign Up**: Create a new account with username and password
2. **Login**: Sign in to access your notes
3. **View Notes**: Browse all your notes on the main dashboard
4. **Create Notes**: Click "Create note" to add a new note
5. **Edit Notes**: Click the pencil icon to edit any note in-place
6. **Delete Notes**: Click the trash icon to delete unwanted notes

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **User Isolation**: Users can only access their own notes
- **Input Validation**: Username and password requirements
- **Authorization Headers**: Protected API endpoints

## Password Requirements

- Minimum 8 characters
- Must contain at least one letter and one number
- Username must be at least 3 characters long

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.