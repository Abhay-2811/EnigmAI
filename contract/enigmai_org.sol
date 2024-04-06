// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Enigmai_org is Ownable {
    string public orgname;
    IERC20 public immutable Enigmai_token;
    address public immutable commit_handler =
        0x72d2F62A93305752CC57D48Ea217CA687EA43dc0;
    uint256 public immutable cost_per_prompt;
    uint256 public commit_count;

    mapping(address => uint256) public contributions;
    address[] public contributors;
    mapping(address => uint256) public credits;

    event data_conmmited(
        address indexed contributor,
        uint256 indexed amount,
        uint256 indexed totalCommits
    );
    event trainmodel(string orgname);

    constructor(
        string memory orgName,
        uint256 costPerPrompt,
        address token_address
    ) {
        orgname = orgName;
        cost_per_prompt = costPerPrompt;
        Enigmai_token = IERC20(token_address);
    }

    function commitData(address contributor, uint256 amount) public {
        require(
            msg.sender == commit_handler,
            "Only Enigmai can handle commits"
        );
        contributions[contributor] += amount;
        commit_count += amount;
        contributors.push(contributor);
        emit data_conmmited(contributor, amount, commit_count);
    }

    function trainModel() public onlyOwner {
        require(
            commit_count >= 10,
            "Atleast 10 commits are needed tot train model"
        );
        emit trainmodel(orgname);
    }

    // end user buys prompt credits to run model, 1 cr = 1 prompt
    function getPromptCredit(uint256 credit) public {
        require(
            Enigmai_token.allowance(msg.sender, address(this)) >=
                credit * cost_per_prompt,
            "Allowance less than cost"
        );
        Enigmai_token.transferFrom(
            msg.sender,
            address(this),
            credit * cost_per_prompt
        );
        splitPayment(credit * cost_per_prompt);
        credits[msg.sender] += credit;
    }

    function splitPayment(uint creditAmount) internal {
        // transfer 20% to owner i.e org creator
        Enigmai_token.transfer(owner(), (20 * creditAmount) / 100);

        //80% remaining
        uint256 remainingAmount = (80 * creditAmount) / 100;
        for (uint i = 0; i < contributors.length; i++) {
            uint256 transferAmount = ((((contributions[contributors[i]] * 100) /
                commit_count) * remainingAmount) / 100) - cost_per_prompt / 100;
            Enigmai_token.transfer(contributors[i], transferAmount);
        }
    }

    // end user uses promt credit (called by commitHandle(us) to improve ux)
    function creditUsage(address user) public {
        require(
            msg.sender == commit_handler,
            "Only Enigmai can call this function"
        );
        require(credits[user] != 0, "No credits");
        credits[user] -= 1;
    }
}
