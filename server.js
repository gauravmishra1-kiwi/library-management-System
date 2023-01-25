require("./config/db");
const express = require('express');
const app = express();

const User = require("./model/user");
const Book = require("./model/book");

app.use(express.json())

app.use(require("./router/user_route"));
app.use(require("./router/book_router"));
app.use(require("./router/admin"));
app.use(require("./router/suadmin"));

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`connection sucess at ${port}`);
})