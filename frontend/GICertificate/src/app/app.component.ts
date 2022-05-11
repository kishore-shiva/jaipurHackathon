import { AfterViewInit, Component, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core';
import {Directive, HostBinding, Input} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber, BehaviorSubject, ObservableLike, VirtualTimeScheduler } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 

// @Directive({
//   selector: '[sanitizeHtml]'
// })

export class AppComponent{

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private clipboard: Clipboard, private domSanitizer: DomSanitizer) {}

  image: SafeResourceUrl = "";
  scn=""; sai=""; pt=""; ce="" ; ml=""; ca=""; barcodePayload = {};
  showBarCode = false; barcodeData = "";

  title = 'GICertificate';

  sellerSignUpButton = true;
  sellerSignInButton = true;

  sellerSignUpForm = false;

  sellerSignInForm = false;

  isSignInSubmitted = false;

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

  clickSubmitSignIn(){
    this.sellerSignInForm = false;
   //this.isSignInSubmitted = true;
    let username = (document.getElementById("sellerSigninUsername") as HTMLInputElement).value;
    let password = (document.getElementById("sellerSigninPassword") as HTMLInputElement).value;
    this.http.post('http://localhost:5000/sellerLogin', {"username": username, "password": password}, {'headers': { 'content-type': 'application/json'}  }).subscribe((data) => {
      const response = JSON.parse(JSON.stringify(data));
      console.log(response.message);

      this.scn = response.message.companyName;
      this.sai = response.message.associationID;
      this.pt = response.message.typeOfGoods;
      this.ce = response.message.companyEmail;
      this.ml = response.message.mfdLocation;
      this.ca = response.message.officeAddress;
      
      this.isSignInSubmitted = true;
    })
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

  sellerSignUp(){
    let username = (document.getElementById("username") as HTMLInputElement).value;
    let password = (document.getElementById("password") as HTMLInputElement).value;
    let companyName = (document.getElementById("companyName") as HTMLInputElement).value;
    let companyId = (document.getElementById("companyId") as HTMLInputElement).value;
    let proprietorName = (document.getElementById("proprietorName") as HTMLInputElement).value;
  }

  generateBarCode(){
    console.log('executing');
      let scn = (document.getElementById("scn") as HTMLInputElement).value;
      let sai = (document.getElementById("sai") as HTMLInputElement).value;
      let pt = (document.getElementById("pt") as HTMLInputElement).value;
      let ce = (document.getElementById("ce") as HTMLInputElement).value;
      let ml = (document.getElementById("ml") as HTMLInputElement).value;
      let ca = (document.getElementById("ca") as HTMLInputElement).value;
      let pn = (document.getElementById("pn") as HTMLInputElement).value;
      let sn = (document.getElementById("sn") as HTMLInputElement).value;
      let sl = (document.getElementById("sl") as HTMLInputElement).value;

      this.barcodePayload = {
        "companyName": scn,
        "associationID": sai,
        "officeAddress": ca,
        "typeOfGoods": pt,
        "companyEmail": ce,
        "productName": pn,    
        "mfdLocation": ml,
        "sellerName": sn,
        "sellerLocation": sl
      }

      this.http.post('http://localhost:5000/registerProduct', {"companyName": scn,
      "associationID": sai,
      "officeAddress": ca,
      "typeOfGoods": pt,
      "companyEmail": ce,
      "productName": pn,    
      "mfdLocation": ml,
      "sellerName": sn,
      "sellerLocation": sl}, {'headers': { 'content-type': 'application/json'} }).subscribe((val) => {
        this.barcodeData = JSON.parse(JSON.stringify(val)).data;
        this.clipboard.copy(this.barcodeData);
        this.image = this.domSanitizer.bypassSecurityTrustResourceUrl(this.barcodeData);
      }); 
      
      this.showBarCode = true;
      console.log("showing barcoed: ",this.showBarCode);
  }

  ngOnInit(){}

}

