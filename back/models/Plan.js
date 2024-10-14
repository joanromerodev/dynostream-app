import { Double } from "bson";
import { Mongoose, Schema, model } from "mongoose";
const PlanSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre del plan es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción del plan es obligatoria"],
  },
  price: {
    type: Number,
    required: [true, "El precio del plan es obligatorio"],
  },
  included_categories: {
    type: Array,
    required: [true, "Categorias incluidas son obligatorias"],
  },
  benefits: {
    type: Array,
    required: [true, "Beneficios incluidos son obligatorios"],
  },
});

export default model("plans", PlanSchema);
