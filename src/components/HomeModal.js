import React,{useState,useEffect}from 'react';
import Modal from 'react-modal';
import {Container,Row,Col} from 'react-bootstrap';
import homemodal from './homemodal.png';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function HomeModal() {

  const [modalIsOpen, setIsOpen] = useState(false);


  useEffect(()=>{
    let pop_status = localStorage.getItem('pop_status');
    if(!pop_status){
        setIsOpen(true);
      localStorage.setItem('pop_status',1);
    }
  },[])
  if(!modalIsOpen) return null;

 

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Container style={{position:'fixed',overflow:'hidden'}}>
     <Row>
    <Col>
    <Modal
isOpen={modalIsOpen}
onRequestClose={closeModal}
style={customStyles}
contentLabel="Wonders Smart Shop"
>
<button style={{border:'none'}} className='bg-warning float-right text-white ml-3'  onClick={closeModal}>X</button>
<img className='img-fluid' src={homemodal} alt='start modal' style={{width:'700px',height:'400px'}} />
</Modal>
    </Col>
  </Row>
    </Container>
  );
}


export default HomeModal;