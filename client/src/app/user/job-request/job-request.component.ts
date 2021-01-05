import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-request',
  templateUrl: './job-request.component.html',
  styleUrls: ['./job-request.component.css']
})
export class JobRequestComponent implements OnInit {
  offerId: any;
  constructor(private route: ActivatedRoute, private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.offerId = + this.route.snapshot.paramMap.get('id');
    console.log(this.offerId);
  }

}
