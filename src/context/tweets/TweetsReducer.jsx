const TweetReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TWEETS":
      console.log('updating tweets')
      console.log(action)
      return {
        tweets: action.payload
      }
    default:
      return state
  }
}

export default TweetReducer;