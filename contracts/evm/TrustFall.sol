// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

/// @title TrustFall
/// @notice Native-tPOT escrow for Portaldot V3 EVM testnet evidence.
/// @dev This is not a USDC contract. Roles should be distinct addresses.
contract TrustFall {
    enum State { Funded, Delivered, Disputed, Paid, Refunded, Split }

    address payable public immutable client;
    address payable public immutable freelancer;
    address public immutable arbiter;
    uint256 public immutable amount;
    uint64 public immutable refundAfter;
    State public state;

    uint256 private locked = 1;

    event AgreementFunded(address indexed client, address indexed freelancer, address indexed arbiter, uint256 amount, uint64 refundAfter);
    event Delivered(address indexed by);
    event Disputed(address indexed by);
    event Resolved(State indexed outcome, uint256 freelancerAmount, uint256 clientAmount);

    error Unauthorized();
    error InvalidState();
    error InvalidConfiguration();
    error RefundNotAvailable();
    error InvalidAward();
    error TransferFailed();
    error ReentrantCall();

    modifier nonReentrant() {
        if (locked != 1) revert ReentrantCall();
        locked = 2;
        _;
        locked = 1;
    }

    constructor(address payable freelancer_, address arbiter_, uint64 refundAfter_) payable {
        if (
            freelancer_ == address(0) || arbiter_ == address(0) ||
            freelancer_ == msg.sender || arbiter_ == msg.sender ||
            arbiter_ == freelancer_ || msg.value == 0 ||
            refundAfter_ <= block.timestamp
        ) revert InvalidConfiguration();

        client = payable(msg.sender);
        freelancer = freelancer_;
        arbiter = arbiter_;
        amount = msg.value;
        refundAfter = refundAfter_;
        state = State.Funded;
        emit AgreementFunded(client, freelancer_, arbiter_, msg.value, refundAfter_);
    }

    function markDelivered() external {
        if (msg.sender != freelancer) revert Unauthorized();
        if (state != State.Funded) revert InvalidState();
        state = State.Delivered;
        emit Delivered(msg.sender);
    }

    function approve() external nonReentrant {
        if (msg.sender != client) revert Unauthorized();
        if (state != State.Delivered) revert InvalidState();
        state = State.Paid;
        _pay(freelancer, amount);
        emit Resolved(State.Paid, amount, 0);
    }

    function claimRefundAfterDeadline() external nonReentrant {
        if (msg.sender != client) revert Unauthorized();
        if (state != State.Funded) revert InvalidState();
        if (block.timestamp < refundAfter) revert RefundNotAvailable();
        state = State.Refunded;
        _pay(client, amount);
        emit Resolved(State.Refunded, 0, amount);
    }

    function openDispute() external {
        if (msg.sender != client && msg.sender != freelancer) revert Unauthorized();
        if (state != State.Funded && state != State.Delivered) revert InvalidState();
        state = State.Disputed;
        emit Disputed(msg.sender);
    }

    function resolveDispute(uint256 freelancerAward) external nonReentrant {
        if (msg.sender != arbiter) revert Unauthorized();
        if (state != State.Disputed) revert InvalidState();
        if (freelancerAward > amount) revert InvalidAward();

        uint256 clientAward = amount - freelancerAward;
        State outcome = freelancerAward == 0 ? State.Refunded : clientAward == 0 ? State.Paid : State.Split;
        state = outcome;
        if (freelancerAward != 0) _pay(freelancer, freelancerAward);
        if (clientAward != 0) _pay(client, clientAward);
        emit Resolved(outcome, freelancerAward, clientAward);
    }

    function _pay(address payable recipient, uint256 value) private {
        (bool ok,) = recipient.call{value: value}("");
        if (!ok) revert TransferFailed();
    }

    receive() external payable { revert InvalidConfiguration(); }
}

