import { Injectable } from '@angular/core';

@Injectable()
export class PaymentService {

  stripe = Stripe('pk_test_oDKxiGX4GrYjsaQGOVzw5KxA');

  constructor() { }

}
