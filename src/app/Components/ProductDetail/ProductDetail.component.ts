import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Bid, Product } from 'src/app/Models/model';
import { AuthService } from 'src/app/Services/Auth/Auth.service';
import { BidService } from 'src/app/Services/Bid/Bid.service';
import { ProductService } from 'src/app/Services/Product/Product.service';
import { UserService } from 'src/app/Services/User/User.service';
import { UserStoreService } from 'src/app/Services/UserStore/UserStore.service';

@Component({
  selector: 'app-ProductDetail',
  templateUrl: './ProductDetail.component.html',
  styleUrls: ['./ProductDetail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isTimeEnd: boolean = false;
  product!: Product;
  bidAmount!: number;
  highestBidderId: number = 0;
  HighestBidAmount: number = 0;
  userId!: number;
  timeRemaining: string | undefined;
  interval: any;
  userRole: any;
  boughtByName: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private bidService: BidService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(productId).subscribe(product => {
      this.product = product;
      this.bidAmount = product.startingPrice
      this.calculateTimeRemaining();
      this.startCountdown();
      console.log(product)
    });

    this.bidService.getHighestBid(productId).subscribe((val) => {
      console.log(val)
      this.HighestBidAmount = val.bidAmount;
      this.highestBidderId = val.bidderId;
    })


    this.userStore.getUserIdFromStore().subscribe(val => {
      let userIdFromToken = this.auth.getIdFromToken();
      console.log(val)
      console.log(userIdFromToken)
      this.userId = val || userIdFromToken

    })

    this.userStore.getRoleFromStore().subscribe(val => {
      let userRoleFromToken = this.auth.getRoleFromToken();
      this.userRole = val || userRoleFromToken
    })
  }



  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  calculateTimeRemaining(): void {
    const now = moment();
    const endTime = moment(this.product.endTime);
    const duration = moment.duration(endTime.diff(now));

    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    if (duration.asSeconds() <= 0) {
      if (this.HighestBidAmount >= this.product.reservedPrice) {
        this.product.boughtBy = this.highestBidderId;
        this.productService.updateProduct(this.product.id, this.product).subscribe(() => {

          this.userService.getById(this.highestBidderId).subscribe((val) => {
            this.boughtByName = val.name;
            console.log(val)
          })
        })
      }
      clearInterval(this.interval);
      this.timeRemaining = 'Auction ended';
      this.isTimeEnd = true;
    } else {
      this.timeRemaining = `${hours}h ${minutes}m ${seconds}s`;
    }
  }

  startCountdown(): void {
    this.interval = setInterval(() => {
      this.calculateTimeRemaining();
    }, 1000);
  }



  placeBid(): void {
    if (this.bidAmount < this.product.startingPrice) {
      this.toastr.error("Bid Amount Must be Greater than Starting Price");

    }
    else {
      this.userService.getById(this.userId).subscribe(val => {
        console.log(val)
        if (val.isBaned) {
          this.toastr.error("YOU ARE BANNED BY ADMIN")
        }
        else {
          if (this.bidAmount > this.HighestBidAmount) {
            console.log(this.bidAmount)
            const newBid: Bid = {
              id: 0,
              productId: this.product.id,
              bidderId: this.userId,
              bidAmount: this.bidAmount,
              bidTime: new Date().toISOString()
            };
            this.bidService.placeBid(newBid).subscribe(() => {
              // Refresh the product details to show the new highest bid
              this.productService.getProduct(this.product.id).subscribe({
                next: (res) => {
                  this.product = res;
                  this.HighestBidAmount = this.bidAmount
                  this.toastr.success('BID PLACED SUCCESSFULLY');
                  this.bidAmount = this.HighestBidAmount;


                }
              });
            });
          }
          else {
            this.toastr.error("Please enter amount higher than highest bid amount!!!");

          }
        }
      })
    }





  }


}
