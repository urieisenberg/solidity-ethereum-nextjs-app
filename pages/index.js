import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';

const CampaignIndex = ({ campaigns }) => {
  console.log(campaigns);

  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: <a></a>,
        fluid: true,
      };
    });

    return items;
  };

  return (
    <div>
      <Layout>
        <h3>Open Campaigns</h3>
        <Card.Group items={renderCampaigns()} />
        <Button content="Create Campaign" icon="add circle" primary />
      </Layout>
    </div>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
