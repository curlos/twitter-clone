import styled from 'styled-components'

const MainContainer = styled.div`
  display: flex;
  background-color: #232627;
  border-bottom: 1px solid #54595a;
  padding: 15px;
`

const UserIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const TweetInfo = styled.div`
  margin-left: 10px;
`

const TweetTopInfo = styled.div`
  color: lightgray;

  span {
    margin-right: 8px;
  }
`

const AuthorFullName = styled.span`
  color: #fff;
  font-weight: bold;

`

const Verified = styled.span`
  color: #47EEFF;
`

const TweetContent = styled.div`
  margin-top: 5px;
  margin-bottom: 15px;
`

const TweetActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  color: lightgray;
`

const TweetAction = styled.span`
  i {
    margin-right: 10px;
  }
`


const Tweet = () => {
  return (
    <MainContainer>
      <UserIcon src="/assets/user_icon.jpg"/>

      <TweetInfo>
        <TweetTopInfo>
          <AuthorFullName>Donald J. Trump</AuthorFullName>
          <Verified><i class="fas fa-check-circle"></i></Verified>
          <span>@realDonaldTrump</span>
          <span>-</span>
          <span>May 8</span>
        </TweetTopInfo>

        <TweetContent>
          Sorry losers and haters, but my I.Q. is the highest - and you all know it! Please don't feel so stupid or insecure, it's not your fault.
        </TweetContent>
          
        <TweetActions>
          <TweetAction>
            <i class="far fa-comment"></i>
            <span>40.7K</span>
          </TweetAction>

          <TweetAction>
            <i class="fas fa-retweet"></i>
            <span>2.1M</span>
          </TweetAction>

          <TweetAction>
            <i class="far fa-heart"></i>
            <span>1.8M</span>
          </TweetAction>

          <TweetAction>
            <i class="fas fa-share-square"></i>
          </TweetAction>
          
        </TweetActions>
      </TweetInfo>
    </MainContainer>
  );
}

export default Tweet;
