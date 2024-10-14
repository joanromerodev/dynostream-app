import { HiHome } from "react-icons/hi";
import { BiSolidCategory, BiSolidCameraMovie } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logout from "../../helpers/Logout";

function Header() {
  const { scrollY } = useScroll();
  const [headerView, setHeaderView] = useState(false);
  const { auth, setAuth } = useAuth();

  // Funcion para conocer el comportamiento del scroll y aplicar estilos con el valor obtenido
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 30) {
      setHeaderView(true);
    }
    if (latest < 30) {
      setHeaderView(false);
    }
  });

  const logoutUser = () => {
    logout(setAuth);
  };

  return (
    <nav
      className={`transition-opacity ease-out duration-1000 bg-primary-900 fixed w-full z-20 top-0 start-0 ${
        headerView ? "bg-opacity-100 shadow-lg" : "bg-opacity-0"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between py-4 px-8">
        <div className="flex items-center gap-8">
          <div>
            <a href="/home">
              <img src="/img/icon.svg" className="w-10" />
            </a>
          </div>
          <div className="hidden md:flex">
            <ul className="flex pt-2 font-medium rounded-lg space-x-10 flex-row">
              <li className="group">
                <Link
                  to="/home"
                  className="py-2 px-3 text-white rounded md:p-0 font-poppins flex items-center gap-2"
                  aria-current="page"
                >
                  <HiHome size={15} />
                  <p className="pt-[1px]">Inicio</p>
                </Link>
                <div className="w-0 bg-white h-1 transition-all ease-in-out duration-300 group-hover:w-full"></div>
              </li>
              <li className="group">
                <Link
                  to="/categories"
                  className="py-2 px-3 text-white rounded md:p-0 font-poppins flex items-center gap-2"
                  aria-current="page"
                >
                  <BiSolidCategory size={15} />
                  <p className="pt-[1px]">Categorias</p>
                </Link>
                <div className="w-0 bg-white h-1 transition-all ease-in-out duration-300 group-hover:w-full"></div>
              </li>
              <li className="group">
                <Link
                  to="/content"
                  className="py-2 px-3 text-white rounded md:p-0 font-poppins flex items-center gap-2"
                  aria-current="page"
                >
                  <BiSolidCameraMovie size={15} />
                  <p className="pt-[1px]">Peliculas</p>
                </Link>
                <div className="w-0 bg-white h-1 transition-all ease-in-out duration-300 group-hover:w-full"></div>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="flex">
            <Menu as={"div"} className={"pt-2 px-3 rounded-full"}>
              <Menu.Button
                className={
                  "flex items-center gap-4 ease-in-out transition-all duration-300 hover:scale-105"
                }
              >
                <p className="hidden md:flex text-white font-poppins font-medium text-sm">
                  {auth?.user?.name}
                </p>
                <img
                  src={auth?.user?.picture}
                  className="rounded-full w-10 h-10"
                />
              </Menu.Button>
              <Menu.Items
                className={
                  "absolute bg-gray-900 top-[5rem] right-12 flex flex-col items-end rounded-b-xl rounded-tl-xl shadow border-x-[1px] border-b-[1px] border-gray-700 "
                }
              >
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`${
                        active && "bg-gray-500"
                      } py-4 px-4 w-full rounded-tl-xl text-white font-poppins text-sm flex items-center space-x-4 md:hidden`}
                      to="/home"
                    >
                      <HiHome size={17} />
                      <p>Inicio</p>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`${
                        active && "bg-gray-500"
                      } py-4 px-4 w-full rounded-tl-xl text-white font-poppins text-sm flex items-center space-x-4 md:hidden`}
                      to="/categories"
                    >
                      <BiSolidCategory size={17} />
                      <p>Categorias</p>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`${
                        active && "bg-gray-500"
                      } py-4 px-4 w-full rounded-tl-xl text-white font-poppins text-sm flex items-center space-x-4 md:hidden border-b-[1px] border-b-gray-600`}
                      to="/content"
                    >
                      <BiSolidCameraMovie size={17} />
                      <p>Peliculas</p>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`${
                        active && "bg-gray-500"
                      } py-4 px-4 w-full rounded-tl-xl text-white font-poppins text-sm flex items-center space-x-4`}
                      to="/profile"
                    >
                      <FaCircleUser size={17} />
                      <p>Perfil</p>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active && "bg-gray-500"
                      } py-4 px-4 w-full rounded-b-xl text-white font-poppins text-sm flex items-center space-x-4`}
                      onClick={logoutUser}
                    >
                      <FaPowerOff size={17} />
                      <p>Cerrar Sesión</p>
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
