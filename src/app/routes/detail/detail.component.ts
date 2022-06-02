import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    movieId!: any;
    movie!: any;
    srcdoc!: any;
    constructor(public sanitizer: DomSanitizer, private movieService: MovieService, private spinner: SpinnerService, private activatedRoute: ActivatedRoute) {
        this.movieId = this.activatedRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.spinner.hide();
        const body = {
            id: this.movieId
        }
        this.movieService.getById(body).subscribe((data: any) => {
            console.log(data);
            this.movie = data.data;
            this.srcdoc = this.sanitizer.bypassSecurityTrustHtml(data.data.trailerUrl);
        });
    }

}
