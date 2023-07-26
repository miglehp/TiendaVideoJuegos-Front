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
import { AdminGuard, LoginGuard } from './guards';
import { LoginComponent } from './pages/login/login.component';
import { EditGameComponent } from './pages/edit-game/edit-game.component';
import { OrdersByUserComponent } from './pages/orders-by-user/orders-by-user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'userProfile',
    component: UserProfileComponent,
    canActivate: [LoginGuard],
  },
  { path: 'gameDetail/:gameId', component: GameDetailComponent },
  { path: 'gameList', component: GameListComponent },
  {
    path: 'newGame',
    component: NewGameComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'editGame/:gameId',
    component: EditGameComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'basketPage',
    component: BasketPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'orderList',
    component: OrderListComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'orderDetail/:orderId',
    component: OrderDetailComponent,
    canActivate: [LoginGuard],
  },
  { path: 'createForm', component: CreateFormComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'updateForm',
    component: UpdateFormComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'ordersByUser',
    component: OrdersByUserComponent,
    canActivate: [LoginGuard],
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
