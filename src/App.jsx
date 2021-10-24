import './App.css';
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'
import Feed from './components/Feed'
import styled from 'styled-components'

const MainContainer = styled.div`
  display: flex;
  font-family: Roboto;
  margin: 0 45px;
`

const App = () => {
  return (
    <MainContainer>
      <LeftSidebar />
      <Feed />
      <RightSidebar />

    </MainContainer>
  );
}

export default App;
