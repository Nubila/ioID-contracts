# ioID contracts

## Deployment

### IoTeX Testnet

1. ERC6551 contracts

```
ERC6551Registry: 0x000000006551c19487814612e58FE06813775758
MulticallForwarder: 0xcA1167915584462449EE5b4Ea51c37fE81eCDCCD
ERC4337EntryPoint: 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789
AccountGuardian: 0x48cD38eA9DBE56232Be27b0d64de8d2CC45B1b47
AccountV3Upgradable: 0x1d1C779932271e9Dc683d5373E84Fa4239F2b3fb
// AccountProxy: 0xdd55aDf21c2f53c01e44558D96E8e7A6F9297C5C
```

2. ioID contracts

```
Project deployed to 0xf07336E1c77319B4e740b666eb0C2B19D11fc14F
ProjectRegistry deployed to 0x060581AA1A4e0cC92FBd74d251913238De2F13cd
ioIDStore deployed to 0x60cac5CE11cb2F98bF179BE5fd3D801C3D5DBfF2
ioID deployed to 0x45Ce3E6f526e597628c73B731a3e9Af7Fc32f5b7
ioIDRegistry deployed to 0x0A7e595C7889dF3652A19aF52C18377bF17e027D
```

3. Factory

```
UniversalFactory deployed to 0x22E55A58BC88E6f2712dD4fbF5ef7EC153845bcC
```

### IoTeX Mainnet

1. ERC6551 contracts

```
ERC6551Registry: 0x000000006551c19487814612e58FE06813775758
MulticallForwarder: 0xcA1167915584462449EE5b4Ea51c37fE81eCDCCD
ERC4337EntryPoint: 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789
AccountGuardian: 0x2FE5ccb0d7Ea195FEb87987d3573F9fcCE2b5D57
AccountV3Upgradable: 0x41C8f39463A868d3A88af00cd0fe7102F30E44eC
// AccountProxy: 0x55266d75D1a14E4572138116aF39863Ed6596E7F
```

2. ioID contracts

```
Project deployed to 0xA596800891e6a95Bf737404411ef529c1F377b4e
ProjectRegistry deployed to 0x601B655c0a20FA1465C9a18e39387A33eEe7F777
ioIDStore deployed to 0xa822Fd390e8eD3FEC80Bd26c77DD036935463b5E
ioID deployed to 0x1FCB980eD0287777ab05ADc93012332e11300e54
ioIDRegistry deployed to 0x04e4655Cf258EC802D17c23ec6112Ef7d97Fa2aF
```

3. Factory

```
UniversalFactory deployed to 0xe0ac8360Eee3A7A17d1CD64720E61e2fB46ddE51

// DePow 0xa5c293471ef44625d9ef079296ff4f223405714d
```



# Register device on testnet

```
$ node_modules/.bin/hardhat run scripts/proxy-register.ts --network testnet
```