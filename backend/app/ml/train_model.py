import pandas as pd
import numpy as np
import pickle

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
df = pd.read_csv("data/postings.csv", nrows=10000)
df = df[["title", "description"]].dropna()
df["text"] = df["title"] + " " + df["description"]

# Simulate resumes
resumes = df["text"].sample(300).tolist()

# Vectorization
vectorizer = TfidfVectorizer(stop_words="english")

all_texts = resumes + df["text"].tolist()
vectors = vectorizer.fit_transform(all_texts)

resume_vecs = vectors[:len(resumes)]
job_vecs = vectors[len(resumes):]

# Dataset
X = []
y = []

for i in range(len(resumes)):
    for j in range(3):  # smaller = faster
        job_idx = np.random.randint(0, job_vecs.shape[0])

        sim = cosine_similarity(resume_vecs[i], job_vecs[job_idx])[0][0]

        X.append([sim])
        y.append(1 if sim > 0.3 else 0)

X = np.array(X)
y = np.array(y)

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train
model = LogisticRegression()
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluation
print("\n=== MODEL EVALUATION ===")
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("\nReport:\n", classification_report(y_test, y_pred))

# Save model
with open("app/ml/model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("app/ml/vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("\n Model saved successfully!")