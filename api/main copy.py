from fastapi import FastAPI, HTTPException
from fastapi.openapi.utils import get_openapi
from fastapi.openapi.docs import get_swagger_ui_html
from typing import Optional
import requests
import json

app = FastAPI()

def request_completion(prompt, max_tokens=50):
    url = "https://your_gpt_api_endpoint.com/completion"  # Replace this with your API endpoint
    headers = {
        "Content-Type": "application/json",
        "application-name": "your_application_name",
        "key-name": "your_key_name",
        "key-value": "your_key_value"
    }
    data = {
        "prompt": prompt,
        "max_tokens": max_tokens
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return json.loads(response.text)
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to generate completion")

# Enable Swagger UI
@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    openapi_schema = get_openapi(
        title="Your API Title",
        version="1.0.0",
        description="Your API Description",
        routes=app.routes,
    )
    return get_swagger_ui_html(openapi_url="/openapi.json", title="API Docs", redoc_url=None, swagger_js_url="/static/swagger-ui-bundle.js", swagger_css_url="/static/swagger-ui.css")

@app.get("/openapi.json", include_in_schema=False)
async def get_open_api_endpoint():
    return app.openapi()

@app.get("/generate-summary/")
async def generate_summary(repo_url: str, file_path: str):
    file_content = read_github_file(repo_url, file_path)
    if file_content:
        prompt = "Please summarize the contents of the file:\n" + file_content
        completion = request_completion(prompt)
        if completion:
            return {"summary": completion["choices"][0]["text"].strip()}
    raise HTTPException(status_code=404, detail="Failed to generate summary")

def read_github_file(repo_url, file_path):
    raw_url = repo_url.replace("github.com", "raw.githubusercontent.com") + "/main/" + file_path
    response = requests.get(raw_url)
    if response.status_code == 200:
        return response.text
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to read file from GitHub repository")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
