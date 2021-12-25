import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS,  } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { AuthFormsOutletComponent } from './components/auth-forms-outlet/auth-forms-outlet.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ConfirmEqualDirective } from './directives/confirm-equal.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorService } from './services/api/interceptor/interceptor.service';
import { ProjectsPanelComponent } from './components/projects-panel/projects-panel.component';
import { TasksPanelComponent } from './components/tasks-panel/tasks-panel.component';
import { ProjectInPanelComponent } from './components/project-in-panel/project-in-panel.component';
import { SwiperModule } from 'swiper/angular';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectTasksManagerTableComponent } from './components/project-tasks-manager-table/project-tasks-manager-table.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDeleleComponent } from './components/dialog/confirm-delele/confirm-delele.component';
import { ProjectTopBlockComponent } from './components/project-top-block/project-top-block.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { EditStatusComponent } from './components/dialog/edit-status/edit-status.component';
import { EditTaskComponent } from './components/dialog/edit-task/edit-task.component';
import { CreateStatusComponent } from './components/dialog/create-status/create-status.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    AuthFormsOutletComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    PageNotFoundComponent,
    ConfirmEqualDirective,
    ProjectsPanelComponent,
    TasksPanelComponent,
    ProjectInPanelComponent,
    ProjectComponent,
    ProjectTasksManagerTableComponent,
    ConfirmDeleleComponent,
    ProjectTopBlockComponent,
    EditStatusComponent,
    EditTaskComponent,
    CreateStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    SwiperModule,
    DragDropModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
