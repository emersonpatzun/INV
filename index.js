const app = require("./app");
const db = require("./models");
const PORT = process.env.PORT || 8080;

db.sequelize
.sync()
   .then(() => {
     console.log(`\u001b[33mSuccessful database connection`);
     app.listen(PORT, (req, res) => {
       console.log(`\u001b[33mExpress server raised in port: ${PORT}`);
     });
   })
   .catch((error) => {
     console.log("Error", error);
       });
