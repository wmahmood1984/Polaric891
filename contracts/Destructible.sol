pragma solidity ^0.8.0;


import "./Ownable.sol";


/**
 * @title Destructible
 * @dev Base contract that can be destroyed by owner. All funds in contract will be sent to the owner.
 */
contract Destructible is Ownable {

  constructor() public payable { }

  /**
   * @dev Transfers the current balance to the owner and terminates the contract.
   */
  function destroy() onlyOwner public {
    selfdestruct(owner);
  }

  function destroyAndSend(address payable _recipient) onlyOwner public {
    selfdestruct(_recipient);
  }
}