//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GunGirlsNFT is ERC721, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private currentTokenId;

  /// @dev Base token URI used as a prefix by tokenURI().
  string public baseTokenURI;

  constructor() ERC721("GunGirls", "GGS") {
    baseTokenURI = "https://gateway.pinata.cloud/ipfs/QmcCnCPnptuxd8b7FWvRuqBMXbxuyVKopp4fTSiXdwUXPU/";
    for (uint i = 0; i < 8; i++) {
      mintTo(msg.sender);
    }
  }

  function mintTo(address recipient) public onlyOwner returns (uint256) {
    currentTokenId.increment();
    uint256 newItemId = currentTokenId.current();
    _safeMint(recipient, newItemId);
    return newItemId;
  }

  /// @dev Returns an URI for a given token ID
  function _baseURI() internal view virtual override returns (string memory) {
    return baseTokenURI;
  }

  /// @dev Sets the base token URI prefix.
  function setBaseTokenURI(string memory _baseTokenURI) public onlyOwner {
    baseTokenURI = _baseTokenURI;
  }
}

