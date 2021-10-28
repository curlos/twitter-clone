import React, { useState, useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../context/auth/AuthContext'
import axios from 'axios'

const MainContainer = styled.div`
  display: flex;
`

const LeftContainer = styled.div`
  background-color: #1EA2FB;
  background-size: cover;
  width: 50vw;
  height: 100vh;
  color: white;
  font-size: 18px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const LandingTexts = styled.div`
  
`

const LandingText = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  i {
    font-size: 20px;
    margin-right: 10px;
  }
`

const RegisterFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 50vw;
  height: 100vh;
  padding: 10%;
`

const AuthForm = styled.form`
  
`

const TwitterLogo = styled.div`
  font-size: 36px;
  color: #1EA2FB;
  margin-bottom: 10px;
`

const LargeText = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`

const SmallText = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`

const AuthInput = styled.input`
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 100%;
  padding: 12px;
  background-color: transparent;
  color: white;
  margin-bottom: 15px;
  font-size: 16px;


  &:focus {
    outline: none;
  }
`

const BlueButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #1EA2FB;
  font-size: 16px;
  color: white;
  padding: 12px;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledLink = styled(Link)`
  color: #1EA2FB;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Authentication = ({ type }) => {

  const { user, userDispatch } = useContext(AuthContext)
  const history = useHistory()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    console.log('register')

    if (!fullName || !email || !password || !confirmPassword) {
      return
    }

    if (password.length < 8) {
      return
    }

    if (password !== confirmPassword) {
      return
    }

    try {
      const body = {
        fullName,
        email,
        password
      }

      console.log(body)
      const response = await axios.post('http://localhost:8888/api/auth/register', body)

      console.log(response.data.results)

      if (!response.error) {
        
        setFullName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        history.push('/login')
      }
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }

  }

  const handleLogin = async (e) => {
    e.preventDefault()

    console.log('login')

    if (!email || !password) {
      return
    }

    if (password.length < 8) {
      return
    }

    try {
      const body = {
        email,
        password
      }

      console.log(body)
      const response = await axios.post('http://localhost:8888/api/auth/login', body)
      console.log(response.data)

      if (!response.error) {
        userDispatch({ type: "LOGIN_SUCCESS", payload: response.data})
        history.push('/')
      }
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <MainContainer>
      <LeftContainer>
        <LandingTexts>
          <LandingText><i className="fas fa-search"></i> Follow your interests.</LandingText>
          <LandingText><i className="fas fa-users"></i> Hear what people are talking about.</LandingText>
          <LandingText><i className="far fa-comment"></i> Join the conversation.</LandingText>
        </LandingTexts>
      </LeftContainer>

      <RegisterFormContainer>
        <AuthForm onSubmit={handleRegister}>
          <TwitterLogo><i className="fab fa-twitter"></i></TwitterLogo>
          <LargeText>See what's happening in the world right now</LargeText>
          {type ==='register' ? <SmallText>Join Twitter today.</SmallText> : null}
          {type === 'register' ? (
            <AuthInput value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name"/>
          ) : null}
          <AuthInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Phone or email"/>
          <AuthInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          {type === 'register' ? <AuthInput type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password"/> : null}

          {type === 'register' ? (
            <Buttons>
              <BlueButton onClick={type === 'register' ? handleRegister : handleLogin}>Sign up</BlueButton>
              <span>Have an account? <StyledLink to="/login">Log in</StyledLink></span>
            </Buttons>
          ) : (
            <Buttons>
              <BlueButton onClick={type === 'register' ? handleRegister : handleLogin}>Log in</BlueButton>
              <span>Don't have an account? <StyledLink to="/register">Sign up</StyledLink></span>
            </Buttons>
          )}

        </AuthForm>
      </RegisterFormContainer>
      
    </MainContainer>
  )
}

export default Authentication;