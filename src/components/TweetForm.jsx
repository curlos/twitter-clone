import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { AuthContext } from '../context/auth/AuthContext'
import { TweetsContext } from '../context/tweets/TweetsContext'

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

const Textarea = styled.textarea`
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
  width: 100%;
  cursor: pointer;
`


const TweetForm = () => {
  
  const { user, userDispatch } = useContext(AuthContext)
  const { tweets, tweetsDispatch } = useContext(TweetsContext)

  const [text, setText] = useState('')

  const handlePostTweet = async (e) => {
    e.preventDefault()

    if (!user) {
      return
    }

    try {
      const body = {
        userID: user._id,
        text: text
      }

      console.log(body)
      
      const response = await axios.post('http://localhost:8888/api/tweets/tweet', body)
      tweetsDispatch({ type: "UPDATE_TWEETS", payload: [...tweets, response.data]})

      console.log(response.data)
    } catch(err) {

    }
  }


  return (
    <FormTweet onSubmit={handlePostTweet}>
      <UserIcon src="/images/user_icon.jpg"/>

      <FormCreate>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What's happening?"/>

        <FormActions>

          <MediaOptions>
            <i class="far fa-image"></i>
            <i class="far fa-image"></i>
            <i class="far fa-image"></i>
            <i class="far fa-image"></i>
          </MediaOptions>

          <div>
            <TweetButton onClick={handlePostTweet}>Tweet</TweetButton>
          </div>
        </FormActions>
      </FormCreate>
      
    </FormTweet>
  );
}

export default TweetForm;
