import axios from 'axios';

const client = axios.create({
  baseURL: 'https://example.com/api',
  timeout: 5000,
});

const getErrorMessage = error => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.message) {
    return error.message;
  }

  return 'Unexpected error occurred while authenticating.';
};

export const authenticateUser = async ({username, password}) => {
  try {
    const response = await client.get('/login', {
      params: {
        username,
        password,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export default {
  authenticateUser,
};
