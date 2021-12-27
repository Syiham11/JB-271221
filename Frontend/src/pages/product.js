import React, { useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductCard from '../components/product/ProductCard';
import ProductHeader from '../components/product/ProductHeader';
import ProductModalDetail from '../components/product/ProductModalDetail';
import { ProductStoreContext } from '../store/product';
import { LoginStoreContext } from '../store/login';
import { observer } from 'mobx-react';
import Login from '../components/product/Login';

const product = observer(() => {
  const productStore = useContext(ProductStoreContext);
  const loginStore = useContext(LoginStoreContext);

  window.onscroll = () => {    
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      productStore.getProduct();
    }
  }

  useEffect(async () => {
   await getData()
    productStore.isModalDetailShow = false;
    loginStore.isModalDetailShow = false;
    productStore.productSelected = null;
  }, [productStore]);

  const getData = () =>{
    var token = JSON.parse(localStorage.getItem('userInfo'));
    if(token !== undefined)
    {
      productStore.getProduct()
    }

  }

  if(productStore.products.length <= 0) {
    return (
      <Container className='mt-3'>
        <ProductHeader />
        <Row className='justify-content-center'>
          Product no available
        </Row>
        <Login />
        <ProductModalDetail />
      </Container>
    )
  }

  return (
    <Container className='mt-3'>
      <ProductHeader />
      <Row className='mt-3'>
        {productStore.products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </Row>
      
      <ProductModalDetail />
      <Login />
    </Container>
  )
});

export default product;