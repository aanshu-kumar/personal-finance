import { useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, setDoc, db, doc,provider } from "../firebase";
import { getDoc } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const Login = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [userLogin, setUserLogin] = useState(false);
  const navigate = useNavigate();
  function signupWithEmail() {
    if (fullName === "" || email === "" || password === "" || confirm === "") {
      toast.error("All fields are mandatory");
      return; // Stop execution if validation fails
    } else if (password !== confirm) {
      toast.error("Passwords donot match");
      return;
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          createUserDoc(user);
          toast.success("User Created Successfully");
          setLoading(false);
          setTimeout(() => {
            setEmail("");
            setFullName("");
            setPassword("");
            setConfirm("");
          }, 500);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    }
  }
  async function createUserDoc(user) {
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "user", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "user", user.uid), {
          name: user.displayName ? user.displayName : "",
          email:user.email,
          photoUrl: user.photoUrl ? user.photoUrl : "",
          createdAt: new Date(),
        });
        toast.success("doc created");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      console.log("doc already exist");
      setLoading(false);
    }
  }
  function signupWithGmail() {
    try{
      setLoading(true);
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // eslint-disable-next-line no-unused-vars
        const token = credential.accessToken;
        const user = result.user;
        console.log(user)
        createUserDoc(user)
        navigate("/dashboard")
        toast.success("User Created success")
        setLoading(false);
      }).catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false)
      });

    }catch(e){
      console.log(e.message)
    }

  }
  return (
    <div className="w-full h-[80vh] flex justify-center items-center mx-auto">
      {userLogin == true ? (
        <UserLoginComponent
          setUserLogin={setUserLogin}
          signupWithGmail={signupWithGmail}
        />
      ) : (
        <div className="p-5 w-1/3 border-2 border-gray-100 rounded-lg shadow-sm shadow-gray-300">
          <p className=" text-center my-4 text-xl font-semibold">
            SignUp on <span className="text-blue-500">Financly.</span>
          </p>
          <div>
            <Input
              label={"Full Name"}
              type={"text"}
              placeholder={"Jhon"}
              setState={setFullName}
              state={fullName}
            />
            <Input
              label={"Email"}
              type={"email"}
              placeholder={"Jhon@doe.com"}
              setState={setEmail}
              state={email}
            />
            <Input
              label={"Password"}
              type={"password"}
              placeholder={"password"}
              setState={setPassword}
              state={password}
            />
            <Input
              label={"Confirm Password"}
              type={"text"}
              placeholder={"Confirm password"}
              setState={setConfirm}
              state={confirm}
            />
          </div>
          <button
            className="border-2 border-blue-500 py-2 w-full text-blue-500 hover:text-white hover:bg-blue-500 cursor-pointer"
            onClick={signupWithEmail}>
            {" "}
            {loading ? "Loading..." : "Sign up with Email and Password"}
          </button>
          <p className="text-center my-1">or</p>
          <button
            onClick={signupWithGmail}
            className=" bg-blue-500 py-2 hover:text-blue-500 hover:bg-white w-full text-white cursor-pointer">
            {" "}
            Sign up with Google
          </button>
          <p className="text-center my-2 text-sm">
            Or have an Account already?{" "}
            <span
              className=" cursor-pointer"
              onClick={() => setUserLogin(true)}>
              Click Here
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;

// eslint-disable-next-line react/prop-types
function UserLoginComponent({ setUserLogin, signupWithGmail }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  function loginwithEmail() {
    if (email === "" || password === "") {
      toast.error("All fields are mandatory");
      return; // Stop execution if validation fails
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("User Logged In Successfully");
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
  }

  return (
    <div className="p-5 w-1/3 border-2 border-gray-100 rounded-lg shadow-sm shadow-gray-300">
      <p className=" text-center my-4 text-xl font-semibold">
        Login to <span className="text-blue-500">Financly.</span>
      </p>
      <div>
        <Input
          label={"Email"}
          type={"email"}
          placeholder={"Jhon@doe.com"}
          setState={setEmail}
          state={email}
        />
        <Input
          label={"Password"}
          type={"password"}
          placeholder={"password"}
          setState={setPassword}
          state={password}
        />
      </div>
      <button
        className="border-2 border-blue-500 py-2 w-full text-blue-500 hover:text-white hover:bg-blue-500 cursor-pointer"
        onClick={loginwithEmail}>
        {" "}
        {loading ? "Loading..." : "Login with Email and Password"}
      </button>
      <p className="text-center my-1">or</p>
      <button
        onClick={signupWithGmail}
        className=" bg-blue-500 py-2 hover:text-blue-500 hover:bg-white w-full text-white cursor-pointer">
        {" "}
        Login with Google
      </button>
      <p className="text-center my-2 text-sm">
        Or Don&apos;t have an Account ?{" "}
        <span className=" cursor-pointer" onClick={() => setUserLogin(false)}>
          Click Here
        </span>
      </p>
    </div>
  );
}
