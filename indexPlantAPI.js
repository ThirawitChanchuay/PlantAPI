var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var apiversion='/api/v1';


//MYSQL Connection
var db = require('./config/db.config');


var port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Get all plants
app.get(apiversion + '/plants',  function (req, res)  {  

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  db.query('SELECT * FROM plants', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'plants list', data: results });
  });

  
});

app.get(apiversion + '/plant/:plantId',  function (req, res)  {  
  
  var plantId = req.params.plantId;

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  db.query('SELECT * FROM plants where plantId=?', plantId.toString(),function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'plant Id = ' + plantId.toString(), data: results });
  });


});


//post plants by Id
app.post(apiversion + '/plants',  function (req, res)  {  

  var plantId = Number(req.body.plantId);
  var plantName = req.body.plantName;
  var plantDetail = req.body.plantDetail;
  var plantPrice = Number(req.body.plantPrice);
  var plantPicture = req.body.plantPicture;


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  
  db.query(`INSERT INTO plants 
            (plantId,plantName,plantDetail,plantPrice,plantPicture) VALUES (${plantId},'${plantName}','${plantDetail}',${plantPrice},'${plantPicture}');
               
  
            `,function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, message: ' Modified plant' });
   });

});




   


app.listen(port, function () {
  console.log("Server is up and running...");
});
