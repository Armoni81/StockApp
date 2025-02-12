import { Component } from '@angular/core';
import { StockDataService } from '../stockService/stock-data.service';
import { StockDetails } from '../models/stock-details';
import { OnInit } from '@angular/core';
import { filter } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {


  userInput: string = ''
  stockDetails:StockDetails[] | boolean | any = []
  displayStockCount:boolean = false
  constructor( private stockService:StockDataService ){}
  ngOnInit(): any {
    this.stockDetails = this.stockService.getPopularStocks()
  }

   test()  {
    this.displayStockCount  = true
    // console.log(this.stockService.getstockData())
    console.log('hi click')
    console.log(this.userInput, 'input')
  this.stockService.getstockData(this.userInput).subscribe(async (data: any) =>  {
    const filterResponse = data.filter((obj: { Exchange: string; }) => obj.Exchange === "US" );
    this.stockDetails = []
   const getTickersForVolAndChange = filterResponse.map((val: {Code:string}) => val.Code)
   const changePrice = await  this.stockService.getVolAndChangeData(getTickersForVolAndChange)
   if(filterResponse.length >= 1){
     for(let i = 0; i <= filterResponse.length ; i++){
       console.log(i,'i')
       // this.stockService.getVolAndChangeData(getTickersForVolAndChange)
       let details: StockDetails = {
         ticker: filterResponse[i].Code,
         company: filterResponse[i].Name,
         typeStock:filterResponse[i].Type,
         prevClose: filterResponse[i].previousClose,
         lastCloseDate: filterResponse[i].previousCloseDate,
         changePrice: changePrice[i].toFixed(2)
        }
        console.log(details, 'detail')
        this.stockDetails.push(details)
       }
     }
 
   let details: StockDetails = {
     ticker: filterResponse[0].Code,
     company: filterResponse[0].Name,
     typeStock: filterResponse[0].Type,
     prevClose: filterResponse[0].previousClose,
     lastCloseDate: filterResponse[0].previousCloseDate,
     changePrice: changePrice[0]
    }
    this.stockDetails.push(details)
  })




 
}

}
