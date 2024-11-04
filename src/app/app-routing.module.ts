import { PresenteDetailComponent } from './pages/presentes/presente-detail/presente-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from './account/shared/auth.guard';
import { PresentesComponent } from './pages/presentes/presentes.component';
import { PadrinhosComponent } from './pages/padrinhos/padrinhos.component';
import { ChaPanelaComponent } from './pages/cha-panela/cha-panela.component';

const routes: Routes = [
    {
        path: 'cha-panela',
        component: HomeComponent,
        children: [
            { path: '', component: ChaPanelaComponent}
        ]
    },
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', component: IndexComponent },
            { path: 'padrinhos', component: PadrinhosComponent },
            { path: 'presentes', component: PresentesComponent },
            { path: 'presente-detail/:id', component: PresenteDetailComponent }
        ],
        canActivate: [AuthGuard]
    },
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
