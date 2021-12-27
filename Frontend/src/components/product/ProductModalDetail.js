import React, { useContext } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { ProductStoreContext } from '../../store/product';
import { observer } from 'mobx-react';

const ProductModalDetail = observer(() => {
  const productStore = useContext(ProductStoreContext);
  if(!productStore.productSelectedData) {
    productStore.productSelectedData = {
      id: '',
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
    };
  } 
  return (
    <Modal
      show={productStore.isModalDetailShow}
      onHide={() => {
        productStore.handleModalDetailClose();
      }}
      backdrop="static"
      keyboard={false}
      >
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>{productStore.productSelectedSKU ? `Update Product ${productStore.productSelectedSKU}` : 'Create Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className="mb-2" controlId="input-product_sku" label="SKU * No">
            <Form.Control type="text" placeholder="Enter SKU No ..." value={productStore.productSelectedData?.id} required 
              onChange={(e) => {
                productStore.productSelectedData.id = e.target.value;
              }}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-2" controlId="input-product_name" label="Name *">
            <Form.Control type="text" placeholder="Enter Name ..." value={productStore.productSelectedData?.name} required
              onChange={(e) => {
                productStore.productSelectedData.name = e.target.value;
              }}
            />
          </FloatingLabel>
          
          <FloatingLabel className="mb-2" controlId="input-product_price" label="Price *">
            <Form.Control type="number" min="0" placeholder="Enter Price ..." value={productStore.productSelectedData?.price} required
              onChange={(e) => {
                productStore.productSelectedData.price = e.target.value;
              }}
            />
          </FloatingLabel>

          <FloatingLabel className="mb-2" controlId="input-product_description" label="Description">
            <Form.Control
              as="textarea"
              placeholder="Enter Description ..."
              style={{ height: '100px' }}
              value={productStore.productSelectedData?.description}
              onChange={(e) => {
                productStore.productSelectedData.description = e.target.value;
              }}
            />
          </FloatingLabel>
           <Form.Control type="text" placeholder="Enter imageUrl ..." value={productStore.productSelectedData?.imageUrl} required
              onChange={(e) => {
                productStore.productSelectedData.imageUrl = e.target.value;
              }}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
              productStore.handleModalDetailClose();
            }}>Close</Button>
          <Button variant="primary" onClick={(e) => {
            productStore.handleModalDetailSubmit(e);
          }}>Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
});

export default ProductModalDetail;
