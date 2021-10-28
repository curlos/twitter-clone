import { useContext } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import SmallUser from './SmallUser'
import { AuthContext } from '../context/auth/AuthContext'

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

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`

const LeftSidebar = () => {

  const { user } = useContext(AuthContext)

  console.log(user)


  return (
    <MainContainer>
      <div>
        <Link to="/">
          <IconContainer>
            <Icon color={'#47EEFF'} fontSize={'27'}>
              <i class="fab fa-twitter"></i>
            </Icon>
          </IconContainer>
        </Link>

        {pages.map((page) => {
          return (
            <StyledLink to={page.linkURL}>
              <IconContainer>
                <Icon>
                  {page.icon}
                </Icon>

                <IconDesc>{page.name}</IconDesc>
              </IconContainer>
            </StyledLink>
          )
        })}

        <TweetButton>Tweet</TweetButton>
      </div>

      <SmallUser user={user}/>
      
      


    
    </MainContainer>
    
  );
}

const pages = [
  {
    name: 'Home',
    icon: <i class="fab fa-twitter"></i>,
    linkURL: '/'
  },
  {
    name: 'Explore',
    icon: <i class="fas fa-hashtag"></i>,
    linkURL: '/'
  },
  {
    name: 'Notifications',
    icon: <i class="far fa-bell"></i>,
    linkURL: '/'
  },
  {
    name: 'Messages',
    icon: <i class="far fa-envelope"></i>,
    linkURL: '/'
  },
  {
    name: 'Bookmarks',
    icon: <i class="far fa-bookmark"></i>,
    linkURL: '/'
  },
  {
    name: 'Lists',
    icon: <i class="fas fa-list-ul"></i>,
    linkURL: '/'
  },
  {
    name: 'Profile',
    icon: <i class="far fa-user"></i>,
    linkURL: '/'
  },
  {
    name: 'More',
    icon: <i class="fas fa-ellipsis-h"></i>,
    linkURL: '/'
  },
]

export default LeftSidebar;
