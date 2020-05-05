import { Component, OnInit } from "@angular/core";
import { ProfileService } from "src/app/service/profile.service";
import { User } from "src/app/model/user";

@Component({
  selector: "oorsi-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.css"],
})
export class MyProfileComponent implements OnInit {
  profile: User;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getMyUserInfo().subscribe(
      (res) => {
        this.profile = res;
        console.log(this.profile)
      },
      (err) => {
        console.log('error getting user information')
      }
    );
  }
}
