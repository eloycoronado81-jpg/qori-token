import { createContext, useEffect, useState } from "react";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("qori_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function login(email: string, password: string) {
    if (email && password.length >= 6) {
      const loggedUser = { email };

      setUser(loggedUser);

      localStorage.setItem(
        "qori_user",
        JSON.stringify(loggedUser)
      );

      return true;
    }

    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("qori_user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}