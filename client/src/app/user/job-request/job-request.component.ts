import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user';
import { Work } from 'src/app/_models/work';
import { WorkTask } from 'src/app/_models/workTask';
import { WorkService } from 'src/app/_services/work.service';
// import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
// import {Title} from '@angular/platform-browser';
// import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';

// import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-job-request',
  templateUrl: './job-request.component.html',
  styleUrls: ['./job-request.component.css']
})
export class JobRequestComponent implements OnInit {
  // public appearance = Appearance;
  // public zoom: number;
  // public latitude: number;
  // public longitude: number;
  // public selectedAddress: PlaceResult;
  jobForm: FormGroup;
  user: User;
  offerId: any;
  bsConfig: Partial<BsDatepickerConfig>;
  minDate: Date;
  newJob: any;
  title: any;
  description: any;
  workTasks: any;

  constructor(private route: ActivatedRoute, private toastr: ToastrService,
              private router: Router, private fb: FormBuilder, private workService: WorkService) { }

  ngOnInit(): void {
    this.offerId = + this.route.snapshot.paramMap.get('id');
    console.log(this.offerId);
    this.minDate = new Date();
    this.initializeForm();
    this.workTasks = [];
    // this.zoom = 10;
    // this.latitude = 52.520008;
    // this.longitude = 13.404954;

    // this.setCurrentPosition();
  }

  initializeForm() {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      workBegin: [null, Validators.required],
      workEnd: [null, Validators.required],
      offerid: [this.offerId]
    });
  }

  addWorkTask() {
    let workTask: WorkTask = {
      title: this.title,
      description: this.description,
      workId: null
    };

    this.workTasks = this.workTasks.concat(workTask);
    console.log(this.workTasks);

    this.toastr.success('Task added successfully');
    this.title = '';
    this.description = '';
  }

  sendRequest() {
    this.workService.newWork(this.jobForm.value).subscribe(response => {
      console.log(this.jobForm.value);
      this.newJob = response.id;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.workTasks.length; i++) {
        this.workTasks[i].workId = this.newJob;
        this.workService.newWorkTask(this.workTasks[i]).subscribe(workT => {
          console.log(workT);
        }, error => {
          console.log(error);
          this.toastr.error(error.error);
        });
      }
      this.router.navigateByUrl('/main');
      this.toastr.success('Job request has been sent to company');
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }


  // private setCurrentPosition() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //     });
  //   }
  // }

  // onAutocompleteSelected(result: PlaceResult) {
  //   console.log('onAutocompleteSelected: ', result);
  // }

  // onLocationSelected(location: Location) {
  //   console.log('onLocationSelected: ', location);
  //   this.latitude = location.latitude;
  //   this.longitude = location.longitude;
  // }

  // onGermanAddressMapped($event: GermanAddress) {
  //   console.log('onGermanAddressMapped', $event);
  // }
}
