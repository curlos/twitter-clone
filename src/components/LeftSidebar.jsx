import styled from 'styled-components'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 2;
  background-color: #1C1E20;
  color: #fff;
  margin: 10px auto;
  margin-right: 20px;
  height: 95vh;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  border-radius: 30px;
  margin-bottom: 15px;
  padding: 6px;
`

const Icon = styled.div`
  color: ${props => props.color ? props.color : '#fff'};
  font-size: ${props => props.fontSize || 27}px;
  cursor: pointer;
`

const IconDesc = styled.div`
  font-size: 20px;
  margin-left: 15px;
`

const TweetButton = styled.button`
  background-color: #1EA2FB;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  padding: 15px;
  width: 100%;
`

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

const LeftSidebar = () => {
  return (
    <MainContainer>
      <div>
        <IconContainer>
          <Icon color={'#47EEFF'} fontSize={'27'}>
            <i class="fab fa-twitter"></i>
          </Icon>
        </IconContainer>

        {pages.map((page) => {
          return (
            <IconContainer>
              <Icon>
                {page.icon}
              </Icon>

              <IconDesc>{page.name}</IconDesc>
            </IconContainer>
          )
        })}

        <TweetButton>Tweet</TweetButton>
      </div>
      
      <UserContainer>
        <UserInfo>
          <UserIcon src={`/assets/user_icon.jpg` || `https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png`}/>
          <UserNameContainer>
            <UserFullName>Curlos</UserFullName>
            <Username>@curlos</Username>
          </UserNameContainer>
        </UserInfo>

        <div>
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </UserContainer>


      
    </MainContainer>
  );
}

const pages = [
  {
    name: 'Home',
    icon: <i class="fab fa-twitter"></i>,
  },
  {
    name: 'Explore',
    icon: <i class="fas fa-hashtag"></i>,
  },
  {
    name: 'Notifications',
    icon: <i class="far fa-bell"></i>,
  },
  {
    name: 'Messages',
    icon: <i class="far fa-envelope"></i>,
  },
  {
    name: 'Bookmarks',
    icon: <i class="far fa-bookmark"></i>,
  },
  {
    name: 'Lists',
    icon: <i class="fas fa-list-ul"></i>,
  },
  {
    name: 'Profile',
    icon: <i class="far fa-user"></i>,
  },
  {
    name: 'More',
    icon: <i class="fas fa-ellipsis-h"></i>,
  },
]

export default LeftSidebar;
