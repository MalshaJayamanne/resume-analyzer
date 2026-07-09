import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from app.ml.model_loader import model, vectorizer
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load and pre-process data once
# Optimization: Only load a subset if the file is massive, or load everything but handle it safely
try:
    logger.info("Loading job postings data...")
    # Loading 10k rows for performance, as 516MB is too much for a basic reloader setup
    df = pd.read_csv("data/postings.csv", nrows=10000) 
    df = df[["title", "description"]].dropna().reset_index(drop=True)
    df["text"] = df["title"] + " " + df["description"]
    
    logger.info(f"Pre-calculating job vectors for {len(df)} postings...")
    job_vecs = vectorizer.transform(df["text"])
    logger.info("Job vectors pre-calculated successfully.")
except Exception as e:
    logger.error(f"Error loading job data: {e}")
    df = pd.DataFrame(columns=["title", "description", "text"])
    job_vecs = None

# Comprehensive skills list
SKILLS_LIST = [
    "python", "java", "sql", "react", "node", "javascript", "typescript", 
    "docker", "kubernetes", "aws", "azure", "gcp", "machine learning", 
    "deep learning", "nlp", "flask", "fastapi", "django", "spring", 
    "html", "css", "tailwind", "next.js", "mongodb", "postgresql", 
    "redis", "kafka", "pandas", "numpy", "scikit-learn", "tensorflow", 
    "pytorch", "c++", "go", "rust", "php", "ruby", "swift", "kotlin"
]

def extract_skills(text):
    text = text.lower()
    return [s for s in SKILLS_LIST if s in text]

def match_jobs(resume_text):
    if job_vecs is None or df.empty:
        return {
            "skills": [],
            "missing_skills": [],
            "recommended_jobs": [],
            "error": "Job database not loaded correctly. Please check server logs."
        }

    try:
        # Only transform the resume text
        resume_vec = vectorizer.transform([resume_text])

        # Calculate similarities against pre-calculated vectors
        similarities = cosine_similarity(resume_vec, job_vecs)[0]

        # Get top 5 matches
        top_indices = np.argsort(similarities)[-5:][::-1]
        
        results = []
        resume_skills = set(extract_skills(resume_text))

        for idx in top_indices:
            row = df.iloc[idx]
            sim_score = similarities[idx]
            
            # ML model prediction
            # Calculate skill overlap ratio
            job_skills = set(extract_skills(row["text"]))
            matched = list(resume_skills & job_skills)
            missing = list(job_skills - resume_skills)
            
            skill_score = len(matched) / len(job_skills) if job_skills else sim_score

            # Combined score: 60% text similarity, 40% skill match
            combined_score = (sim_score * 0.6) + (skill_score * 0.4)
            
            # ML adjustment if model exists
            try:
                ml_prob = model.predict_proba([[combined_score]])[0][1]
                # Blend ML probability with raw score for stability
                final_score = (ml_prob * 0.5) + (combined_score * 0.5)
            except:
                final_score = combined_score

            results.append({
                "title": row["title"],
                "description": row["description"][:200] + "...",
                "score": round(float(final_score * 100), 2),
                "matched_skills": matched,
                "missing_skills": missing,
            })

        return {
            "skills": list(resume_skills),
            "missing_skills": results[0]["missing_skills"] if results else [],
            "recommended_jobs": results
        }
    except Exception as e:
        logger.error(f"Error in match_jobs: {e}")
        return {"error": str(e)}
