require('dotenv').config();

module.exports = {
  env: {
    MNEMONIC: process.env.MNEMONIC,
    INFURA: process.env.INFURA,
    ADDRESS: process.env.ADDRESS,
  },
};
