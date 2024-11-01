import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiUserService } from './services/api-users.service';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './Guard/auth.guard';
import { CurrentUserService } from './services/current-user.service';
import { ContactsComponent } from './main/components/contacts/contacts.component';
import { MessagesComponent } from './main/components/messages/messages.component';
import { DetailsComponent } from './main/components/details/details.component';
import { HistoryComponent } from './main/components/history/history.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    LoginComponent,
    MainComponent,
    ContactsComponent,
    MessagesComponent,
    DetailsComponent,
    HistoryComponent,
  ],
  bootstrap: [AppComponent],
  providers: [ApiUserService, AuthGuard, CurrentUserService, DetailsComponent],
})
export class AppModule {}
