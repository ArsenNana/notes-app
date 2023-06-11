import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserRegisterComponent } from './user-register/user-register.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { AuthInterceptor } from './shared/service/authInterceptor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { eye, eyeSlash, trash } from 'ngx-bootstrap-icons';


const icons = {
  eye,
  eyeSlash,
  trash
};

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    MainLayoutComponent,
    NoteCardComponent,
    NoteDetailsComponent,
    UserRegisterComponent,
    LoginComponent,
    HomeComponent,
    ResumeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    NgxBootstrapIconsModule.pick(icons)




  ],
  providers: [HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
