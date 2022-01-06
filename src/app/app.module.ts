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
import { ProjectTopBlockComponent } from './components/project-top-block/project-top-block.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { EditStatusComponent } from './components/dialog/edit-status/edit-status.component';
import { EditTaskComponent } from './components/dialog/edit-task/edit-task.component';
import {MatSelectModule} from '@angular/material/select';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatInputModule} from '@angular/material/input';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { FilesSwiperComponent } from './components/dialog/files-swiper/files-swiper.component';
import { ImageViewerComponent } from './components/dialog/image-viewer/image-viewer.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyTasksBlockComponent } from './components/my-tasks-block/my-tasks-block.component';
import {MatTabsModule} from '@angular/material/tabs';
import { EditTaskRightSideComponent } from './components/dialog/edit-task-right-side/edit-task-right-side.component';
import { EditTaskCommentsSectionComponent } from './components/dialog/edit-task-comments-section/edit-task-comments-section.component';
import { InputFieldWithSwiperComponent } from './components/input-field-with-swiper/input-field-with-swiper.component';
import { ToggleableInputFieldComponent } from './components/toggleable-input-field/toggleable-input-field.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AddUserToProjectComponent } from './components/dialog/add-user-to-project/add-user-to-project.component';
import { ConfirmActionComponent } from './components/dialog/confirm-action/confirm-action.component';


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
    ProjectTopBlockComponent,
    EditStatusComponent,
    EditTaskComponent,
    ClickStopPropagationDirective,
    SafeUrlPipe,
    FilesSwiperComponent,
    ImageViewerComponent,
    MyProjectsComponent,
    ProfileComponent,
    MyTasksBlockComponent,
    EditTaskRightSideComponent,
    EditTaskCommentsSectionComponent,
    InputFieldWithSwiperComponent,
    ToggleableInputFieldComponent,
    AddUserToProjectComponent,
    ConfirmActionComponent
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
    MatIconModule,
    MatSelectModule,
    ClipboardModule,
    MatInputModule,
    MatTabsModule,
    MatProgressSpinnerModule
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
