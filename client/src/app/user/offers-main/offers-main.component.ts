import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferCategory } from 'src/app/_models/offer';
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
  pageNumber = 1;
  pageSize = 5;

  constructor(private userService: UserService, private router: Router,
              private route: ActivatedRoute) { }

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
      this.pageNumber, this.pageSize).subscribe(response => {
      this.offers = response.result;
      this.pagination = response.pagination;
      console.log(this.offers);
    }, error => {
      console.log(error);
    });
  }
  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.getCompanyOffers();
  }
}
