const app = require("./app");
const server = require("http").Server(app);
const db = require('./config/database/database');
// const populateDb = require('./config/populateDb')

async function connect() {
  try {
    await db.authenticate();
    await db.sync({ force: false });
    // await populateDb.createRelations(db.models);
    console.log('Connection to database successful'); 
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  } 
}

async function main() {
  //Database
  await connect();

  //Express App
  const port = process.env.PORT || 3000;
  
  await server.listen(port);
  console.log(`Server on port ${port}: Connected`);
}

main();