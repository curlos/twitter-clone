import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Tweet from './SmallTweet'
import axios from 'axios'
import { TweetsContext } from '../context/tweets/TweetsContext'

const MainContainer = styled.div`
  background-color: #1C1E20;
  color: #fff;
`


const Tweets = ({ tweetsToShow }) => {

  const { tweets, tweetsDispatch } = useContext(TweetsContext)
  const [sortType, setSortType] = useState('newest')
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (tweetsToShow) {
      const filteredTweets = getSortedTweets(tweetsToShow)
      tweetsDispatch({ type: "UPDATE_TWEETS", payload: filteredTweets })
      setLoading(false)
      return
    }

    const fetchFromAPI = async () => {
      const response = await axios.get('http://localhost:8888/api/tweets/')
      console.log(response.data)
      const filteredTweets = getSortedTweets(response.data)
      tweetsDispatch({ type: "UPDATE_TWEETS", payload: filteredTweets })
      setLoading(false)
    }

    fetchFromAPI()
  }, [tweetsToShow])

  const getSortedTweets = (tweetsToFilter) => {
    switch(sortType) {
      case 'newest':
        return sortTweetsByNewest(tweetsToFilter)
      case 'oldest':
        return sortTweetsByOldest(tweetsToFilter)
      case 'replies':
        return sortByMostReplies(tweetsToFilter)
      default:
        return tweetsToFilter
    }
  }

  console.log(tweets)

  const sortTweetsByNewest = (tweetsToFilter) => {
    return tweetsToFilter.sort((tweetOne, tweetTwo) => (tweetOne.createdAt > tweetTwo.createdAt ? -1 : 1))
  }

  const sortTweetsByOldest = (tweetsToFilter) => {
    return tweetsToFilter.sort((tweetOne, tweetTwo) => (tweetOne.createdAt > tweetTwo.createdAt ? 1 : -1))
  }

  const sortByMostReplies = (tweetsToFilter) => {
    return tweetsToFilter.sort((tweetOne, tweetTwo) => (tweetOne.replies.length > tweetTwo.replies.length ? -1 : 1))
  }

  console.log(tweets)

  return (
    loading ? <div>Loading...</div> : (
      <MainContainer>
        {tweets.map((tweet) => <Tweet tweetObj={tweet}/>)}
      </MainContainer>
    )
  );
}

export default Tweets;
