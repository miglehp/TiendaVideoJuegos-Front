import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent {

  formulario: FormGroup;

  userService = inject(UserService);
  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);

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

  ngOnInit(){
    this.activatedRoute.params.subscribe(async params => {
      const user = await this.userService.getById(params['userId']);
      console.log(user);
    });
  }

  onSubmit(){

  }

  checkError(field: string, error: string) {
    return this.formulario.get(field)?.hasError(error) && this.formulario.get(field)?.touched;
  }

}
