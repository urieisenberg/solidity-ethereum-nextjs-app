module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  env: {
    MNEMONIC: process.env.MNEMONIC,
    INFURA: process.env.INFURA,
    ACCOUNT_ADDRESS: process.env.ACCOUNT_ADDRESS,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
  },
};
