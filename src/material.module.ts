import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
// import { MatRadioButton } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import { MatGridListModule } from "@angular/material/grid-list";
import {MatBadgeModule} from '@angular/material/badge';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { MatTreeModule } from "@angular/material/tree";
import { MatMenuModule } from "@angular/material/menu";
import { MatMenuItem } from "@angular/material/menu";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {ThemePalette} from '@angular/material/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({

    exports:[
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        // MatRadioButton,
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonToggleModule,
        MatListModule,
        MatGridListModule,
        MatBadgeModule,
        MatFormFieldModule,
        MatStepperModule,
        MatExpansionModule,
        MatChipsModule,
        MatTreeModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDividerModule,
        MatRadioModule,
        MatAutocompleteModule,
        MatSlideToggleModule
        
    ]

})

export class MaterialModule{

}

