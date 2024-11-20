const getApiUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:5000";
  } else {
    return "https://api.minhaempresa.com";
  }
};

const getApiVersion = () => {
  return process.env.NODE_ENV === "development" ? "v1" : "v2"; // Versão de desenvolvimento e produção
};

export const apiConfig = {
  url: getApiUrl(),
  version: getApiVersion(),
};
