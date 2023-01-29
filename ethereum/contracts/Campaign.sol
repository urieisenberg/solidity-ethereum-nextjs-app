pragma solidity ^0.8.9;

contract CampaignFactory {
    address payable[] public deployedCampaigns; // array of addresses of all deployed campaigns

    function createCampaign(uint256 minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(payable(newCampaign));
    } // deploys a new instance of a campaign and stores the resulting address

    function getDeployedCampaigns()
        public
        view
        returns (address payable[] memory)
    {
        return deployedCampaigns;
    } // returns the array of deployed campaigns addresses
}

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
    uint256 public approversCount; // number of people who have donated to the campaign

    modifier restricted() {
        require(msg.sender == manager);
        _;
    } // modifier that makes sure only the manager can create a request

    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    } //  constructor function that sets the minimumContribution and the owner

    function contribute() public payable {
        require(msg.value > minimumContribution); // make sure the contribution is greater than the minimum contribution

        approvers[msg.sender] = true; // add the address of the person who contributed to the approvers mapping
        approversCount++; // increment the approversCount
    } // called when someone wants to donate money to the campaign and become an approver

    function createRequest(
        string memory description,
        uint256 value,
        address recipient
    ) public restricted {
        Request storage newRequest = requests.push(); // create a new request and add it to the requests array
        newRequest.description = description; // set the description of the request
        newRequest.value = value; // set the value of the request
        newRequest.recipient = recipient; // set the recipient of the request
        newRequest.complete = false; // set the complete status of the request to false
        newRequest.approvalCount = 0; // set the approvalCount of the request to 0
    } // called by the manager to create a new spending request

    function approveRequest(uint256 index) public {
        Request storage request = requests[index]; // get the request from the requests array

        require(approvers[msg.sender]); // make sure the person who is approving the request is an approver
        require(!request.approvals[msg.sender]); // make sure the person has not already voted for the request

        request.approvals[msg.sender] = true; // add the address of the person who voted to the approvals mapping
        request.approvalCount++; // increment the approvalCount
    } // called by each contributor to approve a spending request

    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index]; // get the request from the requests array

        require(request.approvalCount > (approversCount / 2)); // make sure the request has more than 50% of the approvers voting for it
        require(!request.complete); // make sure the request has not already been completed

        request.recipient.transfer(request.value); // transfer the money to the recipient
        request.complete = true; // mark the request as complete
    } // after a request has gotten enough approvals, the manager can call this to get money sent to the vendor

    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    } // returns a summary of the campaign

    function getRequestsCount() public view returns (uint256) {
        return requests.length;
    } // returns the number of requests
}
