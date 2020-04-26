import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestInterceptor } from 'src/shared/helpers/request.interceptor';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { MatDividerModule } from '@angular/material/divider';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

import { AgGridModule } from 'ag-grid-angular';
import { FileListComponent } from './file-list/file-list.component';
import { UploadModalComponent } from './upload-modal/upload-modal.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { OperationsComponent } from './operations/operations.component';
import { NotificationToastComponent } from './notification-toast/notification-toast.component';
import { UpdateModalComponent } from './update-modal/update-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    FileListComponent,
    LeftMenuComponent,
    UploadModalComponent,
    FooterComponent,
    LoginComponent,
    OperationsComponent,
    NotificationToastComponent,
    UpdateModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    DialogModule,
    DynamicDialogModule,
    OverlayPanelModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    FileUploadModule,
    AutoCompleteModule,
    KeyFilterModule,
    InputTextModule,
    MatDividerModule,
    PasswordModule,
    CardModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    AgGridModule.withComponents([]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
