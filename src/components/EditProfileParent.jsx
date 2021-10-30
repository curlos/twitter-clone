import axios from 'axios'
import { useState, useContext } from 'react'
import EditProfileModal from './EditProfileModal'
import EditProfileForm from './EditProfileForm'
import { AuthContext } from '../context/auth/AuthContext'

const EditProfileParent = ({ showModal, setShowModal, profileUserInfo, setProfileUserInfo }) => {

  const { user, userDispatch } = useContext(AuthContext)

  const [profileInfo, setProfileInfo] = useState({
    fullName: profileUserInfo.user.fullName || '',
    bio: profileUserInfo.user.bio || '',
    location: profileUserInfo.user.location || '',
    website: profileUserInfo.user.website || '',
    birthDate: profileUserInfo.user.birthDate ? new Date(profileUserInfo.user.birthDate) : new Date()
  })



  const handleSubmit = async () => {
    const profileInfoModified = {...profileInfo, birthDate: profileInfo.birthDate.toJSON()}
    console.log(profileInfoModified)
    console.log(profileUserInfo.user._id)

    const response = await axios.put(`http://localhost:8888/api/users/user/${profileUserInfo.user._id}`, profileInfo)

    setProfileUserInfo({...profileInfo, user: response.data})
    userDispatch({ type: "UPDATE_USER", payload: response.data})
    setShowModal(false)
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