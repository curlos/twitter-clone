import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthContext'
import styled from 'styled-components'
import Tweets from './Tweets'
import moment from 'moment'
import EditProfileModal from './EditProfileModal'
import EditProfileForm from './EditProfileForm'

const EditProfileParent = ({ showModal, setShowModal, profileUserInfo }) => {

  const [profileInfo, setProfileInfo] = useState({
    name: profileUserInfo.user.fullName || '',
    bio: profileUserInfo.user.bio || '',
    location: profileUserInfo.user.location || '',
    website: profileUserInfo.user.website || '',
    birthDate: new Date() || '',
  })



  const handleSubmit = async () => {
    console.log(profileInfo)
  }


  return (
    <div>
      {showModal ? (
          <EditProfileModal showModal={showModal} setShowModal={setShowModal} handleSubmit={handleSubmit} children={
            <span>
              <EditProfileForm profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>
            </span>}
          />
          
        ) : null}
    </div>
  )
}

export default EditProfileParent;