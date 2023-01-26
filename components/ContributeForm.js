import React, { useState } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';

const ContributeForm = () => {
  const [value, setValue] = useState('');
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input label="ether" labelPosition="right" />
      </Form.Field>
      <Button primary>Contribute!</Button>
    </Form>
  );
};

export default ContributeForm;
