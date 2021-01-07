import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyJobsComponent } from './company/company-jobs/company-jobs.component';
import { OfferEditComponent } from './company/offer-edit/offer-edit.component';
import { OfferNewComponent } from './company/offer-new/offer-new.component';
import { OffersComponent } from './company/offers/offers.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { JobRequestComponent } from './user/job-request/job-request.component';
import { JobsComponent } from './user/jobs/jobs.component';
import { OfferShowComponent } from './user/offer-show/offer-show.component';
import { OffersMainComponent } from './user/offers-main/offers-main.component';
import { AuthGuard } from './_guards/auth.guard';
import { CompanyGuard } from './_guards/company.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'main', component: MainComponent},
      {path: 'offers-main/:category', component: OffersMainComponent},
      {path: 'offer-show/:id', component: OfferShowComponent},
      {path: 'job-request/:id', component: JobRequestComponent},
      {path: 'jobs', component: JobsComponent},
      {path: 'offer-new', component: OfferNewComponent, canActivate: [CompanyGuard]},
      {path: 'company-jobs', component: CompanyJobsComponent, canActivate: [CompanyGuard]},
      {path: 'offers', component: OffersComponent, canActivate: [CompanyGuard]},
      {path: 'offer-edit/:id', component: OfferEditComponent, canActivate: [CompanyGuard]},
    ]
  },
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
