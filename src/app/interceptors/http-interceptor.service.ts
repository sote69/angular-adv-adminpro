import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) :Observable<any> {

    // console.log('Pasamos por el interceptor....');
    // console.log(req.url);
    const cloneRequest = req.clone({ headers: this.headers });
    return next.handle(cloneRequest).pipe(
      // catchError(this.manejarError)
    );
  }

  get token() :string {
    return localStorage.getItem('token') || '';
  }

  get headers() :HttpHeaders {
    return new HttpHeaders( { "Authorization": `Bearer ${ this.token }` } );
  }
}
