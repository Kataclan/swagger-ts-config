// [ from global ]
import * as express from "express";
import * as bodyParser from "body-parser";

// [ from local ]
import routes from "./routing/routes";
import G from './globals/G';
import { Swagger } from "./swagger/Swagger";


//////////////////////////////////////////////
//  
//    EXPRESS
//
//////////////////////////////////////////////
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};
app.use(allowCrossDomain);

var swagger = new Swagger();
swagger.readFolder("./dist/debug/res/api-docs");
swagger.publish(app);

app.use('/', routes);
app.use('/web', express.static(G.WwwRoot));

app.listen(G.Config.listenPort, () => {
  console.log(G.Config.startMessage);
});






