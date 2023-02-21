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
    stakingToken: tokens.ppc,
    earningToken: tokens.wpom,
    contractAddress: {
      97: "",
      56: "",
      32520: "",
      54857: "",
      18159: "0xf6C55A94e77D72735286Ff84694D5CF095CA4B59",
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    isFinished: false,
    sortOrder: 97,
    tokenPerBlock: "4.5",
  },
];

export default pools;
