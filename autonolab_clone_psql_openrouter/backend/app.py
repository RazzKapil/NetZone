from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import openai, os, json, uuid
from config import OPENAI_API_KEY
from auth import users

app = Flask(__name__)
CORS(app)

# Authentication endpoint (mock)
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    if users.get(email) == password:
        return jsonify({"status": "success", "token": "mock-token"})
    return jsonify({"status": "error", "message": "Invalid credentials"}), 401

@app.route("/api/generate", methods=["POST"])
def generate_app():
    data = request.json
    tool_type = data.get("tool_type")
    prompt = data.get("prompt")

    # Call GPT-4 or OpenRouter
    openai.api_key = OPENAI_API_KEY
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Generate embeddable HTML/JS code based on user tool type and prompt."},
            {"role": "user", "content": f"Tool: {tool_type}. Prompt: {prompt}"}
        ]
    )
    generated_code = response.choices[0].message.content

    # Save to file
    file_id = str(uuid.uuid4())
    save_path = f"./saved_apps/{file_id}.html"
    with open(save_path, "w") as f:
        f.write(generated_code)

    return jsonify({"code": generated_code, "file_id": file_id})

@app.route("/api/export/<file_id>", methods=["GET"])
def export_app(file_id):
    file_path = f"./saved_apps/{file_id}.html"
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    return jsonify({"error": "File not found"}), 404

if __name__ == "__main__":
    os.makedirs("saved_apps", exist_ok=True)
    app.run(debug=True, host="0.0.0.0")
