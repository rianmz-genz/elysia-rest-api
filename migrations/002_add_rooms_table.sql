CREATE TABLE IF NOT EXISTS rooms
(
    room_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    room_name TEXT NOT NULL,
    room_number TEXT NOT NULL,
    floor INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
