import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { AuthContext } from '../context/auth/AuthContext'

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`

const UserIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`

const UserNameContainer = styled.div`
  margin-left: 10px;
`

const UserFullName = styled.div`
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`

const Username = styled.div`
  color: lightgray;
`

const FollowButton = styled.button`
  background-color: #1C1E20;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  cursor: pointer;
`

const UnfollowButton = styled(FollowButton)`
  background-color: #434649;
  cursor: pointer;
`

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  
`

const SmallUser = ({ buttonType, user }) => {

  const { user: loggedInUserObj, userDispatch } = useContext(AuthContext)
  const [loggedInUser, setLoggedInUser] = useState(loggedInUserObj)

  const handleFollowUser = async () => {
    console.log(loggedInUser._id)
    console.log(user._id)
    if (user === null) {
      return
    }

    if (!user._id || (user._id && user._id === loggedInUser._id)) {
      return
    }

    const body = {
      childUserID: user._id
    }

    const response = await axios.put(`http://localhost:8888/api/users/user/follow/${loggedInUser._id}`, body)
    console.log(response.data)

    setLoggedInUser(response.data.updatedParentUser)
    userDispatch({ type: "UPDATE_USER", payload: response.data.updatedChildUser})
  }

  console.log(loggedInUser)
  console.log(user)

  return (
    <UserContainer>
      <UserInfo>
        <StyledLink to={`/user/${user._id}`}>
          <UserIcon src={`/images/user_icon.jpg` || `https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png`}/>
        </StyledLink>
        <StyledLink to={`/user/${user._id}`}>
          <UserNameContainer>
            <UserFullName>{!user ? 'Curlos' : user.fullName}</UserFullName>
            <Username>{!user ? '@curlos' : user.email}</Username>
          </UserNameContainer>
        </StyledLink>
      </UserInfo>

      <div>
      {user && loggedInUser._id !== user._id ? (
              loggedInUser.following.includes(user._id) ? (
                <UnfollowButton onClick={handleFollowUser}>Unfollow</UnfollowButton>
              ) : <FollowButton onClick={handleFollowUser}>Follow</FollowButton>) : null }
      </div>
    </UserContainer>
  )
}

export default SmallUser;