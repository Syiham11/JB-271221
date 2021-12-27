import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ProductStoreContext } from '../../store/product';
import { observer } from 'mobx-react';
import { LoginStoreContext } from '../../store/login';

const ProductHeader = observer(({ product }) => {
  const productStore = useContext(ProductStoreContext);
  const loginStore = useContext(LoginStoreContext);

  return (
    <div className='d-flex flex-column flex-md-row justify-content-center justify-content-md-between'>
      <h1>Product List</h1>
      <div>
        <Button variant="success" className='me-2'
          onClick={() => {
            loginStore.handleModalDetailShow();
          }}>Login</Button>
        <Button variant="primary" onClick={() => {
          productStore.handleModalDetailShow();
        }}>Add</Button>
      </div>
    </div>
  )
});

export default ProductHeader;
