import fitz  # PyMuPDF
import logging

logger = logging.getLogger(__name__)

async def extract_text_from_pdf(file):
    try:
        contents = await file.read()
        doc = fitz.open(stream=contents, filetype="pdf")

        text = ""
        for page in doc:
            text += page.get_text()

        return text.lower()
    except Exception as e:
        logger.error(f"Error extracting text from PDF: {e}")
        return ""