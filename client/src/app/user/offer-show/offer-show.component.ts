import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Offer, OfferCategoryType } from 'src/app/_models/offer';
import { CompanyService } from 'src/app/_services/company.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-offer-show',
  templateUrl: './offer-show.component.html',
  styleUrls: ['./offer-show.component.css']
})
export class OfferShowComponent implements OnInit {
  offerId: any;
  offer: Offer;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute, private router: Router,
              private companyService: CompanyService, private location: Location) { }

  ngOnInit(): void {
    this.offerId = + this.route.snapshot.paramMap.get('id');
    this.companyService.getOffer(this.offerId).subscribe(response => {
      this.offer = response;
      this.offer.offerCategoryName = OfferCategoryType[response.offerCategoryName];
      this.galleryImages = this.getImages();
      console.log(this.offer);
    }, error => {
      console.log(error);
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ];
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.offer?.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      });
    }
    return imageUrls;
  }

  backClicked() {
    this.location.back();
  }
}
