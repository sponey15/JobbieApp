import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offer, OfferCategoryType } from 'src/app/_models/offer';
import { Photo } from 'src/app/_models/photo';
import { CompanyService } from 'src/app/_services/company.service';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css']
})
export class OfferEditComponent implements OnInit {
  offerId: any;
  offer: Offer;
  addPhotoMode: boolean;
  selectedCategory: string;
  options = [
    { offerCategoryName: "Renovation", value: "Renovation" },
    { offerCategoryName: "Painting", value: "Painting" },
    { offerCategoryName: "Transport", value: "Transport" },
    { offerCategoryName: "Electrician", value: "Electrician" },
    { offerCategoryName: "Assembly", value: "Assembly" },
    { offerCategoryName: "Electronics", value: "Electronics" },
    { offerCategoryName: "Plumber", value: "Plumber" },
    { offerCategoryName: "Cleaning", value: "Cleaning" },
    { offerCategoryName: "Handyman", value: "Handyman" }
  ];

  constructor(private route: ActivatedRoute, private toastr: ToastrService,
              private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.offerId = + this.route.snapshot.paramMap.get('id');
    this.companyService.getOffer(this.offerId).subscribe(response => {
      this.offer = response;
      this.offer.offerCategoryName = OfferCategoryType[response.offerCategoryName];
      console.log(this.offer);
    }, error => {
      console.log(error);
    });
    this.addPhotoMode = false;
  }

  editOffer(offerId: number) {
    this.companyService.updateOffer(offerId, this.offer).subscribe(() => {
      this.toastr.success('Offer updated successfully');
      this.router.navigateByUrl("/offers");
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }

  deleteOffer(offerId: number) {
    this.companyService.deleteOffer(offerId).subscribe(() => {
      this.toastr.success('Offer deleted successfully');
      this.router.navigateByUrl("/offers");
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }

  deletePhoto(offerId: number, photoId: number) {
    this.companyService.deleteOfferPhoto(offerId, photoId).subscribe(() => {
      this.offer.photos = this.offer.photos.filter(x => x.id !== photoId);
    });
  }

  setMainPhoto(offerId: number, photo: Photo) {
    this.companyService.setOfferMainPhoto(offerId, photo.id).subscribe(() => {
      // this.user.photoUrl = photo.url;
      // this.accountService.setCurrentUser(this.user);
      this.offer.photoUrl = photo.url;
      this.offer.photos.forEach(p => {
        // tslint:disable-next-line: curly
        if (p.isMain) p.isMain = false;
        // tslint:disable-next-line: curly
        if (p.id === photo.id) p.isMain = true;
      });
    });
  }

  addPhotos() {
    this.addPhotoMode = !this.addPhotoMode;
  }
}
