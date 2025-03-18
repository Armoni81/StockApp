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
isVisible: boolean = false
displayNoBookmarks: boolean = false
displayBookmarks: boolean = false
  constructor(private local:LocalStoageServiceService, private stockService:StockDataService, private cdfRef:ChangeDetectorRef){}
  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('bookmarks')|| '[]')
    //  bookmarkStocks: StockDetails[] | boolean | any = JSON.parse(localStorage.getItem('bookmarks'))

  this.bookMarks = this.data
  this.isVisible =  true

  setTimeout(() => {
    this.isVisible = false
    this.displayNoBookmarks  = true
    this.displayBookmarks = true
  },1000 )
  // console.log(this.bookMarks, 'booekem')
    
  }
  removeBookMark(index: number){
    const parse = JSON.parse(localStorage.getItem('bookmarks')  || '[]')

    if(parse.length){
      parse.splice(index, 1)
    }
    console.log(parse)
    this.bookMarks = parse
   localStorage.setItem('bookmarks',  JSON.stringify(parse))
   
  
  }
  removeAllStocks(){

    localStorage.removeItem('bookmarks')
    this.bookMarks = []
  }

}
