import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";

class LoginStore {
 
  loginSelectedData = null;
  isModalDetailShow = false;
  
  constructor() {
    makeObservable(this, {
      loginSelectedData: observable,
      isModalDetailShow: observable,
      createProduct: action,
      handleModalDetailShow: action,
      handleModalDetailClose: action,
      handleModalDetailSubmit: action,
    })
  }

 

  // action handler to create product
  createProduct(payload, cb) {
    let url = process.env.REACT_APP_API_URL + `/api/v1/login`;
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
            localStorage.setItem("userInfo", JSON.stringify(result));
            this.handleModalDetailClose()
            window.location.reload('/produk')
        })
        .catch((error) => {
          alert('Something error with get data process');
          console.error('Error:', error);
        });
  }

  
  
  handleModalDetailClose() {
    this.isModalDetailShow = false;
    this.productSelectedSKU = '';
    this.loginSelectedData = null;
  }

  // action handler for modal detail product
  handleModalDetailShow() {
    this.isModalDetailShow = true;
  }

  

  handleModalDetailSubmit(e) {
    e.target.disabled = true;
    const data = {
      email: this.loginSelectedData.email,
      password: this.loginSelectedData.password,
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



export const LoginStoreContext = createContext(new LoginStore());