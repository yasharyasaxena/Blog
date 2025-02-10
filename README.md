# **BlogSpot**

### **A brief description of your app**  
A full stack MERN app to create and view blogs.

## **📸 Demo & Screenshots**  
  

  

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
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

### **4. Run the development server**  
```sh
# Start backend
cd backend
npm start

# Start frontend
cd frontend
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

## **📧 Contact & Acknowledgments**  
- **Yash Arya Saxena** – [LinkedIn](www.linkedin.com/in/yash-arya-saxena-834021331)
