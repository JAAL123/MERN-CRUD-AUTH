import User from "../models/users.models.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  const  profileImage  = req?.file?.path;


  console.log(profileImage);

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      profileImage,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);

    res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      profileImage,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(error);
    if (error?.code === 11000) {
      return res.status(422).json({
        message: "the email is already taken",
      });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({ message: "Correo no registrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña Incorrecta" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    email: userFound.email,
    username: userFound.username,
    profileImage: userFound.profileImage
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "no autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "no autorizado" });
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "no autoirzado" });
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
