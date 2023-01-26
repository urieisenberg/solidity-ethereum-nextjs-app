import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';


const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xa4A297D6E6F42400FD70d9E1BDf4a9030507791C"
);

export default instance;
