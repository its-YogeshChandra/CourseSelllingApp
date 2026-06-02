import { nanoid } from "@reduxjs/toolkit";
import { FFmpeg } from '@ffmpeg/ffmpeg';

const modifiedObject = (obj, keyfromobjects) => {
  const newobj = { ...obj };
  keyfromobjects.forEach((key) => {
    if (Array.isArray(newobj[key])) {
      newobj[key] = newobj[key].map((e) => ({
        id: nanoid(),
        files: e,
      }));
    }
  });

  return newobj;
};

//extract the uploaded files from the form and run ffmpeg wasm 
const uploadFiles = (files) => {
  const formData = new FormData();

  

   

  return axios
    .post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export { modifiedObject, uploadFiles };
