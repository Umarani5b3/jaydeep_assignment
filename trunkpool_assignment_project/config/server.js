/**
 * Created by Jaydeep on 6/27/2018.
 */
const ip = require('ip');

var mode = 'h';

if(mode === "l") {
  process.env.port = 8080;
  host = "127.0.0.1";
}
else if(mode === "h"){
  process.env.port = 8080;
  host = ip.address();
}

module.exports = {
  domain: "http://"+host,
  port: process.env.port,
  mode: mode,
  serverURL: "http://"+ host + ":" + process.env.port
};