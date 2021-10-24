import styled from 'styled-components'
import SmallUser from './SmallUser'

const MainContainer = styled.div`
  flex: 3;
  background-color: #243131;
  color: #fff;
  border: 1px solid #54595a;
  border-radius: 10px;
  margin-top: 15px;
  padding: 15px;
`

const Header = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`

const ShowMoreButton = styled.button`
  border: none;
  background-color: transparent;
  color: #47EEFF;
  padding-left: 0px;
  margin-top: 35px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const RecommendedUsers = () => {
  return (
    <MainContainer>
      

      <Header>Who to follow</Header>
      <SmallUser buttonType="follow"/>
      <SmallUser buttonType="follow"/>

      <ShowMoreButton>Show more</ShowMoreButton>
    </MainContainer>
  );
}

export default RecommendedUsers;
