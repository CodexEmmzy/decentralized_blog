#![cfg_attr(not(feature = "export-abi"), no_main)]

#[global_allocator]
static ALLOC: mini_alloc::MiniAlloc = mini_alloc::MiniAlloc::INIT;

extern crate alloc;

use stylus_sdk::{alloy_primitives::U256, prelude::*};
use alloy_primitives::{Address, Uint};
use stylus_sdk::{block, console};
use stylus_sdk::storage::{StorageString, StorageVec};

// Define persistent storage using the Solidity ABI.
sol_storage! {
    #[entrypoint]
    pub struct Blog {
        mapping(address => uint256) post_counts; // Track the number of posts per user
        mapping(address => uint256) post_creation_times; // Track the last post creation time per user
        mapping(address => uint256) token_balances; // Track tokens for each user
        mapping(address => uint256) referral_counts; // Track referrals per user
        mapping(uint256 => StorageString) post_contents; // Stores the content of each post by post ID
        mapping(uint256 => StorageString) post_categories; // Stores the category of each post by post ID
        mapping(uint256 => StorageVec<StorageString>) post_comments; // Stores comments for each post ID
        mapping(uint256 => uint256) post_donations; // Stores donations for each post ID
    }
}

// Declare that `Blog` is a contract with the following external methods.
#[external]
impl Blog {
    // Users can purchase tokens to create posts.
    pub fn purchase_tokens(&mut self, user_address: Address, amount: Uint<256, 4>) {
        let mut token_balance_accessor = self.token_balances.setter(user_address);
        let current_balance = token_balance_accessor.get();
        token_balance_accessor.set(current_balance + amount);
    }

    // Users can create a new post by spending tokens, choosing a category.
    pub fn create_post(&mut self, user_address: Address, category: String, content: String) -> bool {
        let token_balance = self.token_balances.get(user_address);
        let post_price = U256::from(1); // Each post costs 1 token

        if token_balance >= post_price {
            let last_creation = self.post_creation_times.get(user_address);
            let five_seconds_from_last_post = last_creation + U256::from(5);
            let current_time = block::timestamp();

            if five_seconds_from_last_post <= Uint::<256, 4>::from(current_time) {
                // Increment post count
                let mut post_count_accessor = self.post_counts.setter(user_address);
                let post_id = post_count_accessor.get() + U256::from(1);
                post_count_accessor.set(post_id);

                // Store the post content
                let mut content_accessor = self.post_contents.setter(post_id);
                content_accessor.set_str(&content);

                // Store the post category
                let mut category_accessor = self.post_categories.setter(post_id);
                category_accessor.set_str(&category);

                let mut time_accessor = self.post_creation_times.setter(user_address);
                time_accessor.set(U256::from(current_time));

                let mut token_balance_accessor = self.token_balances.setter(user_address);
                token_balance_accessor.set(token_balance - post_price);

                // Emit an event for successful post creation
                console!("Post created: User {:?} created post ID {:?} in category {:?}", user_address, post_id, category);

                self.update_leaderboard(user_address);

                return true;
            } else {
                console!("HTTP 429: Too Many Posts (you must wait at least 5 seconds between posts)");
                return false;
            }
        } else {
            console!("HTTP 402: Payment Required (you need more tokens to create a post)");
            return false;
        }
    }

    // Update the leaderboard by counting the total posts created by each user.
    fn update_leaderboard(&mut self, user_address: Address) {
        let mut referral_accessor = self.referral_counts.setter(user_address);
        let current_referrals = referral_accessor.get() + U256::from(1);
        referral_accessor.set(current_referrals);

        // Emit an event for leaderboard update
        console!("Leaderboard updated: User {:?} has {:?} referrals", user_address, current_referrals);
    }

    // Users can refer new users to earn additional tokens.
    pub fn refer_user(&mut self, referrer: Address, _new_user: Address) {
        let mut referral_accessor = self.referral_counts.setter(referrer);
        let current_referrals = referral_accessor.get() + U256::from(1);
        referral_accessor.set(current_referrals);

        console!("Referral successful: User {:?} referred {:?}", referrer, _new_user);
    }

      // Users can comment on a post
      pub fn comment_on_post(&mut self, post_id: U256, comment: String) {
        // Get the current `StorageVec` for the comments associated with the post_id
        let mut comments_accessor = self.post_comments.setter(post_id);

        // Use `grow` to add a new entry in the vector
        let mut new_comment_slot = comments_accessor.grow();

        // Set the new comment value in the `StorageString`
        new_comment_slot.set_str(&comment);

        console!("Comment added to post ID {:?}: {:?}", post_id, comment);
    }
    // Users can donate to a post
    pub fn donate_to_post(&mut self, post_id: U256, amount: Uint<256, 4>) {
        let mut donation_accessor = self.post_donations.setter(post_id);
        let current_donations = donation_accessor.get();
        donation_accessor.set(current_donations + amount);

        console!("Donation added to post ID {:?}: {:?}", post_id, amount);
    }

    #[view]
    pub fn get_post_count_for(&self, user_address: Address) -> Uint<256, 4> {
        return self.post_counts.get(user_address);
    }

    #[view]
    pub fn get_token_balance_for(&self, user_address: Address) -> Uint<256, 4> {
        return self.token_balances.get(user_address);
    }

    #[view]
    pub fn get_referral_count_for(&self, user_address: Address) -> Uint<256, 4> {
        return self.referral_counts.get(user_address);
    }

    #[view]
    pub fn get_post_content_for(&self, post_id: U256) -> String {
        self.post_contents.get(post_id).get_string()
    }

    #[view]
    pub fn get_post_category_for(&self, post_id: U256) -> String {
        self.post_categories.get(post_id).get_string()
    }

    #[view]
    pub fn get_post_comments_for(&self, post_id: U256) -> Vec<String> {
        let comments_accessor = self.post_comments.get(post_id);
        let mut comments = Vec::new();
        for i in 0..comments_accessor.len() {
            if let Some(comment_guard) = comments_accessor.get(i) {
                comments.push(comment_guard.get_string());
            }
        }
        comments
    }
    

    #[view]
    pub fn get_post_donations_for(&self, post_id: U256) -> Uint<256, 4> {
        self.post_donations.get(post_id)
    }
}
