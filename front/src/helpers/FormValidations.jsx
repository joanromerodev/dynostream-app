function renderErrorMessage(errors) {
  if (errors) {
    if (errors.email) {
      if (errors.email.type === "required") {
        return (
          <div className="bg-red-100 rounded-xl text-center p-2 text-xs md:text-sm">
            <span className="text-red-500 px-4 py-2 dark:bg-gray-600 dark:text-white dark:font-semibold">
              El correo electrónico es obligatorio
            </span>
          </div>
        );
      }
      if (errors.email.type === "pattern") {
        return (
          <div className="bg-red-100 rounded-xl text-center p-2 text-xs md:text-sm">
            <span className="text-red-500 px-4 py-2 dark:bg-gray-600 dark:text-white dark:font-semibold">
              El formato del correo electrónico ingresado no es válido. Por
              favor revise e intente nuevamente
            </span>
          </div>
        );
      }
    }
    if (errors.password) {
      if (errors.password.type === "required") {
        return (
          <div className="bg-red-100 rounded-xl text-center p-2 text-xs md:text-sm">
            <span className="text-red-500 px-4 py-2 dark:bg-gray-600 dark:text-white dark:font-semibold">
              La contraseña es obligatoria
            </span>
          </div>
        );
      }
    }
  }
  return null;
}

export { renderErrorMessage };
