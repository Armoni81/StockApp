import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockDetails } from '../models/stock-details';
import { firstValueFrom } from 'rxjs'; //use this instead of toPromise() as it is now depricated
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators'
import { LocalStoageServiceService } from '../local-storage/local-stoage-service.service';
@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(private http:HttpClient ,private local:LocalStoageServiceService) { }
  popularStocksData: StockDetails[] = []

//67908244556db6.70380137
//67a12da01ba898.08534747
  getstockData(input:string){
   return this.http.get<any[]>(`https://eodhd.com/api/search/${input}?api_token= 67c2307a557bb1.95541284&fmt=json`)
  //  https://financialmodelingprep.com/api/v3/search?query=Aapl&apikey=azGUw2JD3uNDIyNre5sF7Agsfnd45sNT&exchange=NASDAQ
  // https://api.polygon.io/v3/reference/tickers/AAPL?apiKey=zQvZsoJrKnEYXvd2Fj2O1zdOUp8ZuC1B
  }
  getVolAndChangeData(arr: string[]): Promise<(any)[]> {

  
    const requests = arr.map((symbol) =>
      this.http
        .get<any>(`https://eodhd.com/api/real-time/${symbol}.US?api_token= 67c2307a557bb1.95541284&fmt=json`)
        .toPromise()
        .then((res) => {
          
          if (res) {
            const changeInPrice = res.open - res.close;
            console.log(`Change for ${symbol}:`, changeInPrice);
            return changeInPrice.toString();
          }
          return '0'; // Default if data is missing
        })
        .catch((err) => {
          console.error(`Error fetching ${symbol}:`, err);
          return '0'; // Handle errors gracefully
        })
    );
  
    return Promise.all(requests);
  }
  
  

  getPopularStocks() {
    const popularStocks = ['TSLA', 'AAPL', 'SPY', 'GOOG', 'AMZN', 'GME', 'MSFT'];
    const stockNames = ['Tesla', 'Apple', 'S&P 500', 'Google', 'Amazon', 'GameStop', 'Microsoft'];
  
    this.popularStocksData = []; // Reset before fetching new data
  
    for (let i = 0; i < popularStocks.length; i++) {
      this.http
        .get<{ c: any | string; d: number }>(
          `https://finnhub.io/api/v1/quote?symbol=${popularStocks[i]}&token=cu88dlpr01qhqu5ccfk0cu88dlpr01qhqu5ccfkg`
        )
        .subscribe({
          next: (data) => {
        
            if (data) {
              // console.log(popularStocks[i], 'the stock being added')
              let details: StockDetails = {
                ticker: popularStocks[i],
                company: stockNames[i] || popularStocks[i], 
                typeStock: 'null',
                prevClose: data.c.toFixed(2),
                lastCloseDate: '1/2/2022',
                changePrice: data.d.toFixed(2),
                bookmarked:''
              };
              this.popularStocksData.push(details); // Update array
            }
          },
          error: (error) => {
            console.error(`Error fetching ${popularStocks[i]}:`, error);
          },
        });
    }
    return this.popularStocksData
  }

  updateBookMarkedStocks(){
    const storedData = localStorage.getItem('bookmarks');

    const data = storedData ? JSON.parse(storedData) : [];


    
    if (data) {
      for (let stock of data) {
        let el = document.getElementById(stock.ticker);
        console.log(el, 'this is el');
        console.log(stock.ticker, 'here ticker');
        if (el) {
          console.log('in');
          el.style.backgroundColor = '#cbf1d9';
          el.style.pointerEvents = 'none';
          el.style.opacity = '0.5';
          el.innerHTML = 'Book Marked';
        }
      }
    }
  }

  removeStockFromBookMarks(index: number){
   const grabLocalStorage = this.local.getItem('bookmarks')
   console.log(grabLocalStorage, 'here')

  }
}