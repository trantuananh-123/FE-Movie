import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SpinnerService } from './core/services/spinner.service';
import { LazyLoadService } from './services/lazy-load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Movie';

  showLoader!: boolean;

  constructor(
    private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.spinner.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }
}
