import { useState, useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthContext'
import axios from 'axios'
import styled from 'styled-components'
import * as timeago from 'timeago.js';

const MainContainer = styled.div`
  display: flex;
  background-color: #232627;
  border-bottom: 1px solid #54595a;
  padding: 15px;
`

const UserIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`

const TweetInfo = styled.div`
  margin-left: 10px;
`

const TweetTopInfo = styled.div`
  color: lightgray;

  span {
    margin-right: 8px;
  }
`

const AuthorFullName = styled.span`
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Verified = styled.span`
  color: #47EEFF;
`

const TweetContent = styled.div`
  margin-top: 5px;
  margin-bottom: 15px;
`

const TweetActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  color: lightgray;
`

const TweetAction = styled.span`
  i {
    margin-right: 10px;
    cursor: pointer;
  }
`

const Retweeted = styled.span`
  color: #5af15a;
`

const Liked = styled.span`
  color: red;
`


const Tweet = ({ tweetObj }) => {

  const { user, userDispatch } = useContext(AuthContext)

  const [tweetInfo, setTweetInfo] = useState({ tweet: tweetObj, author: {} })
  const { tweet, author } = tweetInfo
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFromAPI = async () => {
      const authorResponse = await axios.get(`http://localhost:8888/api/users/user/${tweet.userID}`)
      setTweetInfo({...tweetInfo, author: authorResponse.data})
      setLoading(false)
    }

    fetchFromAPI()
  }, [])

  const toggleLike = async () => {
    console.log(user)
    if (!user) {
      return
    }

    try {
      console.log('liking tweet')
      const body = {
        userID: user._id
      }
      console.log(tweet._id)
      console.log(user._id)

      console.log(user)
      const response = await axios.put(`http://localhost:8888/api/tweets/tweet/like/${tweet._id}`, body)
      console.log(response.data)
      setTweetInfo({...tweetInfo, tweet: response.data.updatedTweet})
      userDispatch({ type: "UPDATE_USER", payload: response.data.updatedUser})
      console.log('updatedUser')
      console.log(user)
    } catch (err) {
      console.log(err)
    }
  }

  const toggleRetweet = async () => {
    console.log(user)
    if (!user) {
      return
    }

    try {
      console.log('retweeting')
      const body = {
        userID: user._id
      }

      const response = await axios.put(`http://localhost:8888/api/tweets/tweet/retweet/${tweet._id}`, body)
      console.log(response.data)
      setTweetInfo({...tweetInfo, tweet: response.data.updatedTweet})
      userDispatch({ type: "UPDATE_USER", payload: response.data.updatedUser})
      console.log('updatedUser')
      console.log(user)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    loading ? 'Loading...' : (
      <MainContainer>
        <UserIcon src="/images/user_icon.jpg"/>

        <TweetInfo>
          <TweetTopInfo>
            <Link to={`/user/${author._id}`}>
              <AuthorFullName>{author.fullName}</AuthorFullName>
            </Link>
            <Verified><i class="fas fa-check-circle"></i></Verified>
            <span>{author.email}</span>
            <span>-</span>
            <span>{timeago.format(tweet.createdAt)}</span>
          </TweetTopInfo>
  
          <TweetContent>
            {tweet.text}
          </TweetContent>
            
          <TweetActions>
            <TweetAction>
              <i class="far fa-comment"></i>
              <span>{tweet.replies.length}</span>
            </TweetAction>

            <TweetAction>
              {user && user.retweets.includes(tweet._id) ? (
                <Retweeted>
                  <i class="fas fa-retweet" onClick={toggleRetweet}></i>
                </Retweeted>
              ): <i class="fas fa-retweet" onClick={toggleRetweet}></i>}
              
              <span>{tweet.retweets.length}</span>
            </TweetAction>
  
            <TweetAction>
              {user && user.likes.includes(tweet._id) ? (
                <Liked>
                  <i class="fas fa-heart" onClick={toggleLike}></i>
                </Liked>
              ): <i class="far fa-heart" onClick={toggleLike}></i>}
              
              <span>{tweet.likes.length}</span>
            </TweetAction>
  
            <TweetAction>
              <i class="fas fa-share-square"></i>
            </TweetAction>
            
          </TweetActions>
        </TweetInfo>
      </MainContainer>
    )
  );
}

export default Tweet;
