import { Routes } from '@angular/router';
import { ShellComponent } from './core/feat-navigation/shell/shell.component';
import { DashboardComponent } from './core/feat-dashboard/dashboard/dashboard.component';
import { Register2Component } from './core/feat-login/register2/register2.component';
import { Login2Component } from './core/feat-login/login2/login2.component';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: ShellComponent,
    title: 'SkillFlowAI',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        //canActivate: [authGuard],
        title: 'Dashboard',
      },
      {
        path: 'core',
        //canActivate: [authGuard],
        loadChildren: () => import('./core/api/core.routes').then(m => m.coreRoutes),
      },
    ],
  },
  {
    path: 'register/:organizationId',
    component: Register2Component,
    title: 'Register',
  },
  {
    path: 'register',
    component: Register2Component,
    title: 'Register',
  },
  {
    path: 'login',
    component: Login2Component,
    title: 'Login',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404',
  },
];
