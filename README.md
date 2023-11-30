# Near naskah prasasti

## Install

```
yarn install
```
Merevisi .env.example untuk .env

## Konfigurasikan variabel lingkungan
Buat file .env di direktori root proyek dan isi informasi berikut：
```
NETWORK_ID=mainnet
#NODE Nodenya ada di https://docs.near.org/api/rpc/providers mencoba untuk mencari
NODE_URL=
#Alamat Anda bisa .near Atau alamat biasa
CONTRACT_NAME=
#frase mnemonik Anda
MNEMONIC=''
```

## Run
```
node index.js
```

## Pembuatan batch dompet
```
node wallet_gen.js
```

Jumlah angka yang dihasilkan dapat disesuaikan dalam kode. ImplicitAccountId adalah alamat Anda.


## Pemindahan batch
```
node transfer.js
```
Harap lakukan pembuatan batch terlebih dahulu, lalu lakukan transfer batch
Secara default, semua alamat di near_wallets.json yang dihasilkan ditransfer ke 1 dekat.

## Permintaan kuantitas MINT
```
node query.js
```
