import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Modal from "./ui/Modal";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./ui/Loading";

function Categories() {
  const { auth, setAuth } = useAuth();
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState();
  const navigate = useNavigate();
  // Configs for Motion Animation Variants
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };
  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  // Scroll to top on components mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Fetching Categories from API based on logged user
  useEffect(() => {
    const getCategories = async () => {
      let categoriesIds = [];
      auth?.categories.map((category) => {
        categoriesIds.push(category._id);
      });
      try {
        if (categoriesIds.length > 0) {
          setLoading(true);
          const response = await axios.post(
            "http://localhost:1818/categories",
            {
              token: auth.token,
              categories: categoriesIds,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.categories) {
            setCategories(response.data.categories);
          } else {
            throw Error();
          }
        } else {
          throw Error();
        }
      } catch (error) {
        let title = "Categorias No Encontradas";
        let description =
          "No encontramos las categorías asociadas. Por favor verifique e intente nuevamente más tarde.";
        callErrorModal(title, description);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
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

  // Navigate to content if category was selected
  const showContentsByCategory = (category) => {
    setAuth({ ...auth, categoryParam: category });
    navigate("/content");
  };

  return (
    <div className=" bg-gradient-to-b from-primary-700 to-gray-900">
      <Header />
      <section className="min-h-screen flex flex-col gap-4 pt-20 px-10 md:px-20 scroll-smooth">
        {/* only if categories exist, will return data */}
        {categories && (
          <>
            {" "}
            <p className="py-5 font-poppins text-lg md:text-2xl text-white font-medium text-center md:text-left">
              Tu Plan Incluye Unicamente las Siguientes Categorías
            </p>
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-5 pt-4"
            >
              {categories.map((category, index) => (
                <motion.div
                  variants={item}
                  key={index}
                  className="bg-primary-500 rounded-2xl shadow-lg flex items-center hover:items-end
              justify-center max-w-sm w-60 md:w-80 h-52 md:h-72 transition-all ease-in
              duration-100 hover:scale-105 hover:cursor-pointer hover:shadow-xl
              hover:bg-[url('/img/categories_pattern.jpg')] hover:bg-cover hover:bg-blend-overlay
              group"
                  onClick={() => {
                    showContentsByCategory(category);
                  }}
                >
                  <div className="bg-transparent group-hover:bg-white/80 p-4 space-y-4 rounded-t-3xl rounded-b-2xl">
                    <p className="font-poppins text-white font-semibold text-xl text-center group-hover:text-primary-500">
                      {category.name}
                    </p>
                    <p className="hidden group-hover:flex font-poppins text-xs md:text-sm text-center">
                      {category.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
        {/*Show modal if categories were not found */}
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

export default Categories;
