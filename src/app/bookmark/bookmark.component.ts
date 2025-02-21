import { Component, OnInit } from '@angular/core';
import { StockDetails } from '../models/stock-details';
import { LocalStoageServiceService } from '../local-storage/local-stoage-service.service';

@Component({
  selector: 'app-bookmark',
  standalone: false,
  
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css'
})
export class BookmarkComponent implements OnInit {
data:any =[]
bookMarks: StockDetails[] =[]
  constructor(private local:LocalStoageServiceService){}
  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('bookmarks')|| '[]')
    //  bookmarkStocks: StockDetails[] | boolean | any = JSON.parse(localStorage.getItem('bookmarks'))
  console.log(this.data)
  console.log(this.data.flat(), 'flat')
  this.bookMarks = this.data
 
  // console.log(this.bookMarks, 'booekem')
    
  }
}
