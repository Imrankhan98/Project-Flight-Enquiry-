var mysql = require("mysql");
var pool = mysql.createPool(
    {  
        host:'localhost',
        port:3306,
        user:'root',
        password:'Imran@1234',
        database:'flight78',
        multipleStatements:true,
        connnectionLimit:100
         
    })
    module.exports=pool
