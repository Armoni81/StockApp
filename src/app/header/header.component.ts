import { Component } from '@angular/core';
import { StockDataService } from '../stockService/stock-data.service';
import { StockDetails } from '../models/stock-details';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userInput: string = ''
  stockDetails:StockDetails[] = []
  constructor( private stockService:StockDataService){}

  test(){
    // console.log(this.stockService.getstockData())
    console.log('hi click')
    console.log(this.userInput, 'input')
  //   this.stockService.getstockData(this.userInput).subscribe((data:any) => {
 
  //     this.stockDetails.push(data.results)
  //     console.log(this.stockDetails[0], 'ahhh')
  //   //  let z = data.filter((obj: { Exchange: string; }) => obj.Exchange === "US")
  //   //   this.stockDetails.push(data.filter((obj: { Exchange: string; }) => obj.Exchange === "US"))
  //   //   console.log(this.stockDetails, 'lol')
  //     // data
  //   })
  // }
  this.stockService.getstockData(this.userInput).subscribe((data: any) => {
    const filterResponse = data.filter((obj: { Exchange: string; }) => obj.Exchange === "US" );
    console.log(filterResponse, 'res')
    this.stockDetails = []

    if(filterResponse.length >= 1){
      for(let i = 0; i <= filterResponse.length ; i++){
        console.log(i,'i')
        let details: StockDetails = {
          ticker: filterResponse[i].Code,
          company: filterResponse[i].Name,
          typeStock:filterResponse[i].Type,
          prevClose: filterResponse[i].previousClose,
          lastCloseDate: filterResponse[i].previousCloseDate
         }
  
         this.stockDetails.push(details)
      }

    }

    let details: StockDetails = {
      ticker: filterResponse[0].Code,
      company: filterResponse[0].Name,
      typeStock: filterResponse[0].Type,
      prevClose: filterResponse[0].previousClose,
      lastCloseDate: filterResponse[0].previousCloseDate
     }

     this.stockDetails.push(details)
  });
}
}
