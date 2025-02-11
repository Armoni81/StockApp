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
export class HeaderComponent implements OnInit {


  userInput: string = ''
  stockDetails:StockDetails[] = []
  displayStockCount:boolean = false
  constructor( private stockService:StockDataService ){}
  ngOnInit(): void {
    this.stockDetails = this.stockService.getPopularStocks()
  }

  async test()  {
    this.displayStockCount  = true
    // console.log(this.stockService.getstockData())
    console.log('hi click')
    console.log(this.userInput, 'input')
  // this.stockService.getstockData(this.userInput).subscribe((data: any) => {
    // console.log(data)
    
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
          "Code": "TSLA",
          "Exchange": "US",
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
  const changeMeBack = filterResponse.filter((obj: { Exchange: string; }) => obj.Exchange === "US" );
    const getTickersForVolAndChange = changeMeBack.map((val: {Code:string}) => val.Code)
    console.log(getTickersForVolAndChange, 'tick')
    // const metaData = this.stockService.getVolAndChangeData(getTickersForVolAndChange)
    // this.get.http<any[]>(`https://api.marketstack.com/v1/eod?access_key=09f210aa2592d9825bc793c70890e24e&symbols=${getTickersForVolAndChange[i]}`)

    
    // console.log(changeMeBack, 'changeMeBack')
    // console.log(metaData, 'metaData')
    this.stockDetails = []
    
const changePrice = await this.stockService.getVolAndChangeData(getTickersForVolAndChange)

    if(changeMeBack.length >= 1){
      for(let i = 0; i <= changeMeBack.length ; i++){
        console.log(i,'i')
        // this.stockService.getVolAndChangeData(getTickersForVolAndChange)
        let details: StockDetails = {
          ticker: changeMeBack[i].Code,
          company: changeMeBack[i].Name,
          typeStock:changeMeBack[i].Type,
          prevClose: changeMeBack[i].previousClose,
          lastCloseDate: changeMeBack[i].previousCloseDate,
          changePrice: '-0.99'
         }
         console.log(details, 'detail')
         this.stockDetails.push(details)
        }
    

        // const toMap = new Map(changeMeBack.map( (obj: {Code:string}) => [obj.Code, obj]))
        // console.log(toMap.get('AAPL'), 'hereeeeee')
        // // console.log(metaData, 'meta')
        // const combinedData = metaData.map((obj: {code:string}) => (
        //  console.log(obj, 'mick checl')
        // ));
        // console.log(combinedData, 'yurr')
      }

    let details: StockDetails = {
      ticker: changeMeBack[0].Code,
      company: changeMeBack[0].Name,
      typeStock: changeMeBack[0].Type,
      prevClose: changeMeBack[0].previousClose,
      lastCloseDate: changeMeBack[0].previousCloseDate,
      changePrice: 0
     }

     this.stockDetails.push(details)

 
}

}
