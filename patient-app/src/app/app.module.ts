import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StompService } from './service/stomp.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PriorityPipe } from './pipe/priority.pipe';
import { InfoComponent } from './info/info.component';
import { ReminderlistComponent } from './reminderlist/reminderlist.component';
import { DatePipe } from './pipe/date.pipe';
import { HomePageRoutingModule } from './home/home-routing.module';


@NgModule({
  declarations: [AppComponent,LoginComponent,InfoComponent,ReminderlistComponent,DatePipe,PriorityPipe],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,HomePageRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },StompService],
  bootstrap: [AppComponent],
})
export class AppModule {}
