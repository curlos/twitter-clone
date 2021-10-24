import styled from 'styled-components'
import TweetForm from './TweetForm'
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
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  padding: 18px;
  border-bottom: 1px solid #54595a;
`

const FeedType = styled.div`

`

const FeedIcon = styled.div`
  font-size: 24px;
`


const Feed = () => {
  return (
    <MainContainer>
      <Topbar>
        <FeedType>Home</FeedType>
        <FeedIcon><i class="fab fa-galactic-senate"></i></FeedIcon>
      </Topbar>
      <TweetForm />
      <Tweets />
    </MainContainer>
  );
}

export default Feed;
