import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TenderService } from './shared/core/service/tender.service';
import { HttpClientModule } from '@angular/common/http';
import { CrewItemService } from './shared/core/service/crew-item.service';
import { CrewService } from './shared/core/service/crew.service';
import { SpeechRecognitionService } from './shared/core/service/speech-recognition.service';
import { SearchSubscriberService } from './shared/core/service/search-subscriber.service';
import { TagInputModule } from 'ngx-chips';
import { LayoutModule } from './layout/layout.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
    imports: [
        ToastrModule.forRoot(),
        NgxSpinnerModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        LayoutModule,
        RouterModule,
        AppRoutingModule,
        NgbModule,
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
        })
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent
    ],
    providers: [
        TenderService,
        CrewItemService,
        CrewService,
        SpeechRecognitionService,
        SearchSubscriberService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
