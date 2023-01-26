import React, { useState } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';

const ContributeForm = () => {
  const [value, setValue] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Form.Field>
      <Button primary>Contribute!</Button>
    </Form>
  );
};

export default ContributeForm;
