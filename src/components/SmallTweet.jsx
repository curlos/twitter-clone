import { useState, useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthContext'
import { TweetsContext } from '../context/tweets/TweetsContext'
import axios from 'axios'
import styled from 'styled-components'
import * as timeago from 'timeago.js';

const MainContainer = styled.div`
  display: flex;
  background-color: #232627;
  border-bottom: 1px solid #54595a;
  padding: 15px;

  i {
    cursor: pointer;
  }
`

const UserIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`

const TweetInfo = styled.div`
  margin-left: 10px;
  width: 100%;
`

const TweetTopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  word-break: break-word;
  overflow-wrap: anywhere;
  margin-top: 5px;
  margin-bottom: 15px;
  white-space: pre;
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
  color: #fd3737;
`

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`

const DropButton = styled.div`
  font-size: 16px;
`

const DropdownContent = styled.div`
  display: ${props => props.showDropdown ? 'block' : 'none'};
  position: absolute;
  background-color: #232627;
  border: 1px solid #54595a;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 10px;
`

const DropdownListElem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
`

const DeleteButton = styled.span`
  color: #fd3737;
  cursor: pointer;

  i {
    margin-right: 10px;
  }
`

const DetailedTweetInfo = styled.div`

`

const TimePosted = styled.div`
  padding: 10px 0px;
  border-bottom: 1px solid lightgray;
`

const DetailedTweetActionsInfo = styled.span`
  padding: 10px 0px;
`

const DetailedTweetActionNum  = styled.span`
  margin-right: 10px;
`


const SmallTweet = ({ tweetObj, fromTweetPage }) => {

  const { user, userDispatch } = useContext(AuthContext)
  const { tweets, tweetsDispatch } = useContext(TweetsContext)

  const [tweetInfo, setTweetInfo] = useState({ tweet: {}, author: {} })
  const { tweet, author } = tweetInfo
  const [loading, setLoading] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    
    if (tweet === null) {
      return null
    }

    const fetchFromAPI = async () => {
      // getting an error here because the userID from the tweet is empty
      const authorResponse = await axios.get(`http://localhost:8888/api/users/user/${tweetObj.userID}`)

      if (authorResponse === null) {
        setLoading(false)
        return
      }

      setTweetInfo({...tweetInfo, tweet: tweetObj, author: authorResponse.data})
      setLoading(false)
    }

    fetchFromAPI()
  }, [tweetObj])


  const toggleLike = async (e) => {
    e.preventDefault();
    console.log('liking tweet niga')
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

  const toggleRetweet = async (e) => {
    e.preventDefault();
    
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

  const handleDeleteTweet = async (e) => {
    e.preventDefault();
    console.log('deleting...')
    
    try {
      const response = await axios.delete(`http://localhost:8888/api/tweets/tweet/${tweet._id}`)
      const filteredTweets = tweets.filter((tweetObj) => tweetObj._id !== tweet._id)

      tweetsDispatch({ type: "UPDATE_TWEETS", payload: filteredTweets})

      console.log(response)
    } catch (err) {

    }
  }

  if (tweet === null) {
    return null
  }

  console.log(tweetObj)
  console.log(tweet)

  return (
    loading ? <div>Loading...</div> : (
      author ? (
        <MainContainer>
          <StyledLink to={`/status/${tweet._id}`}></StyledLink>
          <StyledLink to={`/user/${author._id}`}><UserIcon src="/images/user_icon.jpg"/></StyledLink>

          <TweetInfo>
            <TweetTopInfo>
              <div>
                <StyledLink to={`/user/${author._id}`}>
                  <AuthorFullName>{author.fullName}</AuthorFullName>
                </StyledLink>
                <Verified><i class="fas fa-check-circle"></i></Verified>
                <span>{author.email}</span>
                <span>-</span>
                <span>{timeago.format(tweet.createdAt)}</span>
              </div>

              <Dropdown>
                <DropButton>
                  <i className="fas fa-ellipsis-h" onClick={() => setShowDropdown(!showDropdown)}></i>
                </DropButton>

                <DropdownContent showDropdown={showDropdown}>
                  <DropdownListElem>
                    {user && tweet.userID === user._id ? (
                      <DeleteButton onClick={handleDeleteTweet}><i class="fas fa-trash"></i> Delete</DeleteButton>
                    ) : null}
                  </DropdownListElem>
                </DropdownContent>
                
              </Dropdown>
            </TweetTopInfo>
            
            <StyledLink to={`/${author._id}/status/${tweet._id}`}>
              <TweetContent>
                {tweet.text}
              </TweetContent>
            </StyledLink>
            
            {fromTweetPage ? (
              <DetailedTweetInfo>
                <TimePosted>
                  {new Date().toString()}
                </TimePosted>

                <DetailedTweetActionsInfo>
                  <DetailedTweetActionNum>47 Retweets</DetailedTweetActionNum>
                  <DetailedTweetActionNum>1,311 likes</DetailedTweetActionNum>
                </DetailedTweetActionsInfo>
              </DetailedTweetInfo>
            ) : null} 
              
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
        
      ) : null
      
    )
  );
}

export default SmallTweet;
