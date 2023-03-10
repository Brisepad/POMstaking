import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { connectorLocalStorageKey } from '../wallet/config';
import poolsConfig from '../../config/constants/pools';
import Pool from './Pool';
import { fetchPoolsAllowance, fetchUserBalances, fetchUserPendingRewards, fetchUserStakeBalances } from '../../state/pools/fetchPoolsUser';
import { fetchPoolsTotalStaking } from '../../state/pools/fetchPools';
import "./styles/pools.css";
import { useDebugValue } from 'react/cjs/react.production.min';


const Pools = ({ login, onDismiss = () => null, logout }) => {

    const { account, library } = useWeb3React();
    
    const [activePools, setActivePools] = useState([]);
    const [userData, setUserData] = useState([]);
    const [poolsTotalStaked, setPoolsTotalStaked] = useState([]);

    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            const connectorId = localStorage?.getItem(connectorLocalStorageKey);
            if (connectorId) {
                try {
                login(connectorId);
                window.initWeb3 = library;

                // localStorage.setItem('isWalletConnected', true)
                } catch (ex) {
                console.log(ex)
                }
            }
        }
        connectWalletOnPageLoad();
        (
            async () => {
                const totalStaked = await fetchPoolsTotalStaking();
                setPoolsTotalStaked(totalStaked);
                        
                if(account !== undefined){
                    try {
                            const loadUserData = async() => {
                            const stakingTokenBalances = await fetchUserBalances(account);
                            const allowances = await fetchPoolsAllowance(account);
                            const stakedBalances = await fetchUserStakeBalances(account);
                            const pendingRewards = await fetchUserPendingRewards(account);
                            const userData = poolsConfig.map((pool) => ({
                                sousId: pool.sousId,
                                allowance: allowances[pool.sousId],
                                stakingTokenBalance: stakingTokenBalances[pool.sousId],
                                stakedBalance: stakedBalances[pool.sousId],
                                pendingReward: pendingRewards[pool.sousId],
                            }));
                
                            setUserData(userData);
                                    
                        }
                        await loadUserData(account);
                        
                    } catch (error) {
                        console.log(error);
                    }
                }
                

                
            }
        )();
    }, [account]);

    useEffect(() => {
        window.initWeb3 = library;
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            (
                async () => {
                    try {
                        const totalStaked = await fetchPoolsTotalStaking();
                        setPoolsTotalStaked(totalStaked);
                        if(account !== undefined){

                            const loadUserData = async() => {
                                const stakingTokenBalances = await fetchUserBalances(account);
                                const allowances = await fetchPoolsAllowance(account);
                                const stakedBalances = await fetchUserStakeBalances(account);
                                const pendingRewards = await fetchUserPendingRewards(account);
                                const userData = poolsConfig.map((pool) => ({
                                    sousId: pool.sousId,
                                    allowance: allowances[pool.sousId],
                                    stakingTokenBalance: stakingTokenBalances[pool.sousId],
                                    stakedBalance: stakedBalances[pool.sousId],
                                    pendingReward: pendingRewards[pool.sousId],
                                }));
                                // console.log('userDetail userData: ', userData);
                                setUserData(userData);
                                        
                            }
                            await loadUserData(account);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    
                    
                }
            )();
        }, 15000)
        
        return () => clearInterval(intervalId); //This is important
    
    }, [])
    useEffect(() => {
        const openPools = poolsConfig.filter(pool => !pool.isFinished).sort().reverse();
        setActivePools(openPools);
    }, []);
    return(
        <div className='pools_container'>
            <div className='pools_content'>
                {
                    // const openPools = poolsConfig.filter(pool => !pool.isFinished).sort().reverse()
                    activePools.length > 0
                    ?
                    activePools.map((pool, index) => (
                        <Pool
                            library={library}
                            stakedPool={poolsTotalStaked.length > 0 ? (poolsTotalStaked.filter(poolStake => poolStake.sousId === pool.sousId))[0] : [{}]}
                            key={index}
                            pool={pool}
                            userData={userData.filter(data => data.sousId === pool.sousId)}
                        />
                    ))
                    :
                    <div className='no-pools'>
                        <h4>No Pools Available</h4>

                    </div>



                    
                }
            </div>
        </div>
    );
};

export default Pools;