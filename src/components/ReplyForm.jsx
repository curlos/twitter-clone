import { useState, useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthContext'
import { TweetsContext } from '../context/tweets/TweetsContext'
import axios from 'axios'
import styled from 'styled-components'
import moment from 'moment'
import SmallTweet from './SmallTweet'
import TweetForm from './TweetForm'

const ReplyContainer = styled.div`
  padding: 15px;
`

const ParentTweetContainer = styled.div`
  padding-left: 10px;
`

const UserIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 10px;
`

const ReplyForm = ({ parentTweetInfo, setTweetInfo }) => {

  console.log(parentTweetInfo)

  return (
    <ReplyContainer>
      <ParentTweetContainer>
        <UserIcon src="/images/user_icon.jpg"/>
      </ParentTweetContainer>

      Donald J
      

      <TweetForm parentTweetInfo={parentTweetInfo}/>
    </ReplyContainer>
  )
}

export default ReplyForm;