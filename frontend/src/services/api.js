import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const uploadResume = (file) => {
  const form = new FormData();
  form.append("file", file);

  return API.post("/upload-resume", form);
};