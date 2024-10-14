import logger from "../../logs/config.js";
import Plan from "../../models/Plan.js";

const getPlanById = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const plan = await Plan.findById(id);
      return res.json({ plan });
    } else {
      logger.error(
        "Plan Controller - ID esta vacio. DB no puede consultar IDs que nunca recibió"
      );
      return res.status(400).json({ message: "Solicitud inválida." });
    }
  } catch (error) {
    logger.error("Plan Controller - " + error);
    return res.status(400).json({
      message:
        "Algo sucedió durante la solicitud. Por favor intente nuevamente más tarde",
    });
  }
};

export { getPlanById };
