import fs from "fs";

export const createFile = (textData: string, fileName: string) => {
  fs.writeFileSync(`${process.env.FILE_PATH}/${fileName}`, textData);
};

export const removeFile = (filename: string) => {
  fs.unlinkSync(`${process.env.FILE_PATH}/${filename}`);
};

export const readFile = (filename: string) => {
  return fs.readFileSync(`${process.env.FILE_PATH}/${filename}`, "utf-8");
};
