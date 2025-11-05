import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-google-gemini',
  standalone: false,
  templateUrl: './google-gemini.component.html',
  styleUrl: './google-gemini.component.css'
})
export class GoogleGeminiComponent {
  inputValue: string = ''
  apiUrl: string = 'http://localhost:3000/api/chat'
  prompt:Object = {}
  isAiBoxVisible:boolean = false
  generatedAiText:string = ''
  constructor(private http:HttpClient){}
  renderAiBox() {
    this.isAiBoxVisible = true
    console.log('clicked')
    console.log(this.isAiBoxVisible)
  }
  logText() {
    console.log(this.inputValue, 'here')

  
    this.prompt = {
      text:this.inputValue
    }

    this.postData(this.prompt).subscribe(
      (response) => {
        // What do you do with the response here?
        this.generatedAiText = response.generatedAiText
        console.log(this.generatedAiText, 'lol')
      }
    );

  }

  postData(data: any): Observable<any> {
    console.log('in')
    return this.http.post<any>(this.apiUrl, data);
  }

  // console.log(postData(this.prompt))
}
