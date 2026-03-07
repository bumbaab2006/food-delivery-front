export const AUTH_TOKEN_KEY = "token";
export const AUTH_ROLE_KEY = "role";

export const decodeJwtPayload = (token) => {
  if (!token) {
    return null;
  }

  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (_error) {
    return null;
  }
};

export const getStoredToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getStoredRole = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(AUTH_ROLE_KEY);
};

export const getCurrentUserFromStorage = () => {
  const token = getStoredToken();
  return decodeJwtPayload(token);
};

export const setAuthSession = ({ token, role }) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_ROLE_KEY, role);
};

export const clearAuthSession = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_ROLE_KEY);
};
