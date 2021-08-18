import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import User from "src/app/models/User";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerEmail = "";
  registerFirstName = "";
  registerLastName = "";
  registerPassword = "";
  registerUsername = "";

  constructor(private engineService: EngineService, private router: Router) {}

  ngOnInit(): void {}
  onRegisterBtn() {
    let user = {
      username: this.registerUsername,
      email: this.registerEmail,
      password: this.registerPassword,
      firstName: this.registerFirstName,
      lastName: this.registerLastName,
    };

    const user_identity = this.engineService.registerUser(new User(user));
    if (user_identity.hasOwnProperty("error")) {
      alert(user_identity["message" as keyof object]);
    } else {
      console.log(user_identity["token" as keyof object]);
      console.log(user_identity["id" as keyof object]);
      alert("با موفقیت ثبت نام شد.");
      this.engineService.welcomeUser(user_identity, user.username);
    }
  }
}