import Footer from "./layout/Footer";
import Header from "./layout/Header";
import useAuth from "../hooks/useAuth";
import { Menu } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./ui/Loading";
import Modal from "./ui/Modal";

function ContentCategory() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState();
  const [selectedCategory, setSelectedCategory] = useState(
    auth?.categoryParam || null
  );

  //Filter the content
  const filteredContents =
    selectedCategory === null
      ? contents
      : contents?.filter(
          (content) => content.categoryId === selectedCategory._id
        );

  //Scroll to top on Mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Fetching Categories from API based on logged user
  useEffect(() => {
    const getContents = async () => {
      let contentsIds = [];
      auth?.contents.map((content) => {
        contentsIds.push(content._id);
      });
      try {
        if (contentsIds.length > 0) {
          setLoading(true);
          const response = await axios.post(
            "http://localhost:1818/contents",
            {
              token: auth.token,
              categories: contentsIds,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.contents) {
            setContents(response.data.contents);
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
    getContents();
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

  //Delete param from auth object to remove filter then
  const setSelectedNull = () => {
    delete auth.categoryParam;
    setAuth(auth);
    setSelectedCategory(null);
  };

  return (
    <div className=" bg-gradient-to-b from-primary-700 to-gray-900">
      <Header />
      <section className="min-h-screen flex flex-col gap-4 pt-20 px-10 md:px-20 scroll-smooth">
        {/* Render Title and Filter Button */}
        <div className="flex gap-4 items-center justify-between">
          <p className="py-5 font-poppins text-lg md:text-2xl text-white font-medium text-center md:text-left">
            Películas
          </p>
          <Menu as={"div"} className={"bg-white py-2 px-4 rounded-xl"}>
            <Menu.Button className={"flex items-center gap-2 "}>
              <p className="font-poppins">
                {selectedCategory ? selectedCategory.name : "Todas"}
              </p>
              <FaChevronDown size={15} />
            </Menu.Button>
            <div className="relative">
              <Menu.Items
                className={
                  "absolute bg-gray-900 top-5 -right-5 flex flex-col items-end rounded-xl shadow shadow-primary-400 z-20 w-40"
                }
              >
                {auth.categories && (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={`${
                            active && "bg-gray-500"
                          } py-4 px-4 w-full rounded-t-xl
                             text-white font-poppins text-sm flex items-center space-x-4 hover:cursor-pointer`}
                          onClick={() => setSelectedNull()}
                        >
                          <p>Todas</p>
                        </div>
                      )}
                    </Menu.Item>
                    {auth.categories.map((category, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <div
                            className={`${
                              active && "bg-gray-500"
                            } py-4 px-4 w-full
                            ${
                              index === auth.categories.length - 1 &&
                              "rounded-b-xl"
                            }
                             text-white font-poppins text-sm flex items-center space-x-4 hover:cursor-pointer`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            <p>{category.name}</p>
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </>
                )}
              </Menu.Items>
            </div>
          </Menu>
        </div>
        {/* Will Render Filtered Content only if content exists */}
        {contents && (
          <div className="flex flex-wrap justify-center gap-5 pt-4">
            {filteredContents.map((content, index) => (
              <div
                key={index}
                className="relative
      rounded-xl text-primary-500 shadow-lg h-80 flex items-end group transition-all ease-in-out duration-300 hover:cursor-pointer outline-none"
                onClick={() => {
                  navigate(`/content/${content._id}`);
                }}
              >
                <img
                  className="max-h-80 w-full object-cover rounded-xl"
                  loading="lazy"
                  src={content.image}
                  alt={`Image ${index}`}
                />
                <div className="hidden absolute bg-black/80 p-2 rounded-b-xl w-full group-hover:flex">
                  <p className="text-white font-semibold font-poppins">
                    {content.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {/*Show modal if contents were not found */}
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

export default ContentCategory;
