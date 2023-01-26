require('dotenv').config({ path: '../.env' });

const MNEMONIC = process.env.MNEMONIC;
const INFURA = process.env.INFURA;
const ADDRESS = process.env.ADDRESS;

module.exports = { MNEMONIC, INFURA, ADDRESS };
