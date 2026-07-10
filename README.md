# 🏡 StayHub – Airbnb Clone

A full-stack Airbnb-inspired web application where users can explore, create, edit, and manage property listings. StayHub provides secure authentication, image uploads, reviews, and an interactive map for property locations.

## 🌐 Live Demo

**Live Website:** https://major-project-2-1rtb.onrender.com/listings

## 📌 Features

* 🔐 User Authentication (Signup/Login/Logout)
* 🏠 Create, Edit & Delete Property Listings
* 📸 Image Upload using Cloudinary
* ⭐ Add & Delete Reviews
* 🗺️ Interactive Location Map
* 📱 Responsive User Interface
* ✅ Form Validation
* 🔒 Authorization (Only owners can edit/delete their listings)
* 💬 Flash Messages for user feedback

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript
* EJS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* Passport.js
* Passport Local
* Express Session

### Cloud Services

* Cloudinary (Image Storage)
* MapTiler / Leaflet (Maps)

### Deployment

* Render

---

## 📂 Project Structure

```
controllers/
models/
routes/
views/
public/
utils/
app.js
package.json
```

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Shubham-web-ai/MAJOR-PROJECT.git
```

Move into the project

```bash
cd MAJOR-PROJECT
```

Install dependencies

```bash
npm install
```

Create a `.env` file and add:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_secret_key
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_maptiler_api_key
```

Run the project

```bash
npm start
```

Open your browser

```
http://localhost:8080/listings
```

---

## 📸 Screenshots

Add screenshots here.

Example:

* Home Page
* Listing Details
* Add Listing
* Login Page

---

## 🚀 Future Improvements

* Property Search
* Wishlist
* Booking System
* Payment Integration
* User Profile
* Email Verification
* Advanced Filters

---

## 👨‍💻 Author

**Shubham**

GitHub: https://github.com/Shubham-web-ai

---

## 📄 License

This project is created for educational and portfolio purposes.
