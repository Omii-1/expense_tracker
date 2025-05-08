import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"

import { authActions } from "../store/auth"
import { handleZodErrors } from "../utils/handleZodErrors";

function SignInUp({ name }) {
  const isSignup = name === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${name}`, values, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      toast.success(res.data.message)
      console.log(res.data.message);
      
      dispatch(authActions.login())
      setLoading(false)
      setValues({ fullname: "", email: "", password: "" });
      navigate("/")
    } catch (error) {
      console.log(error);
      
      handleZodErrors(error)
    } finally {
      setLoading(false)
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    console.log(values);
  };

  return (
    <div className="h-[83vh] flex items-center justify-center">
      <div className="bg-base-100 p-4 w-[300px] rounded-md flex flex-col items-center gap-3 shadow-sm">
        <h1 className="font-bold text-3xl">
          {isSignup ? "Sign Up" : "Log in"}
        </h1>
        <form className="flex w-full flex-col gap-0" onSubmit={handleSubmit}>
          {isSignup && (
            <fieldset class="fieldset ">
              <legend class="fieldset-legend text-lg">Full Name</legend>
              <input
                type="text"
                value={values.fullname}
                onChange={handleChange}
                name="fullname"
                class="input w-full"
                required
              />
            </fieldset>
          )}
          <fieldset class="fieldset ">
            <legend class="fieldset-legend text-lg">Email</legend>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              class="input w-full"
              required
            />
          </fieldset>

          <fieldset class="fieldset ">
            <legend class="fieldset-legend text-lg">Password</legend>
            <div className="flex input">
              <input
                type={showPassword ? "text" : "password"}
                class=" w-full border-0"
                value={values.password}
                onChange={handleChange}
                name="password"
                required
              />
              {showPassword ? (
                <LuEye
                  size={20}
                  className="cursor-pointer"
                  onClick={handleShowPassword}
                />
              ) : (
                <LuEyeClosed
                  size={20}
                  className="cursor-pointer"
                  onClick={handleShowPassword}
                />
              )}
            </div>
          </fieldset>

          {isSignup ? (
            <p class="label mt-2">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary">
                Log in
              </Link>
            </p>
          ) : (
            <p class="label mt-2">
              Create an account or{" "}
              <Link to="/signup" className="text-primary">
                Sign up
              </Link>
            </p>
          )}

          <fieldset className="fieldset mt-3">
            <button class="btn btn-soft text-lg " type="Submit">
              {
                loading ? (
                  <span class="loading loading-spinner loading-xs"></span>
                ) : isSignup ? "Sign Up" : "Login"
              }
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default SignInUp;
