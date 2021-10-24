import styled from 'styled-components'
import Tweet from './Tweet'

const MainContainer = styled.div`
  background-color: #1C1E20;
  color: #fff;
`


const Tweets = () => {
  return (
    <MainContainer>
      <Tweet />
    </MainContainer>
  );
}

export default Tweets;
