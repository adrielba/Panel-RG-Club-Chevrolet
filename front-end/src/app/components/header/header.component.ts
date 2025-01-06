import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  mostrarLogin: boolean = false;


  showLogin(){
    this.mostrarLogin = true;
  }
  cancelLogin(){
    this.mostrarLogin = false;
  }

}
