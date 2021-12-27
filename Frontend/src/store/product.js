import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";

class ProductStore {
  page = 1;
  products = [];
  productSelectedSKU = '';
  productSelectedData = null;
  isModalDetailShow = false;
  
  constructor() {
    makeObservable(this, {
      page: observable,
      products: observable,
      productSelectedSKU: observable,
      productSelectedData: observable,
      isModalDetailShow: observable,
      getProduct: action,
      createProduct: action,
      updateProduct: action,
      deleteProduct: action,
      handleModalDetailShow: action,
      handleModalDetailClose: action,
      handleModalDetailSubmit: action,
    })
  }
  
  // action handler to get product with page query param 
  getProduct() {
    let token = JSON.parse(localStorage.getItem('userInfo'));
    let url = process.env.REACT_APP_API_URL + `/api/v1/products?page=${this.page}&limit=10`;
      fetch(url,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': token.token
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if(this.page > 1) {
            if(result.data) {
              this.products = [...this.products, ...result.data];
              this.page++;
            } 
          } else {
            this.products = result.data;
            this.page++;
          }
        })
        .catch((error) => {
          alert('Something error with get data process');
          this.products = [];
          this.page++;
        });
  }

  // action handler to create product
  createProduct(payload, cb) {
    let url = process.env.REACT_APP_API_URL + `/api/v1/products`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN5aWhhbSIsImVtYWlsIjoiaWhhbW11c29mZmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkbS5UUEhzODhQc0tldWZrV3hOVXVtdXhOaGlDL3BVZUREd3FOMXQ2dXN1ZDMuUDczTzN1NlMiLCJjcmVhdGVkQXQiOiIyMDIxLTEyLTI2VDEwOjM5OjU4LjA2NloiLCJ1cGRhdGVkQXQiOiIyMDIxLTEyLTI2VDEwOjM5OjU4LjA2NloiLCJpYXQiOjE2NDA1OTUxNjAsImV4cCI6MTY0MDU5NjYwMH0.ghY82I6forQChTAWA4Uv3KIV0qemBGAANtDRsIOp1C8',
          'Content-Type': 'application/json'
        },
        body: payload
      })
        .then((response) => response.json())
        .then((result) => {
        })
        .catch((error) => {
          alert('Something error with get data process');
          console.error('Error:', error);
        });
  }

  // action handler to update product
  updateProduct(payload, cb) {
    let url = process.env.REACT_APP_API_URL + `/api/v1/products/${this.productSelectedSKU}`;
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN5aWhhbSIsImVtYWlsIjoiaWhhbW11c29mZmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkbS5UUEhzODhQc0tldWZrV3hOVXVtdXhOaGlDL3BVZUREd3FOMXQ2dXN1ZDMuUDczTzN1NlMiLCJjcmVhdGVkQXQiOiIyMDIxLTEyLTI2VDEwOjM5OjU4LjA2NloiLCJ1cGRhdGVkQXQiOiIyMDIxLTEyLTI2VDEwOjM5OjU4LjA2NloiLCJpYXQiOjE2NDA1OTUxNjAsImV4cCI6MTY0MDU5NjYwMH0.ghY82I6forQChTAWA4Uv3KIV0qemBGAANtDRsIOp1C8',
          'Content-Type': 'application/json'
        },
        body: payload
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);

          if(result.success) {
            this.page = 1;
            this.getProduct();
            this.handleModalDetailClose();
            alert(result.message);
          }

          cb();
        })
        .catch((error) => {
          alert('Something error with get data process');
          console.error('Error:', error);
        });
  }

  // action handler to delete product
  deleteProduct(product = null) {
    if (window.confirm(`Are you sure to delete this product ${product.id}`) === true) {
      let url = process.env.REACT_APP_API_URL + `/api/v1/products/${product.id}`;
        fetch(url, {
          method: 'DELETE',
          headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN5aWhhbSIsImVtYWlsIjoiaWhhbW11c29mZmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkbS5UUEhzODhQc0tldWZrV3hOVXVtdXhOaGlDL3BVZUREd3FOMXQ2dXN1ZDMuUDczTzN1NlMiLCJjcmVhdGVkQXQiOiIyMDIxLTEyLTI2VDEwOjM5OjU4LjA2NloiLCJ1cGRhdGVkQXQiOiIyMDIxLTEyLTI2VDEwOjM5OjU4LjA2NloiLCJpYXQiOjE2NDA1OTUxNjAsImV4cCI6MTY0MDU5NjYwMH0.ghY82I6forQChTAWA4Uv3KIV0qemBGAANtDRsIOp1C8',
            'Content-Type': 'application/json'
          }
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            this.page = 1;
            this.getProduct();
          })
          .catch((error) => {
            alert('Something error with delete data process');
            console.error('Error:', error);
          });
    }
  }

  // action handler for modal detail product
  handleModalDetailShow(product = null) {
    this.isModalDetailShow = true;
    this.productSelectedSKU = product ? product.id : '';
    this.productSelectedData = product ? Object.assign({}, product) : null;
  }

  handleModalDetailClose() {
    this.isModalDetailShow = false;
    this.productSelectedSKU = '';
    this.productSelectedData = null;
  }

  

  handleModalDetailSubmit(e) {
    e.target.disabled = true;
    const data = {
      id: this.productSelectedData.id,
      name: this.productSelectedData.name,
      price: this.productSelectedData.price,
      description: this.productSelectedData.description,
      imageUrl: this.productSelectedData.imageUrl,
    }
    const formData = JSON.stringify(data)
    console.log(JSON.stringify(formData));
    if(this.productSelectedSKU) { // update
      this.updateProduct(formData, () => {
        e.target.disabled = false;
      });
    } else {
      this.createProduct(formData, () => {
        e.target.disabled = false;
      });
    }
  }
}



export const ProductStoreContext = createContext(new ProductStore());