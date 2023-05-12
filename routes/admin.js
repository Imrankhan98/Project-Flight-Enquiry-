var express = require("express");
var router = express.Router();
var pool = require("./pool");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

/* GET home page. */
router.get("/adminlogin", function (req, res, next) {
  res.render("adminlogin", { message: "" });
});
router.get("/adminlogout", function (req, res, next) {
  localStorage.clear()
  res.render("adminlogin", { message: "" });
});
router.post("/chkadminlogin", function (req, res, next) {
  pool.query(
    "select*from administrator where (emailid=? or mobilenumber=?) and password=?",
    [req.body.email_mobile, req.body.email_mobile, req.body.pwd],
    function (error, result) {
      if (error) {
        // res.render("adminlogin", { data:[],message: "server error..." });
      } else {
        //console.log(result);
        if (result.length == 1) {
          localStorage.setItem("ADMIN", JSON.stringify(result[0]));
          res.render("dashboard", { data:result[0] });
        } else {
          res.render("adminlogin", {
            message: "Invalid Email Address/Mobile No/Password",
          });
        }
      }
    }
  );
  //res.render("adminlogin");
});

module.exports = router;
