import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  error:string;

  constructor(
    private route : ActivatedRoute,
    private customerService : CustomerService
  ) { }

  ngOnInit() {
    let code = this.route.snapshot.paramMap.get('code');
    let email = this.route.snapshot.paramMap.get('email');
    this.customerService.verifyUser(email, code).subscribe(data => {

    }, error =>{
      this.error = error.error.message;
    });
  }

}
