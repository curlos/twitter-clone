import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { AuthContext } from '../context/auth/AuthContext'
import { TweetsContext } from '../context/tweets/TweetsContext'
import TextareaAutosize from 'react-textarea-autosize';

const FormTweet = styled.form`
  display: flex;
  width: 100%;
  background-color: #232627;
  border-bottom: 1px solid #54595a;
  color: #fff;
  padding: 10px;
`

const UserIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const FormCreate = styled.div`
  width: 100%;
`

const FlexibleTextarea = styled(TextareaAutosize)`
  font-family: Roboto;
  font-size: 20px;
  color: white;
  background-color: transparent;
  width: 100%;
  resize: none;
  border: none;
  padding: 10px;
  padding-top: 15px;
  padding-left: 15px;
  white-space: pre-wrap;

  &:focus {
    outline: none;
  }
  
`

const FormText = styled.div`
  display: flex;
  width: 100%;
`

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  
`

const MediaOptions = styled.div`
  font-size: 18px;
  i {
    margin-right: 15px;
    cursor: pointer;
  }
`

const TweetButton = styled.button`
  background-color: #1EA2FB;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  padding: 12px;
  padding-left: 17px;
  padding-right: 17px;
  cursor: pointer;
`

const TweetButtonAndCharLimit = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const CharLimitCounter = styled.div`
  color: ${props => props.charLimitReached ? 'red' : '#fff'};
`


const TweetForm = ({ replying }) => {
  
  const { user, userDispatch } = useContext(AuthContext)
  const { tweets, tweetsDispatch } = useContext(TweetsContext)
  const MAX_CHAR_LIMIT = 400

  const [text, setText] = useState('')

  const handleTextChange = (e) => {

    if (e.target.value.length <= MAX_CHAR_LIMIT) {
      setText(e.target.value)
    }
  }

  const handlePostTweet = async (e) => {
    e.preventDefault()

    if (!user) {
      return
    }

    console.log(user)

    try {
      const body = {
        userID: user._id,
        text: text
      }

      console.log(body)
      
      const response = await axios.post('http://localhost:8888/api/tweets/tweet', body)
      console.log('BOIS')
      tweetsDispatch({ type: "UPDATE_TWEETS", payload: [...tweets, response.data]})
      setText('')
    } catch(err) {

    }
  }

  const handleReplyTweet = async (e) => {
    e.preventDefault()

    if (!user) {
      return
    }

    console.log(user)

    try {
      const body = {
        userID: user._id,
        text: text
      }

      console.log(body)
      
      const response = await axios.post('http://localhost:8888/api/tweets/tweet', body)
      console.log('BOIS')
      tweetsDispatch({ type: "UPDATE_TWEETS", payload: [...tweets, response.data]})
      setText('')
    } catch(err) {

    }
  }


  return (
    <FormTweet onSubmit={handlePostTweet}>
      <UserIcon src="/images/user_icon.jpg"/>

      <FormCreate>
        <FlexibleTextarea value={text} onChange={handleTextChange} placeholder="What's happening?"/>

        <FormActions>

          <MediaOptions>
            <i class="far fa-image"></i>
            <i class="far fa-image"></i>
            <i class="far fa-image"></i>
            <i class="far fa-image"></i>
          </MediaOptions>

          <TweetButtonAndCharLimit>
            <CharLimitCounter charLimitReached={text.length === MAX_CHAR_LIMIT}>{text.length} / {MAX_CHAR_LIMIT}</CharLimitCounter>
            {!replying ? (
              <TweetButton onClick={handlePostTweet}>Tweet</TweetButton>
            ) : <TweetButton onClick={handleReplyTweet}>Reply</TweetButton>}
          </TweetButtonAndCharLimit>
        </FormActions>
      </FormCreate>
    </FormTweet>
  );
}

export default TweetForm;
