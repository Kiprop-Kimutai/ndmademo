import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup , FormControl, Validators } from '@angular/forms';
import { MessagingService } from '../../shared/messaging.service';
import { AuthService } from './auth.service';
@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class AppLoginComponent implements OnInit {
    loginForm: FormGroup;
    size: 10;
    inputType = 'password';
    visible = false;
    // tslint:disable-next-line: max-line-length
    constructor(private router: Router, private fb: FormBuilder, private cd: ChangeDetectorRef, private messagingService: MessagingService,
                private authService: AuthService) {
                    this.loginForm = this.fb.group({
                        email: new FormControl('', [Validators.required]),
                        password: new FormControl('', [Validators.required])
                    });
                }
    ngOnInit() {

    }
    login() {
    this.authService.login(this.loginForm.getRawValue()).subscribe(data => {
        console.log(data);
        /*if (data.token) {
            this.router.navigate(['/home']);
        } else {
        this.messagingService.alert('login failed');
        }*/
    });
    }
    toggleVisibility() {
    if (this.visible) {
        this.inputType = 'password';
        this.visible = false;
        this.cd.markForCheck();
    } else {
        this.inputType = 'text';
        this.visible = true;
        this.cd.markForCheck();
    }
    }
}
