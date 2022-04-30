import chai from "chai"
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { solidity } from "ethereum-waffle"

chai.use(solidity);

describe("ERC20 contract", function () {
  let GunGirlsNFT;
  let GunGirlsNFTInterface: Contract;
  let owner: SignerWithAddress;
  let acc1: SignerWithAddress;
  let acc2: SignerWithAddress;

  beforeEach(async function() {
    GunGirlsNFT = await ethers.getContractFactory("GunGirlsNFT");
    [owner, acc1, acc2] = await ethers.getSigners()    
    GunGirlsNFTInterface = await GunGirlsNFT.deploy();
    await GunGirlsNFTInterface.deployed()
  });

  describe("Deployment 8 NFT minting", function() {
    it("Should return owner balance equal 8 as a deployment minting", async function() {
      expect(await GunGirlsNFTInterface.balanceOf(owner.address)).to.equal("8")
    })
  })

  describe("Getter public functions", function() {
    it("Should return base URI from 'baseTokenURI' getter function", async function() {
      expect(await GunGirlsNFTInterface.baseTokenURI()).to.equal("https://gateway.pinata.cloud/ipfs/QmcCnCPnptuxd8b7FWvRuqBMXbxuyVKopp4fTSiXdwUXPU/")
    })

    it("Should return contract name from 'name' getter function", async function() {
        expect(await GunGirlsNFTInterface.name()).to.equal("GunGirls")
      })
    
    it("Should return contract symbol from 'symbol' getter function", async function() {
        expect(await GunGirlsNFTInterface.symbol()).to.equal("GGS")
      })

    it("Should return token URI from 'tokenURI' getter function", async function() {
        expect(await GunGirlsNFTInterface.tokenURI(1)).to.equal("https://gateway.pinata.cloud/ipfs/QmcCnCPnptuxd8b7FWvRuqBMXbxuyVKopp4fTSiXdwUXPU/1")
      })
  })

  describe("Only owner functions", function() {
    it("Only owner could mint new NFT", async function() {
      expect(GunGirlsNFTInterface.connect(acc1).mintTo(acc1.address)).to.be.revertedWith("Ownable: caller is not the owner")
    })

    it("Owner could mint new NFT to his address", async function() {
      await GunGirlsNFTInterface.connect(owner).mintTo(owner.address)
      expect(await GunGirlsNFTInterface.balanceOf(owner.address)).to.equal("9")
      })

    it("Only owner could set new base token URI", async function() {
        expect(GunGirlsNFTInterface.connect(acc1).setBaseTokenURI("myNewURI")).to.be.revertedWith("Ownable: caller is not the owner")
      })

    it("Owner could set new base token URI", async function() {
        await GunGirlsNFTInterface.connect(owner).setBaseTokenURI("myNewURI")
        expect(await GunGirlsNFTInterface.baseTokenURI()).to.equal("myNewURI")
      })
  })

  describe("Approving and transfering tokens", function() {
    it("Only owner of NFT could approve transfering", async function() {
      expect(GunGirlsNFTInterface.connect(acc1).approve(acc1.address, 1)).to.be.revertedWith("ERC721: approve caller is not owner nor approved for all")
    })

    it("Owner could approve transfering NFT to address", async function() {
      await GunGirlsNFTInterface.connect(owner).approve(acc1.address, 1)
      expect(await GunGirlsNFTInterface.getApproved(1)).to.equal(`${acc1.address}`)
      })

    it("After approving by owner, recepient can transfer NFT to his balance", async function() {
        await GunGirlsNFTInterface.connect(owner).approve(acc1.address, 1)
        await GunGirlsNFTInterface.connect(acc1).transferFrom(owner.address, acc1.address, 1)
        expect(await GunGirlsNFTInterface.balanceOf(acc1.address)).to.be.equal("1")
      })
  })

  describe("Setting approval for all NFTs", function() {
    it("Only owner can approve transfering all his NFT to certain operator", async function() {
      expect(GunGirlsNFTInterface.connect(acc1).setApprovalForAll(acc1.address, true)).to.be.revertedWith("ERC721: approve to caller")
      expect(await GunGirlsNFTInterface.isApprovedForAll(owner.address, acc1.address)).to.equal(false)
    })

    it("Owner can approve transfering all his NFT to certain operator", async function() {
      await GunGirlsNFTInterface.connect(owner).setApprovalForAll(acc1.address, true)
      expect(await GunGirlsNFTInterface.isApprovedForAll(owner.address, acc1.address)).to.equal(true)
      })

    it("After approving by owner, operator can transfer NFT to other addresses", async function() {
        await GunGirlsNFTInterface.connect(owner).setApprovalForAll(acc1.address, true)
        await GunGirlsNFTInterface.connect(acc1).transferFrom(owner.address, acc1.address, 1)
        await GunGirlsNFTInterface.connect(acc1).transferFrom(owner.address, acc2.address, 2)
        expect(await GunGirlsNFTInterface.balanceOf(acc1.address)).to.be.equal("1")
        expect(await GunGirlsNFTInterface.balanceOf(acc2.address)).to.be.equal("1")
      })
  })
})