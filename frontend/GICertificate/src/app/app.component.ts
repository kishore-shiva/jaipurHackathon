import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber, BehaviorSubject, ObservableLike } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 

export class AppComponent {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

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

  buyerSignUp(){
    let Username = (document.getElementById("buyerSignupUsername") as HTMLInputElement).value;
    let Password = (document.getElementById('buyerSignupPassword') as HTMLInputElement).value;
    console.log("username: ",Username);

    this.signBuyer(Username, Password).subscribe( (data) => {console.log('success!!!!')}, (error) => {console.log(error)});
    
  }
  signBuyer(Username : String, Password : String) : Observable<any>{
    return this.http.post<any>('http://localhost:5000/buyerSignup', JSON.stringify({"username": Username, "password": Password}), {'headers': { 'content-type': 'application/json'}  });
  }

  ngOnInit(){}
}


