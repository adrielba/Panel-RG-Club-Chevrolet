import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  mostrarLogin: boolean = false;
  isLoggedIn: boolean = false;
  usuario: string = '';

  constructor(private auth: AuthService) {}


  showLogin(){
    this.mostrarLogin = true;
  }
  cancelLogin(){
    this.mostrarLogin = false;
  }

  onLoginSuccess(usuario: string) {
    this.isLoggedIn = true;
    this.usuario = usuario;
    this.mostrarLogin = false;
  }

  onLoginError(error: string) {
    alert(error);
  }

  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
    this.usuario = '';
  }

}
