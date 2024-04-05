// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Enigmai_org is Ownable{
    string public orgname; 
    uint256 public immutable reward;
    IERC20 public immutable Enigmai_token;
    address public immutable commit_handler = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
    uint256 public commit_count;

    // enum to check status of model
    enum Status{
        Payment_Pending,
        Accepting, 
        Not_Accepting,
        Trained
    }

    Status public current_status;
    mapping(address => uint256) public contributiors;

    event data_conmmited(address indexed contributor, uint256 indexed amount, uint256 indexed totalCommits);
    event trainmodel(string orgname);

    constructor (string memory orgName, uint256 rewardAmount, address token_address) {
       orgname = orgName; 
       reward = rewardAmount;
       Enigmai_token = IERC20(token_address);
       current_status = Status.Payment_Pending;
    }

    function init() public onlyOwner payable{
        require(current_status == Status.Payment_Pending, "Already Initialized");
        require(Enigmai_token.balanceOf(address(this)) >= reward, "Deposit reward amount to contract to initialize");
        current_status = Status.Accepting;
    }

    function commitData(address contributor, uint256 amount) public {
        require(msg.sender == commit_handler, "Only Enigmai can handle commits");
        require(current_status == Status.Accepting, "Org not accepting commits ATM");
        contributiors[contributor] += amount;
        commit_count += amount;

        emit data_conmmited(contributor, amount, commit_count);
    }

    function trainModel() public onlyOwner{
        require(current_status != Status.Payment_Pending && current_status != Status.Trained, "The oorg hasnt been initialized yet");
        require(commit_count >= 10, "Atleast 10 commits are needed tot train model");
        emit trainmodel(orgname);
    }

    
}