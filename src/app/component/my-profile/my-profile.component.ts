import { Component, OnInit } from "@angular/core";
import { ProfileService } from "src/app/service/profile.service";
import { User } from "src/app/model/user";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "oorsi-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.css"],
})
export class MyProfileComponent implements OnInit {
  profile: User;
  userId = null;

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const userId = params['userId'];
      this.userId = userId;
      if(userId) {
        this.loadUserData(userId)
      } else {
        this.loadUserData();
      }
    })
  }

  loadUserData(userId = null) {
    if (userId == null) {
      this.profileService.getMyUserInfo().subscribe(
        (res) => {
          this.profile = res;
          console.log(this.profile);
        },
        (err) => {
          console.log("error getting user information");
        }
      );
    } else {
      this.profileService.getUserInfo(userId).subscribe(
        (res) => {
          this.profile = res;
          console.log(this.profile);
        },
        (err) => {
          console.log("error getting user information");
        }
      );
    }
  }
}
