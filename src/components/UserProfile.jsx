import styled from 'styled-components'
import Tweets from './Tweets'

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
  border-bottom: 1px solid #54595a;
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

  i {
    margin-right: 5px;
  }
`

const WebsiteLink = styled.span`

  margin-left: 15px;

  span {
    color: #47EEFF;
    margin-left: 5px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`

const JoinDate = styled.span`
  color: lightgray;
  margin-left: 15px;

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
  font-weight: ${props => (props.selected && 'bold') || '400'};
  border-bottom: ${props => (props.selected && '2px solid #1EA2FB') || '400'};
`



const UserProfile = () => {

  return (
    <MainContainer>
      <Topbar>
        <i class="fas fa-arrow-left"></i>
        <UserTopInfo>
          <div>
          <UserFullName>Los Angeles Lakers</UserFullName>
          <Verified><i class="fas fa-check-circle"></i></Verified>
          </div>
          <TopTweetNum>73.8K Tweets</TopTweetNum>
        </UserTopInfo>
      </Topbar>

      <CoverPicture src="/assets/lakers_banners.jpg"/>

      <AboutContainer>
        <TopInfo>
          <UserIcon src="/assets/lakers_icon.jpeg"/>

          <div>
            <i class="fas fa-ellipsis-h"></i>
            <FollowButton>Follow</FollowButton>
          </div>
        </TopInfo>

        <UserFullNameSmall>
          Los Angeles Lakers
          <Verified><i class="fas fa-check-circle"></i></Verified>
        </UserFullNameSmall>

        <UserUsername>@Lakers</UserUsername>
        <UserBio>Welcome the #Lakeshow | 17x Champions</UserBio>
        
        <div>
          <UserLocation>
            <i class="fas fa-map-marker-alt"></i>
            <span>Los Angeles, CA</span>
          </UserLocation>

          <WebsiteLink>
            <i class="fas fa-link"></i>
            <span>lakers.com</span>
          </WebsiteLink>

          <JoinDate>
            <i class="far fa-calendar-alt"></i>
            <span>Joined February 2009</span>
          </JoinDate>
        </div>

        <FollowContainer>
          <FollowingNum><strong>79</strong> following</FollowingNum>
          <span><strong>10.1M</strong> Followers</span>
        </FollowContainer>

        <FollowedBy>
          <VerySmallUserIcon src="/assets/nba_logo.jpeg"/> 
          <div>Followed by NBA, LeBron James, and 5 more</div>
        </FollowedBy>

        <OptionsBar>
          <Option selected={true}>Tweets</Option>
          <Option>{`Tweets & Replies`}</Option>
          <Option>Media</Option>
          <Option>Likes</Option>
        </OptionsBar>
      </AboutContainer>

      <Tweets />


    </MainContainer>
  )
}

export default UserProfile;