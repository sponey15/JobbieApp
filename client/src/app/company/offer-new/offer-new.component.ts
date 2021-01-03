import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Offer } from 'src/app/_models/offer';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CompanyService } from 'src/app/_services/company.service';

@Component({
  selector: 'app-offer-new',
  templateUrl: './offer-new.component.html',
  styleUrls: ['./offer-new.component.css']
})
export class OfferNewComponent implements OnInit {
  user: User;
  offer: any;
  selectedCategory: string;
  title: string;
  description: string;
  price: number;
  addPhotoMode: boolean;
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

  constructor(private accountService: AccountService, private companyService: CompanyService,
              private toastr: ToastrService) {
                this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
                  this.user = user;
                });
               }

  ngOnInit(): void {
    this.selectedCategory = 'Renovation';
    this.addPhotoMode = false;
  }

  addOffer() {
    // this.offer.title = this.title;
    // this.offer.offerCategoryName = this.selectedCategory;
    // this.offer.price = this.price;
    // this.offer.description = this.description;

    const newOffer: Offer = {
      title: this.title,
      offerCategoryName: this.selectedCategory,
      price: this.price,
      description: this.description,
    };

    this.companyService.addNewOffer(newOffer).subscribe(response => {
      this.toastr.success('New offer created');
      this.offer = response;
      console.log(this.offer);
      this.addPhotoMode = !this.addPhotoMode;
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }

}
