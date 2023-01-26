import React from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';

const ShowCampaign = ({ campaign }) => {
  const getSummary = async () => {
    const summary = await campaign.methods.getSummary().call();
    console.log(summary);
  };

  return (
    <Layout>
      <h3>Show Campaign</h3>
    </Layout>
  );
};

ShowCampaign.getInitialProps = async (props) => {
  const campaign = Campaign(props.query.address);
  return { campaign };
};

export default ShowCampaign;
