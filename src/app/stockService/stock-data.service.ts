import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(private http:HttpClient) { }

  getstockData(input:string){
   return this.http.get<any[]>(`https://eodhd.com/api/search/${input}?api_token=67908244556db6.70380137&fmt=json`)
  //  https://financialmodelingprep.com/api/v3/search?query=Aapl&apikey=azGUw2JD3uNDIyNre5sF7Agsfnd45sNT&exchange=NASDAQ
  // https://api.polygon.io/v3/reference/tickers/AAPL?apiKey=zQvZsoJrKnEYXvd2Fj2O1zdOUp8ZuC1B
  }
}
