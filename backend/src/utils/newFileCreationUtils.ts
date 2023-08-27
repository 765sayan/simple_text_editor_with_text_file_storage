import { FileDbImplementation } from "../implementations/dbImplementation";

export async function createNewFileIfFileAlreadyExists(
  fileName: string,
  textData: string,
  creator: string,
  fileModelCrudInstance: FileDbImplementation,
  additionToFilename: number
): Promise<any> {
  let fileNameWithoutExtension = fileName.split(".")[0];
  let extension = fileName.split(".")[1];
  fileNameWithoutExtension = `${fileNameWithoutExtension} ${additionToFilename}`;
  const fileNameMergedExtension = `${fileNameWithoutExtension}.${extension}`;
  const res = await fileModelCrudInstance.createFile(
    fileNameMergedExtension,
    textData,
    creator
  );
  if (res !== "File Already Exists") {
    return res;
  } else {
    return await createNewFileIfFileAlreadyExists(
      fileName,
      textData,
      creator,
      fileModelCrudInstance,
      additionToFilename + 1
    );
  }
}
