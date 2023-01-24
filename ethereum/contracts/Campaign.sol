pragma solidity ^0.4.17;

contract Campaign {
    address public manager;
    uint256 public minimumContribution;
    address[] public approvers;

    function Campaign(uint256 minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution); // make sure the contribution is greater than the minimum contribution

        approvers.push(msg.sender); // add the address of the person who contributed to the approvers array so he becomes an approver
    }
}
