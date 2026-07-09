# 🚀 AI Resume + Job Match System

An AI-powered web application that analyzes resumes and recommends the most relevant job opportunities using Machine Learning.

---

## 🧠 Features

* 📄 Upload resume (PDF)
* 🔍 Extract text from resume
* 🧠 Skill detection
* 💼 Job matching using ML
* 📊 Match score prediction
* 🎯 Recommended jobs with insights
* 🌙 Modern UI (Dark Mode)

---

## 🏗️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS v3
* Framer Motion
* Axios

### Backend

* FastAPI
* Python
* PyMuPDF (PDF parsing)
* Scikit-learn

### Machine Learning

* TF-IDF Vectorization
* Cosine Similarity
* Logistic Regression (trained model)

---

## 📁 Project Structure

```
ai-resume-job-matcher/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   ├── ml/
│   │   └── main.py
│   ├── data/
│   │   └── postings.csv
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

---

### 🔹 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai-resume-job-matcher
```

---

## 🧠 BACKEND SETUP

### 🔹 2. Navigate to Backend

```bash
cd backend
```

---

### 🔹 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 🔹 4. Add Dataset

Place your dataset here:

```
backend/data/postings.csv
```

Required columns:

```
title, description
```

---

### 🔹 5. Train ML Model (IMPORTANT)

```bash
python app/ml/train_model.py
```

This will generate:

```
app/ml/model.pkl
app/ml/vectorizer.pkl
```

---

### 🔹 6. Run Backend Server

```bash
uvicorn app.main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

---

## 🎨 FRONTEND SETUP

### 🔹 7. Navigate to Frontend

```bash
cd ../frontend
```

---

### 🔹 8. Install Dependencies

```bash
npm install
```

---

### 🔹 9. Run Frontend

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 🔄 How It Works

1. User uploads resume (PDF)
2. Backend extracts text using PyMuPDF
3. Text is vectorized using TF-IDF
4. Similarity is calculated with job descriptions
5. Logistic Regression model predicts match score
6. Top jobs are returned with:

   * Match %
   * Matched skills
   * Missing skills

---

## 📊 ML Model Details

* Feature: Cosine similarity score
* Model: Logistic Regression
* Evaluation:

  * Accuracy
  * Confusion Matrix
  * Precision / Recall / F1-score

---

## 🚀 Future Improvements

* 🔥 Use BERT for semantic matching
* 📊 Add advanced analytics dashboard
* 👤 User authentication (JWT)
* 🌍 Deploy on cloud (Render / Vercel)
* 🧠 AI resume feedback system

---

## 🛠️ Troubleshooting

### ❌ Model not found

Run:

```bash
uvicorn app.main:app --reload

```

---

### ❌ No space left on device

* Clear temp files
* Run:

```bash
pip cache purge
```

---

### ❌ Module errors

Reinstall dependencies:

```bash
pip install -r requirements.txt
```

---

## 👨‍💻 Author

* Developed as an AI + Data Analytics project
* Focused on real-world ML + full-stack integration

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and use it in your portfolio!
