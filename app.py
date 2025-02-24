from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF

app = Flask(__name__)
CORS(app)


@app.route("/extract-text", methods=["GET"])
def extract_text():
    pdf_filename = request.args.get("pdf")  # Get the PDF file name from request

    if not pdf_filename:
        return jsonify({"error": "No PDF file provided"}), 400

    try:
        with fitz.open(pdf_filename) as pdf:
            text = ""
            for page in pdf:
                text += page.get_text("text") + "\n"

        return jsonify({"text": text})  # Send extracted text as JSON

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
