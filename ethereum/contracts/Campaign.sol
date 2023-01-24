pragma solidity ^0.4.17;

contract Campaign {
    address public manager;
    uint256 public minimumContribution;

    function Campaign(uint256 minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }
}
