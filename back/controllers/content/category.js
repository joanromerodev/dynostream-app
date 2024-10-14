import logger from "../../logs/config.js";
import Category from "../../models/Category.js";

const getCategoriesById = async (req, res) => {
  try {
    const { categories } = req.body;
    if (categories) {
      const response = await Category.find({ _id: { $in: categories } });
      return res.json({ categories: response });
    } else {
      logger.error(
        "Category Controller - Lista categorias esta vacia o incorrecta. DB no puede consultar IDs que nunca recibió"
      );
      return res.status(400).json({ message: "Solicitud inválida" });
    }
  } catch (error) {
    logger.error("Category Controller - " + error);
    return res.status(400).json({
      message:
        "Algo sucedió durante la solicitud. Por favor intente nuevamente más tarde",
    });
  }
};

export { getCategoriesById };
