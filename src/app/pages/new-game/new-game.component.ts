import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent {
  formulario: FormGroup;
  gameService = inject(GameService);
  router = inject(Router);

  constructor() {
    this.formulario = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      detailed_description: new FormControl(null, [Validators.required]),
      about_the_game: new FormControl(null, [Validators.required]),
      short_description: new FormControl(null, [Validators.required]),
      header_image: new FormControl(null, [Validators.required]),
      capsule_image: new FormControl(null, [Validators.required]),
      capsule_imagev5: new FormControl(null, [Validators.required]),
      website: new FormControl(),
      pc_requirements_minimum: new FormControl(),
      pc_requirements_recommended: new FormControl(),
      mac_requirements: new FormControl(),
      linux_requirements: new FormControl(),
      developers: new FormControl(null, [Validators.required]),
      publishers: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      release_date: new FormControl(),
      support_info_url: new FormControl(),
      support_info_email: new FormControl(),
    });
  }
  registrarJuego() {
    this.router.navigate(['/gameList']);
  }
  onClick() {
    const response = this.gameService.registro(this.formulario.value);
  }
  checkError(field: string, error: string) {
    return (
      this.formulario.get(field)?.hasError(error) &&
      this.formulario.get(field)?.touched
    );
  }
}
