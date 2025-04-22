# 🚀 CityPulse - Smart City Issue Reporting System

CityPulse is a smart urban problem-reporting platform developed during the ALX Hackathon. It empowers citizens to report real-world city issues (e.g., potholes, broken lights, waste problems) using a simple mobile app. These reports are then analyzed by AI to categorize the problem and assign a priority score, ensuring faster and smarter response by the city authorities.

---

## 🧠 Problem Statement

City infrastructure issues often go unreported or are processed slowly due to poor routing and prioritization. Citizens don’t have an easy way to voice concerns, and departments struggle to respond efficiently.

---

## ✅ Our Solution

CityPulse provides:
- A mobile app (built natively) for easy issue reporting with images and location.
- A backend API (Node.js + Express) to manage users, reports, and routing.
- An AI engine that categorizes the report and gives it a priority score.
- A future-ready admin dashboard to monitor, assign, and resolve incoming issues.

---

## 🔧 Tech Stack

- **Backend:** Node.js, Express.js, MongoDB
- **Mobile App:** Native (Android)
- **AI:** Custom ML model for categorization + prioritization
- **Hosting:** god know for now

---

## 📋 Backend Developer TODO List (Amir)

### 🛠 Project Setup
- ✅ Initialize Node.js project with Express and Mongoose
- ✅ Set up folder structure and `.env` config
- ✅ Connect MongoDB

### 👤 Authentication
- ✅ Create User model
- ✅ Register/Login endpoints with JWT
- ✅ Auth & Role middlewares

### 📍 Report Management
- [ ] Report model (description, location, image, status, etc.)
- [ ] POST `/reports` – Create new report
- [ ] GET `/reports` – Get all reports (admin)
- [ ] GET `/reports/:id` – Get one report
- [ ] GET `/users/:id/reports` – Reports by user
- [ ] PATCH `/reports/:id/status` – Update report status
- [ ] PATCH `/reports/:id/assign` – Assign to department/staff
- [ ] DELETE `/reports/:id` – Delete report

### 🤖 AI Integration
- [ ] Internal POST `/ai/analyze` – Analyze report for category & priority

### 📦 Extras
- [ ] Setup cloud image uploads (Cloudinary or S3)
- [ ] (Optional) Create categories & dashboard stats route
- [ ] Test all endpoints with Postman

---

## 👨‍💻 Team

- **Amir** – Backend & API (Node.js, Express, MongoDB)
- **Ahmed** – Mobile App (Native)
- **Sayed** – AI/ML Developer (Model training & integration)

---

## 🏁 Status

🚧 Work in progress — stay tuned!
