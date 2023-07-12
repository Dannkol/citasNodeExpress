import express from "express";

import mysql from "mysql2/promise";
import dbConfig from "./config/dbconfig.js";


/*  middleware */

import Validar_id from "./middleware/DTO_id.js"

/* instacia de la conexion a la base de datos */
const getConnection = async () => {
  return await mysql.createConnection(dbConfig);
};

const router = express.Router();

router.get("/pacientes", async (req, res) => {
  const connection = await getConnection();
  try {
    const query_pacientes_all_desc = `SELECT * FROM usuarios ORDER BY usu_nombre ASC;`;

    const [pacientes_all_desc] = await connection.execute(
      query_pacientes_all_desc
    );

    let obj = {
      mensaje: "Uusuarios ordered by usu_nombre ascending",
      inventario: pacientes_all_desc,
    };

    return res.status(200).json(obj);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Error del servidor ${error.errno}` });
  } finally {
    connection.end();
  }
});

router.get("/citas", async (req, res) => {
  const connection = await getConnection();
  try {
    const query_pacientes_all_desc = `SELECT * FROM cita ORDER BY cit_fecha DESC;`;

    const [pacientes_all_desc] = await connection.execute(
      query_pacientes_all_desc
    );

    let obj = {
      mensaje: "citas ordered by cit_fecha DESC",
      inventario: pacientes_all_desc,
    };

    return res.status(200).json(obj);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Error del servidor ${error.errno}` });
  } finally {
    connection.end();
  }
});


router.get("/medicos/:esp", async (req, res) => {
  const connection = await getConnection();
  try {
    const query_pacientes_all_desc = `SELECT t1.med_nombreCompleto , t2.esp_nombre FROM medico AS t1 INNER JOIN especialidad AS t2 ON t1.med_especialidad = t2.esp_id WHERE t2.esp_nombre = "${req.params.esp}"; `;

    const [pacientes_all_desc] = await connection.execute(
      query_pacientes_all_desc
    );

    let obj = {
      mensaje: "especialidades por medico",
      inventario: pacientes_all_desc,
    };

    return res.status(200).json(obj);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Error del servidor ${error.errno}` });
  } finally {
    connection.end();
  }
});


router.get("/usuario/citas/:id", Validar_id,async (req, res) => {
  const connection = await getConnection();
  try {
    const query_pacientes_all_desc = `SELECT t2.usu_nombre, t1.cit_fecha FROM cita AS t1 INNER JOIN usuarios AS t2 ON t1.cit_datosUsuario = t2.usu_id WHERE t2.usu_id = ${req.params.id} AND t1.cit_estado = 1
    ORDER BY t1.cit_fecha ASC LIMIT 1 ;`;

    const [pacientes_all_desc] = await connection.execute(
      query_pacientes_all_desc
    );

    let obj = {
      mensaje: "Citas de un usuario",
      inventario: pacientes_all_desc,
    };

    return res.status(200).json(obj);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Error del servidor ${error.errno}` });
  } finally {
    connection.end();
  }
});

router.get("/usuario/medico/:id", Validar_id ,async (req, res) => {
  const connection = await getConnection();
  try {
    const query_pacientes_all_desc = `SELECT t2.usu_nombre , t3.med_nombreCompleto , t1.cit_fecha FROM cita AS t1 
    INNER JOIN usuarios AS t2 ON t1.cit_datosUsuario = t2.usu_id 
    INNER JOIN medico AS t3 ON t1.cit_medico = t3.med_nroMatriculaProsional
    WHERE t3.med_nroMatriculaProsional = ${req.params.id} AND t1.cit_estado = 1;
    `;

    const [pacientes_all_desc] = await connection.execute(
      query_pacientes_all_desc
    );

    let obj = {
      mensaje: "medicos de un usuario",
      inventario: pacientes_all_desc,
    };

    return res.status(200).json(obj);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Error del servidor ${error.errno}` });
  } finally {
    connection.end();
  }
});


router.get("/usuario/consultorio/:id", Validar_id ,async (req, res) => {
  const connection = await getConnection();
  try {
    const query_pacientes_all_desc = `SELECT t2.usu_nombre , t3.med_nombreCompleto , t1.cit_fecha , t4.cons_nombre FROM cita AS t1 
    INNER JOIN usuarios AS t2 ON t1.cit_datosUsuario = t2.usu_id 
    INNER JOIN medico AS t3 ON t1.cit_medico = t3.med_nroMatriculaProsional
    INNER JOIN consultorio AS t4 ON t3.med_consultorio = t4.cons_codigo
    WHERE t2.usu_id = ${req.params.id} AND t1.cit_estado = 1;`;

    const [pacientes_all_desc] = await connection.execute(
      query_pacientes_all_desc
    );

    let obj = {
      mensaje: "Consultorios de un usuario",
      inventario: pacientes_all_desc,
    };

    return res.status(200).json(obj);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Error del servidor ${error.errno}` });
  } finally {
    connection.end();
  }
});

router.get("/citas/fecha/:date", async (req, res) => {
  const connection = await getConnection();
  try {
    const query_pacientes_all_desc = `SELECT t2.usu_nombre, t1.cit_fecha FROM cita AS t1 
    INNER JOIN usuarios AS t2 ON t1.cit_datosUsuario = t2.usu_id WHERE t1.cit_fecha = '${req.params.date}'
    ORDER BY t1.cit_fecha ASC;`;

    const [pacientes_all_desc] = await connection.execute(
      query_pacientes_all_desc
    );

    let obj = {
      mensaje: "citas por fecha",
      inventario: pacientes_all_desc,
    };

    return res.status(200).json(obj);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Error del servidor ${error.errno}` });
  } finally {
    connection.end();
  }
});


router.get("/medico/consultorio", async (req, res) => {
  const connection = await getConnection();
  try {
    const query_pacientes_all_desc = `SELECT t3.med_nombreCompleto , t4.cons_nombre FROM cita AS t1 
    INNER JOIN medico AS t3 ON t1.cit_medico = t3.med_nroMatriculaProsional
    INNER JOIN consultorio AS t4 ON t3.med_consultorio = t4.cons_codigo;`;

    const [pacientes_all_desc] = await connection.execute(
      query_pacientes_all_desc
    );

    let obj = {
      mensaje: "todos los medicos y sus consultorios",
      inventario: pacientes_all_desc,
    };

    return res.status(200).json(obj);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Error del servidor ${error.errno}` });
  } finally {
    connection.end();
  }
});

router.get("/medico/:id/citas/:date", async (req, res) => {
  const connection = await getConnection();
  try {
    const query_pacientes_all_desc = `
    SELECT COUNT(t3.med_nombreCompleto) AS "Cantidad_citas" FROM cita AS t1 
INNER JOIN medico AS t3 ON t1.cit_medico = t3.med_nroMatriculaProsional
INNER JOIN consultorio AS t4 ON t3.med_consultorio = t4.cons_codigo
WHERE t1.cit_fecha = '${req.params.date}' AND t3.med_nroMatriculaProsional = ${req.params.id};
    `;

    const [pacientes_all_desc] = await connection.execute(
      query_pacientes_all_desc
    );

    let obj = {
      mensaje: "cantidad de Citas",
      inventario: pacientes_all_desc,
    };

    return res.status(200).json(obj);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Error del servidor ${error.errno}` });
  } finally {
    connection.end();
  }
});

export default router;
