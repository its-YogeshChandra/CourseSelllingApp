import { nanoid } from "@reduxjs/toolkit";

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

export { modifiedObject };
