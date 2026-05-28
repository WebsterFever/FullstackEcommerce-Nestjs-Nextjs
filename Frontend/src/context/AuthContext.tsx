'use client'

import { useContext, createContext, useEffect, useState } from 'react';

export interface IUserSession{
    token: string;
    user:{
        id: number;
        email: string;
        name: string;
        address: string;
        phone: string;
    }
}

export interface IAuthContextProps{
    userData: IUserSession | null;
    setUserData: (values : IUserSession | null) => void
}

export const AuthContext = createContext <IAuthContextProps>({
  userData: null,
  setUserData: () => {}
});

export interface IAuthProviderProps{
    children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);

  // NI BIEN ME LOGUEO, GUARDO EN LOCALSTORAGE LA INFORMACION DEL USUARIO
  useEffect(() => {
    if (userData) {
      localStorage.setItem(
        "userSession",
        JSON.stringify({
          user: userData.user,
          token: userData.token
        })
      );
    }
  }, [userData]);

  // CADA F5, TENGO QUE IR A TRAERME DEL LOCALSTORAGE LA INFORMACION DEL USUARIO Y GUARDARLA EN EL CONTEXTO DE NUEVO
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userSession")!);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserData(userData);
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)