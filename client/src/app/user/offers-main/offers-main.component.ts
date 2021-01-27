import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferCategory } from 'src/app/_models/offer';
import { OfferParams } from 'src/app/_models/offerParams';
import { Pagination } from 'src/app/_models/pagination';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-offers-main',
  templateUrl: './offers-main.component.html',
  styleUrls: ['./offers-main.component.css']
})
export class OffersMainComponent implements OnInit {
  // @Input() offerCategory: any;
  offerCat: any;
  offers: any;
  pagination: Pagination;
  offerParams: OfferParams;
  orderByList = [{ value: 'Id', display: 'Newest'},
                 { value: 'PriceDesc', display: 'Price descending'},
                 { value: 'Price', display: 'Price ascending'}]

  constructor(private userService: UserService, private router: Router,
              private route: ActivatedRoute) { 
                this.offerParams = this.userService.getOfferParams();
              }

  ngOnInit(): void {
    this.getCompanyOffers();
  }

  getCompanyOffers() {
    this.offerCat = this.route.snapshot.params.category;
    const offerCategory: OfferCategory = {
      offerCategoryName: this.route.snapshot.params.category
    };

    console.log(offerCategory);
    this.userService.getOffersFromCategory(this.route.snapshot.params.category,
      this.offerParams).subscribe(response => {
      this.offers = response.result;
      this.pagination = response.pagination;
      console.log(this.offers);
    }, error => {
      console.log(error);
    });
  }

  pageChanged(event: any) {
    this.offerParams.pageNumber = event.page;
    this.userService.setOfferParams(this.offerParams);
    this.getCompanyOffers();
  }

  filterOffers() {
    this.userService.setOfferParams(this.offerParams);
    this.getCompanyOffers();
  }

  resetFilters() {
    this.offerParams = this.userService.resetOfferParams();
    this.getCompanyOffers();
  }
}
