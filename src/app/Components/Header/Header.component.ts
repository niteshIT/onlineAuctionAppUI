import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/Auth/Auth.service';
import { UserService } from 'src/app/Services/User/User.service';
import { UserStoreService } from 'src/app/Services/UserStore/UserStore.service';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'ExpenseSharingApp';
  userName: string | undefined;
  isLoggedIn: boolean | undefined;

  availableToken!: string;
  userRole: any;
  constructor(private auth: AuthService, private userStore: UserStoreService, private userService: UserService, private toastr: ToastrService, private router: Router) { }

  userId!: number

  ngOnInit() {

    this.userStore.getUserIdFromStore().subscribe(val => {
      let userIdFromToken = this.auth.getIdFromToken();
      console.log(val)
      console.log(userIdFromToken)
      this.userId = val || userIdFromToken


    })

    this.userStore.getLoginFromStore().subscribe(val => {
      let loginstatusfromtoken = this.auth.isloggedIn();
      console.log(val)
      console.log(loginstatusfromtoken)
      this.isLoggedIn = val || loginstatusfromtoken

    })
    this.userStore.getFullNameFromStore().subscribe(val => {
      let fullNameFromToken = this.auth.getFullNameFromToken();
      console.log(val)
      console.log(fullNameFromToken)
      this.userName = val || fullNameFromToken
      console.log(this.userName)
    })

    this.userStore.getRoleFromStore().subscribe(val => {
      let userRole = this.auth.getRoleFromToken();
      console.log(val)
      console.log(userRole)
      this.userRole = val || userRole
      console.log(this.userRole)
    })








  }
  addProduct() {
    this.userService.getById(this.userId).subscribe(val => {
      console.log(val)
      if (val.isBaned) {
        this.toastr.error("YOU ARE BANNED BY ADMIN")
      }
      else {
        this.router.navigate(['addproduct'])
      }
    })
  }


  logout() {
    this.auth.signOut();
    this.availableToken = " ";
    // this.toastr.success("logout Succesfully")
    this.userStore.setUserIdForStore(0)
    this.isLoggedIn = false
  }

}
