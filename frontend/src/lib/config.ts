const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL;
};

export const apiConfig = {
  url: getApiUrl(),
};
