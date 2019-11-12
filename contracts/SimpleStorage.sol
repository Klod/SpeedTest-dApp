pragma solidity ^0.5.0;

contract SimpleStorage {
  uint storedData;
  string private device = "Karl's Chromebook";

  function set(uint x) public {
    storedData = x;
  }
  
  function get() public view returns (uint) {
    return storedData;
  }
  
  function setName(string memory newName) public
    {
        device = newName;
    }
  
  function getName() public view returns (string memory device)
    {
        return device;
    }
}

    
