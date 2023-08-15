import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

export const storage = multer.diskStorage({
  destination: join(CURRENT_DIR, "../../uploads"),
  filename: (req, file, cb) => {  
    const fileExtension = extname(file.originalname);
    const fileName = file.originalname.split(fileExtension)[0];

    cb(null, `${fileName}-${Date.now()}${fileExtension}`);
  },
});

export const upload = multer({
  storage: storage,
});
