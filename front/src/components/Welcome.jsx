import { Link, Navigate } from "react-router-dom";
import Modal from "./ui/Modal";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

function Welcome() {
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState();
  const { auth } = useAuth();

  const callInDevelopmentModal = () => {
    setModalInfo({
      title: "Oops :( Funcion en Desarrollo",
      description:
        "Esta funcionalidad no esta disponible actualmente ya que esta siendo desarrollada por nuestro equipo! Gracias por tu comprension",
    });
    setShowModal(true);
  };

  if (auth?.token) {
    return <Navigate to={"home"} />;
  }

  return (
    <main className="bg-[url('/img/movies_bg.webp')] bg-no-repeat bg-cover">
      <div className="bg-gradient-to-b md:bg-gradient-to-r from-primary-500 from-20% via-primary-500/90 via-70% to-primary-950/5 ">
        <div className="h-screen grid grid-cols-1 md:grid-cols-2 items-start">
          <div className="flex flex-col p-5 md:p-20 justify-between h-full">
            <img src="/img/icon.svg" className="w-[100px] md:w-[200px]" />
            <div className="flex flex-col gap-8 p-5 items-center md:items-start">
              <p className="font-poppins font-semibold text-white text-xl md:text-2xl w-auto max-w-[24rem] text-center md:text-left">
                ¡Sumérgete en un mundo de entretenimiento sin límites!
              </p>
              <Link
                to="/login"
                className="bg-orange-800 py-3 px-8 rounded-full text-sm md:text-base max-w-sm text-white font-medium text-center font-poppins outline-offset-2 outline-primary-500 shadow-lg transition-all ease-in-out duration-300 hover:scale-110 hover:shadow-orange-700 hover:shadow-2xl"
              >
                Descubre más con{" "}
                <span className="font-poppins font-bold text-base md:text-lg">
                  DynoStream
                </span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col p-5 md:p-20 justify-start items-center md:items-end h-full">
            <button
              onClick={callInDevelopmentModal}
              className="text-primary-600 font-poppins font-medium py-2 px-5 bg-white rounded-full transition-all ease-in-out duration-300 hover:scale-105 shadow-md outline-offset-2 outline-primary-500"
            >
              Ver Planes
            </button>
          </div>
        </div>
        {showModal && (
          <Modal
            title={modalInfo.title}
            description={modalInfo.description}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </main>
  );
}

export default Welcome;
