const express = require("express");
const morgan = require("morgan");

const app = express();

//Middleware:

const getZoos = require("./utils/getZoos");
const validateZip = require("./middleware/validateZip");

//Logging function:

app.use(morgan("dev"));

//Routes:

app.get("/zoos/all", (req, res, next) => {
  const allZoos = getZoos("all").join("; ");
  if (req.query.admin === "true") {
    res.send(`All zoos: ${allZoos}`);
  } else {
    next("You do not have access to that route.");
  }
});

app.get("/check/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  const zoos = getZoos(zip);
  if (!zoos) {
    next(`${zip} does not exist in our records.`);
  } else {
    res.send(`${zip} exists in our records.`);
  }
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  const zoos = getZoos(zip);
  if (zoos.length === 0) {
    res.send(`${zip} has no zoos.`);
  } else {
    const zooList = zoos.join("; ");
    res.send(`${zip} zoos: ${zooList}`);
  }
});

//Error handlers:

app.use((req, res, next) => {
  res.send("That route could not be found!");
});

app.use((err, req, res, next) => {
  console.error(`There was an error: ${err}`);
  res.send(err);
});

module.exports = app;
