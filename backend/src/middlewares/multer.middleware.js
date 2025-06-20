import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadMiddleware = upload.fields([
  {
    name: "thumbnail",
    maxCount: 1,
  
  },
  {
    name: "videos",
    maxCount: 4,
  },
  {
    name: "images",
    maxCount: 4,
  },
  {
    name: "notes",
    maxCount: 3,
  },
]);

export { uploadMiddleware };
