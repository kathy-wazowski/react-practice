interface LoginAction {
  type: "LOGIN";
  userName: string;
}
interface LogoutAction {
  type: "LOGOUT";
}
type Action = LoginAction | LogoutAction;
const loginReducer = (user: string, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return action.userName;
    case "LOGOUT":
      return "";
  }
};

export default loginReducer;
