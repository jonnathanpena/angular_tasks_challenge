import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";
import { RoutesEnum } from "./interfaces/routes-enum";

export const routes: Routes = [
	{
		path: "",
		redirectTo: RoutesEnum.LOGIN,
		pathMatch: "full"
	},
	{
		path: "",
		component: MainLayoutComponent,
		children: [
			{
				path: RoutesEnum.LOGIN,
				loadComponent: () => import("./modules/auth/auth.component").then((m) => m.AuthComponent),
			},
			{
				path: RoutesEnum.TASKS,
				loadComponent: () => import("./modules/tasks/tasks.component").then((m) => m.TasksComponent),
				canActivate: [() => import("./guards/auth.guard").then((m) => m.AuthGuard)],
			},
		]
	},
];
