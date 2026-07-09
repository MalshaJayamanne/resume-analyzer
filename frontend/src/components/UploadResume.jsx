import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react";
import Button from "./ui/Button";
import { useState, useCallback } from "react";
import { uploadResume } from "../services/api";

export default function UploadResume({ setResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Please upload a valid PDF file.");
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const res = await uploadResume(file);
      if (res.data.error) {
        setError(res.data.error);
      } else {
        setResult(res.data);
      }
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative glass-card rounded-[2rem] p-12 text-center transition-all duration-500 ${
          isDragging 
            ? "ring-4 ring-blue-500/20 border-blue-500/50 scale-[1.01]" 
            : "hover:border-blue-200"
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        layout
      >
        <div className="flex flex-col items-center gap-8">
          <motion.div 
            animate={{ 
              y: isDragging ? -10 : 0,
              scale: isDragging ? 1.1 : 1
            }}
            className="w-24 h-24 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner"
          >
            {file ? <FileText size={48} /> : <Upload size={48} />}
          </motion.div>

          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {file ? file.name : "Upload your Resume"}
            </h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              {file 
                ? `${(file.size / 1024 / 1024).toFixed(2)} MB • Ready to be analyzed by AI`
                : "Experience the power of AI analysis. Drag and drop your PDF here."}
            </p>
          </div>

          {!file && (
            <label className="premium-button cursor-pointer flex items-center gap-2 px-8 py-4 text-lg">
              <Upload size={20} />
              Choose PDF File
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </label>
          )}

          {file && (
            <div className="flex gap-4">
              <Button 
                onClick={handleUpload} 
                loading={loading}
                className="min-w-[200px]"
              >
                Analyze with AI
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setFile(null)}
                disabled={loading}
                className="p-4 rounded-xl"
              >
                <X size={20} />
              </Button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-8 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 flex items-center gap-3 justify-center"
            >
              <AlertCircle size={20} />
              <span className="text-sm font-semibold">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <p className="mt-8 text-center text-gray-400 text-sm">
        Supported format: PDF (Max 10MB)
      </p>
    </div>
  );
}
