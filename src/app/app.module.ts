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
import { PopupComponent } from './template/popup/popup.component';
import { ButtonPopupComponent } from './template/button-popup/button-popup.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoadingComponent } from './template/loading/loading.component';
import { GiftComponent } from './template/gift/gift.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileUploadModule } from 'ng2-file-upload';

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
    GiftComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
