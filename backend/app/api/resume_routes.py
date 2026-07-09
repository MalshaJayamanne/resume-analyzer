from fastapi import APIRouter, UploadFile, File
from app.services.resume_parser import extract_text_from_pdf
from app.services.job_matcher import match_jobs

router = APIRouter()

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    
    # Extract text
    resume_text = await extract_text_from_pdf(file)

    if not resume_text:
        return {"error": "Could not extract text from the provided PDF."}

    # Match jobs
    results = match_jobs(resume_text)

    return results