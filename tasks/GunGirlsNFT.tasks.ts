import { task } from "hardhat/config";

// const ContractAddress = "0xB3dEf797Bfb93841efb1B98A61a71F1317c22d64" //OLD for Rinkeby network;
const ContractAddress = "0xfB90d78f44f39aeB1ddeC89fAfc29bFd8B533623" //NEW for Rikneby network;
// const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // for localhost network;

task("mintTo", "Owner mints new token to address")
    .addParam("to", "Address new token mint to")
    .setAction(async (taskArgs, hre) => {
        const GunGirlsNFTInterface = await hre.ethers.getContractAt("GunGirlsNFT", ContractAddress)
        await GunGirlsNFTInterface.mintTo(taskArgs.to)
        console.log("You have minted 1 new NFT")
    })

task("balanceOf", "Gets amount of nfts at account balance")
    .addParam("owner", "Address you want to get balance")
    .setAction(async (taskArgs, hre) => {
        const GunGirlsNFTInterface = await hre.ethers.getContractAt("GunGirlsNFT", ContractAddress)
        let balance = await GunGirlsNFTInterface.balanceOf(taskArgs.owner)
        console.log(`Account ${taskArgs.owner} has ${balance} GunGirls NFT on his balance`)
    })

task("tokenURI", "Gets certain token URI")
    .addParam("tokenid", "Token id you want get URI")
    .setAction(async (taskArgs, hre) => {
        const GunGirlsNFTInterface = await hre.ethers.getContractAt("GunGirlsNFT", ContractAddress)
        let uri = await GunGirlsNFTInterface.tokenURI(taskArgs.owner)
        console.log(`NFT №${taskArgs.owner} URI is ${uri}`)
    })

task("getApproved", "Gets address you allowed to transfer your certain NFT")
    .addParam("tokenid", "Token id you want to know address you allowed to transfer")
    .setAction(async (taskArgs, hre) => {
        const GunGirlsNFTInterface = await hre.ethers.getContractAt("GunGirlsNFT", ContractAddress)
        let addresses = await GunGirlsNFTInterface.getApproved(taskArgs.tokenid)
        console.log(`${addresses} allowed to transfer your NFT №${taskArgs.tokenid}`)
    })

task("ownerOf", "Gets address of NFT owner")
    .addParam("tokenid", "Token id you want to know owner")
    .setAction(async (taskArgs, hre) => {
        const GunGirlsNFTInterface = await hre.ethers.getContractAt("GunGirlsNFT", ContractAddress)
        let minting = await GunGirlsNFTInterface.ownerOf(taskArgs.tokenid)
        console.log(`Account ${minting} has NFT №${taskArgs.tokenid} on his balance`)
    })

task("transferFrom", "Transfering NFT from owner to approved recepient")
    .addParam("from", "Token owner address")
    .addParam("to", "Token recepient address")
    .addParam("tokenid", "Token id you want to transfer")
    .setAction(async (taskArgs, hre) => {
        const GunGirlsNFTInterface = await hre.ethers.getContractAt("GunGirlsNFT", ContractAddress)
        await GunGirlsNFTInterface.transferFrom(taskArgs.from, taskArgs.to, taskArgs.tokenid)
        console.log(`You have transfered NFT №${taskArgs.tokeid} to ${taskArgs.to} from ${taskArgs.from}`)
    })

task("approve", "Approve transfering NFT from owner to recepient")
    .addParam("to", "Token recepient address")
    .addParam("tokenid", "Token id you want approve to transfer")
    .setAction(async (taskArgs, hre) => {
        const GunGirlsNFTInterface = await hre.ethers.getContractAt("GunGirlsNFT", ContractAddress)
        await GunGirlsNFTInterface.approve(taskArgs.to, taskArgs.tokenid)
        console.log(`You have approved to transfer NFT №${taskArgs.tokeid} to ${taskArgs.to}`)
    })

task("setApprovallForAll", "Approving or revouking transfering all your NFT from your balance to recepient")
    .addParam("operator", "Operator address who you want allow or forbid to transfer all your NFT")
    .addParam("bool", "Boolean value: true - to allow, false - to forbid")
    .setAction(async (taskArgs, hre) => {
        const GunGirlsNFTInterface = await hre.ethers.getContractAt("GunGirlsNFT", ContractAddress)
        await GunGirlsNFTInterface.setApprovallForAll(taskArgs.operator, taskArgs.bool)
        console.log(`Now you set approved value to ${taskArgs.bool} to ${taskArgs.operator} operator`)
    })

task("setBaseTokenURI", "Setting new base token URI")
    .addParam("uri", "New token URI owner want to set")
    .setAction(async (taskArgs, hre) => {
        const GunGirlsNFTInterface = await hre.ethers.getContractAt("GunGirlsNFT", ContractAddress)
        await GunGirlsNFTInterface.setBaseTokenURI(taskArgs.uri)
        console.log(`Now base token URI is ${taskArgs.uri}`)
    })

task("giveAdminRights", "Adds new account as a Admin")
    .addParam("address", "Address to make a Admin")
    .setAction(async (taskArgs, hre) => {
        const GunGirlsNFTInterface = await hre.ethers.getContractAt("GunGirlsNFT", ContractAddress)
        await GunGirlsNFTInterface.giveAdminRights(taskArgs.address)
        console.log("New Admin is:", taskArgs.address)
    })

task("revokeAdminRights", "Revoke account as a Admin")
    .addParam("address", "Address to revoke as Admin")
    .setAction(async (taskArgs, hre) => {
        const GunGirlsNFTInterface = await hre.ethers.getContractAt("GunGirlsNFT", ContractAddress)
        await GunGirlsNFTInterface.revokeAdminRights(taskArgs.address)
        console.log(taskArgs.address,"Now is not a Admin")
    })

task("burn", "Burn NFT")
    .addParam("tokenid", "Token id you want to burn")
    .setAction(async (taskArgs, hre) => {
        const GunGirlsNFTInterface = await hre.ethers.getContractAt("GunGirlsNFT", ContractAddress)
        await GunGirlsNFTInterface.burn(taskArgs.tokenid)
        console.log("You have burn it", taskArgs.tokenid)
    })