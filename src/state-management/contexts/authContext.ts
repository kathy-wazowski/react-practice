import React from "react";
import { Dispatch } from "react";
import { AuthAction } from "../reducers/loginReducer";

interface AuthContextType {
  user: string;
  dispatch: Dispatch<AuthAction>; //这里之前没写对，写成string了，
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
export default AuthContext;
