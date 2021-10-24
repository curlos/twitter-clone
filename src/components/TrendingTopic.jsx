import styled from 'styled-components'

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`

const TopicInfo = styled.div`

`

const TopicCategory = styled.div`
  color: lightgray;
  font-size: 13px;
`

const TopicTitle = styled.div`
  margin: 5px auto;
`

const TweetNumbers = styled.div`
  font-size: 13px;
  color: lightgray;
`

const TopicImage = styled.img`
  object-fit: cover;
  border-radius: 10px;
  height: 68px;
  width: 68px;
`


const Tweet = () => {
  return (
    <MainContainer>
      <TopicInfo>
        <TopicCategory>NFL - Trending</TopicCategory>
        <TopicTitle>Chiefs at Titans</TopicTitle>
        <TweetNumbers>1,457 Tweets</TweetNumbers>
      </TopicInfo>

      <TopicImage src="https://cdn.vox-cdn.com/thumbor/sQeyQ2TYZ-ylau6Sg5MPEjiy4_c=/1481x901:3927x2157/920x613/filters:focal(2289x924:3163x1798):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/70035657/1188315512.0.jpg" />


    </MainContainer>
  );
}

export default Tweet;
