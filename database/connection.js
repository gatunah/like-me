const { Pool } = require("pg");

// CONFIG BD
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "likeme",
  password: "admin",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
//TODOS LOS DATOS
const getData = async () => {
  try {
    const result = await pool.query(
      "SELECT id, usuario, url, descripcion, likes FROM posts ORDER BY id ASC"
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener getData:", error);
  }
};
const insertar = async (datos) => {
  try {
    const consulta = {
      text: "INSERT INTO posts (usuario, url, descripcion, likes) VALUES ($1, $2, $3, 0);",
      values: datos,
    };
    const result = await pool.query(consulta);
    return result;
  } catch (error) {
    console.error("Error al insertar posts:", error);
  }
};
const editar = async (id) => {
    try {
      const consulta = {
        text: "UPDATE posts SET likes = likes+1 WHERE id = $1;",
        values: [id],
      };
      const result = await pool.query(consulta);
      return result;
    } catch (error) {
      console.error("Error al editar el posts:", error);
    }
  };
module.exports = { getData, insertar, editar };
