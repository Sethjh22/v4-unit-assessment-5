CREATE TABLE helo_users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    passowrd VARCHAR(255) NOT NULL,
    profile_pic TEXT
);

CREATE TABLE helo_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    content TEXT,
    img TEXT,
    author_id INT REFERENCES helo_users(helo_user_id),
    date_created TIMESTAMP
)