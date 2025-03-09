import React, { useState } from "react";
import SentimentChart from "./SentimentChart";

const SentimentAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [sentimentData, setSentimentData] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const analyzeFile = async () => {
        if (!file) return alert("Please select a file!");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8000/analyze-csv", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to analyze file");

            const data = await response.json();
            setSentimentData(data.sentiments); // Data format: [{sentiment: "Positive", count: 20}, {...}]
        } catch (error) {
            console.error("Error analyzing file:", error);
        }
    };

    return (
        <div>
            <h2>Upload CSV for Sentiment Analysis</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={analyzeFile}>Analyze</button>

            {sentimentData.length > 0 && <SentimentChart data={sentimentData} />}
        </div>
    );
};

export default SentimentAnalyzer;
