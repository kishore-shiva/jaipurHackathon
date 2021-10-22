import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 

export class AppComponent {
  title = 'GICertificate';
  
  BuyerButton = true;
  SellerButton = true;

  isSellerButtonClicked = false;
  isBuyerButtonClicked = false;

  sellerSignUpButton = false;
  sellerSignInButton = false;

  buyerSignUpButton = false;
  buyerSignInButton = false;

  buyerSignUpForm = false;
  sellerSignUpForm = false;

  buyerSignInForm = false;
  sellerSignInForm = false;

  sellerAddProducts = false;

  clickBuyerButton(){
    this.SellerButton = false;
    this.BuyerButton = false;
    this.isBuyerButtonClicked = true;
    this.buyerSignUpButton = true;
    this.buyerSignInButton = true;
  }

  clickSellerButton(){
    this.SellerButton = false;
    this.BuyerButton = false;
    this.isSellerButtonClicked = true;
    this.sellerSignUpButton = true;
    this.sellerSignInButton = true;
  }

  clickSellerSignUp(){
    this.sellerSignUpButton = false;
    this.sellerSignInButton = false;
    this.sellerSignUpForm = true;
  }

  clickSellerSignIn(){
    this.sellerSignUpButton = false;
    this.sellerSignInButton = false;
    this.sellerSignInForm = true;
  }

  clickBuyerSignUp(){
    this.buyerSignUpButton = false;
    this.buyerSignInButton = false;
    this.buyerSignUpForm = true;
  }

  clickBuyerSignIn(){
    this.buyerSignUpButton = false;
    this.buyerSignInButton = false;
    this.buyerSignInForm = true;
  }
  

  ngOnInit(){}

}


