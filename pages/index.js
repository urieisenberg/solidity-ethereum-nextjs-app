import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import { Link } from '../routes';

const CampaignIndex = ({ campaigns }) => {
  const items = campaigns.map((address) => {
    return {
      header: address,
      description: <Link route={`/campaigns/${address}`}>View Campaign</Link>,
      fluid: true,
    };
  });

  return (
    <div>
      <Layout>
        <h3>Open Campaigns</h3>{' '}
        <Link route="/campaigns/new">
          <Button
            floated="right"
            content="Create Campaign"
            icon="add circle"
            primary
          />
        </Link>
        <Card.Group items={items} />
      </Layout>
    </div>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
