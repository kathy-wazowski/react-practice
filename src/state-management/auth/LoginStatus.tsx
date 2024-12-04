import { useContext } from "react";
import AuthContext from "./authContext";

const useAuth = () => useContext(AuthContext);
const LoginStatus = () => {
  const { user, dispatch } = useAuth();

  if (user)
    return (
      <>
        <div>
          <span className="mx-2">{user}</span>
          <a onClick={() => dispatch({ type: "LOGOUT" })} href="#">
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div>
      <a
        onClick={() => dispatch({ type: "LOGIN", userName: "Kathy.wazowski" })}
        href="#"
      >
        Login
      </a>
    </div>
  );
};

export default LoginStatus;
export { useAuth };
