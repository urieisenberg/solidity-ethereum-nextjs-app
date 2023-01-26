module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  env: {
    MNEMONIC: process.env.MNEMONIC,
    INFURA: process.env.INFURA,
    ADDRESS: process.env.ADDRESS,
  },
};
