from fastapi import FastAPI, File, UploadFile
import pandas as pd
import io
import random
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy function for sentiment analysis
def fake_sentiment_analysis(text):
    return random.choice(["Positive", "Negative", "Neutral"])

@app.post("/analyze-csv")
async def analyze_csv(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

    if "text" not in df.columns:
        return {"error": "CSV must contain a 'text' column"}

    df["sentiment"] = df["text"].apply(fake_sentiment_analysis)

    sentiment_counts = df["sentiment"].value_counts().reset_index()
    sentiment_counts.columns = ["sentiment", "count"]

    return {"sentiments": sentiment_counts.to_dict(orient="records")}
