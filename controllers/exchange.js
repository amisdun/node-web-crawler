const { convertCurrency } = require("../services/convertCurrency");

const exchangeRate = async (req, res) => {
  try {
    const { amount, currency } = req.query;
    const data = await convertCurrency(amount, currency);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  exchangeRate,
};
