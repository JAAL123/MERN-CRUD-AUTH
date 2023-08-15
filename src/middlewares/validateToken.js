import jswt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

/**
 *funcion middleware que valida el token 
 * @param {Request} req | peticion que viene del cliente
 * @param {Response} res | respuesta que se envia al cliente
 * @param {NextFunction} next | funcion para continuar a el flujo
 * @returns {Response, authUser} | Si no hay problemas retorna un usuario autenticado, sino un response con mensaje en json
 */
export const authRequire = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(201).json({ message: "No token, authorization denied" });

  jswt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(201).json({ message: "invalid Token" });
    req.user = user;
    next();
  });
};
