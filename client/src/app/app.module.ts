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
import { OffersMainComponent } from './user/offers-main/offers-main.component';
import { OfferShowComponent } from './user/offer-show/offer-show.component';
import { JobRequestComponent } from './user/job-request/job-request.component';
import { JobsComponent } from './user/jobs/jobs.component';
import { CompanyJobsComponent } from './company/company-jobs/company-jobs.component';
import { JobShowComponent } from './user/job-show/job-show.component';
import { CompanyJobShowComponent } from './company/company-job-show/company-job-show.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
// import {AgmCoreModule} from '@agm/core';
// import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';


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
    OfferEditComponent,
    OffersMainComponent,
    OfferShowComponent,
    JobRequestComponent,
    JobsComponent,
    CompanyJobsComponent,
    JobShowComponent,
    CompanyJobShowComponent
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
    PaginationModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
    // ,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCDebS-_7-iRMKAVIf-v4t7QJCUDKUm8rc',
    //   libraries: ['places']
    // }),
    // MatGoogleMapsAutocompleteModule
  ],
  providers: [
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
