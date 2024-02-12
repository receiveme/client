'use client'
import '@particle-network/connect-react-ui/dist/index.css';
import { useConnect, useEthereum, useSolana } from '@particle-network/auth-core-modal';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles  from '../../Home.module.css'

import { ConnectButton, useConnectKit } from '@particle-network/connect-react-ui';

const Home: NextPage = () => {
    const { connect, disconnect, connectionStatus } = useConnect();

    // use for evm chains
    const { address, chainId, provider, sendTransaction, signMessage, signTypedData } = useEthereum();
    const connectKit = useConnectKit()
    
    console.log(connectKit.particle.auth.getUserInfo())
    // use for solana chains
    const { address: solanaAddress, signAndSendTransaction } = useSolana();

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
