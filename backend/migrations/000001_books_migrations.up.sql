CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    user_email VARCHAR(50) UNIQUE NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_created_at timestamp
);

CREATE TABLE IF NOT EXISTS Books (
    book_id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    description TEXT,
    picture TEXT 
);

CREATE TABLE IF NOT EXISTS UserBooks (
    userbook_id serial PRIMARY KEY,
    user_id INT,
    book_id VARCHAR(255),
    list_type VARCHAR(50),
    added_at timestamp,
    FOREIGN KEY (user_id) REFERENCES users (user_id), 
    FOREIGN KEY (book_id) REFERENCES Books (book_id)
)
