pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
    } // struct is a custom data type that can be used to group together related variables of different data types

    Request[] public requests; // array of requests that will be created by the manager
    address public manager;
    uint256 public minimumContribution;
    address[] public approvers;

    modifier restricted() {
        require(msg.sender == manager); // make sure the person who is trying to create a request is the manager
        _; // the underscore is a placeholder for the function that is going to be called}
    }

    function Campaign(uint256 minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution); // make sure the contribution is greater than the minimum contribution

        approvers.push(msg.sender); // add the address of the person who contributed to the approvers array so he becomes an approver
    }

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
        }); // create a new request with the data passed in the function

        requests.push(newRequest);
    }
}
