require('dotenv').config({ path: '../.env' });

const MNEMONIC = process.env.MNEMONIC;
const INFURA = process.env.INFURA;
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

module.exports = { MNEMONIC, INFURA, ACCOUNT_ADDRESS, CONTRACT_ADDRESS };
