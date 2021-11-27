import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import SmallUser from './SmallUser'
import styled from 'styled-components'

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
  padding-bottom: 0px;
  width: 100%;
`

const UserTopInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  width: 100%;
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

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`

const FollowersParentContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const OptionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 15%;
  padding-right: 15%;
  font-size: 16px;
  border-bottom: 1px solid #54595a;
`

const Option = styled.div`
  color: lightgray;
  padding-top: 15px;
  padding-bottom: 15px;
  font-weight: ${props => (props.selectedType && 'bold') || '400'};
  border-bottom: ${props => (props.selectedType && '4px solid #1EA2FB') || '400'};
  cursor: pointer;
`

const UsersContainer = styled.div`
  padding: 10px;
`

const UserFollowsPage = () => {

  const { id } = useParams()
  const [usersType, setUsersType] = useState('followers')
  const [profileUserInfo, setProfileUserInfo] = useState({user: {}, followers: [], following: []})
  const [loading, setLoading] = useState(true)

  console.log(id)

  useEffect(() => {
    const fetchFromAPI = async () => {
      const userResponse = await axios.get(`http://localhost:8888/api/users/user/${id}`)
      const allFollowers = await getAllFollowers(userResponse.data.followers)
      const allFollowing = await getAllFollowing(userResponse.data.following)

      setProfileUserInfo({user: userResponse.data, followers: allFollowers, following: allFollowing})
      setLoading(false)
    }

    fetchFromAPI()
  }, [usersType])

  const getAllFollowers = async (followerIDs) => {
    const followers = []
    for (let followerID of followerIDs) {
      const response = await axios.get(`http://localhost:8888/api/users/user/${followerID}`)
      followers.push(response.data)
    }
    return followers
  }

  const getAllFollowing = async (followingIDs) => {
    const following = []
    for (let followingID of followingIDs) {
      const response = await axios.get(`http://localhost:8888/api/users/user/${followingID}`)
      following.push(response.data)
    }
    return following
  }

  console.log(useParams())


  return (
    loading ? 'Loading...' : (
      <MainContainer>
        <Topbar>
          <StyledLink to={`/user/${id}`}>
            <i class="fas fa-arrow-left"></i>
          </StyledLink>
          <UserTopInfo>
            <div>
            <UserFullName>{profileUserInfo.user.fullName}</UserFullName>
            <Verified><i class="fas fa-check-circle"></i></Verified>
            </div>
            <TopTweetNum>{profileUserInfo.user.email}</TopTweetNum>

          </UserTopInfo>
        </Topbar>

        <OptionsBar>
          <Option selectedType={usersType === 'followers'} onClick={() => setUsersType('followers')}>Followers</Option>
          <Option selectedType={usersType === 'following'} onClick={() => setUsersType('following')}>Following</Option>
        </OptionsBar>
        
        <UsersContainer>
          {usersType === 'followers' ? (
            profileUserInfo.followers.map((user) => <SmallUser buttonType='follow' user={user}/>)
          ) : (
            profileUserInfo.following.map((user) => <SmallUser buttonType='follow' user={user}/>)
          )}
          
        </UsersContainer>
      </MainContainer>
    )
    )
}

export default UserFollowsPage
