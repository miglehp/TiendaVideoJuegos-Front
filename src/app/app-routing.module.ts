import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { GameListComponent } from './pages/game-list/game-list.component';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { UpdateFormComponent } from './pages/update-form/update-form.component';
import { NewGameComponent } from './pages/new-game/new-game.component';
import { Error404Component } from './pages/error404/error404.component';
import { DashboardComponent } from './pages/administrador/dashboard/dashboard.component';
import { LoginGuard } from './guards';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
  },
  { path: 'home', component: HomeComponent },
  { path: 'userProfile', component: UserProfileComponent },
  { path: 'gameDetail/:gameId', component: GameDetailComponent },
  { path: 'gameList', component: GameListComponent },
  { path: 'newGame', component: NewGameComponent },
  { path: 'basketPage', component: BasketPageComponent },
  { path: 'orderList', component: OrderListComponent },
  { path: 'orderDetail/:orderId', component: OrderDetailComponent },
  { path: 'createForm', component: CreateFormComponent },
  { path: 'updateForm', component: UpdateFormComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
