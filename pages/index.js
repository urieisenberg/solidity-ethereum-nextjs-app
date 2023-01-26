import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import factory from '../ethereum/factory';

function CampaignIndex({ campaigns }) {
  console.log(campaigns);

  function renderCampaigns() {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: <a></a>,
        fluid: true,
      };
    });

    return items;
  }

  return (
    <div>
      <link
        async
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
      <h3>Open Campaigns</h3>
      <Card.Group items={renderCampaigns()} />
      <Button content="Create Campaign" icon="add circle" primary />
    </div>
  );
}

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
