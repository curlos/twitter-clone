import { createContext, useReducer } from 'react'
import TweetsReducer from './TweetsReducer'

const INITIAL_STATE = {
  tweets: null,
}

export const TweetsContext = createContext(INITIAL_STATE)

export const TweetsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TweetsReducer, INITIAL_STATE)

  return (
    <TweetsContext.Provider
      value={{
        tweets: state.tweets,
        tweetsDispatch: dispatch,
      }}
    >
      {children}
    </TweetsContext.Provider>
  )
}