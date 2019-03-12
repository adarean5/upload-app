import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Work in progress, currently only redirects to the upload component.
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  logIn(): void {
    this.router.navigateByUrl('/upload');
  }
}
