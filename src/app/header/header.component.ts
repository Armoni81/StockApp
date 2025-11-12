import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDataService } from '../stockService/stock-data.service';
import { StockDetails } from '../models/stock-details';
import { OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { LocalStoageServiceService } from '../local-storage/local-stoage-service.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  userInput: string = '';
  stockDetails: StockDetails[] | boolean | any = [];
  displayStockCount: boolean = false;
  isSpinnerVisible: boolean = false
  displayNoSearchRsults: boolean = false


  constructor(
    private stockService: StockDataService,
    private local: LocalStoageServiceService
  ) {}
  ngOnInit(): any {
    this.stockDetails = this.stockService.getPopularStocks();

  }
  ngAfterViewInit(): void {
    this.stockService.updateBookMarkedStocks();
  }

  test() {
    console.log(this.userInput, 'useinput')
    this.displayNoSearchRsults = false
    this.isSpinnerVisible = true
    this.stockDetails = []

    setTimeout(() =>  {
      this.displayStockCount = true;
      this.stockService
        .getstockData(this.userInput)
        .subscribe(async (data: any) => {
          const filterResponse = data.filter(
            (obj: { Exchange: string }) => obj.Exchange === 'US'
          );
          if(filterResponse.length <= 0 ){
            console.log('try again')
            this.displayNoSearchRsults = true
          }
          this.stockDetails = [];
          const getTickersForVolAndChange = filterResponse.map(
            (val: { Code: string }) => val.Code
          );
          const changePrice = await this.stockService.getVolAndChangeData(
            getTickersForVolAndChange
          );
          
          if (filterResponse.length >= 1) {
            for (let i = 0; i <= filterResponse.length; i++) {
              let toNum = parseFloat(changePrice[i]).toFixed(2);
              let details: StockDetails = {
                ticker: filterResponse[i].Code,
                company:
                  filterResponse[i].Name.length >= 30
                    ? `${filterResponse[i].Name.substring(0, 30)}...`
                    : filterResponse[i].Name,
                typeStock: filterResponse[i].Type,
                prevClose: filterResponse[i].previousClose,
                lastCloseDate: filterResponse[i].previousCloseDate,
                changePrice: toNum.toString(),
                bookmarked: '',
              };
  
              this.stockDetails.push(details);
            }

          }
  
          let details: StockDetails = {
            ticker: filterResponse[0].Code,
            company: filterResponse[0].Name,
            typeStock: filterResponse[0].Type,
            prevClose: filterResponse[0].previousClose,
            lastCloseDate: filterResponse[0].previousCloseDate,
            changePrice: changePrice[0],
            bookmarked: '',
          };
          this.stockDetails.push(details);
         
        });
        this.userInput = ''
 
       
      setTimeout(() => {
        this.stockService.updateBookMarkedStocks();
      }, 800);
      this.isSpinnerVisible = false
      console.log(this.stockDetails, 'Armoni here yo')
    
    }, 1300)
    
  }
  bookmarkStocks(ticker: string, index: any) {
    const element = document.getElementById(ticker);

    const storedData = localStorage.getItem('bookmarks');

    const data = storedData ? JSON.parse(storedData) : [];

    this.stockDetails[index].bookmarked = 'none';
    data.push(this.stockDetails[index]);
 
    this.local.setItem('bookmarks', JSON.stringify(data));
    if (element) {
      element.innerHTML = 'Bookmarked';
      element.style.backgroundColor = '#cbf1d9';
      element.style.pointerEvents = 'none';
      element.style.opacity = '0.5';
    }
  }
  
}
