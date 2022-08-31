const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();


app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");

app.use("/",defaultRoutes);
app.use("/",restaurantRoutes);

app.use(function(req,res){
    res.render("404");
})

app.use(function(error, req, res, next){
    res.render("500");
})

app.listen(3000);