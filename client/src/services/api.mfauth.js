import { api } from "./api.js";

export const setup2Fa = async () => {
  return await api.post(
    "/auth/mfa/setup",
    {},
    {
      withCredentials: true,
    }
  );
};

export const verify2Fa = async (token) => {
  return await api.post(
    "/auth/mfa/verify",
    { token },
    {
      withCredentials: true,
    }
  );
};

export const reset2Fa = async () => {
  return await api.post(
    "/auth/mfa/reset",
    {},
    {
      withCredentials: true,
    }
  );
};
