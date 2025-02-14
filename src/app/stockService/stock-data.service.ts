import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockDetails } from '../models/stock-details';
import { firstValueFrom } from 'rxjs'; //use this instead of toPromise() as it is now depricated
@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(private http:HttpClient) { }
  popularStocksData: StockDetails[] = []


  getstockData(input:string){
   return this.http.get<any[]>(`https://eodhd.com/api/search/${input}?api_token=67a12da01ba898.08534747&fmt=json`)
  //  https://financialmodelingprep.com/api/v3/search?query=Aapl&apikey=azGUw2JD3uNDIyNre5sF7Agsfnd45sNT&exchange=NASDAQ
  // https://api.polygon.io/v3/reference/tickers/AAPL?apiKey=zQvZsoJrKnEYXvd2Fj2O1zdOUp8ZuC1B
  }
  getVolAndChangeData(arr: string[]): Promise<(any)[]> {
    console.log('Fetching stock data for:', arr);
  
    const requests = arr.map((symbol) =>
      this.http
        .get<any>(`https://api.marketstack.com/v1/eod?access_key=4f7e5853443aa75d9fecf37e47d07727&symbols=${symbol}`)
        .toPromise()
        .then((res) => {
          if (res?.data?.[0]) {
            const changeInPrice = res.data[0].open - res.data[0].close;
            console.log(`Change for ${symbol}:`, changeInPrice);
            return changeInPrice;
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
    const stockNames = ['Tesla', 'Apple', 'S&P 500', 'Google', 'Amazon', 'Microsoft'];
  
    this.popularStocksData = []; // Reset before fetching new data
  
    for (let i = 0; i < popularStocks.length; i++) {
      this.http
        .get<{ c: number | string; d: number }>(
          `https://finnhub.io/api/v1/quote?symbol=${popularStocks[i]}&token=cu88dlpr01qhqu5ccfk0cu88dlpr01qhqu5ccfkg`
        )
        .subscribe({
          next: (data) => {
            if (data) {
              let details: StockDetails = {
                ticker: popularStocks[i],
                company: stockNames[i] || popularStocks[i], // Fallback if undefined
                typeStock: 'null',
                prevClose: data.c,
                lastCloseDate: '1/2/2022',
                changePrice: data.d.toString(),
              };
              this.popularStocksData.push(details); // Update array
              console.log(`Added: ${details.ticker}`, this.popularStocksData);

            }
          },
          error: (error) => {
            console.error(`Error fetching ${popularStocks[i]}:`, error);
          },
        });
    }
    return this.popularStocksData
  }
}