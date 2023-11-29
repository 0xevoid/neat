require('dotenv').config();
const nearAPI = require('near-api-js');
const { connect, KeyPair, keyStores, utils } = nearAPI;
const { parseSeedPhrase } = require("near-seed-phrase");
const {readFileSync} = require("fs");

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
    const { secretKey } = parseSeedPhrase(mnemonic);
    const keyPair = KeyPair.fromString(secretKey);
    await config.keyStore.setKey(config.networkId, config.contractName, keyPair);
    const account = await near.account(config.contractName);

    const wallets = JSON.parse(readFileSync('near_wallets.json', 'utf-8'));
    const recipients = wallets.map(wallet => wallet.implicitAccountId);

    const amountYoctoNEAR = utils.format.parseNearAmount("1");

    for (const recipient of recipients) {
        try {
            const result = await account.sendMoney(
                recipient,
                amountYoctoNEAR
            );
            console.log(`transfer ke ${recipient} kesuksesan: hash transaksi ${result.transaction.hash}`);
        } catch (error) {
            console.error(`transfer ke ${recipient} gagal: `, error);
        }
    }
}

main();
