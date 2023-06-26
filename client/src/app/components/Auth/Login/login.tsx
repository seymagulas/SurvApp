"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { getUser, login } from "../../../../services/auth.service";
import Link from "next/link";
import { useNavigate } from "react-router-dom";
import axios from "axios";


interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<FormData>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const handleValidSubmit = async (data: FormData) => {
    setIsSubmitted(true);
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });
      if (response) {
        await getUser();
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
    setIsSubmitted(false);
  };

  return (
    <div className="authContainer">
      <div className="leftImageContainer">
        {/* <Image
        // height=""
        // width=""
          src=""
          alt="left-image"
          className="leftImage"
        /> */}
      </div>
      <div className="authForm">
        <h1 className="title">
          
          
        </h1>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <div className="formInput">
            <label htmlFor="email" className="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")} 
            />
          </div>
          <div className="formInput">
            <label htmlFor="password" className="Password">
              Password
            </label>
            <input id="password" type="password" {...register("password")} />
          </div>
          <div className="formInput">
            <button
              type="submit"
              disabled={!isDirty || !isValid || isSubmitted}
            >
              Login
            </button>
          </div>
        </form>
        <div className="newUser">
          New user? <Link href="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
