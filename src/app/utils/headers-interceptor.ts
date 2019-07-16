import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


// Create the common headers (e.g. 'application/json')
export function CREATE_HEADERS(): HttpHeaders {
  let headers = new HttpHeaders();
 
  return headers;
}

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const addHeadersToReq = req.clone({ withCredentials: true, headers: CREATE_HEADERS() });

        return next.handle(addHeadersToReq);
    }
}
