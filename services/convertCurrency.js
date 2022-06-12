const ExchangeRate = require("../models/ExchangeRate");

const convertCurrency = async (amount, currency) => {
  let data = {};
  if (!amount || !currency) {
    data = await ExchangeRate.find({}).select(["-_id", "-date"]);
    return data;
  }
  const result = await ExchangeRate.findOne({
    currencyPair: `${currency.toUpperCase()}GHS`,
  });
  if (!result) {
    throw new Error("No Match Result found for exchange rate");
  }
  data.sellingPrize = result.selling * amount;
  data.buyingPrize = result.buying * amount;
  data.rate = `${result.midRate * amount}GHS`;
  return data;
};

module.exports = { convertCurrency };
