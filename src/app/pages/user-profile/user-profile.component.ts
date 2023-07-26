import { formatDate } from '@angular/common';
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
  edit: boolean;
  editText: string;

  constructor() {
    this.userId = 0;
    this.edit = false;
    this.editText = 'Edit';

    this.formulario = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      fecha_nacimiento: new FormControl(),
    });
  }

  ngOnInit() {
    this.setUser()
  }

  setUser(){
    this.activatedRoute.params.subscribe(async (params) => {
      const user = await this.userService.getProfile();

      this.userId = params['userId'];
      const obj = {
        username: user.username,
        email: user.email,
        fecha_nacimiento: formatDate(user.fecha_nacimiento, 'yyyy-MM-dd', 'en-US')
      };
      this.formulario.setValue(obj);
      this.formulario.get('username')?.disable();
      this.formulario.get('email')?.disable();
      this.formulario.get('fecha_nacimiento')?.disable();
    });
  }

  async onSubmit() {
    console.log(this.formulario.value)
    await this.userService.updateById(
      this.userId,
      this.formulario.value
    );
  }

  onClickChangeEdit(){
    if(!this.edit){
      this.formulario.get('username')?.enable();
      this.formulario.get('email')?.enable();
      this.formulario.get('fecha_nacimiento')?.enable();
      this.editText = 'Cancel';
    } else {
      this.setUser();
      this.editText = 'Edit';
    }
    this.edit = !this.edit;
  }

}
