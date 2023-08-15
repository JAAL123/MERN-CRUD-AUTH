import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//cors: middleware para permitir origen cruzado, credentials en true para enviar cookies
app.use(cors({ origin: true, credentials: true }));
//morgan: middleware para ver por consola peticiones y respuestas 
app.use(morgan("dev"));
//express.json: propio de express para poder leer datos tipo JSON
app.use(express.json());
//cookieParser: para poder leer las cookies que se generan
app.use(cookieParser());

//rutas con prefijo /api
app.use("/api", authRoutes);
app.use("/api", tasksRoutes);
//ruta default
app.use("/", (req, res) => {
  res.send("api running");
});

export default app;
