const mongoose = require("mongoose");
var dburl = "mongodb://192.168.0.150:27017/Proyecto_DASE";
mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useFindAndModify", false);
module.exports = mongoose;
