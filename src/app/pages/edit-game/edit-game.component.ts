import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss'],
})
export class EditGameComponent {
  formulario: FormGroup;
  gameService = inject(GameService);
  router = inject(Router);
  gameId: string;

  activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.gameId = '';
    this.formulario = new FormGroup({
      name: new FormControl(),
      detailed_description: new FormControl(),
      about_the_game: new FormControl(),
      short_description: new FormControl(),
      header_image: new FormControl(),
      capsule_image: new FormControl(),
      capsule_imagev5: new FormControl(),
      website: new FormControl(),
      mac_requirements: new FormControl(),
      linux_requirements: new FormControl(),
      developers: new FormControl(),
      publishers: new FormControl(),
      price: new FormControl(),
      support_info_url: new FormControl(),
    });
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      const game = await this.gameService.getById(params['gameId']);

      this.gameId = params['gameId'];

      const obj = {
        name: game.name,
        detailed_description: game.detailed_description,
        about_the_game: game.about_the_game,
        short_description: game.short_description,
        header_image: game.header_image,
        capsule_image: game.capsule_image,
        capsule_imagev5: game.capsule_imagev5,
        website: game.website,
        pc_requirements_minimum: game.pc_requirements_minimum,
        pc_requirements_recommended: game.pc_requirements_recomended,
        mac_requirements: game.mac_requirements,
        linux_requirements: game.linux_requirements,
        developers: game.developers,
        publishers: game.publishers,
        price: game.price,
        release_date: game.release_date,
        support_info_url: game.support_info_url,
        support_info_email: game.suport_info_email,
      };
      this.formulario.setValue(obj);
    });
  }
  async onSubmit() {
    const response = await this.gameService.updateById(
      this.gameId,
      this.formulario.value
    );
  }
}
