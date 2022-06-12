const mongoose = require("mongoose");

const ExchangeRateSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  currency: {
    type: String,
  },
  currencyPair: {
    type: String,
  },
  buying: {
    type: Number,
  },
  selling: {
    type: Number,
  },
  midRate: {
    type: Number,
  },
});

module.exports = mongoose.model("ExchangeRate", ExchangeRateSchema);
