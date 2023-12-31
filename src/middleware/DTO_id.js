import { plainToClass } from "class-transformer";
import { IdsDTO } from "../DTO/ids.js";

const Validar_id = (req, res, next) => {
  const validaciones = plainToClass(IdsDTO, req.params, {
    excludeExtraneousValues: true,
  });

  for (let key in validaciones) {
    if (validaciones[key] == false) {
      return res.status(403).json({ error: "Datos no permitidos" });
    }
  }

  next();
};

export default Validar_id;
