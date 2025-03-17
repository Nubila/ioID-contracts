import { ethers } from 'hardhat';
import { IoIDStore, VerifyingProxy } from '../typechain-types';

const PROJECT_REGISTRY_ADDRESS = process.env.PROJECT_REGISTRY;
const IOIDSTORE_ADDRESS = process.env.IOID_STORE;
const TOTAL_IOIDS = parseInt(process.env.TOTAL_IOIDS as string);
const VERIFIER_ADDRESS = process.env.VERIFIER_ADDRESS;
let DEVICE_NFT_ADDRESS = process.env.DEVICE_NFT;
let VERIFYING_PROXY = process.env.VERIFYING_PROXY;

async function main() {
  if (!PROJECT_REGISTRY_ADDRESS) {
    console.log(`Please provide project registry address`);
    return;
  }
  if (!IOIDSTORE_ADDRESS) {
    console.log(`Please provide ioIDStore address`);
    return;
  }
  if (!VERIFIER_ADDRESS) {
    console.log(`Please provide VERIFIER_ADDRESS address`);
    return;
  }
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer: ${await deployer.getAddress()}`);
  const IoIDStore = await ethers.getContractFactory('ioIDStore');
  const ioIDStore = IoIDStore.attach(IOIDSTORE_ADDRESS) as IoIDStore;
  const ioidPrice = await ioIDStore.price();
  const totalPrice = BigInt(TOTAL_IOIDS) * ioidPrice

  const deployerBalance = await ethers.provider.getBalance(deployer.address);
  if (deployerBalance < totalPrice) throw new Error(`Balance is not enough for ${Number(ethers.formatEther(totalPrice)).toFixed(2)} IOTX`);

  if (!DEVICE_NFT_ADDRESS) {
    const deviceNFT = await ethers.deployContract('DeviceNFT');
    await deviceNFT.waitForDeployment();
    console.log(`Device NFT deployed to ${deviceNFT.target}`);
    DEVICE_NFT_ADDRESS = deviceNFT.target as string;
  }

  console.log(`Project Registry Address: ${PROJECT_REGISTRY_ADDRESS}`);
  console.log(`ioID Store Address: ${IOIDSTORE_ADDRESS}`);
  console.log(`Device NFT Address: ${DEVICE_NFT_ADDRESS}`);

  console.log(`Balance is ${Number(ethers.formatEther(deployerBalance)).toFixed(2)} IOTX`);

  const VerifyingProxy = await ethers.getContractFactory('VerifyingProxy');
  let verifyingProxy;

  if (!VERIFYING_PROXY) {
    console.log(`Deploying the Proxy contract with account: ${deployer.address}`);
    verifyingProxy = await VerifyingProxy.deploy(IOIDSTORE_ADDRESS, PROJECT_REGISTRY_ADDRESS, DEVICE_NFT_ADDRESS);
    await verifyingProxy.waitForDeployment();

    console.log(`Verifying Proxy Contract deployed to: ${verifyingProxy.target}`);
    VERIFYING_PROXY = verifyingProxy.target as string;
  } else {
    verifyingProxy = VerifyingProxy.attach(VERIFYING_PROXY) as VerifyingProxy;
  }

  await verifyingProxy['initialize(uint8,address,string,string,string,uint256)'](
    0,
    VERIFIER_ADDRESS,
    "Nubila",
    "Nubila Device",
    "Nubila-Device",
    TOTAL_IOIDS, {
    value: totalPrice
  });
}

main().catch((error) => {
  console.error('Error during deployment:', error.message);
  process.exitCode = 1;
});