--sudo -u postgres psql

CREATE DATABASE onlinelibrary;
CREATE USER libuser WITH PASSWORD '123456';
GRANT ALL PRIVILEGES ON DATABASE onlinelibrary TO libuser;

-- \c onlinelibrary
-- SET ROLE libuser;


-- Bảng Users
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(10) CHECK (role IN ('user', 'admin')) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Books
CREATE TABLE Books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(150) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    published_year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng BorrowingHistory
CREATE TABLE BorrowingHistory (
    borrowing_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    book_id INT NOT NULL REFERENCES Books(id) ON DELETE CASCADE,
    borrowed_date DATE DEFAULT CURRENT_DATE,
    returned_date DATE
);

-- Tạo index để tối ưu tìm kiếm theo user_id
CREATE INDEX idx_borrowing_userid ON BorrowingHistory(user_id);

INSERT INTO Users (name, email, password_hash, role)
VALUES
  ('Alice Nguyen', 'alice@example.com', ' $2b$12$ZYobRzResp/N.fJcPaQpt.jImuP8GaDXf3CbR5.r4EFPJ8yGORX5O', 'user'),
  ('Bob Tran', 'bob@example.com', ' $2b$12$ZYobRzResp/N.fJcPaQpt.jImuP8GaDXf3CbR5.r4EFPJ8yGORX5O', 'user'),
  ('Admin User', 'admin@example.com', ' $2b$12$ZYobRzResp/N.fJcPaQpt.jImuP8GaDXf3CbR5.r4EFPJ8yGORX5O', 'admin');

INSERT INTO Books (title, author, genre, published_year)
VALUES
  ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 1925),
  ('To Kill a Mockingbird', 'Harper Lee', 'Classic', 1960),
  ('1984', 'George Orwell', 'Dystopian', 1949),
  ('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 1937),
  ('Clean Code', 'Robert C. Martin', 'Programming', 2008),
  ('The Pragmatic Programmer', 'Andy Hunt', 'Programming', 1999);


INSERT INTO BorrowingHistory (user_id, book_id, borrowed_date, returned_date)
VALUES
  (1, 1, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE - INTERVAL '5 days'),
  (1, 2, CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE - INTERVAL '15 days'),
  (2, 1, CURRENT_DATE - INTERVAL '2 months', CURRENT_DATE - INTERVAL '1.5 months'),
  (2, 3, CURRENT_DATE - INTERVAL '1 month', NULL),
  (1, 1, CURRENT_DATE - INTERVAL '3 months', CURRENT_DATE - INTERVAL '2.5 months'),
  (2, 1, CURRENT_DATE - INTERVAL '4 months', CURRENT_DATE - INTERVAL '3.8 months'),
  (2, 5, CURRENT_DATE - INTERVAL '15 days', NULL),
  (1, 6, CURRENT_DATE - INTERVAL '5 days', NULL),
  (1, 4, CURRENT_DATE - INTERVAL '5 months', NULL),
  (2, 1, CURRENT_DATE - INTERVAL '10 days', NULL);

