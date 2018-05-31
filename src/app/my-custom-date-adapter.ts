import { 
  NativeDateAdapter, MatNativeDateModule, MatDatepickerModule, MAT_DATE_FORMATS, DateAdapter 
} from "@angular/material";
import { NgModule } from "@angular/core";

export class CustomDateAdapter extends NativeDateAdapter {

  /** 
   * @param displayFormat Can be either a string that identifies our custom format, or the standard
   * format object that can be passed to the browser's INTL API.
   */
  format(date: Date, displayFormat?: string | Object): string {
    if (displayFormat === 'myCustomFormat') {
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      const year = date.getFullYear();

      // Return the format as per your requirement
      return `${day}.${month}.${year}`;
    } else {
      // Refer to the standard formatting of the NativeDateAdapter.
      return super.format(date, displayFormat);
    }
  }
  
  // If required extend other NativeDateAdapter methods.
}

const myDateFormats = {
  parse: {
     // Not needed, since the NativeDateAdapter does not support parse formats.
     dateInput: null
  },
  display: {
     dateInput: 'myCustomFormat',
     monthYearLabel: {year: 'numeric', month: 'short'},
     dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
     monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};

@NgModule({
  declarations: [],
  imports: [],
  exports: [MatDatepickerModule, MatNativeDateModule],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: myDateFormats }
  ]
})

export class DatePickerModule {}
