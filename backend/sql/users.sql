CREATE TABLE users (
    user_id INT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_display_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_bio VARCHAR(300) NOT NULL,
    user_profile_image VARCHAR(1000),
);
