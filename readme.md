# Favorite Sites Manager

**Favorite Sites Manager** is a web application to manage your favorite websites and mark them as favorites, with features to add, view your sites The project is built using **Python (Flask)** for the backend and **HTML/CSS/JavaScript** for the frontend.

---

## Features
- **Add Websites**: Allows users to add websites with a title, URL, and description.
- **Full View**: Displays all saved websites.
- **Favorites Management**: Mark websites as favorites and view them separately.
- **Recent Websites**: List of recently added websites.
- **User-Friendly Interface**: Simple and accessible layout.

---

## Prerequisites

### Required Software:
1. **Python** (version 3.8 or later)
2. **MySQL**

### Python Dependencies:
- Flask
- Flask-CORS
- mysql-connector-python

Install dependencies using the command:
```bash
pip install flask flask-cors mysql-connector-python
```

---

## Installation

### 1. Database Setup
1. Create a MySQL database:
   ```sql
   CREATE DATABASE favorite_sites;
   ```
2. Execute the SQL script to create the required tables:
   ```sql
   CREATE TABLE categories (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL
   );

   CREATE TABLE links (
       id INT AUTO_INCREMENT PRIMARY KEY,
       link TEXT NOT NULL,
       titolo VARCHAR(255) NOT NULL,
       descr TEXT,
       idUser INT,
       cat INT,
       preferito BOOLEAN DEFAULT 0,
       FOREIGN KEY (cat) REFERENCES categories(id)
   );
   ```

### 2. Backend Setup
1. Create a file named `cred.py` in the root directory:
   ```python
   db_config = {
       'user': 'your_username',
       'password': 'your_password',
       'host': '127.0.0.1',
       'database': 'favorite_sites',
   }
   ```
2. Run the Flask app:
   ```bash
   python app.py
   ```

### 3. Frontend Setup
1. Just open the `index.html` file in a browser

---

