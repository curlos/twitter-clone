import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
`

const SmallUser = ({ buttonType, user }) => {

  return (
    <UserContainer>
      <UserInfo>
        <Link to={`/user/${user._id}`}>
          <UserIcon src={`/images/user_icon.jpg` || `https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png`}/>
        </Link>
        <UserNameContainer>
          <UserFullName>{!user ? 'Curlos' : user.fullName}</UserFullName>
          <Username>{!user ? '@curlos' : user.email}</Username>
        </UserNameContainer>
      </UserInfo>

      <div>
        {buttonType === 'follow' ? <FollowButton>Follow</FollowButton> : <i class="fas fa-ellipsis-h"></i>}
      </div>
    </UserContainer>
  )
}

export default SmallUser;