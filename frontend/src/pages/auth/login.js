import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../../components/dialog";
import Modal from "../../components/modal";
import logo from "../../images/logo.png";
import { login, resetLogin } from "../../store/auth/actions";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.login);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };


  useEffect(()=>{
    if (data && data.user.role === "admin") {
      return navigate("/admin/coaches");
    }
    return ()=> dispatch(resetLogin())
  },[data])


  return (
    <div className="flex justify-center mt-16">
      <Modal open={error}>
        <Dialog
          severity="failure"
          message="authentication failed !"
          close={() => dispatch(resetLogin())}
        />
      </Modal>
      <Modal open={loading}>
        <div className=" h-1/2 w-screen absolute flex flex-col items-center justify-center mt-32">
          <PulseLoader color="blue" />
        </div>
      </Modal>
      <div className="flex flex-col justify-center">
        <form className="space-y-2 ml-8 py-8 px-16 border rounded-3xl shadow-md " onSubmit={onSubmitHandler}>
          <img src={logo} className="h-40 w-40 ml-16 mb-10" />
          <div className="flex flex-col space-y-1 mb-5">
            <label className="pl-2">Username</label>
            <div className="flex space-x-2 border rounded-lg items-center p-3 mr-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="outline-none pl-4 pr-6"
                placeholder="enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="pl-2 mt-3">Password</label>
            <div className="flex space-x-2 border rounded-lg items-center p-3">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <input
                type="password"
                className="outline-none pl-4 pr-6"
                placeholder="enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
          <button className="bg-blue-900 hover:bg-violet-600 rounded-md px-6 py-2 mt-4 ml-4 text-blue-50">login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
