function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-5 bottom-0 left-0 z-20 w-full p-4 bg-black/50 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <div className="text-center md:text-left">
        <span className="text-sm text-gray-100">
          © {currentYear}{" "}
          <a
            href="/"
            className="hover:underline font-medium text-white outline-primary-100 focus:p-2 rounded-xl"
          >
            DynoStream
          </a>
          . All Rights Reserved.
        </span>
      </div>
      <ul className="flex flex-wrap justify-center md:justify-normal items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a
            href="#"
            className="hover:underline me-4 md:me-6 text-white outline-primary-100 focus:p-2 rounded-xl"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:underline me-4 md:me-6 text-white outline-primary-100 focus:p-2 rounded-xl"
          >
            Privacy Policy
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:underline me-4 md:me-6 text-white outline-primary-100 focus:p-2 rounded-xl"
          >
            Licensing
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:underline text-white outline-primary-100 focus:p-2 rounded-xl"
          >
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
