import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { InfoComponent } from '../info/info.component';
import { ReminderlistComponent } from '../reminderlist/reminderlist.component';

const routes: Routes = [
  {
    path: '',
    component:HomePage,
    children:[
      {
        path:'info',
        component:InfoComponent
      },{
        path:'',
        redirectTo:'reminders',
        pathMatch:'full'
      },{
        path:'reminders',
        component:ReminderlistComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
