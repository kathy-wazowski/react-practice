interface LoginAction {
  type: "LOGIN";
  userName: string;
}
interface LogoutAction {
  type: "LOGOUT";
}
export type AuthAction = LoginAction | LogoutAction;
const loginReducer = (user: string, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return action.userName;
    case "LOGOUT":
      return "";
      return user;
  }
};

export default loginReducer;
