import React, { useState } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';

const NewCampaign = () => {
  const [minimumContribution, setMinimumContribution] = useState('');

  return (
    <Layout>
      <h3>Create a Campaign</h3>
      <Form>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(event) => setMinimumContribution(event.target.value)}
          />
        </Form.Field>
        <Button primary>Create!</Button>
      </Form>
    </Layout>
  );
};

export default NewCampaign;
