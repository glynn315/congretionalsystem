import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SocialWorkerComponent } from './pages/social-worker/social-worker.component';
import { AccountManagementComponent } from './pages/account-management/account-management.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { FundingsComponent } from './pages/fundings/fundings.component';
import { InvitationsComponent } from './pages/invitations/invitations.component';
import { SolicitationsComponent } from './pages/solicitations/solicitations.component';
import { LoginComponent } from './auth/Login/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { MasterlistComponent } from './pages/masterlist/masterlist.component';
import { PersonelListComponent } from './pages/personel-list/personel-list.component';
import { FundingsHistoryComponent } from './pages/fundings-history/fundings-history.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: 'home', component: DashboardComponent },
        { path: 'encoding', component: SocialWorkerComponent },
        { path: 'accounts', component: AccountManagementComponent },
        { path: 'fundings', component: FundingsComponent },
        { path: 'invitations', component: InvitationsComponent },
        { path: 'solicitations', component: SolicitationsComponent },
        { path: 'masterlist', component: MasterlistComponent },
        { path: 'viewInformation/:area_id', component: PersonelListComponent },
        { path: 'viewFundings/:FundingID', component: FundingsHistoryComponent },
        ]
    },
];
