import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferNewComponent } from './company/offer-new/offer-new.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'main', component: MainComponent},
      {path: 'offer-new', component: OfferNewComponent},
    ]
  },
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
