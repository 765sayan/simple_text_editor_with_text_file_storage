export const DOMAIN_NAME =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "";

export const API_V1 = "/api/v1";
