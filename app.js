const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var csv = require("fast-csv");
const Product = require("./model/product");
const app = express();
const path = require("path");
var multer = require("multer");

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: "./files",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + path.extname(file.originalname));
  },
});
const maxSize = 1000000000;
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("myfile");

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      if (req.file == undefined) {
        res.json({
          msg: "Error: No File Selected!",
        });
      } else {
        let csvStream = csv
          .parseFile("./files/myfile.csv", { headers: true })
          .on("data", function (row) {
            csvStream.pause();
            Product.create(row)
              .then(() => {
                console.log("Successfull");
              })
              .catch((err) => {
                console.log({
                  message:
                    err.message ||
                    "Some error occurred while Insert the Product",
                });
              });
            setTimeout(() => {
              csvStream.resume();
            }, 1000);
          })
          .on("end", function () {
            res.send({
              msg: "FILE UPLOADED SUCCESSFULLY TO THE DATABASE !!",
            });
          })
          .on("error", function (err) {
            console.log(err);
          });
      }
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
