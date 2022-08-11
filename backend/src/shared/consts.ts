/**
 * The Following are constants that must exists equally on the frontend in order to respect the contract
 */

// This map makes possible to reach the value of 2^56 ( we don't need it because the game is won at only 2^11, but if we want we can go way over )
export const serializationMap =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export const OBSTACLE_VALUE = serializationMap.length - 1;
