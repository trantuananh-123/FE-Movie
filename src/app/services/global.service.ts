import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    username = new BehaviorSubject<any>("");
    avatar = new BehaviorSubject<any>("");
    isAdmin = new BehaviorSubject<any>(false);

    constructor() { }

    setUsername(username: String) {
        this.username.next(username);
    }

    setAvatar(avatar: String) {
        this.avatar.next(avatar);
    }

    setIsAdmin(isAdmin: boolean) {
        this.isAdmin.next(isAdmin);
    }
}
