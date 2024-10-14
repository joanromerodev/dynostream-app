import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./ui/Loading";
import Modal from "./ui/Modal";

function ContentDetails() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const { auth } = useAuth();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState();
  const navigate = useNavigate();

  // Get Movie Info from API
  useEffect(() => {
    const getContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:1818/contents/id", {
          params: {
            token: auth.token,
            id,
          },
        });
        if (response.data.content) {
          setContent(response.data.content);
        } else {
          throw Error();
        }
      } catch (error) {
        let title = "Titulo No Encontrado";
        let description =
          "No encontramos el título seleccionado. Por favor verifique e intente nuevamente más tarde.";
        callErrorModal(title, description);
      } finally {
        setLoading(false);
      }
    };
    getContent();
  }, []);

  //Config Error Modal if nothing was found
  const callErrorModal = (title, description) => {
    setModalInfo({
      title,
      description,
    });
    setShowModal(true);
  };

  //Config error redirect function when nothing was found
  const redirectError = () => {
    navigate("/home");
    setShowModal(false);
  };

  //Show loading component while fetching API
  if (loading) {
    return <Loading />;
  }

  return (
    <div className=" bg-gradient-to-b from-primary-700 to-black">
      <Header />
      <section className="min-h-screen flex flex-col gap-4 pt-20 px-10 md:px-20 scroll-smooth">
        {/* Only show content if got success response from API */}
        {content && (
          <div className="mt-6 px-5 flex flex-col space-y-8">
            <p className="text-3xl text-white mb-2 font-poppins font-semibold">
              {content.title}
            </p>
            <div className="rounded-lg">
              <ReactPlayer
                controls={true}
                loop={true}
                className="react-player"
                url={content.url}
                width={"100%"}
                height={"60vh"}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-white text-2xl font-bold">Detalles</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                <p className="py-3 md:py-5 text-gray-400">{content.synopsis}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 py-3 md:py-5">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <p className="text-white font-bold">Duración</p>
                      <p className="text-gray-400">
                        {content.duration} minutos
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-white font-bold">Año de Publicación</p>
                      <p className="text-gray-400">{content.released}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-white font-bold">Genero</p>
                      {content.tags.map((tag, index) => (
                        <p key={index} className="text-gray-400">
                          {tag}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <p className="text-white font-bold">Director</p>
                      <p className="text-gray-400">{content.director}</p>
                    </div>
                    {content.actors.length > 0 && (
                      <div className="flex flex-col">
                        <p className="text-white font-bold">Actors</p>
                        {content.actors.map((actor, index) => (
                          <p key={index} className="text-gray-400">
                            {actor}
                          </p>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <p className="text-white font-bold">
                        Calificación Promedio
                      </p>
                      <p className="text-gray-400">{content.rating}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showModal && (
          <Modal
            title={modalInfo.title}
            description={modalInfo.description}
            showModal={showModal}
            setShowModal={redirectError}
          />
        )}
      </section>
      <Footer />
    </div>
  );
}

export default ContentDetails;
