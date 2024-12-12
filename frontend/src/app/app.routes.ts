import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";

export const routes: Routes = [
	{
		path: "",
		redirectTo: "/login",
		pathMatch: "full"
	},
	{
		path: "",
		component: MainLayoutComponent,
		children: [
			{
				path: "login",
				loadComponent: () => import("./modules/auth/auth.component").then((m) => m.AuthComponent),
			}
		]
	},
];
