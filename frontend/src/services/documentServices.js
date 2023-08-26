import {
  GET_ALL_FILES_URL,
  READ_DOCUMENT_FILE_URL,
  SEND_DOCUMENT_DATA_URL,
  UPDATE_FILE_URL,
  DELETE_FILES_URL,
  DOWNLOAD_DOCUMENT_FILE_URL,
  SHARE_DOCUMENT_URL,
  GET_ALL_SHARED_FILES_URL,
  DELETE_SECOND_OWNER_URL,
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
    return err;
  }
};

export const getAllSharedFiles = async (token) => {
  const options = {
    method: "GET",

    headers: {
      authorization: token,
    },
  };

  try {
    let res = await fetch(GET_ALL_SHARED_FILES_URL, options);
    res = await res.json();
    return res;
  } catch (err) {
    return err;
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

export const deleteSecondOwnerService = async (
  secondaryOwner,
  token,
  filename
) => {
  const options = {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  };

  try {
    let res = await fetch(
      `${DELETE_SECOND_OWNER_URL}?secondaryowner=${secondaryOwner}&filename=${filename}`,
      options
    );
    res = await res.json();
    if (res) {
      if (res.list) {
        return res;
      } else {
        return res;
      }
    }
  } catch (err) {
    return err;
  }
};

export const shareDocumentService = async (filename, token, username) => {
  const data = {
    filename: filename,
    username: username,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  };

  try {
    let res = await fetch(SHARE_DOCUMENT_URL, options);
    res = await res.json();
    if (res && res.msg) {
      return res.msg;
    }
  } catch (err) {
    return err;
  }
};

export const getShareDocumentService = async (filename, token) => {
  const options = {
    method: "GET",
    headers: {
      authorization: token,
    },
  };

  try {
    let res = await fetch(
      `${SHARE_DOCUMENT_URL}?filename=${filename}`,
      options
    );
    res = await res.json();
    if (res.list) {
      return res.list;
    }
  } catch (err) {
    return err;
  }
};
