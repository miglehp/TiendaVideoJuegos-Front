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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'userProfile', component: UserProfileComponent },
  { path: 'gameDetail', component: GameDetailComponent },
  { path: 'gameList', component: GameListComponent },
  { path: 'basketPage', component: BasketPageComponent },
  { path: 'orderList', component: OrderListComponent },
  { path: 'orderDetail', component: OrderDetailComponent },
  { path: 'createForm', component: CreateFormComponent },
  { path: 'updateForm', component: UpdateFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
