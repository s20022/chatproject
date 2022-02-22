"use strict";
const express = require("express"),
    app = express();

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json())

const homeController = require("./controllers/homeController");

const layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");

app.use(layouts);

app.set("port", process.env.PORT || 3000);

app.get("/", (req,res) => {
    res.send("Hello");
})

app.listen(app.get("port"),() => {
    console.log(
        `server running at http://localhost:${app.get("post")}`
    );
});

app.get("/home", homeController.showHome);

app.get("/chat", homeController.showChat);