from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer(stop_words="english")

def vectorize(texts):
    return vectorizer.fit_transform(texts)