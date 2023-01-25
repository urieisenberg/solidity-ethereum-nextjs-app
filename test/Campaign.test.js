const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts(); // returns a list of unlocked accounts

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)) // interface is the ABI
    .deploy({ data: compiledFactory.bytecode }) // bytecode is the compiled contract
    .send({ from: accounts[0], gas: '1000000' }); // deploys the contract

  await factory.methods.createCampaign('100').send({
    // creates a new campaign
    from: accounts[0], // the creator of the campaign
    gas: '1000000', // gas limit
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call(); // returns the address of the deployed campaign
  campaign = await new web3.eth.Contract( // creates a new contract instance
    JSON.parse(compiledCampaign.interface), // interface is the ABI
    campaignAddress // address of the deployed contract
  );
});
