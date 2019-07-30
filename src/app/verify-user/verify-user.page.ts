import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.page.html',
  styleUrls: ['./verify-user.page.scss'],
})
export class VerifyUserPage implements OnInit {

  verify:false;
  code : string;
  error : string;
  email: string;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  verifyUser(){
    this.customerService.verifyUser(this.route.snapshot.paramMap.get('email'), this.code).subscribe(
      () =>{
        this.router.navigate(['login']);
      },
      error =>{
        this.error = error.message;
      }
    );
  }

  resendCode(){
    this.customerService.resendCode(this.route.snapshot.paramMap.get('email')).subscribe(
      () => {
      }, error =>{
        this.error = error;
      }
    )
  }
}
