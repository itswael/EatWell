const express = require("express");
const router = express.Router();
const resData = require("../util/restaurant-data");
const uuid = require("uuid");

router.get("/restaurants", function (req, res) {
  const storedRestaurants = resData.getStoredRestaurants();
  let order = req.query.order;
  let nextOrder = "desc";
  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }
  if(order === "desc"){
    nextOrder = "asc";
  }
  storedRestaurants.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    noOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
  });
});

router.get("/restaurants/:ID", function (req, res) {
  const storedRestaurants = resData.getStoredRestaurants();
  const restaurantID = req.params.ID;
  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantID)
      return res.render("restaurant-detail", { restaurant: restaurant });
  }
  return res.render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const storedRestaurants = resData.getStoredRestaurants();
  storedRestaurants.push(restaurant);
  resData.storeRestaurants(storedRestaurants);
  res.redirect("/confirm");
});
router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
