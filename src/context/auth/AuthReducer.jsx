const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      }
    case "LOGIN_SUCCESS":
      console.log('gello')
      console.log('Setting state to: ')
      console.log(action)
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      }
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      }
    case "UPDATE_USER":
      console.log('UPDATING...')
      console.log(action)
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      }
    default:
      return state
  }
}

export default AuthReducer;