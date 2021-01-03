import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { OfferCategory } from 'src/app/_models/offer';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CompanyService } from 'src/app/_services/company.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  user: User;
  offers: any;
  selectedCategory: string;
  options = [
    { offerCategoryName: "All offers", value: "All offers" },
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

  constructor(private accountService: AccountService, private companyService: CompanyService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.selectedCategory = 'All offers';
    this.getCompanyOffers();
  }

  getCompanyOffers() {
    this.companyService.getOffersFromCompany(this.user.username).subscribe(response => {
      this.offers = response;
      console.log(this.offers);
    }, error => {
      console.log(error);
    });
  }

  getCompanyOffersFromCategory() {
    if (this.selectedCategory == "All offers") {
      this.getCompanyOffers();
    }
    else {
      let offerCategory: OfferCategory = {
        offerCategoryName: this.selectedCategory
      };
      console.log(offerCategory);
      this.companyService.getCompanyOffersFromCategory(this.user.username, offerCategory).subscribe(response => {
        this.offers = response;
        console.log(this.offers);
      }, error => {
        console.log(error);
      });
    }
  }
}
