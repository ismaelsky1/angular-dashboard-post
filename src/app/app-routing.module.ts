import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './screen/dashboard/dashboard.component';
import { PostComponent } from './screen/post/post.component';

const routerOptions: ExtraOptions = {
  // useHash: true,
  // anchorScrolling: 'enabled',
  // enableTracing: false,
};

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
    // canActivate: [AuthGuard],
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'post', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
