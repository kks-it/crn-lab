import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, signupUser } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const stored = localStorage.getItem("crnLabAuth");
    return stored ? JSON.parse(stored) : { token: "", user: null };
  });
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(authState.token));

  useEffect(() => {
    if (!authState.token) {
      setIsBootstrapping(false);
      return;
    }

    let ignore = false;

    async function bootstrapUser() {
      try {
        const user = await getCurrentUser();
        if (!ignore) {
          const nextState = { token: authState.token, user };
          setAuthState(nextState);
          localStorage.setItem("crnLabAuth", JSON.stringify(nextState));
        }
      } catch (error) {
        if (!ignore) {
          setAuthState({ token: "", user: null });
          localStorage.removeItem("crnLabAuth");
        }
      } finally {
        if (!ignore) {
          setIsBootstrapping(false);
        }
      }
    }

    bootstrapUser();

    return () => {
      ignore = true;
    };
  }, [authState.token]);

  async function signup(payload) {
    const data = await signupUser(payload);
    const nextState = {
      token: data.token,
      user: {
        userId: data.userId,
        fullName: data.fullName,
        email: data.email,
        role: data.role,
      },
    };
    setAuthState(nextState);
    localStorage.setItem("crnLabAuth", JSON.stringify(nextState));
    return data;
  }

  async function login(payload) {
    const data = await loginUser(payload);
    const nextState = {
      token: data.token,
      user: {
        userId: data.userId,
        fullName: data.fullName,
        email: data.email,
        role: data.role,
      },
    };
    setAuthState(nextState);
    localStorage.setItem("crnLabAuth", JSON.stringify(nextState));
    return data;
  }

  function logout() {
    setAuthState({ token: "", user: null });
    localStorage.removeItem("crnLabAuth");
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        isAuthenticated: Boolean(authState.token),
        isBootstrapping,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
