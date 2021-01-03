import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MainComponent } from './main/main.component';
import { AccountService } from './_services/account.service';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HasRoleDirective } from './_directives/has-role.directive';
import { OffersComponent } from './company/offers/offers.component';
import { OfferNewComponent } from './company/offer-new/offer-new.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { OfferEditComponent } from './company/offer-edit/offer-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    NavComponent,
    MainComponent,
    HasRoleDirective,
    OffersComponent,
    OfferNewComponent,
    PhotoEditorComponent,
    OfferEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxGalleryModule,
    FileUploadModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
