import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AuthenticationGuard } from './guards/authentication.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(AppRoutes)],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
