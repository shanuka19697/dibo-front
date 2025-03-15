import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchDataComponent } from './components/search-data/search-data.component';
import { AddDataComponent } from './components/add-data/add-data.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { MembersComponent } from './components/members/members.component';
import { ErrorComponent } from './components/error/error.component';
import { ViewDataComponent } from './components/view-data/view-data.component';
import { EditDataComponent } from './components/edit-data/edit-data.component';

const routes: Routes = [
  
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchDataComponent },
  { path: 'members', component: MembersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/edit-data/:_id', component: EditDataComponent },
  { path: 'admin/view-data/:_id', component: ViewDataComponent, canActivate: [AuthGuard] },
  { path: 'admin/add-data', component: AddDataComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent,canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**',redirectTo: 'error', pathMatch: 'full' },
  { path: 'error', component: ErrorComponent  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
