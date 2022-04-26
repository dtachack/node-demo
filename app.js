const fetch = require("node-fetch");
const express = require("express");
const app = express();

const port = process.env.PORT || 5008;
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("Servicio ncendido");
});

app.post("/downloadPDF", function (req, res) {
  fetch(
    "https://crs.atuat.acegroup.com/DocumentHandling/DocumentHandler.ashx?dt=proposal&pi=b2836bbb-4a7d-409d-b34b-ae7e01733e55&sd=2022-04-21T22%3a31%3a40.2299255Z&ed=2199-12-31T00%3a00%3a00&dp=60a78fd8-946a-4db6-9fa2-ad84002a1880",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => res.text())
    .then((response) => {
      var base64Str = Buffer.from(response).toString("base64");
      // console.log(base64Str);
      // base64.base64Decode(base64Str, "file.pdf");
      // console.log(response);
      // res.type("application/pdf");
      // res.header("Content-Disposition", `attachment; filename="example.pdf"`);
      // res.send(Buffer.from(base64Str, "base64"));
      res.send(base64Str);
      // res.send("ok");
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

app.listen(port, () => {
  console.log("api");
});
