const nearAPI = require('near-api-js');
const base58 = require('bs58');
const fs = require('fs');
const { KeyPairEd25519 } = nearAPI.utils.key_pair;

async function generateNearCredentials(numberOfWallets) {
    let walletData = [];

    for (let i = 0; i < numberOfWallets; i++) {
        const keyPair = KeyPairEd25519.fromRandom();

        // Rekam informasi dompet
        const wallet = {
            privateKey: keyPair.secretKey,
            publicKey: keyPair.publicKey.toString(),
            implicitAccountId: convertPublicKeyToImplicitAccountId(keyPair.publicKey)
        };
        walletData.push(wallet);
    }
    fs.writeFileSync('near_wallets.json', JSON.stringify(walletData, null, 4));
}

function convertPublicKeyToImplicitAccountId(publicKey) {
    const keyWithoutPrefix = publicKey.toString().replace('ed25519:', '');

    const keyBytes = base58.decode(keyWithoutPrefix);

    return Buffer.from(keyBytes).toString('hex');
}

// Contoh: menghasilkan 10 个 NEAR dompet
generateNearCredentials(10).then(() => {
    console.log("Wallets generated and saved to near_wallets.json");
});
