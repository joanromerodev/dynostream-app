import { motion } from "framer-motion";

function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-800 to-primary-900">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="relative w-14 h-14 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#081647] rounded-full"></div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="py-5 animate-pulse flex flex-col md:flex-row items-center space-x-2 px-10 md:px-0"
        >
          <p className="text-white font-poppins font-semibold text-base md:text-lg text-center md:text-left">
            Estamos preparando todo para ti
          </p>
          <div className="flex gap-1 mt-2.5">
            <span className="sr-only">Loading...</span>
            <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Loading;
