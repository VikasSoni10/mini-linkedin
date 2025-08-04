# Mini LinkedIn

A mini LinkedIn-style social platform built with the **MERN** stack. Users can register, log in, create posts, and view profiles.

---

## 🛠 Stack Used

- **Frontend**: React (Vite), Tailwind CSS, React Router 
- **Backend**: Node.js, Express.js, MongoDB
- **Deployment**: Render (Backend), Vercel (Frontend)

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/VikasSoni10/mini-linkedin.git
cd mini-linkedin
```
### 2. Backend Setup (server)
```
cd server
npm install

```
**Create a .env file inside the server folder:**
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
**Start the backend server:**
```
npm start
```

### 3. Frontend Setup (server)
```
cd client
npm install

```
**Create a .env file inside the client folder:**
```
VITE_API_URL=http://localhost:5000
```
**Start the frontend:**
```
npm run dev
```

## 📜 License
This project is for educational purposes only.
