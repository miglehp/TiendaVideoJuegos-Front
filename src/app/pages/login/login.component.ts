import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  router = inject(Router);
  formulario: FormGroup;
  userService = inject(UserService);

  constructor() {
    this.formulario = new FormGroup({
      password: new FormControl(null, [Validators.required]),

      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/),
      ]),

      foto_perfil: new FormControl(),
    });
  }

  async onSubmit() {
    const response = await this.userService.login(this.formulario.value);

    if (response.fatal) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'email or password wrong',
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.setItem('ecommerce_token', response.token);
      this.router.navigate(['/home']);
    }
  }

  checkError(field: string, error: string) {
    return (
      this.formulario.get(field)?.hasError(error) &&
      this.formulario.get(field)?.touched
    );
  }
}
