const mongoose = require("mongoose");

const connection = (url) => {
  return mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("connected to db")
  );
};

module.exports = connection;
