import Footer from "./layout/Footer";
import Header from "./layout/Header";
import useAuth from "../hooks/useAuth";

function Profile() {
  const { auth } = useAuth();
  return (
    <div className=" bg-gradient-to-b from-primary-700 to-gray-900">
      <Header />
      <section className="min-h-screen flex items-center justify-center gap-4 pt-20 px-10 md:px-20 scroll-smooth">
        <div className="p-5 max-w-md bg-gray-200 w-full rounded-lg flex flex-col">
          <div>
            <p className="font-poppins text-xl font-semibold text-center">
              Tus Datos
            </p>
            <div className="flex justify-center py-5">
              <img
                src={auth.user.picture}
                className="rounded-full w-20 h-20 shadow-lg"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2 gap-4 font-poppins">
              <span className="font-semibold text-base ">Nombres</span>
              <p className="font-medium text-sm">
                {auth.user.name} {auth.user.lastname}
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2 gap-4 font-poppins">
              <span className="font-semibold text-base">Email</span>
              <p className="font-medium text-sm">{auth.user.email}</p>
            </div>
          </div>
          <div className="mt-8">
            <p className="font-poppins text-xl font-semibold text-center">
              Tu Plan
            </p>
            <div className="flex flex-row items-center justify-between px-4 py-2 gap-4 font-poppins">
              <span className="font-semibold text-base ">Nombre</span>
              <p className="font-medium text-sm">{auth.plan.name}</p>
            </div>
            <div className="flex flex-row items-center justify-between px-4 py-2 gap-4 font-poppins">
              <span className="font-semibold text-base ">Precio</span>
              <p className="font-medium text-sm">$ {auth.plan.price} USD</p>
            </div>
            <div className="flex flex-col justify-between px-4 py-2 gap-4 font-poppins">
              <span className="font-semibold text-base ">Beneficios</span>
              <ul className="list-disc px-5">
                {auth.plan.benefits.map((benefit, index) => (
                  <li key={index} className="text-justify text-sm">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
