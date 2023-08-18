const mysql = require("mysql2");
require("dotenv").config();

const dbConfig = {
    host: process.env.HOST,
    user: process.env.ADMIN,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.PORTDB,
};



const queries = (consulta) => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(dbConfig);
        // Abro la conexión a la bd
        connection.connect((error) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Conectado con el identificador: ' + connection.threadId);
                // Realizar la consulta
                connection.query(consulta, (error, results, fields) => {
                    
                    if (error) {
                        console.log(error);
                        connection.end();
                        reject(error);
                    }
                    // Cerrar la conexión
                    connection.end();
                    resolve(results);
                });
            }
        });
    });
};


module.exports = {
    queries
};