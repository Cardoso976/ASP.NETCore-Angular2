import { AuthService } from './auth/auth.service';
import { AppErrorHandler } from './app.error-handler';
import { ErrorHandler } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import * as Raven from 'raven-js';

import { VehicleService } from './services/vehicle.service';
import { PhotoService } from './services/photo.service';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';

Raven.config('https://93ff563295404764a30b7451472997b9@sentry.io/1218881').install();

@NgModule({
    declarations: [
        AppComponent,
        VehicleFormComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent
    ],
    imports: [
        ToastyModule.forRoot(),
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent},
            { path: 'vehicles/edit/:id', component: VehicleFormComponent},
            { path: 'vehicles/:id', component: ViewVehicleComponent},
            { path: 'vehicles', component: VehicleListComponent},
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
        AuthService,
        VehicleService,
        PhotoService,
        ProgressService
    ]
})
export class AppModuleShared {
}
