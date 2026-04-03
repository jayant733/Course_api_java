export interface SessionPayload {
  userId: number;
  accessToken: string;
  refreshToken: string;
  email: string;
  role: string;
}

const KEYS = {
  userId: "userId",
  accessToken: "token",
  refreshToken: "refreshToken",
  email: "userEmail",
  role: "role",
} as const;

export function saveSession(session: SessionPayload) {
  localStorage.setItem(KEYS.userId, String(session.userId));
  localStorage.setItem(KEYS.accessToken, session.accessToken);
  localStorage.setItem(KEYS.refreshToken, session.refreshToken);
  localStorage.setItem(KEYS.email, session.email);
  localStorage.setItem(KEYS.role, session.role);
}

export function clearSession() {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}

export function getSession() {
  const token = localStorage.getItem(KEYS.accessToken);
  const refreshToken = localStorage.getItem(KEYS.refreshToken);
  const userId = localStorage.getItem(KEYS.userId);
  const email = localStorage.getItem(KEYS.email);
  const role = localStorage.getItem(KEYS.role);

  return {
    token,
    refreshToken,
    userId: userId ? Number(userId) : null,
    email,
    role,
    isAuthenticated: Boolean(token),
    isAdmin: role === "ROLE_ADMIN",
  };
}
