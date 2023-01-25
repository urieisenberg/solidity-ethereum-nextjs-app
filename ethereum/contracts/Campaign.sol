pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description; // purpose of the request
        uint256 value; // amount of ether to transfer
        address recipient; // who gets the money
        bool complete; // whether the request has been completed or not
        uint256 approvalCount; // tracks the number of people who voted for the request
        mapping(address => bool) approvals; // track number of approvals for each request       
    } 

    Request[] public requests; // array of requests that will be created by the manager
    address public manager; // the address of the person who is managing the campaign
    uint256 public minimumContribution; // the minimum amount of ether that a person has to contribute to become an approver
    mapping(address => bool) public approvers; // list of addresses for every person who has donated to the campaign

    modifier restricted() {
        require(msg.sender == manager); 
        _; 
    } // modifier that makes sure only the manager can create a request 

    function Campaign(uint256 minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    } //  constructor function that sets the minimumContribution and the owner

    function contribute() public payable {
        require(msg.value > minimumContribution); // make sure the contribution is greater than the minimum contribution

        approvers[msg.sender] = true; // add the address of the person who contributed to the approvers mapping
    } // called when someone wants to donate money to the campaign and become an approver

    function createRequest(
        string description, 
        uint256 value,
        address recipient
    ) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false
        }); 

        requests.push(newRequest);
    } // called by the manager to create a new spending request
}
