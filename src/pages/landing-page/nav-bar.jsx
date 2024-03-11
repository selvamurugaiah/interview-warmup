import { MDBContainer, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit'
import React from 'react'
import './landing-page.css'

export const Navbar = () => {

  return (
<div className="navbar">
        <MDBNavbar sticky light bgColor="white">
          <MDBContainer fluid>
            <MDBNavbarBrand href="#" className="brand">
              interview{" "}
              <span className="brand-color">
                warmup
              </span>
            </MDBNavbarBrand>
          </MDBContainer>
        </MDBNavbar>
      </div>
  )
}
