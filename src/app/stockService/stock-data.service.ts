import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockDetails } from '../models/stock-details';
@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(private http:HttpClient) { }
  popularStocks: StockDetails[] = []

  getstockData(input:string){
   return this.http.get<any[]>(`https://eodhd.com/api/search/${input}?api_token=67a12da01ba898.08534747&fmt=json`)
  //  https://financialmodelingprep.com/api/v3/search?query=Aapl&apikey=azGUw2JD3uNDIyNre5sF7Agsfnd45sNT&exchange=NASDAQ
  // https://api.polygon.io/v3/reference/tickers/AAPL?apiKey=zQvZsoJrKnEYXvd2Fj2O1zdOUp8ZuC1B
  }
  getVolAndChangeData(arr: []){
    let dataObj:[{code:string,change:number, change_p:number,volume:number}] = [{code:'',change:0, change_p: 0,volume:0}]

    for(let i = 0 ; i < arr.length ; i++){
      // let obj:{code:string,change:number, volume:number} ={code:'', change:0, volume: 0}
      this.http.get<{code: string, change: number, change_p:number, volume:number}>(`https://eodhd.com/api/real-time/${arr[i]}.US?api_token=67a12da01ba898.08534747&fmt=json`).subscribe((data) => {
        console.log(data.code, 'INYO')
      if(data){
        let removeExtraWords = data.code.split('.')[0]
        let obj:{code:string,change:number, change_p:number, volume:number} = {
          code:removeExtraWords,
          change: data.change,
          change_p: data.change_p,
          volume:data.volume
        }
        dataObj.push(obj)
      }
      })
    }
    // dataObj.splice(0,1)
    return dataObj
}

getPopularStocks(){
const popularStocks = ['TSLA','AAPL', 'SPY', 'GOOG', 'AMZN', 'GME', 'MSFT']
const stockNames = ['Tesla', 'Apple', 'S&P 500', 'Google', 'Amazon', 'Microsoft']

for(let i = 0; i < popularStocks.length; i++){
  this.http.get<{c:number | string, d:number}>(`https://finnhub.io/api/v1/quote?symbol=${popularStocks[i]}&token=cu88dlpr01qhqu5ccfk0cu88dlpr01qhqu5ccfkg`).subscribe((data) => {
    if(data){
      console.log(data)
      let details: StockDetails = {
        ticker:popularStocks[i],
        company: stockNames[i],
        typeStock:'null',
        prevClose: data.c,
        lastCloseDate: '1/2/2022',
        changePrice: data.d.toString()
      }
      this.popularStocks.push(details)
    }
    
  })

}
return this.popularStocks
}
}

