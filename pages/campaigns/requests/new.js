import React from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Router, Link } from '../../../routes';

const NewRequest = () => {
  return <div>new</div>;
};

NewRequest.getInitialProps = async (props) => {
  const { address } = props.query;
  return { address };
};

export default NewRequest;
