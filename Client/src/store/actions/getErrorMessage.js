const getErrorMessage = (error, fallback = "Something went wrong") => {
  return error.normalizedMessage || error.response?.data?.message || error.message || fallback;
};

export default getErrorMessage;
