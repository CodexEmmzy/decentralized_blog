import { BigNumber } from "ethers";

export interface IBlog {
  purchaseTokens(user_address: string, amount: BigNumber): Promise<void>;
  createPost(user_address: string, category: string, content: string): Promise<boolean>;
  updateLeaderboard(user_address: string): Promise<void>;
  referUser(referrer: string, _new_user: string): Promise<void>;
  commentOnPost(post_id: BigNumber, comment: string): Promise<void>;
  donateToPost(post_id: BigNumber, amount: BigNumber): Promise<void>;
  getPostCountFor(user_address: string): Promise<BigNumber>;
  getTokenBalanceFor(user_address: string): Promise<BigNumber>;
  getReferralCountFor(user_address: string): Promise<BigNumber>;
  getPostContentFor(post_id: BigNumber): Promise<string>;
  getPostCategoryFor(post_id: BigNumber): Promise<string>;
  getPostCommentsFor(post_id: BigNumber): Promise<string[]>;
  getPostDonationsFor(post_id: BigNumber): Promise<BigNumber>;
}
