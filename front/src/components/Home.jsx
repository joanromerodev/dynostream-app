import { useEffect, useState } from "react";
import axios from "axios";
import { CarouselUI, ContentsCarousel } from "./ui/Carousel";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Loading from "./ui/Loading";
import useAuth from "../hooks/useAuth";
import logout from "../helpers/Logout";
import { useNavigate } from "react-router-dom";
import Modal from "./ui/Modal";

function Home() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  // Fetch all data of logged user from API to show content
  useEffect(() => {
    const getAllData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:1818/profile", {
          params: {
            token: auth.token,
          },
        });
        const { categories, contents, plan, user } = response.data;
        if (!user.state) {
          return callErrorModal(
            "Tu cuenta esta inactiva",
            "No hemos recibido tu pago. Por favor realiza tu pago para poder continuar accediendo a nuestros servicios"
          );
        }
        setAuth({ ...auth, categories, contents, plan, user });
        localStorage.setItem(
          "data",
          JSON.stringify({ ...auth, categories, contents, plan, user })
        );
      } catch (error) {
        const status = error.response.status;
        if (status === 401) {
          logout(setAuth);
        } else {
          console.log(error);
          callErrorModal(
            "Oops. No Pudimos Obtener los Datos",
            "Hubo un error obteniendo sus datos de usuario, contactenos o intente nuevamente más tarde."
          );
        }
      } finally {
        setLoading(false);
      }
    };
    getAllData();
  }, []);

  //Config Error Modal if nothing was found
  const callErrorModal = (title, description) => {
    setModalInfo({
      title,
      description,
    });
    setShowModal(true);
  };

  //Loading when fetching API
  if (loading) {
    return <Loading />;
  }

  //Will redirect when a category is selected
  const showContentsByCategory = (category) => {
    setAuth({ ...auth, categoryParam: category });
    navigate("/content");
  };

  return (
    <div className=" bg-gradient-to-b from-primary-700 to-gray-900">
      <Header />
      <section className="min-h-screen flex flex-col justify-center gap-4 pt-20 px-10 md:px-20 scroll-smooth">
        {/* Carrousel */}
        <div className="h-72 md:h-[500px] mt-2">
          <CarouselUI />
        </div>
        {/* only show section if user exists and has permission */}
        {auth.categories && auth.contents && (
          <>
            {/* Categorias */}
            <div className="flex flex-wrap justify-center gap-5 pt-4">
              {auth?.categories?.slice(0, 5).map((category, index) => (
                <div
                  key={index}
                  className="bg-primary-500 p-4 rounded-2xl shadow-lg flex items-center
              justify-center max-w-sm w-60 md:w-80 h-52 md:h-72 transition-all ease-in
              duration-100 hover:scale-105 hover:cursor-pointer hover:shadow-xl
              hover:bg-[url('/img/categories_pattern.jpg')] hover:bg-cover hover:bg-blend-overlay"
                  onClick={() => showContentsByCategory(category)}
                >
                  <p className="font-poppins text-white font-semibold text-xl">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
            {/* Peliculas Preview */}
            <div className="py-5 flex flex-col w-full">
              <p className="text-left font-amaranth font-semibold text-xl md:text-3xl text-white px-4">
                Películas Más Vistas en el 2023
              </p>
              <div className="pt-8 px-5 w-full">
                <ContentsCarousel contents={auth?.contents} />
              </div>
            </div>
          </>
        )}
        {/*Show modal if not categories were found */}
        {showModal && (
          <Modal
            title={modalInfo.title}
            description={modalInfo.description}
            showModal={showModal}
            setShowModal={logout(setAuth)}
          />
        )}
      </section>
      <Footer />
    </div>
  );
}

export default Home;
