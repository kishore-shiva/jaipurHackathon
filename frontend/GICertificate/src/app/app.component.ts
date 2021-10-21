import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 

export class AppComponent {
  title = 'GICertificate';
  buyer = true;
  showBuyer = false;
  showSeller = false;

  clickBuyer(){
    this.showBuyer = true;
  }

  ngOnInit(){
  }
}


