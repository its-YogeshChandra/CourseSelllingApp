import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage});

const uploadMiddleware = upload.fields([
  {
    name: "thumbnail",
    maxCount: 1,
  },
  {
    name: "videos",
    maxCount: 10,
  },
  {
    name: "images",
    maxCount: 10,
  },
  {
    name: "notes",
    maxCount: 10,
  },
]);

export { uploadMiddleware };
