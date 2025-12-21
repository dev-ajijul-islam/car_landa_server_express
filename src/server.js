
const dotenv = require("dotenv");
const app = require("./app.js");

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server is running under port ${port}`);
});