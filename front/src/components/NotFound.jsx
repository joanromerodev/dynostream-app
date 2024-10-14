import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-dvh flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-primary-800 to-primary-500">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div>
            <div className="my-5 px-5">
              <h1 className="my-2 text-gray-300 font-bold text-2xl text-center">
                Oops. Parece que esta ruta no existe.
              </h1>
              <p className="my-2 text-gray-300 text-center">
                Lo sentimos. Por favor dirigete al Inicio para encontrar la ruta
                que necesites.
              </p>
              <div className="flex w-full justify-center mt-5">
                <button
                  onClick={() => navigate("/home")}
                  className="my-2 rounded-full md py-4 px-8 text-center bg-orange-700 text-white hover:bg-orange-800"
                >
                  Ir a Inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5">
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
}

export default NotFound;
