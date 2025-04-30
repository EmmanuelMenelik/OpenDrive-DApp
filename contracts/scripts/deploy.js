
async function main() {
  const FileStorage = await ethers.getContractFactory("FileStorage");
  const contract = await FileStorage.deploy();
  await contract.waitForDeployment();  
  console.log("FileStorage deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});