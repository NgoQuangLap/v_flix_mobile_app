import {apiClient} from './config';

export const loginUser = async (payload) => {
  const res = await apiClient.post('user/auth', payload);
  return res;
};

export const logoutUser = async () => {
  const res = await apiClient.get('user/deleteCookie');
  return res;
};

export const registerUser = async (payload) => {
  const res = await apiClient.post('user/register', payload);
  return res;
};
