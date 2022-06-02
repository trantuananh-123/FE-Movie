import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    display(value: boolean) {
        this.status.next(value);
    }

    show() {
        this.status.next(true);
    }

    hide() {
        setTimeout(() => {
            this.status.next(false);
        }, 1500);
    }
}