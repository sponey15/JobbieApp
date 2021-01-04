import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Offer } from '../_models/offer';
import { Photo } from '../_models/photo';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { CompanyService } from '../_services/company.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() offer: any;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private accountService: AccountService, private companyService: CompanyService,
              private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    console.log(this.offer);
    this.initializeUploader(this.offer.id);
  }

  initializeUploader(offerId: any) {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'company/add-offer-photo/' + offerId, // add here code
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo: Photo = JSON.parse(response);
        if (this.offer.photos == null) {
          this.offer.photos = this.offer.photos || [];
        }
        this.offer.photos.push(photo);
        if (photo.isMain) {
          // this.user.photoUrl = photo.url;
          this.offer.photoUrl = photo.url;
          // this.accountService.setCurrentUser(this.user);
        }
        this.toastr.success('Photo added successfully');
      }
    };
  }

  // deletePhoto(offerId: number, photoId: number) {
  //   this.companyService.deleteOfferPhoto(offerId, photoId).subscribe(() => {
  //     this.offer.photos = this.offer.photos.filter(x => x.id !== photoId);
  //   });
  // }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  // setMainPhoto(offerId: number, photo: Photo) {
  //   this.companyService.setOfferMainPhoto(offerId, photo.id).subscribe(() => {
  //     // this.user.photoUrl = photo.url;
  //     // this.accountService.setCurrentUser(this.user);
  //     this.offer.photoUrl = photo.url;
  //     this.offer.photos.forEach(p => {
  //       // tslint:disable-next-line: curly
  //       if (p.isMain) p.isMain = false;
  //       // tslint:disable-next-line: curly
  //       if (p.id === photo.id) p.isMain = true;
  //     });
  //   });
  // }
}
