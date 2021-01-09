import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkStatusName } from 'src/app/_models/work';
import { WorkService } from 'src/app/_services/work.service';

@Component({
  selector: 'app-job-show',
  templateUrl: './job-show.component.html',
  styleUrls: ['./job-show.component.css']
})
export class JobShowComponent implements OnInit {
  workId: any;
  offerId: any;
  work: any;

  constructor(private route: ActivatedRoute, private toastr: ToastrService,
              private router: Router, private workService: WorkService) { }

  ngOnInit(): void {
    this.workId = + this.route.snapshot.paramMap.get('workid');
    this.offerId = + this.route.snapshot.paramMap.get('offerid');
    this.workService.getWork(this.workId, this.offerId).subscribe(response => {
      this.work = response;
      this.work.workBegin = this.work.workBegin.toString().split('T')[0];
      this.work.workEnd = this.work.workEnd.toString().split('T')[0];
      this.work.workStatusName = WorkStatusName[response.workStatusName];
      console.log(this.work);
    }, error => {
      console.log(error);
    });
  }

}
