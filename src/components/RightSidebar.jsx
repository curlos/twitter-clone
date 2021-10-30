import styled from 'styled-components'
import TrendingTopic from './TrendingTopic'
import RecommendedUsers from './RecommendedUsers'

const MainContainer = styled.div`
  flex: 3;
  background-color: #1C1E20;
  color: #fff;
  padding-left: 15px;

`

const SearchBarContainer = styled.div`
  background-color: #243131;
  border: 1px solid #54595a;
  border-radius: 30px;
  margin-top: 15px;
  padding: 10px 20px;
  
`

const SearchInput = styled.input`
  border: none;
  margin-left: 10px;
  font-size: 16px;
  background-color: transparent;
  color: white;


  &:focus {
    outline: none;
  }
`

const TrendingEvents = styled.div`
  background-color: #243131;
  border: 1px solid #54595a;
  border-radius: 10px;
  margin-top: 20px;
  padding: 15px;
`

const TrendingEventsHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`

const ShowMoreButton = styled.button`
  border: none;
  background-color: transparent;
  color: #47EEFF;
  padding-left: 0px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const RightSidebar = () => {
  return (
    <MainContainer>
      <SearchBarContainer>
        <i class="fas fa-search"></i>
        <SearchInput placeholder="Search Twitter 2.0"/>
      </SearchBarContainer>

      <TrendingEvents>
        <TrendingEventsHeader>What's happening</TrendingEventsHeader>
        <TrendingTopic />
        <TrendingTopic />
        <TrendingTopic />
        <TrendingTopic />
        <TrendingTopic />

        <ShowMoreButton>Show more</ShowMoreButton>
      </TrendingEvents>

      <RecommendedUsers />


      


    </MainContainer>
  );
}

export default RightSidebar;
