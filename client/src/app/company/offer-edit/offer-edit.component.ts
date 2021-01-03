import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offer } from 'src/app/_models/offer';
import { CompanyService } from 'src/app/_services/company.service';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css']
})
export class OfferEditComponent implements OnInit {
  offerId: any;
  offer: any;

  constructor(private route: ActivatedRoute, private toastr: ToastrService,
              private companyService: CompanyService) { }

  ngOnInit(): void {
    this.offerId = + this.route.snapshot.paramMap.get('id');
    this.companyService.getOffer(this.offerId).subscribe(response => {
      this.offer = response;
      console.log(this.offer);
    }, error => {
      console.log(error);
    });
  }

}
