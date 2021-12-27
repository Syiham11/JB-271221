import React, { useContext } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { ProductStoreContext } from '../../store/product';
import { observer } from 'mobx-react';
import Parser from 'html-react-parser';

const ProductCard = observer(({ product }) => {
  const productStore = useContext(ProductStoreContext);

  return (
    <Col md="3" className='mb-3'>
      <Card>
        <Card.Img variant="top" src={product?.imageUrl} style={{height: '15em'}} />
        <Card.Body>
          <Card.Title>
            <div className='d-flex justify-content-between'>
              <span>{product?.name}</span>
              <span>{product?.price}</span>
            </div>
          </Card.Title>
          <Card.Subtitle className='text-muted'>{product?.id}</Card.Subtitle>
          <div style={{
            height: '4em', 
            minHeight: '4em',
            overflowY: 'auto'
          }}>
            <Card.Text>
              {Parser(product?.description ?? '')}
            </Card.Text>
          </div>
          <div className='d-flex justify-content-end'>
            <Button variant="primary" className='me-2'
              onClick={() => {
                productStore.handleModalDetailShow(product);
              }}>Edit</Button>
            <Button variant="danger"
              onClick={() => {
                productStore.deleteProduct(product);
              }}>Delete</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
});

export default ProductCard;
