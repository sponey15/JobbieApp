import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferCategory } from 'src/app/_models/offer';
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
    this.userService.getOffersFromCategory(offerCategory).subscribe(response => {
      this.offers = response;
      console.log(this.offers);
    }, error => {
      console.log(error);
    });
  }
}
