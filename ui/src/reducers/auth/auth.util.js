export class AuthUtils {
    static getAuthHeaderFromToken(token) {
        return `Token ${token}`;
    }

    static getAuthToken () {
        return localStorage.getItem('ozone-session-token');
    };

    static setAuthToken(token) {
        localStorage.setItem('ozone-session-token', token);
    }

    static removeAuthToken() {
        localStorage.removeItem('ozone-session-token');
    }

    static getJsonHeaderWithAuthToken() {
        return {
            'content-type': 'application/json',
            'Authorization': this.getAuthHeaderFromToken(this.getAuthToken())
        };
    }
};