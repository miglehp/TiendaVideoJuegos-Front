import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {

  formulario: FormGroup;

  userService = inject(UserService);
  router = inject(Router);
  
  constructor(){
    this.formulario = new FormGroup({
  username: new FormControl(null, [
    Validators.required,
    Validators.minLength(3)
  ]),
  password: new FormControl(null, [
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
  ]),
  email: new FormControl(null, [
    Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/)
  ]),
  fecha_nacimiento: new FormControl(null, [
    Validators.required
  ]),
  foto_perfil: new FormControl(null, [
    Validators.required
  ])
})
  }
  async onSubmit(){
    const response = await this.userService.create(this.formulario.value)

    if (response.fatal) {
      // Error en la inserción
    
      return alert('Error en la inserción.');
    }

    // Inserción correcta
    this.router.navigate(['/user']);
  
  }
};
