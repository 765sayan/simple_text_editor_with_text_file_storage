import { API_V1, DOMAIN_NAME } from "./domainUrls";

export const SEND_DOCUMENT_DATA_URL = `${DOMAIN_NAME}${API_V1}/document/file`;
export const DOWNLOAD_DOCUMENT_FILE_URL = `${DOMAIN_NAME}${API_V1}/document/file/download`;
export const READ_DOCUMENT_FILE_URL = `${DOMAIN_NAME}${API_V1}/document/file/read`;
export const GET_ALL_FILES_URL = `${DOMAIN_NAME}${API_V1}/fs/all`;
export const UPDATE_FILE_URL = `${DOMAIN_NAME}${API_V1}/document/file`;
export const DELETE_FILES_URL = `${DOMAIN_NAME}${API_V1}/fs`;
