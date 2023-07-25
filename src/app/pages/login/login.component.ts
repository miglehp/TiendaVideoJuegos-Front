import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
      ]),

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
      return alert(response.fatal);
    }

    localStorage.setItem('ecommerce_token', response.token);
    console.log(response);

    const tokenInfo = this.userService.getDecodedAccessToken(response.token);

    this.router.navigate(['/home']);
  }

  checkError(field: string, error: string) {
    return (
      this.formulario.get(field)?.hasError(error) &&
      this.formulario.get(field)?.touched
    );
  }
}
