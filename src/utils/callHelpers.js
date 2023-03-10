import BigNumber from 'bignumber.js'
import { ethers } from 'ethers';
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from '../config';
import { BIG_TEN, BIG_ZERO } from './bigNumber';

export const approve = async (lpContract, masterChefContract, account) => {
    return lpContract.methods
        .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
        .send({ from: account })
}

export const sousStake = async (sousChefContract, amount, decimals = 18, account) => {
    return sousChefContract.methods
        .deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toFixed())
        .send({ from: account, gas: DEFAULT_GAS_LIMIT })
        .on('transactionHash', (tx) => {
        return tx.transactionHash
        })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
    return sousChefContract.methods
        .deposit()
        .send({
        from: account,
        gas: DEFAULT_GAS_LIMIT,
        value: new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(),
        })
        .on('transactionHash', (tx) => {
        return tx.transactionHash
        })
}

export const sousUnstake = async (sousChefContract, amount, decimals, account) => {
    console.log('unstake value: ', new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())

    return sousChefContract.methods
        .withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toFixed())
        .send({ from: account, gas: DEFAULT_GAS_LIMIT })
        .on('transactionHash', (tx) => {
        return tx.transactionHash
        })
}

export const sousEmergencyUnstake = async (sousChefContract, account) => {
    return sousChefContract.methods
        .emergencyWithdraw()
        .send({ from: account })
        .on('transactionHash', (tx) => {
        return tx.transactionHash
        })
}

export const soushHarvest = async (sousChefContract, account) => {
    return sousChefContract.methods
        .deposit('0')
        .send({ from: account, gas: DEFAULT_GAS_LIMIT })
        .on('transactionHash', (tx) => {
        return tx.transactionHash
        })
}
  

export const soushHarvestBnb = async (sousChefContract, account) => {
    return sousChefContract.methods
        .deposit()
        .send({ from: account, gas: DEFAULT_GAS_LIMIT, value: BIG_ZERO })
        .on('transactionHash', (tx) => {
        return tx.transactionHash
        })
}

  