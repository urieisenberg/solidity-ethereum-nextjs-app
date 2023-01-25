const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
require('dotenv').config({path: '../.env'});
const compiledFactory = require('./build/CampaignFactory.json');

const mnemonic = process.env.MNEMONIC;
const infuraKey = process.env.INFURA_KEY;
console.log('mnemonic', mnemonic);

const provider = new HDWalletProvider(mnemonic, infuraKey);


const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};

deploy();
