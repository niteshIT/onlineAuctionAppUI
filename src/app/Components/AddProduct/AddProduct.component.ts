import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/model';
import { AuthService } from 'src/app/Services/Auth/Auth.service';
import { ProductService } from 'src/app/Services/Product/Product.service';
import { UserStoreService } from 'src/app/Services/UserStore/UserStore.service';

@Component({
  selector: 'app-AddProduct',
  templateUrl: './AddProduct.component.html',
  styleUrls: ['./AddProduct.component.css']
})
export class AddProductComponent implements OnInit {
  userId: number | undefined;
  productForm: any;
  categories: string[] = ['Electronics', 'Fashion', 'Home', 'Toys', 'Sports', 'Others'];
  product: Product = {
    id: 0,
    name: '',
    description: '',
    startingPrice: 0,
    auctionDuration: 0,
    category: '',
    reservedPrice: 0,
    endTime: '',
    highestBid: undefined,
    highestBidderId: undefined,
    sellerId: 0
  };


  constructor(private productService: ProductService, private router: Router, private userStore: UserStoreService, private auth: AuthService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.userStore.getUserIdFromStore().subscribe(val => {
      let userIdFromToken = this.auth.getIdFromToken();
      console.log(val)
      console.log(userIdFromToken)
      this.userId = val || userIdFromToken

    })
  }

  onSubmit(): void {
    if (this.product.reservedPrice < this.product.startingPrice) {
      this.toastr.error("Reserved price must be greater than or equal starting price")
    }
    else {
      const now = new Date();
      const endTime = new Date(now.getTime() + this.product.auctionDuration * 60 * 60 * 1000);

      this.product.endTime = endTime.toISOString(); // Store date as UTC
      this.product.sellerId = this.userId;
      console.log(this.product.endTime)
      console.log(this.product)
      this.productService.createProduct(this.product).subscribe(() => {
        this.router.navigate(['/']);
        this.toastr.success("Product added successfully")
      });

    }




  }

}
