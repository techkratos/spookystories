from fastapi import FastAPI
from pydantic import BaseModel

import numpy as np
import pandas as pd

from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import nltk
import re
import pickle

class Story(BaseModel):
    story: str

app = FastAPI()

def text_process(df):

    nltk.download("stopwords")
    stemmer = PorterStemmer()
    words = stopwords.words("english")
    df['cleaned_story'] = df['story'].apply(lambda x: " ".join([stemmer.stem(i) for i in re.sub("[^a-zA-Z]", " ", x).split() if i not in words]).lower())
    return df

def predict(story):
    with open("./models/classifier.pickle","rb") as f:
        classifier_model = pickle.load(f);
    with open("./models/regressor.pickle","rb") as f:
        regressor_model = pickle.load(f)

    prediction_df = pd.DataFrame([[story,0,0]],columns = ["story","classs","score"])
    prediction_df = text_process(prediction_df)
    classifier_prediction = classifier_model.predict(prediction_df["cleaned_story"])
    regressor_prediction  = regressor_model.predict(prediction_df["cleaned_story"])
    return classifier_prediction[0],regressor_prediction[0]

@app.get("/")
async def home():
    return {"message" : "welcome to model api"}


@app.post("/api/predictstory")
async def get_classification(story : Story):
    story_type,story_score = predict(story)
    return {"story_type":int(story_type),"story_score":float(story_score)}
