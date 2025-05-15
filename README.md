# **BlogSpot**

### **A brief description of your app**  
A full-stack app where you can post blogs that can be viewed and liked by the public.
You can delete and edit your blogs.
The app is secured using JWT authentication.

## **📸 Deployed Link  & Screenshots**
      
      **[Link](https://blog-mauve-iota-18.vercel.app/)**

![image](https://github.com/user-attachments/assets/8b0a1034-5425-48df-8bc0-271eb1c6a5d0)
![image](https://github.com/user-attachments/assets/a2807825-40a3-4196-b1de-e3291502b72a)
![image](https://github.com/user-attachments/assets/dc99ad7c-ed9b-455b-a716-7f1862db6812)

## **⚡ Features**  
- ✅ Top blogs are visible on the home page.
- ✅ Liked Blogs are persistent and user-based.
- ✅ Create blogs using editor mode using a rich text editor and upload a banner image.
- ✅ Perform CRUD operations on the blogs.
- ✅ JWT Authentication for persistence of logged in user even after closing browser.

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
| Method | Route | Description |
|--------|-------|-------------|
| **POST** | `/register` | Register a new user |
| **POST** | `/login` | User login |
| **GET** | `/profile` | Get user profile |
| **GET** | `/blogs` | Get all blogs |
| **GET** | `/blog/:id` | Get specific blog |
| **DELETE** | `/blog/:id` | Delete specific blog |
| **PATCH** | `/blog-edit/:id` | Update specific blog |
| **POST** | `/create-blog` | Create blog |


## **📧 Contact**  
- **Yash Arya Saxena** – [LinkedIn](https://www.linkedin.com/in/yash-arya-saxena-834021331)
