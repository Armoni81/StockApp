import { Component, OnInit } from '@angular/core';
import { StockDetails } from '../models/stock-details';
import { LocalStoageServiceService } from '../local-storage/local-stoage-service.service';
import { StockDataService } from '../stockService/stock-data.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-bookmark',
  standalone: false,
  
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css'
})
export class BookmarkComponent implements OnInit {
data:any =[]
bookMarks: StockDetails[] =[]
  constructor(private local:LocalStoageServiceService, private stockService:StockDataService, private cdfRef:ChangeDetectorRef){}
  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('bookmarks')|| '[]')
    //  bookmarkStocks: StockDetails[] | boolean | any = JSON.parse(localStorage.getItem('bookmarks'))
  console.log(this.data)
  console.log(this.data.flat(), 'flat')
  this.bookMarks = this.data
 
  // console.log(this.bookMarks, 'booekem')
    
  }
  removeBookMark(index: number){
    const parse = JSON.parse(localStorage.getItem('bookmarks')  || '[]')

    if(parse.length){
      parse.splice(index, 1)
    }
    console.log(parse)
   localStorage.setItem('bookmarks',  JSON.stringify(parse))
   this.cdfRef.detectChanges();
  
  }
  removeAllStocks(){


    localStorage.removeItem('bookmarks')
  }
}
