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
import { MatCommonModule, MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DialogModule } from 'primeng/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ToastModule } from 'primeng/toast';
import { ChartsModule } from 'ng2-charts';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { SafePipeModule } from 'safe-pipe';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import { FileListComponent } from './file-list/file-list.component';
import { FileUploadModalComponent } from './file-upload-modal/file-upload-modal.component';
import { LoginComponent } from './login/login.component';
import { NotificationToastComponent } from './notification-toast/notification-toast.component';
import { FilePreviewModalComponent } from './file-preview-modal/file-preview-modal.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { FileUpdateModalComponent } from './file-update-modal/file-update-modal.component';
import { CareerComponent } from './career/career.component';
import { FolderCreationModalComponent } from './folder-creation-modal/folder-creation-modal.component';
import { NumberValidatorDirective } from '../shared/directives/number-validator.directive';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FolderUpdateModalComponent } from './folder-update-modal/folder-update-modal.component';
import { MoveModalComponent } from './move-modal/move-modal.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FolderCellComponent } from './folder-cell/folder-cell.component';
import { ReceptionComponent } from './reception/reception.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    FileListComponent,
    LeftMenuComponent,
    FileUploadModalComponent,
    LoginComponent,
    NotificationToastComponent,
    FilePreviewModalComponent,
    FileUpdateModalComponent,
    CareerComponent,
    FolderCreationModalComponent,
    NumberValidatorDirective,
    FolderUpdateModalComponent,
    MoveModalComponent,
    BreadcrumbComponent,
    FolderCellComponent,
    ReceptionComponent,
    DeleteModalComponent,
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
    MatDividerModule,
    ToastModule,
    ChartsModule,
    MatTreeModule,
    MatIconModule,
    SafePipeModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCardModule,
    MatRadioModule,
    AgGridModule.withComponents([]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
