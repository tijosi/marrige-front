import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './layout/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexComponent } from './pages/index/index.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import '@angular/localize/init';
import { FormsModule } from '@angular/forms';
import { PresentesComponent } from './pages/presentes/presentes.component';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './helper/popup/popup.component';
import { ButtonPopupComponent } from './helper/button-popup/button-popup.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoadingComponent } from './helper/loading/loading.component';
import { GiftComponent } from './helper/gift/gift.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    IndexComponent,
    AuthenticationComponent,
    PresentesComponent,
    PopupComponent,
    ButtonPopupComponent,
    AdminComponent,
    LoadingComponent,
    GiftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
