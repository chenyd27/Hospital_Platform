import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ReminderlistComponent } from './reminderlist/reminderlist.component';
import { HistoryComponent } from './history/history.component';
import { AddreminderComponent } from './addreminder/addreminder.component';
import { PatientlistComponent } from './patientlist/patientlist.component';
import { AllreminderComponent } from './allreminder/allreminder.component';
import { DatePipe } from './date.pipe';
import { PriorityPipe } from './priority.pipe';




let routes = [
  {
    path:'login',
    component: LoginComponent,
  },{
    path:'home',
    component: HomeComponent,
    children:[
      {
        path:'',
        component:ReminderlistComponent,
        children:[
          {path:'',component:PatientlistComponent},
          {path:'allreminder',component:AllreminderComponent}
        ]
      },
      {path:'reminderlist',redirectTo:'',pathMatch:'full'},
      {path:'history',component:HistoryComponent,},
      {path:'add-reminder',component:AddreminderComponent},
    ],
  },{
    path:'',
    pathMatch: 'full',
    redirectTo:'home',
  },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ReminderlistComponent,
    HistoryComponent,
    AddreminderComponent,
    PatientlistComponent,
    AllreminderComponent,
    DatePipe,
    PriorityPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
