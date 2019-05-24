require('dotenv').config();

const express = require ('express');
const morgan = require ('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();

/**
 * Database setup
 */
mongoose.connect(
    process.env.MONGO_URL,
{
    useNewUrlParser: true
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
//liberar acesso arquivos
app.use("/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads" )));

app.use(require("./routes"));

/*Heroku preenche automaticamente porta
OU porta ambiente dev */
app.listen(process.env.PORT || 3000);
