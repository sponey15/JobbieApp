import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: any;
  constructor(private accountService: AccountService, private toastr: ToastrService,
              private router: Router) { this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user); }

  canActivate(): boolean {
    if (this.user) {
      return true;
    }
    else {
      this.toastr.error("You can't access this page or you aren't logged in");
      this.router.navigate(['']);
    }
    return false;
  }
}
