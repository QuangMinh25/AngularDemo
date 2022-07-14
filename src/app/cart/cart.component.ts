import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { products } from '../products';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
constructor(
    private http: HttpClient,
    private cartService: CartService,
     private formBuilder: FormBuilder,
) {}
items = this.cartService.getItems();
checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
  });
  onSubmit(): void {
      // Process checkout data here
      this.items = this.cartService.clearCart();
      console.warn('Your order has been submitted', this.checkoutForm.value);
      this.checkoutForm.reset();
  }
  
getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
}
a(  isShowForm=true){
  if(this.items.length==0){
    isShowForm=false;
  }
}

deleteEmployee(b :number)
{
  this.items.splice(b);
}
      
  ngOnInit(): void {
  }

}
