import React from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';

const ShowCampaign = ({
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  return (
    <Layout>
      <h3>Show Campaign</h3>
    </Layout>
  );
};

ShowCampaign.getInitialProps = async (props) => {
  const campaign = Campaign(props.query.address);
  const summary = await campaign.methods.getSummary().call();
  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

export default ShowCampaign;
