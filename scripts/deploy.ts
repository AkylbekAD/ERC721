import hre from 'hardhat';
const ethers = hre.ethers;

const rinkebyAddress = "0xB3dEf797Bfb93841efb1B98A61a71F1317c22d64";

async function main() {
    const [owner] = await ethers.getSigners()
    const ERC721 = await ethers.getContractFactory('GunGirlsNFT', owner)
    const erc721 = await ERC721.deploy()
    await erc721.deployed()
    console.log(erc721.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

