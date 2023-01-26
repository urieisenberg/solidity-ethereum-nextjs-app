require('dotenv').config({ path: '../.env' });

const mnemonic = process.env.MNEMONIC;
const infuraKey = process.env.INFURA_KEY;
const address = process.env.ADDRESS;

module.exports = { mnemonic, infuraKey, address };
