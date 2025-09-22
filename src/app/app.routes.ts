import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SocialWorkerComponent } from './pages/social-worker/social-worker.component';
import { AccountManagementComponent } from './pages/account-management/account-management.component';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
    {path:'', component:LayoutComponent,
        children:[
            {path:'home', component:DashboardComponent},
            {path:'encoding', component:SocialWorkerComponent},
            {path:'accounts', component:AccountManagementComponent},
        ]
    },
    
];
