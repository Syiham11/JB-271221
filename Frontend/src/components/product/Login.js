import React, { useContext } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { LoginStoreContext } from '../../store/login';
import { observer } from 'mobx-react';

const LoginModalDetail = observer(() => {
  const loginStore = useContext(LoginStoreContext);
  if(!loginStore.loginSelectedData) {
    loginStore.loginSelectedData = {
      email: '',
      password: '',
    };
  } 
  return (
    <Modal
      show={loginStore.isModalDetailShow}
      onHide={() => {
        loginStore.handleModalDetailClose();
      }}
      backdrop="static"
      keyboard={false}
      >
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className="mb-2" controlId="input-email" label="Email">
            <Form.Control type="email" placeholder="Enter Email ..." value={loginStore.loginSelectedData?.email} required 
              onChange={(e) => {
                loginStore.loginSelectedData.email = e.target.value;
              }}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-2" controlId="input-password" label="Password *">
            <Form.Control type="password" placeholder="Enter password ..." value={loginStore.loginSelectedData?.password} required
              onChange={(e) => {
                loginStore.loginSelectedData.password = e.target.value;
              }}
            />
          </FloatingLabel>
          
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
              loginStore.handleModalDetailClose();
            }}>Close</Button>
          <Button variant="primary" onClick={(e) => {
            loginStore.handleModalDetailSubmit(e);
          }}>Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
});

export default LoginModalDetail;
