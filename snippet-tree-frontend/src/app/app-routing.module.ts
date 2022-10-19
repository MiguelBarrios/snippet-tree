import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/home/homepage/homepage.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', component:HomepageComponent},
  { path: 'home', component:HomepageComponent},
  { path: 'user-dashboard', component: UserDashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
