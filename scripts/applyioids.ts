import { ethers } from 'hardhat';
import { IoIDStore, VerifyingProxy } from '../typechain-types';

const IOIDSTORE_ADDRESS = process.env.IOID_STORE;
const ADDED_IOIDS = parseInt(process.env.ADDED_IOIDS as string);
const VERIFYING_PROXY = process.env.VERIFYING_PROXY;

async function main() {
  if (!IOIDSTORE_ADDRESS) {
    console.log(`Please provide ioIDStore address`);
    return;
  }
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer: ${await deployer.getAddress()}`);
  const IoIDStore = await ethers.getContractFactory('ioIDStore');
  const ioIDStore = IoIDStore.attach(IOIDSTORE_ADDRESS) as IoIDStore;
  const ioidPrice = await ioIDStore.price();
  const totalPrice = BigInt(ADDED_IOIDS) * ioidPrice;

  const deployerBalance = await ethers.provider.getBalance(deployer.address);
  if (deployerBalance < totalPrice) throw new Error(`Balance is not enough for ${Number(ethers.formatEther(totalPrice)).toFixed(2)} IOTX`);

  console.log(`ioID Store Address: ${IOIDSTORE_ADDRESS}`);
  console.log(`Balance is ${Number(ethers.formatEther(deployerBalance)).toFixed(2)} IOTX`);

  const VerifyingProxy = await ethers.getContractFactory('VerifyingProxy');

  if (!VERIFYING_PROXY) {
    console.log(`Please provide ioIDStore address`);
    return;
  }
  const verifyingProxy = VerifyingProxy.attach(VERIFYING_PROXY) as VerifyingProxy;

  console.log(`Apply ${ADDED_IOIDS} ioIDs`);

  const tx = await verifyingProxy.applyIoIDs(
    ADDED_IOIDS, {
    value: totalPrice
  });
  console.log(await tx.wait());
}

main().catch((error) => {
  console.error('Error during applyIoIDs:', error.message);
  process.exitCode = 1;
});