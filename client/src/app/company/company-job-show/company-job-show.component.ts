import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkStatus, WorkStatusName } from 'src/app/_models/work';
import { WorkService } from 'src/app/_services/work.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-company-job-show',
  templateUrl: './company-job-show.component.html',
  styleUrls: ['./company-job-show.component.css']
})
export class CompanyJobShowComponent implements OnInit {
  workId: any;
  offerId: any;
  work: any;

  constructor(private route: ActivatedRoute, private toastr: ToastrService,
              private router: Router, private workService: WorkService, private location: Location) { }

  ngOnInit(): void {
    this.workId = + this.route.snapshot.paramMap.get('workid');
    this.offerId = + this.route.snapshot.paramMap.get('offerid');
    this.displayWork();
    // this.workService.getWork(this.workId, this.offerId).subscribe(response => {
    //   this.work = response;
    //   this.work.workBegin = this.work.workBegin.toString().split('T')[0];
    //   this.work.workEnd = this.work.workEnd.toString().split('T')[0];
    //   this.work.workStatusName = WorkStatusName[response.workStatusName];
    //   console.log(this.work);
    // }, error => {
    //   console.log(error);
    // });
  }

  displayWork() {
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

  acceptJob() {
    const workStatus: WorkStatus = {
      workStatusName: "InProgress"
    };

    this.workService.updateWork(this.workId, workStatus).subscribe(response => {
      console.log(this.work);
    }, error => {
      console.log(error);
    });
  }

  finishJob() {
    const workStatus: WorkStatus = {
      workStatusName: "Archive"
    };

    this.workService.updateWork(this.workId, workStatus).subscribe(response => {
      console.log(this.work);
    }, error => {
      console.log(error);
    });
  }

  updateWorkTask(workTaskId: any, isComplete: any) {
    console.log(workTaskId);
    isComplete = !isComplete;

    this.workService.updateWorkTask(workTaskId, isComplete).subscribe(response => {
      // console.log(this.work);

      this.toastr.success("Work task updated");
      this.displayWork();
    }, error => {
      console.log(error);
    });
  }

  backClicked() {
    this.location.back();
  }
}
