<div align="center">

<img src="https://img.icons8.com/fluency/96/server.png" width="90" />

# 🛠️ CarLanda – Backend Server

**Secure, Scalable & Production-Ready REST API**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)](https://mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase_Admin_SDK-FFCA28?style=for-the-badge\&logo=firebase\&logoColor=black)](https://firebase.google.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=jsonwebtokens)](https://jwt.io/)

</div>

---

## 🌟 Backend Overview

**CarLanda Backend** is a secure RESTful API built using **Node.js**, **Express**, and **MongoDB**, designed to power the CarLanda Flutter mobile application.

It handles:

* Authentication & authorization
* User & profile management
* Car listings & search
* Favorites & chat
* Payment integration
* Admin-level security checks

The backend follows **industry-standard security practices** and is fully production-ready.

---

## 🔐 Authentication & Security Architecture

### ✅ Firebase Authentication (Client)

* Users authenticate on the Flutter app using:

  * Email / Password
  * Google Sign-In
* Firebase issues a **Firebase ID Token** after successful login

---

## 🔥 Firebase Admin SDK (Core Security Layer)

The backend uses **Firebase Admin SDK** to **verify and trust user identity**.

### ❓ Why Firebase Admin SDK?

Client-side authentication alone is not secure.

Firebase Admin SDK allows the backend to:

* Verify Firebase-issued ID tokens
* Prevent fake or tampered requests
* Ensure only verified users can access protected APIs

---

### 🔄 Authentication Flow

1. User logs in via Firebase Authentication (Flutter)
2. Firebase returns a **Firebase ID Token**
3. Token is sent with API requests (Authorization Header)
4. Express middleware uses **Firebase Admin SDK** to:

   * Decode the token
   * Verify token authenticity & expiration
   * Extract verified user data (UID, email)
5. Backend grants access to protected routes

---

### 🛡️ Security Benefits

* Zero trust on client-side data
* Token tampering prevention
* Production-grade authentication
* Secure access to sensitive APIs
* Scalable & maintainable security layer

---

### 🧩 Token Verification Middleware (Concept)

```js
import admin from "firebase-admin";

export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
```

---

## 🚗 Core Backend Features

### 👤 User Management

* Create & update user profile
* Store user data in MongoDB
* Profile & Passport/ID image handling
* Role-based access control

### 🚘 Car Management

* Add / update / fetch car listings
* Featured & Hot Deals logic
* Category & car-type filtering
* Advanced search queries

### ❤️ Favorites

* Add / remove favorite cars
* Persist favorites per user
* Fast MongoDB queries

### 💬 Chat System

* Real-time chat message APIs
* User ↔ Admin communication
* Chat history storage

### 💳 Payment Integration

* **SSLCommerz** payment gateway integration
* Secure payment session creation
* Payment success / failure handling

---

## ⚙️ Tech Stack

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| Node.js            | Server runtime            |
| Express.js         | REST API framework        |
| MongoDB            | NoSQL database            |
| Firebase Admin SDK | Token verification & auth |
| JWT                | Secure API access         |
| SSLCommerz         | Payment processing        |

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/dev-ajijul-islam/car_landa_server_express.git
cd car_landa_server_express
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables (.env)

```env
MONGODB_URI
```

### 4️⃣ Run Server

```bash
npm run dev
```

Server will run on:

```
http://localhost:3000
```

---

## 📂 Project Structure

```
src/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── middlewares/
 │    └── firebaseAuth.js
 ├── utils/
 ├── app.js
 └── server.js
```

---

## 🧠 Architecture Highlights

* Modular Express architecture
* Middleware-based security
* Firebase + JWT hybrid authentication
* Scalable MongoDB schema design
* Clean, maintainable codebase

---
