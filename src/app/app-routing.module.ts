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
    redirectTo: '/Dashboard',
    pathMatch: 'full',
    // canActivate: [AuthGuard],
  },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Post', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
