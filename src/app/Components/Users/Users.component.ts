import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/model';
import { ProductService } from 'src/app/Services/Product/Product.service';
import { UserService } from 'src/app/Services/User/User.service';

@Component({
  selector: 'app-Users',
  templateUrl: './Users.component.html',
  styleUrls: ['./Users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedUser: User | null = null;


  constructor(private userService: UserService, private prductService: ProductService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data.filter((user)=>user.role=='user');
      console.log(this.users)
    });
  }

  banUser(userId: number, user: User): void {
    if (user.isBaned) {
      user.isBaned = false;
    }
    else {
      user.isBaned = true;
    }
    this.userService.updateUser(userId, user).subscribe(() => {
      this.loadUsers();

    });
  }

}
