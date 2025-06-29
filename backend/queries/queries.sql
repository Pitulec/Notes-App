CREATE DATABASE notes;

USE notes;

CREATE TABLE
    IF NOT EXISTS users (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );
    
CREATE TABLE
    IF NOT EXISTS notes (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );

INSERT INTO notes (user_id, title, content) VALUES
    (7, 'Welcome to Notes App', 'This is your first note. You can edit or delete it.'),
    (7, 'Getting Started', 'To create a new note, click on the "New Note" button.'),
    (7, 'Tips', 'You can format your notes using Markdown syntax.');