import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IonicModule } from '@ionic/angular';
import { ReminderlistComponent } from './reminderlist/reminderlist.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },{
    path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    IonicModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
