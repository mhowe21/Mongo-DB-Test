const express = require("express")
const moongoose = require("mongoose")
const PORT = process.env.PORT || 3030


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(require("./routes"));

app.listen(PORT, () => console.log(`Live on port ${PORT}`));



