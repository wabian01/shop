import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthProvider";
import { login } from "../services/authService"; // Import hàm login từ authService

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setIsAuthenticated, setUser, setRole } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await login(data.username, data.password); // Gọi hàm login từ authService
      if (res) {
        localStorage.setItem("token", res.token);
        const decoded = jwtDecode(res.token);
        setUser(decoded.username);
        setRole(decoded.role);
        setIsAuthenticated(true);
        document.getElementById("my_modal_3").close();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">Login</h3>

            <div className="mt-4 space-y-2">
              <span>User Name</span>
              <br />
              <input
                type="text"
                placeholder="Enter your username"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("username", { required: true })}
              />
              <br />
              {errors.username && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex justify-around mt-6">
              <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                Login
              </button>
              <p>
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Signup
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Login;