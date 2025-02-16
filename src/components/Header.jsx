import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userIcon from "../assets/usericon.jpeg";

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
      <div className="w-full bg-blue-500 px-5 py-2 text-2xl text-white flex justify-between">
        <h1>Fincancly.</h1>
        {user && (
          <div className="flex gap-2 justify-center items-center">
            <img
              src={user.photoURL ? user.photoURL : userIcon}
              className="w-8 h-8 rounded-full"></img>
            <p
              className=" tracking-wide text-sm cursor-pointer font-semibold hover:text-blue-800 px-1.5 duration-100 rounded-lg"
              onClick={logoutHandler}>
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
