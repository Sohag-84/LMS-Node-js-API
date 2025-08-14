# LMS API (Node.js + Express + MongoDB)

A fully functional **Learning Management System REST API** built with **Node.js**, **Express**, and **MongoDB**.  
This API supports authentication, course management, category management, purchases, reviews, and user dashboards.

---

## 🚀 Features

### **Authentication**
- **POST** `/api/auth/register` — Register a new user (student or teacher)
- **POST** `/api/auth/login` — Login and receive JWT token

---

### **Categories** (Requires `admin` role)
- **POST** `/api/category/add` — Add category
- **GET** `/api/category/get` — Get all categories
- **POST** `/api/category/delete/:id` — Delete category

---

### **Courses**
#### Teacher-only
- **POST** `/api/course/add` — Create a new course
- **POST** `/api/course/update/:id` — Update course details
- **POST** `/api/course/delete/:id` — Delete a course
- **POST** `/api/course/videos/:id` — Add or update course videos

#### Public / Student
- **GET** `/api/course/get` — Get all courses
- **POST** `/api/course/:id/purchase` — Purchase a course (JWT required)

---

### **Reviews**
- **POST** `/api/course/review/:id` — Add review for a course
- **GET** `/api/course/reviews/:id` — Get all reviews for a course

---

### **Users**
- **GET** `/api/user/get` — Get all users (admin only)
- **GET** `/api/user/courses` — Get logged-in student's purchased courses

---

## 🛠 Tech Stack
- **Node.js** (Express.js)
- **MongoDB** (Mongoose ODM)
- **JWT** for authentication
- **Bcrypt** for password hashing
- **CORS** for cross-origin requests

---

## 📦 Installation

```bash
# Clone the repository
git clone git@github.com:Sohag-84/LMS-Node-js-API.git

# Move into the directory
cd LMS-Node-js-API

# Install dependencies
npm install

# Create an environment file
cp .env.example .env

# Run the server
npm run dev
