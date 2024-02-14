from fastapi import FastAPI
from typing import Optional
import requests
import json

app = FastAPI()

def request_completion(prompt, max_tokens=50):
    url = "https://your_gpt_api_endpoint.com/completion"  # Replace this with your API endpoint
    headers = {
        "Content-Type": "application/json",
        "application-name": application_name,
        "key-name": key_name,
        "key-value": key_value
    }
    data = {
        "prompt": prompt,
        "max_tokens": max_tokens
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return json.loads(response.text)
    else:
        print("Error:", response.text)
        return None

def read_github_file(repo_url, file_path):
    raw_url = repo_url.replace("github.com", "raw.githubusercontent.com") + "/main/" + file_path
    response = requests.get(raw_url)
    if response.status_code == 200:
        return response.text
    else:
        print("Error:", response.text)
        return None

@app.get("/generate-summary/")
async def generate_summary(repo_url: str, file_path: str):
    # Read file from GitHub repository
    file_content = read_github_file(repo_url, file_path)
    if file_content:
        prompt = "Please summarize the contents of the file:\n" + file_content
        completion = request_completion(prompt)
        if completion:
            return {"summary": completion["choices"][0]["text"].strip()}
    return {"error": "Failed to generate summary"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
