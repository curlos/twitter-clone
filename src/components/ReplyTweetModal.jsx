import styled from 'styled-components'

const Modal = styled.div`
display: block; /* Hidden by default */
position: fixed; /* Stay in place */
z-index: 1; /* Sit on top */
padding-top: 100px; /* Location of the box */
left: 0;
top: 0;
width: 100%; /* Full width */
height: 100%; /* Full height */
overflow: auto; /* Enable scroll if needed */
background-color: rgb(0,0,0); /* Fallback color */
background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

const ModalContent = styled.div`
margin: auto;
width: 50%;
background-color: #232627;
border-radius: 15px;
border: 1px solid #888;
`

const CloseBar = styled.div`
border-bottom: none;
padding: 10px;
border-bottom: 1px solid #888;
`

const Close = styled.span`
color: #aaaaaa;
font-size: 24px;
cursor: pointer;
`

const ReplyTweetModal = ({ showModal, setShowModal, children }) => {

  return (
    <Modal>
      <ModalContent>

        <CloseBar>
          <Close onClick={setShowModal(false)}>
            <i class="fas fa-times" onClick={() => setShowModal(false)}></i>  
          </Close>
        </CloseBar>

        {children}
        
        
      </ModalContent>
    </Modal>
  )
}

export default ReplyTweetModal;