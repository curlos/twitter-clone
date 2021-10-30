import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import styled, { css, createGlobalStyle } from 'styled-components'
import SmallUser from './SmallUser'
import TweetForm from './TweetForm'
import { AuthContext } from '../context/auth/AuthContext'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = styled.form`
  width: 100%;
`

const AboutContainer = styled.div`
  padding-bottom: 0px;
`

const CoverPicture = styled.img`
  object-fit: cover;
  width: 100%;
`

const UserIcon = styled.img`
  border: 4px solid #54595a;
  border-radius: 50%;
  width: 133px;
  height: 133px;
  top: -65px;
  position: relative;
`

const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 65px;
  padding: 10px;
`

const FormInputContainers = styled.div`
  padding: 10px;
  margin-top: 20px;
`

const FormInputContainer = styled.div`
  padding: 10px;
  border: 1px solid #54595a;
  border-radius: 10px;
  margin-bottom: 20px;

  &:focus-within {
    border: 2px solid #237be0;
  }
`

const FormInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  border-radius: 10px;
  color: white;
  padding-top: 15px;
  padding-left: 0px;
  font-size: 16px;
  
  &:focus {
    outline: none;
  }
`

const BioInput = styled(FormInput)`
  padding-bottom: 50px;
`

const StyledLabel = styled.div`
  font-size: 14px;

  ${FormInput}:focus {
    color: #237be0;
  }
`

const DatePickerWrapper = styled(({ className, ...props }) => (
  <DatePicker {...props} wrapperClassName={className} />
))`
  width: 100%;
`;

const Calendar = styled.div`
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(27, 37, 86, 0.16);
  overflow: hidden;
`;

const Popper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;


const EditProfileForm = ({ profileInfo, setProfileInfo }) => {

  const handleSubmit = async (e) => {
    e.preventDefault()
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <CoverPicture src="/images/default_cover.jpg"/>

      <AboutContainer>
        <TopInfo>
          <UserIcon src="/images/default_icon.jpeg"/>
        </TopInfo>
      </AboutContainer>

      <FormInputContainers>
        <FormInputContainer>
          <StyledLabel>Name</StyledLabel>
          <FormInput value={profileInfo.name} onChange={(e) => setProfileInfo({...profileInfo, name: e.target.value})} placeholder="Name" />
        </FormInputContainer>

        <FormInputContainer>
          <StyledLabel>Bio</StyledLabel>
          <BioInput value={profileInfo.bio} onChange={(e) => setProfileInfo({...profileInfo, bio: e.target.value})} placeholder="Bio" />
        </FormInputContainer>

        <FormInputContainer>
          <StyledLabel>Location</StyledLabel>
          <FormInput value={profileInfo.location} onChange={(e) => setProfileInfo({...profileInfo, location: e.target.value})} placeholder="Location" />
        </FormInputContainer>

        <FormInputContainer>
          <StyledLabel>Website</StyledLabel>
          <FormInput value={profileInfo.website} onChange={(e) => setProfileInfo({...profileInfo, website: e.target.value})} placeholder="Website" />
        </FormInputContainer>


        <DatePickerWrapper  
          popperContainer={Popper}
          calendarContainer={Calendar}
          selected={profileInfo.birthDate} onChange={(date) => setProfileInfo({...profileInfo, birthDate: date})}
        />
        
  
      </FormInputContainers>

    </Form>
  )
}

export default EditProfileForm;