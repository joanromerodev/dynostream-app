import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Footer from "./layout/Footer";
import { renderErrorMessage } from "../helpers/FormValidations";
import useAuth from "../hooks/useAuth";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  //Sends Login Request to Server
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:1818/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRequestError(null);
      setAuth({ token: res.data.token });
      const data = { token: res.data.token };
      localStorage.setItem("data", JSON.stringify(data));
      navigate("/home");
    } catch (error) {
      setRequestError(
        error?.response?.data?.message ||
          "Hubo un error en la solicitud. Por favor intente nuevamente más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  //If token already exists, redirect to home
  if (auth?.token) {
    return <Navigate to={"/home"} />;
  }

  return (
    <div className="min-h-dvh flex flex-col justify-between bg-gradient-to-b from-primary-800 to-primary-500">
      <motion.section
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-4 items-center"
      >
        <div className="py-5 md:py-10">
          <img src="img/icon.svg" className="w-24 md:w-32" />
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg shadow-black/50 border border-gray-300 w-10/12 h-[454px] md:w-full max-w-lg md:max-w-xl p-8 md:p-14">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-primary-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col bg-white rounded-2xl shadow-lg shadow-black/50 border border-gray-300 w-10/12 md:w-full max-w-lg md:max-w-xl p-8 md:p-14">
            <div className="mb-7">
              <p className="font-poppins font-medium text-lg md:text-xl text-center md:text-left">
                Inicia tu Sesión
              </p>
              <div className="mt-1 text-xs md:text-sm text-gray-500 dark:text-gray-300 text-center md:text-left">
                Inicia sesión en tu cuenta para poder acceder al contenido de
                nuestra plataforma
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-xs md:text-sm font-medium text-gray-700 font-poppins"
                >
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5  ${
                    errors.email
                      ? "border-red-300 outline-red-200"
                      : "border-gray-300 outline-blue-200"
                  }`}
                  placeholder="tucorreo@ejemplo.com"
                  {...register("email", {
                    required: true,
                    // eslint-disable-next-line no-useless-escape
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="password"
                  className="block mb-2 text-xs md:text-sm font-medium text-gray-700 font-poppins"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5  ${
                    errors.password
                      ? "border-red-300 outline-red-200"
                      : "border-gray-300 outline-blue-200"
                  }`}
                  placeholder="**********"
                  {...register("password", { required: true })}
                />
                {errors && (
                  <div className="mt-5">{renderErrorMessage(errors)}</div>
                )}
                {requestError && (
                  <div className="mt-5 w-full flex justify-center">
                    <p className="text-center bg-red-100 py-2 px-4 text-red-500 text-xs md:text-sm font-poppins rounded-xl">
                      {requestError}
                    </p>
                  </div>
                )}
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="py-3 px-6 bg-orange-500 shadow-lg text-white font-poppins font-medium rounded-full text-sm md:text-base ease-in-out transition-all duration-300 hover:scale-105 outline-primary-300 outline-offset-2"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.section>
      <Footer />
    </div>
  );
}

export default Login;
