import { Schema, model } from "mongoose";
const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre de la categoría es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción de la categoría es obligatoria"],
  },
});

export default model("categories", CategorySchema);
