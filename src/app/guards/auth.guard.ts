import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import { audit } from 'rxjs/operator/audit';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        public afAuth: AngularFireAuth,
        public router: Router
    ) { }

    canActivate(): Observable<boolean> {
        return this.afAuth.authState.map(auth => {
            if (!auth) {
                this.router.navigate(['/admin-panel/login']);
                return false;
            } else {
                return true;
            }
      });
    }

}
