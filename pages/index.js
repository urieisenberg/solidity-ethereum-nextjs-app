import React, { useEffect } from 'react';
import factory from '../ethereum/factory';

function CampaignIndex({campaigns}) {
  console.log(campaigns);
  return (
    <div>
      <h1>hh</h1>
    </div>
  );
}

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
