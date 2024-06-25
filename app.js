require("dotenv").config();
const express = require("express");

const app = express();

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))

app.use("/",require("./routes/news"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server Listining On Port ${PORT}`));

