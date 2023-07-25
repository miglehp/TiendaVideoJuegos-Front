import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);

  formulario: FormGroup;
  userId: number;

  constructor() {
    this.userId = 0;

    this.formulario = new FormGroup({
      username: new FormControl(null, [
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
      ]),

      email: new FormControl(null, [
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
      ]),
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      const user = await this.userService.getProfile();

      this.userId = params['userId'];
      const obj = {
        username: user.username,
        email: user.email,
        password: user.password,
      };
      this.formulario.setValue(obj);
    });

    this.userService.esAdmin('token');
  }

  async onSubmit() {
    const response = await this.userService.updateById(
      this.userId,
      this.formulario.value
    );
    console.log(response);
  }
}
