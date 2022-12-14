import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SnippetDisplayComponent } from './shared/components/snippet-display/snippet-display.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard/user-dashboard.component';
import { SnippetService } from './shared/services/snippet.service';
import { FormsModule } from '@angular/forms';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TreeDisplayComponent } from './shared/components/tree-display/tree-display.component';
import { TreeBrowserComponent } from './pages/user-dashboard/tree-browser/tree-browser.component';
import {MatRadioModule} from '@angular/material/radio';
import { HomepageComponent } from './pages/home/homepage/homepage.component';

 

 

@NgModule({
  declarations: [
    AppComponent, 
    NavbarComponent,
    SnippetDisplayComponent,
    UserDashboardComponent,
    TreeDisplayComponent,
    TreeBrowserComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule, 
    MatTooltipModule,
    FormsModule, 
    ClipboardModule, 
    MatSnackBarModule, 
    MatRadioModule
  ],
  providers: [SnippetService, TreeDisplayComponent, SnippetDisplayComponent, TreeBrowserComponent],
  bootstrap: [AppComponent] 
})
export class AppModule { }
