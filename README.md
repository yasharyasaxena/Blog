# **BlogSpot**

### **A brief description of your app**  
A full stack MERN app to create and view blogs.

## **📸 Demo & Screenshots**  

  [DEMO Video](https://drive.google.com/file/d/1uZjZVMtjUC5zkLfrd4v_ovVhR4q6IzSs/view?usp=sharing)

  ![Screenshot (72)](https://github.com/user-attachments/assets/1fee0563-9899-4ba3-839c-dd0cf55e8069)
  ![Screenshot (74)](https://github.com/user-attachments/assets/0506aabe-27f1-4a76-8fc7-2a7ac7c3edb0)
  ![Screenshot (73)](https://github.com/user-attachments/assets/d3932204-8410-40e0-9108-d56c7a37a169)
  ![Screenshot (68)](https://github.com/user-attachments/assets/b4891047-1fa3-4455-a2d2-9a17501d9957)
  ![Screenshot (69)](https://github.com/user-attachments/assets/36d52ed7-2898-4a86-8665-79d02af3cff0)
  ![Screenshot (67)](https://github.com/user-attachments/assets/d5df5e37-3597-4cc3-b630-d573ef8c0d34)

## **⚡ Features**  
- ✅ Feature 1  Top blogs visible on home page.
- ✅ Feature 2  Like blogs you like.
- ✅ Feature 3  Create blogs using editor mode and view all your top blogs in dashboard 

## **🛠 Tech Stack**  
- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT

## **🚀 Installation & Setup**  

### **1. Clone the repository**  
```sh
git clone https://github.com/yasharyasaxena/Blog.git
cd Blog
```

### **2. Install dependencies**  
```sh
cd backend
npm install
cd ../frontend
npm install
```

### **3. Set up environment variables**  
Create a `.env` file in the backend folder and add:  
```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_secret_key
FRONTEND_URL="http://localhost:5173"
```

### **4. Run the development server**  
```sh
# Start backend
cd backend
npm start

# Start frontend
cd ../frontend
npm run dev
```

## **📌 API Routes**  
Some major backend routes.
| Method | Route | Description |
|--------|-------|-------------|
| **POST** | `/register` | Register a new user |
| **POST** | `/login` | User login |
| **GET** | `/blogs` | Get all blogs |
| **GET** | `/blog/:id` | Get specific blog |
| **POST** | `/create-blog` | Create blog |  

## **📧 Contact**  
- **Yash Arya Saxena** – [LinkedIn](https://www.linkedin.com/in/yash-arya-saxena-834021331)
