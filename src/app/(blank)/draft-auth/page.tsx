'use client'
import '@particle-network/connect-react-ui/dist/index.css';
import { useConnect, useEthereum, useSolana } from '@particle-network/auth-core-modal';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles  from '../../Home.module.css'

import { Avalanche } from '@particle-network/chains';

import { ConnectButton, useConnectKit } from '@particle-network/connect-react-ui';
import { ParticleNetwork } from '@particle-network/auth';


const particle = new ParticleNetwork({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
    clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
    appId: process.env.NEXT_PUBLIC_APP_ID as string,
    chainName: Avalanche.name,
    chainId: Avalanche.id,
    wallet: {
      displayWalletEntry: true,
      uiMode: "dark"
    },
  });

  
const Home: NextPage = () => {
    const { connect, disconnect, connectionStatus } = useConnect(); // for auth-core-modal
    const { address, chainId, provider, sendTransaction, signMessage, signTypedData } = useEthereum();


    const connectKit = useConnectKit() // for connect-react-ui
    console.log(connectKit.particle.auth.getUserInfo())
    // use for solana chains


    const { address: solanaAddress, signAndSendTransaction } = useSolana();
    
    const handleLogin = async (preferredAuthType: 'google' | 'twitter' | 'discord' | 'github' | 'apple' ) => { // for specific login
        const user = !particle.auth.isLogin() ? await particle.auth.login({preferredAuthType}) : particle.auth.getUserInfo();
        console.log(user)

      }
    const handleConnect = async () => {
        try {
            await connect();
        } catch (error) {
            console.log(error);
        }
    };
    

    const handleDisconnect = async () => {
        try {
            await disconnect();
        } catch (error) {
            console.log(error);
        }
    };
    function metamaskConnect() {
        return new Promise(async (resolve, reject) => {
            const chainId = await window["ethereum"]?.request({ method: 'eth_chainId' });
            const accounts = await window["ethereum"]?.
                request({method: 'eth_requestAccounts'})//@ts-ignore
                .catch(e => { 
                    console.error(e);
                    return reject();
                });
        
            // After connection
            if (accounts?.length && accounts[0] && chainId) {
                // Get chain name by chain ID


            }
        })
    }

    return (
        <div className='overflow-auto'>
            <ConnectButton>
                
            </ConnectButton>
            <main className={styles.main}>
                {connectionStatus !== 'connected' && (
                    <>
                        <button className={styles.btn} onClick={handleConnect}>
                            {connectionStatus === 'disconnected' ? 'CONNECT' : connectionStatus.toUpperCase()}
                        </button>
                    </>
                )}
                        <button className={styles.btn} onClick={(e)=>handleLogin('twitter')}>
                            Twitter Login
                        </button>
                        
                        <button className={styles.btn} onClick={(e)=>handleLogin('github')}>
                            GitHub Login
                        </button>

                        <button className={styles.btn} onClick={(e)=>handleLogin('apple')}>
                            Apple Login
                        </button>

                        <button className={styles.btn} onClick={(e)=>handleLogin('discord')}>
                            Discord Login
                        </button>
                {connectionStatus === 'connected' && (
                    <>
                        <button className={styles.btn} onClick={handleDisconnect}>
                            DISCONNECT
                        </button>
                    </>
                )}

                <h1 className={styles.title}>
                    <a href="https://particle.network">Particle Network!</a>
                </h1>

                <p className={styles.description}>
                    <code className={styles.code}>pages/index.tsx</code>
                </p>

                <div className={styles.grid}>
                    <a href="https://docs.particle.network" className={styles.card}>
                        <h2>Documentation &rarr;</h2>
                        <p>Find in-depth information about AuthCore features and API.</p>
                    </a>

                    <a href="https://dashboard.particle.network" className={styles.card}>
                        <h2>Dashboard &rarr;</h2>
                        <p>Manage your projects and team, View analytics data, Custom configuration.</p>
                    </a>

                    <a href="https://github.com/Particle-Network/particle-web-auth-core" className={styles.card}>
                        <h2>Examples &rarr;</h2>
                        <p>Discover and deploy boilerplate example AuthCore projects.</p>
                    </a>

                    <a href="https://particle.network" className={styles.card}>
                        <h2>Website &rarr;</h2>
                        <p>Particle Network, The Intent-Centric Modular Access Layer of Web3.</p>
                    </a>
                </div>
            </main>
        </div>

    );
};

export default Home;
function setUserInfo(user: import("@particle-network/auth").UserInfo | null) {
    throw new Error('Function not implemented.');
}

