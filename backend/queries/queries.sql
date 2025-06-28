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

-- EXAMPLE DATA
INSERT INTO
    notes (title, content)
VALUES
    ("Cooking book", "A collection of recipes"),
    ("Grocery list", "Milk, Eggs, Bread, Butter"),
    (
        "Meeting notes",
        "Discuss project updates and next steps"
    ),
    (
        "Book recommendations",
        "1. The Great Gatsby 2. To Kill a Mockingbird"
    ),
    (
        "Workout routine",
        "Monday: Chest and Triceps, Tuesday: Back and Biceps"
    ),
    ("Vacation ideas", "Beach, Mountains, City trip"),
    (
        "Personal goals",
        "Learn a new language, Read more books"
    ),
    (
        "Shopping list",
        "Clothes, Electronics, Home decor"
    ),
    (
        "Birthday party plans",
        "Theme: Tropical, Guest list: Friends and family"
    ),
    ("Travel plans", "Drugie");