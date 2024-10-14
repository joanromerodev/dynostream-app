import { ObjectId } from "bson";
import { Schema, model } from "mongoose";
const ContentSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "El titulo de la pelicula es obligatorio"],
    },
    description: {
      type: String,
      required: [true, "La descripción de la pelicula es obligatoria"],
    },
    synopsis: {
      type: String,
      required: [true, "La synopsis de la pelicula es obligatoria"],
    },
    duration: {
      type: Number,
      required: [true, "La duración de la pelicula es obligatoria"],
    },
    released: {
      type: Number,
      required: [true, "El año de lanzamiento de la pelicula es obligatorio"],
    },
    director: {
      type: String,
      required: [true, "El director de la pelicula es obligatorio"],
    },
    tags: {
      type: Array,
      required: [true, "Los tags de la pelicula son obligatorios"],
    },
    actors: {
      type: Array,
      required: [true, "Los actores de la pelicula son obligatorios"],
    },
    rating: {
      type: Number,
      required: [true, "La calificación de la pelicula es obligatoria"],
    },
    image: {
      type: String,
      required: [true, "La imagen de la pelicula es obligatoria"],
    },
    url: {
      type: String,
      required: [true, "La url de la pelicula es obligatoria"],
    },
    categoryId: {
      type: ObjectId,
      required: [true, "El ID de la categoria de la pelicula es obligatorio"],
    },
  },
  { collection: "content" }
);

export default model("content", ContentSchema);
