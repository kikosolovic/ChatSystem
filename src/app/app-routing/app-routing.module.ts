import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MainComponent } from '../main/main.component';
import { AuthGuard } from '../Guard/auth.guard';
import { ContactsComponent } from '../main/components/contacts/contacts.component';
import { MessagesComponent } from '../main/components/messages/messages.component';
import { DetailsComponent } from '../main/components/details/details.component';
import { SessionEndComponent } from '../session-end/session-end.component';
// import { AppComponent } from './app.component';
// import { HelloComponent } from './hello.component';
// import { LoginComponent } from './login/login.component';
// import { HomescreenComponent } from './homescreen/homescreen.component';
// import { ViewComponent } from './view/view.component';
// import { DetailComponent } from './detail/detail.component';
// import { AddComponent } from './add/add.component';

// const routes: Routes = [
//   { path: 'home', component: HomescreenComponent },
//   { path: 'login', component: LoginComponent },

//   { path: '**', component: LoginComponent },
// ];

// canActivate: [AuthGuard] x
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
      // { path: 'contacts', component: ContactsComponent, outlet: 'left' },
      // { path: 'messages', component: MessagesComponent, outlet: 'center' },
      // { path: 'details', component: DetailsComponent, outlet: 'right' },
      // { path: 'contacts', component: ContactsComponent },
      { path: 'sessionend', component: SessionEndComponent, canActivate: [AuthGuard]},

      { path: 'home', component: MainComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'login' },
    ]),
  ],
  declarations: [],
})
export class AppRoutingModule {}
