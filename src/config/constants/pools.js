import tokens from "./tokens";

export const PoolCategory = {
  CORE: "Core",
  COMMUNITY: "Community",
  BINANCE: "Binance",
  AUTO: "Auto",
};

const pools = [
  // {
  //   sousId: 0,
  //   stakingToken: tokens.bris,
  //   earningToken: tokens.bris,
  //   contractAddress: {
  //     97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
  //     56: '0xbe69572b574165658251e19469Ec47AF26AC508F',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '10',
  //   sortOrder: 1,
  //   isFinished: false,
  // },
  // {

  {
    sousId: 5,
    stakingToken: tokens.stakeToken,
    earningToken: tokens.rewardToken,
    contractAddress: {
      97: "",
      56: "",
      32520: "",
      54857: "0xb9d9EB19001717320AaAd5eaA636E1620c6C73AB",
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    isFinished: false,
    sortOrder: 97,
    tokenPerBlock: "10",
  },
];

export default pools;
