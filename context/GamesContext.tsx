import { createContext, ReactNode } from "react";

interface IGamesContextProviderProps {
  children: ReactNode;
}

interface IGamesContextData {}

export const GamesContext = createContext({});
export const GamesStorage = ({ children }: IGamesContextProviderProps) => {
  return <GamesContext.Provider value={{}}>{children}</GamesContext.Provider>;
};
