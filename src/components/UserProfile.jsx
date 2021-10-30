import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthContext'
import styled from 'styled-components'
import Tweets from './Tweets'
import moment from 'moment'
import EditProfileParent from './EditProfileParent'

const MainContainer = styled.div`
  flex: 6;
  background-color: #232627;
  color: #fff;
  border-left: 1px solid #54595a;
  border-right: 1px solid #54595a;
  margin-right: 20px;
`

const Topbar = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 18px;
  border-bottom: 1px solid #caeef5;
`

const UserTopInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`

const UserFullName = styled.span`
  font-weight: bold;
`

const Verified = styled.span`
  color: #47EEFF;
  margin-left: 5px;
`

const TopTweetNum = styled.div`
  font-size: 14px;
  color: lightgray;
`

const AboutContainer = styled.div`
  padding: 20px;
  padding-bottom: 0px;
  border-bottom: 1px solid #54595a;
`

const CoverPicture = styled.img`
  object-fit: cover;
  width: 100%;
`

const UserIcon = styled.img`
  border: 4px solid #54595a;
  border-radius: 50%;
  width: 133px;
  height: 133px;
  top: -65px;
  position: relative;
`

const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 65px;
`

const FollowButton = styled.button`
  background-color: #151618;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  margin-left: 15px;
  border: 1px solid #54595a;
  cursor: pointer;
`

const EditButton = styled(FollowButton)`
`

const UserFullNameSmall = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-top: 15px;
`

const UserUsername = styled.div`
  color: lightgray;
  margin-bottom: 10px;
`

const UserBio = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`

const UserLocation = styled.span`
  color: lightgray;
  margin-right: 15px;

  i {
    margin-right: 5px;
  }
`

const WebsiteLink = styled.span`

  margin-right: 15px;

  i {
    margin-right: 5px;
  }

  span {
    color: #47EEFF;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`

const JoinDate = styled.span`
  color: lightgray;

  i {
    margin-right: 5px;
  }
`

const FollowContainer = styled.div`
  margin: 10px auto;
`

const FollowingNum = styled.span`
  margin-right: 10px;
`

const FollowedBy = styled.div`
  display: flex;
  align-items: center;
  color: lightgray;
  font-size: 12px;
`

const VerySmallUserIcon = styled.img`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`

const OptionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
`

const Option = styled.div`
  color: lightgray;
  padding-top: 15px;
  padding-bottom: 15px;
  font-weight: ${props => (props.selectedType && 'bold') || '400'};
  border-bottom: ${props => (props.selectedType && '2px solid #1EA2FB') || '400'};
  cursor: pointer;
`


const UserProfile = () => {

  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const [profileUserInfo, setProfileUserInfo] = useState({user: {}, tweets: [],likes: [], retweets: [], media: []})
  const [selectedTweetsType, setSelectedTweetsType] = useState('Tweets')
  const [tweetsToShow, setTweetsToShow] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchFromAPI = async () => {
      const userResponse = await axios.get(`http://localhost:8888/api/users/user/${id}`)
      console.log(userResponse.data)
      const tweets = await getTweets(userResponse.data.tweets)
      const likes = await getTweets(userResponse.data.likes)
      const retweets = await getTweets(userResponse.data.retweets)
      setProfileUserInfo({...profileUserInfo, 
                      user: userResponse.data,
                      tweets: tweets,
                      likes: likes,
                      retweets: retweets
                    })
      setTweetsToShow(tweets)
      setLoading(false)
    }

    fetchFromAPI()
  }, [])

  const handleTweetTypeClick = (tweetsType) => {
    switch (tweetsType) {
      case 'Tweets':
        setSelectedTweetsType('Tweets')
        setTweetsToShow(profileUserInfo.tweets)
        break
      case 'Tweets & Replies':
        setSelectedTweetsType('Tweets & Replies')
        setTweetsToShow(profileUserInfo.tweets)
        break
      case 'Media':
        setSelectedTweetsType('Media')
        setTweetsToShow(profileUserInfo.tweets)
        break
      case 'Likes':
        setSelectedTweetsType('Likes')
        setTweetsToShow(profileUserInfo.likes)
        break
      default:
        setTweetsToShow(profileUserInfo.tweets)
    }
    
  }

  const getTweets = async (tweetIDs) => {
    const tweets = []

    for (let tweetID of tweetIDs) {
      const response = await axios.get(`http://localhost:8888/api/tweets/tweet/${tweetID}`)

      tweets.push(response.data)
    }

    return tweets
  }
  
  console.log(profileUserInfo)


  return (
    loading ? <div>Loading...</div> : (
      <MainContainer>
        <Topbar>
          <i class="fas fa-arrow-left"></i>
          <UserTopInfo>
            <div>
            <UserFullName>{profileUserInfo.user.fullName}</UserFullName>
            <Verified><i class="fas fa-check-circle"></i></Verified>
            </div>
            <TopTweetNum>{profileUserInfo.user.tweets.length} Tweets</TopTweetNum>
          </UserTopInfo>
        </Topbar>

        <CoverPicture src="/images/default_cover.jpg"/>

        <AboutContainer>
          <TopInfo>
            <UserIcon src="/images/default_icon.jpeg"/>

            <div>
              <i class="fas fa-ellipsis-h"></i>
              {user && profileUserInfo.user._id !== user._id ? (
                <FollowButton>Follow</FollowButton>
              ) : <EditButton onClick={() => setShowModal(true)}>Edit</EditButton>}
            </div>
          </TopInfo>

          <UserFullNameSmall>
            {profileUserInfo.user.fullName}
            <Verified><i class="fas fa-check-circle"></i></Verified>
          </UserFullNameSmall>

          <UserUsername>{profileUserInfo.user.email}</UserUsername>
          <UserBio>Welcome the #Lakeshow | 17x Champions</UserBio>
          
          <div>
            <UserLocation>
              <i class="fas fa-map-marker-alt"></i>
              <span>{profileUserInfo.user.location || 'Unknown'}</span>
            </UserLocation>

            <WebsiteLink>
              <i class="fas fa-link"></i>
              <span>{profileUserInfo.user.websiteLink || 'Unknown.com'}</span>
            </WebsiteLink>

            <JoinDate>
              <i class="far fa-calendar-alt"></i>
              <span>Joined {moment(profileUserInfo.user.createdAt).format('MMMM YYYY')}</span>
            </JoinDate>
          </div>

          <FollowContainer>
            <FollowingNum><strong>79</strong> following</FollowingNum>
            <span><strong>10.1M</strong> Followers</span>
          </FollowContainer>

          <FollowedBy>
            <VerySmallUserIcon src="/images/nba_75.jpeg"/> 
            <div>Followed by NBA, LeBron James, and 5 more</div>
          </FollowedBy>

          <OptionsBar>
            <Option selectedType={selectedTweetsType === 'Tweets'} onClick={() => handleTweetTypeClick('Tweets')}>Tweets</Option>
            <Option selectedType={selectedTweetsType === 'Tweets & Replies'} onClick={() => handleTweetTypeClick('Tweets & Replies')}>{`Tweets & Replies`}</Option>
            <Option selectedType={selectedTweetsType === 'Media'} onClick={() => handleTweetTypeClick('Media')}>Media</Option>
            <Option selectedType={selectedTweetsType === 'Likes'} onClick={() => handleTweetTypeClick('Likes')}>Likes</Option>
          </OptionsBar>
        </AboutContainer>

        <Tweets tweetsToShow={tweetsToShow}/>

        <EditProfileParent showModal={showModal} setShowModal={setShowModal} profileUserInfo={profileUserInfo} />

      </MainContainer>
    )
    
  )
}

export default UserProfile;