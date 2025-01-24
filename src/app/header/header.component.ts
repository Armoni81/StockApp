import { Component } from '@angular/core';
import { StockDataService } from '../stockService/stock-data.service';
import { StockDetails } from '../models/stock-details';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userInput: string = ''
  stockDetails:object[] = []
  constructor( private stockService:StockDataService){}

  test(){
    // console.log(this.stockService.getstockData())
    console.log('hi click')
    console.log(this.userInput, 'input')
    this.stockService.getstockData(this.userInput).subscribe((data:any) => {
      console.log(data.filter((obj: { Exchange: string; }) => obj.Exchange === "US"))
   
     let z = data.filter((obj: { Exchange: string; }) => obj.Exchange === "US")
      this.stockDetails.push(data.filter((obj: { Exchange: string; }) => obj.Exchange === "US"))
      console.log(this.stockDetails, 'lol')
      // data
    })
  }
}
