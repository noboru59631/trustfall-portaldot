#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod trustfall {
    #[derive(Clone, Copy, Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum AgreementState {
        Funded,
        Delivered,
        Disputed,
        Paid,
        Refunded,
    }

    #[ink(storage)]
    pub struct TrustFall {
        client: AccountId,
        freelancer: AccountId,
        amount: Balance,
        state: AgreementState,
    }

    impl TrustFall {
        #[ink(constructor, payable)]
        pub fn new(freelancer: AccountId) -> Self {
            Self {
                client: Self::env().caller(),
                freelancer,
                amount: Self::env().transferred_value(),
                state: AgreementState::Funded,
            }
        }

        #[ink(message)]
        pub fn mark_delivered(&mut self) -> Result<(), &'static str> {
            if self.env().caller() != self.freelancer || self.state != AgreementState::Funded {
                return Err("invalid transition");
            }
            self.state = AgreementState::Delivered;
            Ok(())
        }

        #[ink(message)]
        pub fn dispute(&mut self) -> Result<(), &'static str> {
            if self.env().caller() != self.client || self.state != AgreementState::Delivered {
                return Err("invalid transition");
            }
            self.state = AgreementState::Disputed;
            Ok(())
        }

        #[ink(message)]
        pub fn approve(&mut self) -> Result<(), &'static str> {
            if self.env().caller() != self.client || self.state != AgreementState::Delivered {
                return Err("invalid transition");
            }
            self.state = AgreementState::Paid;
            self.env().transfer(self.freelancer, self.amount).map_err(|_| "transfer failed")
        }

        #[ink(message)]
        pub fn refund(&mut self) -> Result<(), &'static str> {
            if self.env().caller() != self.client || self.state != AgreementState::Funded {
                return Err("invalid transition");
            }
            self.state = AgreementState::Refunded;
            self.env().transfer(self.client, self.amount).map_err(|_| "transfer failed")
        }

        #[ink(message)]
        pub fn state(&self) -> AgreementState { self.state }
    }
}

