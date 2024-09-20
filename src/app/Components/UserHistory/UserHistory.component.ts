import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bid, Product } from 'src/app/Models/model';
import { BidService } from 'src/app/Services/Bid/Bid.service';
import { ProductService } from 'src/app/Services/Product/Product.service';

@Component({
  selector: 'app-UserHistory',
  templateUrl: './UserHistory.component.html',
  styleUrls: ['./UserHistory.component.css']
})
export class UserHistoryComponent implements OnInit {
  bids: Bid[] = [];
  products: Product[] = [];
  productNames: { [key: number]: string } = {};

  boughtProducts: Product[] = [];

  constructor(
    private bidservice: BidService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('id')!;
    this.bidservice.getBiddingHistory(userId).subscribe((data: Bid[]) => {
      this.bids = data;
      console.log(this.bids)
      this.loadProductNames(data)
    });

    this.productService.getProductsbySellerId(userId).subscribe((data: Product[]) => {
      this.products = data;
    })

    this.productService.getProductsbyBuyerId(userId).subscribe((data: Product[]) => {
      this.boughtProducts = data;
      console.log(this.boughtProducts)
    })





  }

  convertUtcToLocal(utcTime: string): string {
    const localTime = new Date();
    return localTime.toString(); // Convert to local time string
  }

  loadProductNames(bids: any[]): void {
    const productIds = bids.map(bid => bid.productId);
    productIds.forEach(productId => {
      this.productService.getProduct(productId).subscribe(product => {
        this.productNames[productId] = product.name;
        console.log(product)
      });
    });
  }

  getProductName(productId: number): string {

    return this.productNames[productId] || 'Loading...';
  }



}
