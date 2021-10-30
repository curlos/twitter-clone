import { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthContext'
import { TweetsContext } from '../context/tweets/TweetsContext'
import axios from 'axios'
import styled from 'styled-components'
import * as timeago from 'timeago.js';
import FullTweet from './FullTweet'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 6;
  flex-wrap: wrap;
  background-color: #232627;
  color: #fff;
  border: 1px solid #54595a;
  width: 100%;

  i {
    cursor: pointer;
  }
`

const TopInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`

const TopName = styled.span`
  font-weight: bold;
  width: 100%;
`

const Topbar = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 18px;
  border-bottom: 1px solid #54595a;
`

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`

const TweetPage = () => {

  const { tweetID } = useParams()

  const [tweetInfo, setTweetInfo] = useState({tweet: {}, author: {}, replies: []})
  const [loading, setLoading] = useState(false)

  console.log(tweetID)

  useEffect(() => {
    const fetchFromAPI = async () => {
      const tweetResponse = await axios.get(`http://localhost:8888/api/tweets/tweet/${tweetID}`)
      const authorResponse = await axios.get(`http://localhost:8888/api/users/user/${tweetResponse.data.userID}`)
      const tweetReplies = await getAllTweetReplies(tweetResponse.data)

      setTweetInfo({tweet: tweetResponse.data, author: authorResponse.data, replies: tweetReplies})
      setLoading(false)
    }
    fetchFromAPI()
  }, [])

  const getAllTweetReplies = async (tweet) => {
    const tweetReplies = []
    for (let id of tweet.replies) {
      const response = await axios.get(`http://localhost:8888/api/tweets/tweet/${id}`)
      tweetReplies.push(response.data)
    }
    return tweetReplies
  }

  console.log(tweetInfo)
  console.log(tweetInfo.tweet)

  //<Tweet tweetObj={tweetInfo.tweet} fromTweetPage={true}/>

  return (
    <MainContainer>
      <Topbar>
        <StyledLink to="/">
          <i class="fas fa-arrow-left"></i>
        </StyledLink>
        
        <TopInfo>
          <div>
          <TopName>Tweet</TopName>
          </div>
         
        </TopInfo>
      </Topbar>

      {loading ? 'Loading...' : (
        <div>
          
          <FullTweet tweetObj={tweetInfo.tweet} fromTweetPage={true}/>
        </div>
      )}
    </MainContainer>
    
  )
}

export default TweetPage;