const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("body-parser");
const server = express();

const port = process.env.PORT || 5008;

server.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.send("Servicio ncendido v 3.0");
});

server.post("/downloadPDF", function (req, res) {
  fetch(
    "https://crs.atuat.acegroup.com/DocumentHandling/DocumentHandler.ashx?dt=proposal&pi=b2836bbb-4a7d-409d-b34b-ae7e01733e55&sd=2022-04-21T22%3a31%3a40.2299255Z&ed=2199-12-31T00%3a00%3a00&dp=60a78fd8-946a-4db6-9fa2-ad84002a1880",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((resp) => resp.arrayBuffer())
    //.then((res) => res.text())
    .then((response) => {
      var base64Str = Buffer.from(response).toString("base64");
      console.log(base64Str);
      // base64.base64Decode(base64Str, "file.pdf");
      // console.log(response);
      // res.type("application/pdf");
      // res.header("Content-Disposition", `attachment; filename="example.pdf"`);
      // res.send(Buffer.from(base64Str, "base64"));

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ file: base64Str }));

      //res.send(response);
      //res.send("ok");
    })
    .catch((err) => {
      console.log(err);
      // logger.error("Error: Intento fallido de consumo para la configuración");
      // logger.error(err);
      // res.sendStatus(500);
      // process.exit();
      res.send("error");
    });
});

server.post("/download-pdf", (req, res) => {
  const urlFile = req.body.url;
  if (!urlFile) res.sendStatus(500);
  fetch(urlFile, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.arrayBuffer())
    .then((response) => {
      const base64Str = Buffer.from(response).toString("base64");
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ file: base64Str }));
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

server.listen(port, () => {
  console.log("api");
});
