/**
 * esta funcion es un middleware que verifica el esquema de rreglas provenientes de ZOD se cumplan antes de seguir con la funcion
 * @param {schema} schema un schema es un objeto proveniente de ZOD con validaciones
 * @returns  | retorna un estado en caso de error, sino continua
 */
export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(error.errors.map((e) => e.message));
  }
};
