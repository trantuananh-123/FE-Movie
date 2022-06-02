import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_NAME_KEY = 'user_name';
const USER_ROLE_KEY = 'user_role';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor() { }

    signOut(): void {
        window.sessionStorage.clear();
    }

    saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    getToken(): String {
        return window.sessionStorage.getItem(TOKEN_KEY)!;
    }

    saveUser(user: any): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }
        return {};
    }

    saveUserName(username: any) {
        window.sessionStorage.removeItem(USER_NAME_KEY);
        window.sessionStorage.setItem(USER_NAME_KEY, username);
    }

    getUserName() {
        const username = window.sessionStorage.getItem(USER_NAME_KEY);
        if (username) {
            return username;
        }
        return '';
    }

    saveUserRole(userRole: any) {
        window.sessionStorage.removeItem(USER_ROLE_KEY);
        window.sessionStorage.setItem(USER_ROLE_KEY, userRole);
    }

    isAdmin() {
        let userRoles = window.sessionStorage.getItem('user_role');
        if (userRoles != null && userRoles.includes('ROLE_ADMIN')) {
            return true;
        } else return false;
    }
}
