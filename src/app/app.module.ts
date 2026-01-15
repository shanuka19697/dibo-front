import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AddDataComponent } from './components/add-data/add-data.component';
import { SearchDataComponent } from './components/search-data/search-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { MembersComponent } from './components/members/members.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewDataComponent } from './components/view-data/view-data.component';
import { EditDataComponent } from './components/edit-data/edit-data.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddDataComponent,
    SearchDataComponent,
    LoginComponent,
    AdminComponent,
    MembersComponent,
    ErrorComponent,
    ViewDataComponent,
    EditDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
