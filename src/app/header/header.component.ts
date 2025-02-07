import { Component } from '@angular/core';
import { StockDataService } from '../stockService/stock-data.service';
import { StockDetails } from '../models/stock-details';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{


  userInput: string = ''
  stockDetails:StockDetails[] = []
  displayStockCount:boolean = false
  constructor( private stockService:StockDataService ){}
  ngOnInit(): void {
    this.stockDetails = this.stockService.getPopularStocks()
  }

  test(){
    this.displayStockCount  = true
    // console.log(this.stockService.getstockData())
    console.log('hi click')
    console.log(this.userInput, 'input')
  // this.stockService.getstockData(this.userInput).subscribe((data: any) => {
    // console.log(data)
    // const filterResponse = data.filter((obj: { Exchange: string; }) => obj.Exchange === "US" );
    const filterResponse = [
      {
          "Code": "SPY",
          "Exchange": "US",
          "Name": "SPDR S&P 500 ETF Trust",
          "Type": "ETF",
          "Country": "USA",
          "Currency": "USD",
          "ISIN": "US78462F1030",
          "previousClose": 606.32,
          "previousCloseDate": "2025-02-06"
      },
      {
          "Code": "SPY",
          "Exchange": "BA",
          "Name": "Caja de Valores S.A.",
          "Type": "Common Stock",
          "Country": "Argentina",
          "Currency": "ARS",
          "ISIN": null,
          "previousClose": 36225,
          "previousCloseDate": "2025-02-06"
      },
      {
          "Code": "SPY",
          "Exchange": "MX",
          "Name": "SPDR S&P 500 ETF Trust",
          "Type": "ETF",
          "Country": "Mexico",
          "Currency": "MXN",
          "ISIN": "US78462F1030",
          "previousClose": 12402.2598,
          "previousCloseDate": "2025-02-06"
      },
      {
          "Code": "SPY",
          "Exchange": "AU",
          "Name": "SPDR® S&P 500® ETF Trust",
          "Type": "ETF",
          "Country": "Australia",
          "Currency": "AUD",
          "ISIN": "AU000000SPY3",
          "previousClose": 964.78,
          "previousCloseDate": "2025-02-07"
      },
      {
        "Code": "MONI",
        "Exchange": "AU",
        "Name": "SPDR® S&P 500® ETF Trust",
        "Type": "ETF",
        "Country": "Australia",
        "Currency": "AUD",
        "ISIN": "AU000000SPY3",
        "previousClose": 964.78,
        "previousCloseDate": "2025-02-07"
    }
  ]
    const getTickersForVolAndChange = filterResponse.map((val: {Code:string}) => val.Code)
    // const metaData = this.stockService.getVolAndChangeData(getTickersForVolAndChange)

    
    // console.log(filterResponse, 'filterresponse')
    // console.log(metaData, 'metaData')
    this.stockDetails = []

    if(filterResponse.length >= 1){
      for(let i = 0; i < filterResponse.length ; i++){
        console.log(i,'i')
        let details: StockDetails = {
          ticker: filterResponse[i].Code,
          company: filterResponse[i].Name,
          typeStock:filterResponse[i].Type,
          prevClose: filterResponse[i].previousClose,
          lastCloseDate: filterResponse[i].previousCloseDate,
          changePrice: 0
         }
  
         this.stockDetails.push(details)
        }
    

        // const toMap = new Map(filterResponse.map( (obj: {Code:string}) => [obj.Code, obj]))
        // console.log(toMap.get('AAPL'), 'hereeeeee')
        // // console.log(metaData, 'meta')
        // const combinedData = metaData.map((obj: {code:string}) => (
        //  console.log(obj, 'mick checl')
        // ));
        // console.log(combinedData, 'yurr')
      }

    let details: StockDetails = {
      ticker: filterResponse[0].Code,
      company: filterResponse[0].Name,
      typeStock: filterResponse[0].Type,
      prevClose: filterResponse[0].previousClose,
      lastCloseDate: filterResponse[0].previousCloseDate,
      changePrice: 0
     }

     this.stockDetails.push(details)

 
}

}
