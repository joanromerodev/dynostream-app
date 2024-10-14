import Content from "../../models/Content.js";
import logger from "../../logs/config.js";

const getContentsByCategoryId = async (req, res) => {
  const { categories } = req.body;
  try {
    if (categories) {
      const response = await Content.find({ _id: { $in: categories } });
      return res.json({ contents: response });
    } else {
      logger.error(
        "Content Controller - Lista de contenidos esta vacia o incorrecta. DB no puede consultar IDs que nunca recibió"
      );
      return res.status(400).json({ message: "Solicitud inválida" });
    }
  } catch (error) {
    logger.error("Content Controller - " + error);
    return res.status(400).json({ message: error.message });
  }
};

const getContentById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const content = await Content.findById(id);
      return res.json({ content });
    } else {
      logger.error(
        "Content Controller - Lista de contenidos esta vacia o incorrecta. DB no puede consultar IDs que nunca recibió"
      );
      return res.status(400).json({ message: "Solicitud inválida" });
    }
  } catch (error) {
    logger.error("Content Controller - " + error);
    return res.status(400).json({ message: error.message });
  }
};

export { getContentsByCategoryId, getContentById };
