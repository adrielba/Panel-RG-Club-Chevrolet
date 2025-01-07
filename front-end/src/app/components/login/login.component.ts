import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  @Output() loginSuccess = new EventEmitter<string>();
  @Output() loginError = new EventEmitter<string>();

  constructor (private header:HeaderComponent, private auth:AuthService){}

  onLogin(){
    this.auth.login(this.usuario, this.contrasena).subscribe(
      (response) =>{
        this.loginSuccess.emit(this.usuario);
      },
      (error) => {
        this.errorMessage = error.error?.error || 'Error al iniciar sesión';
        this.loginError.emit(this.errorMessage);
      }
    )


}
  exitLogin(){
    this.header.cancelLogin();
  }

}
