//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GunGirlsNFT is ERC721, Ownable, AccessControl {
  using Counters for Counters.Counter;

  Counters.Counter private currentTokenId;

  /// @dev Base token URI used as a prefix by tokenURI().
  string public baseTokenURI;
  bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

  constructor() ERC721("GunGirls721", "GGS") {
    baseTokenURI = "https://gateway.pinata.cloud/ipfs/QmcCnCPnptuxd8b7FWvRuqBMXbxuyVKopp4fTSiXdwUXPU/";
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(ADMIN_ROLE, msg.sender);
  }

  modifier isAdmin() {
    require(hasRole(ADMIN_ROLE, msg.sender), "You dont have ADMIN rights");
    _;
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function mintTo(address recipient) external isAdmin returns (uint256) {
    currentTokenId.increment();
    uint256 newItemId = currentTokenId.current();
    _safeMint(recipient, newItemId);
    return newItemId;
  }

  function burn(uint256 tokenId) external isAdmin {
    _burn(tokenId);
    currentTokenId.decrement();
  }

  function giveAdminRights (address newChanger) external onlyOwner {
    _grantRole(ADMIN_ROLE, newChanger);
  }

  function revokeAdminRights (address newChanger) external onlyOwner {
    _revokeRole(ADMIN_ROLE, newChanger);
  }

  /// @dev Returns an URI for a given token ID
  function _baseURI() internal view virtual override returns (string memory) {
    return baseTokenURI;
  }

  /// @dev Sets the base token URI prefix.
  function setBaseTokenURI(string memory _baseTokenURI) external isAdmin {
    baseTokenURI = _baseTokenURI;
  }
}

