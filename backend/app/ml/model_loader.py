import pickle

with open("app/ml/model.pkl", "rb") as f:
    model = pickle.load(f)

with open("app/ml/vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)