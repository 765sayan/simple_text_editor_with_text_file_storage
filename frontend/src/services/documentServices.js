import {
  GET_ALL_FILES_URL,
  READ_DOCUMENT_FILE_URL,
  SEND_DOCUMENT_DATA_URL,
  UPDATE_FILE_URL,
  DELETE_FILES_URL,
  DOWNLOAD_DOCUMENT_FILE_URL,
} from "../apiUrls/documentApiUrls";

export const getAllFiles = async (token) => {
  const options = {
    method: "GET",

    headers: {
      authorization: token,
    },
  };

  try {
    let res = await fetch(GET_ALL_FILES_URL, options);
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const sendTextDataToBackend = async (filename, textdata, token) => {
  const jsonString = {
    fileName: filename,
    textData: textdata,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(jsonString),
  };
  try {
    let res = await fetch(SEND_DOCUMENT_DATA_URL, options);
    res = await res.json();
    return res;
  } catch (err) {
    return "No Connection To Server";
  }
};

export const readFile = async (filename, token) => {
  const options = {
    method: "GET",
    headers: {
      authorization: token,
    },
  };

  try {
    let res = await fetch(
      `${READ_DOCUMENT_FILE_URL}?filename=${filename}`,
      options
    );
    res = await res.json();
    return res;
  } catch (err) {
    return "No Connection To Server";
  }
};

export const updateFileData = async (filename, textdata, token) => {
  const data = {
    filename: filename,
    textdata: textdata,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  };

  try {
    let res = await fetch(UPDATE_FILE_URL, options);
    res = await res.json();
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteFilesFs = async (fileList, token) => {
  const data = {
    list: fileList,
  };

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  };

  try {
    let res = await fetch(DELETE_FILES_URL, options);
    res = await res.json();
    return res;
  } catch (err) {
    return err;
  }
};

export const downloadFileService = async (filename, token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  };
  try {
    let res = await fetch(
      `${DOWNLOAD_DOCUMENT_FILE_URL}?filename=${filename}`,
      options
    );
    res = await res.json();
    return res;
  } catch (err) {
    return err;
  }
};
