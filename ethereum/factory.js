import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xE50711463Cd834c782CE11d9235f771151Ed8c45'
);

export default instance;
