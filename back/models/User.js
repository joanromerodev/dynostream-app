import { ObjectId } from "bson";
import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  lastname: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Ingresa un correo electronico válido"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minLength: [8, "Contraseña muy corta. Ingrese minimo 8 caracteres"],
  },
  picture: {
    type: String,
  },
  planId: {
    type: ObjectId,
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  (this.password = await bcrypt.hash(this.password, salt)), next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const authenticated = await bcrypt.compare(password, user.password);
    if (authenticated) {
      return user;
    } else {
      throw Error("Contraseña incorrecta");
    }
  } else {
    throw Error("Correo electrónico incorrecto");
  }
};

UserSchema.methods.toJSON = function () {
  const { __v, _id, password, ...user } = this.toObject();
  return user;
};

export default model("User", UserSchema);
