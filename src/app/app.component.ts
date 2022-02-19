import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { SpinnerService } from './core/services/spinner.service';
import { LazyLoadService } from './services/lazy-load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  title = 'Movie';

  showLoader: boolean = true;
  showHeader: boolean = true;
  showFooter: boolean = true;

  constructor(public router: Router, private activatedRoute: ActivatedRoute, private spinner: SpinnerService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url.includes('login') || event.url.includes('register')) {
          this.showHeader = false;
          this.showFooter = false;
        } else {
          this.showHeader = true;
          this.showFooter = true;
        }
      }
    });
  }

  ngAfterContentInit() {
    this.spinner.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }
}
