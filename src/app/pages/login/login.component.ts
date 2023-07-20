import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formulario: FormGroup;
  userService = inject(UserService);

  constructor(){
    
    this.formulario = new FormGroup({
  
  password: new FormControl(null, [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
  ]),
  
  email: new FormControl(null, [
    Validators.required,
    Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/)
  ]),

  foto_perfil: new FormControl()
})
  }

  async onSubmit(){
    await this.userService
  }

}
