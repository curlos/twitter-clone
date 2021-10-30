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
  overflow: auto; /* Enable scroll if needed */
`

const CloseBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: none;
  padding: 10px;
  border-bottom: 1px solid #888;
`

const CloseBarTitle = styled.span`
  font-weight: 600;
  font-size: 20px;
`

const Close = styled.span`
  color: #aaaaaa;
  font-size: 24px;
  cursor: pointer;
  margin-right: 20px;
`

const SaveButton = styled.button`
  background-color: #0f1011;
  border: 1px solid #888;
  font-weight: bold;
  color: white;
  border-radius: 30px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #25282b;
  }
`

const Footer = styled.div`
  padding: 20px;
`

const EditProfileModal = ({ showModal, setShowModal, handleSubmit, children }) => {

  return (
    <Modal>
      <ModalContent>

        <CloseBar>
          <div>
            <Close>
              <i class="fas fa-times" onClick={() => setShowModal(false)}></i>  
            </Close>

            <CloseBarTitle>Edit profile</CloseBarTitle>
          </div>

          <SaveButton onClick={handleSubmit}>Save</SaveButton>


        </CloseBar>

        {children}

        <Footer>&nbsp;</Footer>
        
        
      </ModalContent>
    </Modal>
  )
}

export default EditProfileModal;