// import multer from "multer";

// const upload = multer({dest:"uploads/"});
// export default upload;

// server/utils/multer.js
import multer from "multer";
import fs from "fs";
import path from "path";

// Vercel sets process.env.VERCEL.
// We'll use /tmp on Vercel (writable) and "uploads" locally.
const isProd = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

const uploadDir = isProd ? "/tmp/uploads" : "uploads";

// Make sure the folder exists
if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
  } catch (err) {
    console.error("Failed to create upload directory:", err);
  }
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

export default upload;
