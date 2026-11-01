// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

/// @title TrustFall
/// @notice Minimal native-token escrow used for Portaldot V3 EVM testnet proof.
///         This contract deliberately uses native tPOT; it is not a USDC contract.
contract TrustFall {
    enum State { Funded, Delivered, Disputed, Paid, Refunded }

    address payable public immutable client;
    address payable public immutable freelancer;
    uint256 public immutable amount;
    State public state;

    event Delivered(address indexed by);
    event Disputed(address indexed by);
    event Resolved(State indexed outcome, uint256 freelancerAmount, uint256 clientAmount);

    error Unauthorized();
    error InvalidState();
    error WrongValue();
    error TransferFailed();

    constructor(address payable freelancer_) payable {
        if (freelancer_ == address(0) || msg.value == 0) revert WrongValue();
        client = payable(msg.sender);
        freelancer = freelancer_;
        amount = msg.value;
        state = State.Funded;
    }

    function markDelivered() external {
        if (msg.sender != freelancer) revert Unauthorized();
        if (state != State.Funded) revert InvalidState();
        state = State.Delivered;
        emit Delivered(msg.sender);
    }

    function dispute() external {
        if (msg.sender != client) revert Unauthorized();
        if (state != State.Delivered) revert InvalidState();
        state = State.Disputed;
        emit Disputed(msg.sender);
    }

    function approve() external {
        if (msg.sender != client) revert Unauthorized();
        if (state != State.Delivered) revert InvalidState();
        _pay(freelancer, amount);
        state = State.Paid;
        emit Resolved(State.Paid, amount, 0);
    }

    function refund() external {
        if (msg.sender != client) revert Unauthorized();
        if (state != State.Funded && state != State.Disputed) revert InvalidState();
        _pay(client, amount);
        state = State.Refunded;
        emit Resolved(State.Refunded, 0, amount);
    }

    function resolveSplit(uint256 freelancerAmount) external {
        if (msg.sender != client) revert Unauthorized();
        if (state != State.Disputed) revert InvalidState();
        if (freelancerAmount > amount) revert WrongValue();
        uint256 clientAmount = amount - freelancerAmount;
        if (freelancerAmount != 0) _pay(freelancer, freelancerAmount);
        if (clientAmount != 0) _pay(client, clientAmount);
        state = State.Paid;
        emit Resolved(State.Paid, freelancerAmount, clientAmount);
    }

    function _pay(address payable recipient, uint256 value) private {
        (bool ok,) = recipient.call{value: value}("");
        if (!ok) revert TransferFailed();
    }

    receive() external payable { revert WrongValue(); }
}

