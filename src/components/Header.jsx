import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user, loading]);
  function logoutHandler() {
    try {
      signOut(auth)
        .then(() => {
          toast.success("logged out Successfully");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <div className="stickey top-0 left-0">
      <div className="w-full bg-blue-500 px-2 py-2 text-2xl text-white flex justify-between">
        <h1>Fincancly.</h1>
        {user && (
          <p className="text-lg" onClick={logoutHandler}>
            Logout
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
