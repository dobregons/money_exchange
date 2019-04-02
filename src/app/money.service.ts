import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MoneyService {
  ApiUrl = environment.APIURL;
  constructor(private http: HttpClient) {}

  convertDollarToEuro(): Observable<any> {
    const uri = this.ApiUrl + "&symbols=CAD";
    return this.http.get(uri);
  }
  convertDollarToEuroAsync(): Promise<any> {
    const uri = this.ApiUrl + "&symbols=CAD";
    return this.http.get(uri).toPromise();
  }
}
