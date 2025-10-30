# Todo List Application

A modern and professional task management application built with React.  
This app allows users to efficiently organize, manage, and track their daily tasks with a sleek and responsive design.

---

## Features

- Add, edit, and delete tasks  
- Filter tasks by status (All, Active, Completed)  
- Real-time search functionality  
- Data persistence using LocalStorage  
- Progress tracking with visual indicators  
- Modern glass-morphism UI design  
- Responsive design for all devices  

---

## Technologies Used

- React 18  
- CSS3 with modern effects  
- React Icons  
- Context API for state management  
- LocalStorage for data persistence  

---

## Installation

Follow these steps to run the project locally:

```bash
# Clone the repository
git clone https://github.com/KarimJebbari/todo-list-app.git

# Navigate to the project directory
cd todo-list-app

# Install dependencies
npm install

# Start the development server
npm start
```
Then open your browser and visit:
- http://localhost:3000

## Project Structure

src/
├── components/
│   ├── Header/          # App header with statistics
│   ├── TodoForm/        # Task creation form
│   ├── TodoList/        # Main tasks container
│   ├── TodoItem/        # Individual task component
│   ├── SearchBar/       # Search functionality
│   └── FilterButtons/   # Task filtering
│
├── contexts/
│   └── TodoContext.js   # State management
│
├── utils/
│   ├── storage.js       # LocalStorage utilities
│   ├── constants.js     # App constants
│   └── helpers.js       # Helper functions
│
├── hooks/               # Custom React hooks
├── App.js
└── index.js
