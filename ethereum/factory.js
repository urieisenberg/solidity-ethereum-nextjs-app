import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0xCeB1502c71E0E7d916a5745957fAcDDaf81Ae1fE'
);

export default instance;
