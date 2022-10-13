import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenStorageServiceService } from "./token-storage-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private sessionStorage: TokenStorageServiceService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.sessionStorage.getToken();

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('authorization', 'Bearer ' + token)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }

}