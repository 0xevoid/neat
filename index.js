require('dotenv').config();
const nearAPI = require('near-api-js');
const {connect, KeyPair, keyStores} = nearAPI;
const {parseSeedPhrase} = require("near-seed-phrase");

async function main() {
    const config = {
        networkId: process.env.NETWORK_ID || "mainnet",
        keyStore: new keyStores.InMemoryKeyStore(),
        nodeUrl: process.env.NODE_URL,
        contractName: process.env.CONTRACT_NAME,
    };

// Terhubung dengan NEAR
    const near = await connect(config);
    const mnemonic = process.env.MNEMONIC;
    const {secretKey} = parseSeedPhrase(mnemonic);
    const keyPair = KeyPair.fromString(secretKey);
    await config.keyStore.setKey(config.networkId, config.contractName, keyPair);
    const account = await near.account(config.contractName);
    // Saldo cetak
    console.log("Saldo rekening：", (await account.getAccountBalance()).available);
    // Tentukan parameter panggilan kontrak
    const contractArgs = {
        p: "nrc-20",
        op: "mint",
        tick: "neat",
        amt: "100000000"
    };

    const numberOfTimes = 100;

    for (let i = 0; i < numberOfTimes; i++) {
        try {
            const result = await account.functionCall({
                contractId: "inscription.near",
                methodName: "inscribe",
                args: contractArgs,
                gas: "30000000000000",
                attachedDeposit: "0",
            });
            let hash = result.transaction.hash
            console.log(`TIDAK. ${i + 1} Hasil panggilan kontrak：`, 'https://nearblocks.io/zh-cn/txns/' + hash);
        } catch (error) {
            console.error(`TIDAK. ${i + 1} Kesalahan panggilan kontrak：`, error);
        }
    }
}

main();
