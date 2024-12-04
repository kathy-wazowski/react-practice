import { useContext } from "react";
import AuthContext from "./authContext";
import useUserStore from "./store";

const useAuth = () => useContext(AuthContext);
const LoginStatus = () => {
  // const { user, dispatch } = useAuth();
  const { user, logIn, logOut } = useUserStore();

  if (user)
    return (
      <>
        <div>
          <span className="mx-2">{user}</span>
          <a onClick={logOut} href="#">
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div>
      <a onClick={() => logIn("Kathy.wazowski")} href="#">
        Login
      </a>
    </div>
  );
};

export default LoginStatus;
export { useAuth };
