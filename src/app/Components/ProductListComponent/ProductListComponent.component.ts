import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/model';
import { AuthService } from 'src/app/Services/Auth/Auth.service';
import { ProductService } from 'src/app/Services/Product/Product.service';
import { UserStoreService } from 'src/app/Services/UserStore/UserStore.service';

@Component({
  selector: 'app-ProductListComponent',
  templateUrl: './ProductListComponent.component.html',
  styleUrls: ['./ProductListComponent.component.css']
})
export class ProductListComponentComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  sortOption: string = 'price';
  categories: string[] = ['Electronics', 'Fashion', 'Home', 'Toys', 'Sports', 'Others'];
  userRole: any;
  userId: number | undefined;

  constructor(
    private productService: ProductService,
    private userStore: UserStoreService,
    private auth: AuthService,


  ) { }

  ngOnInit(): void {

    this.userStore.getUserIdFromStore().subscribe(data => {
      let useridFromToken = this.auth.getIdFromToken();

      this.userId = data || useridFromToken;
      console.log(this.userId)
    })
    this.productService.getAllProducts().subscribe(data => {
      this.products = data
      this.filteredProducts = data;
    });


    this.userStore.getRoleFromStore().subscribe(val => {
      let userRoleFromToken = this.auth.getRoleFromToken();
      this.userRole = val || userRoleFromToken
    })
  }

  onSearch(): void {
    this.filteredProducts = this.products.filter(product => {
      return (
        (!this.searchTerm || product.name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        (!this.selectedCategory || product.category === this.selectedCategory)
      );
    });

    if (this.sortOption === 'price') {
      this.filteredProducts.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (this.sortOption === 'time') {
      this.filteredProducts.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
    }
    else if (this.sortOption === 'you') {
      this.filteredProducts = this.products.filter(product => product.sellerId == this.userId);
      console.log(this.filteredProducts);
    } else if (this.sortOption === 'all') {
      this.filteredProducts = [...this.products]; // Ensures a copy of the original products array
    }
  }

  getTimeRemaining(endTime: string): string {
    const endDate = new Date(endTime); // this is in UTC
    const localDate = endDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const timeDiff = new Date(localDate).getTime() - new Date().getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours < 0 || minutes < 0) {

      return `Auction Ended`
    }
    return `${hours}h ${minutes}m`;
  }

  deleteProduct(productId: number): void {
    if (confirm("Do you really want to delete this product?")) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.products = this.products.filter(e => e.id !== productId);
        location.reload();
      });
    }


  }
}
