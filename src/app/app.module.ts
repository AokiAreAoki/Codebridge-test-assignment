import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

@NgModule({
	declarations: [],
	imports: [
		BrowserAnimationsModule,
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatProgressSpinnerModule,
	],
	providers: [],
	bootstrap: []
})
export class AppModule { }