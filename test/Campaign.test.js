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

  factory = await new web3.eth.Contract(compiledFactory.abi) // interface is the ABI
    .deploy({ data: compiledFactory.bytecode }) // bytecode is the compiled contract
    .send({ from: accounts[0], gas: '1000000' }); // deploys the contract

  await factory.methods.createCampaign('100').send({
    // creates a new campaign
    from: accounts[0], // the creator of the campaign
    gas: '1000000', // gas limit
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call(); // returns the address of the deployed campaign
  campaign = await new web3.eth.Contract( // creates a new contract instance
    compiledFactory.abi, // interface is the ABI
    campaignAddress // address of the deployed contract
  );
});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    // checks if the factory and campaign were deployed
    assert.ok(factory.options.address); // checks if the factory has an address
    assert.ok(campaign.options.address); // checks if the campaign has an address
  });

  it('marks caller as the campaign manager', async () => {
    // checks if the manager of the campaign is the creator of the campaign
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    // checks if the contributor is an approver
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1],
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it('requires a minimum contribution', async () => {
    // checks if the minimum contribution is met
    try {
      await campaign.methods.contribute().send({
        value: '5',
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('allows a manager to make a payment request', async () => {
    // checks if the manager can create a payment request
    await campaign.methods
      .createRequest('Buy batteries', '100', accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000',
      });
    const request = await campaign.methods.requests(0).call();
    assert.equal('Buy batteries', request.description);
  });

  it('processes requests', async () => {
    // checks if the request is processed
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether'),
    });

    await campaign.methods
      .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({ from: accounts[0], gas: '1000000' });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000',
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000',
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
  });
});
