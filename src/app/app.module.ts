import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BasketComponentComponent } from './components/basket-component/basket-component.component';
import { HomeComponent } from './pages/home/home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { GameListComponent } from './pages/game-list/game-list.component';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { UpdateFormComponent } from './pages/update-form/update-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewGameComponent } from './pages/new-game/new-game.component';
import { Error404Component } from './pages/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';
import { BasketService } from './services/basket.service';
import { DashboardComponent } from './pages/administrador/dashboard/dashboard.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { EditGameComponent } from './pages/edit-game/edit-game.component';
import { OrdersByUserComponent } from './pages/orders-by-user/orders-by-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BasketComponentComponent,
    HomeComponent,
    UserProfileComponent,
    GameDetailComponent,
    GameListComponent,
    BasketPageComponent,
    OrderListComponent,
    OrderDetailComponent,
    CreateFormComponent,
    UpdateFormComponent,
    NewGameComponent,
    Error404Component,
    DashboardComponent,
    LoginComponent,
    EditGameComponent,
    OrdersByUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
