import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { LibraryComponent } from "./pages/library/library.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [{ path: "", component: LandingPageComponent }],
  },
  {
    path: "library",
    component: LayoutComponent,
    children: [{ path: "", component: LibraryComponent }],
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: LayoutComponent,
  children:[{path:"",component:LandingPageComponent}]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
