CREATE TABLE IF NOT EXISTS users (
  id varchar(100) COLLATE utf8mb4_bin NOT NULL,
  email varchar(100) COLLATE utf8mb4_bin NOT NULL,
  generates_left int(11) NOT NULL,
  password varchar(255) COLLATE utf8mb4_bin NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


INSERT INTO users (id, email, generates_left, password) VALUES
('cus_FPwJZ25sgVc5lF', 'kico206@gmail.com', 0, '$2a$10$SNHg4tuu9/x5taGeD8YiQOL1qrlD9X1g1YT6x1k3SQWiRcCdV.vBS');