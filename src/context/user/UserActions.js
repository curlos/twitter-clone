export const Follow = (userID) => ({
  type: "FOLLOW",
  payload: userID,
})

export const Unfollow = (userID) => ({
  type: "UNFOLLOW",
  payload: userID,
})