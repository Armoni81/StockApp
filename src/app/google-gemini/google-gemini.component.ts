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
  apiUrl: string = 'https://stock-i6wdmpzy5-armonis-projects.vercel.app/api/chat'
  prompt:Object = {}
  isAiBoxVisible:boolean = false
  generatedAiText:string = ''
  displayColorOnInputBox: boolean = false
  constructor(private http:HttpClient){}
  renderAiBox() {
    this.isAiBoxVisible = true
  }
  closeAiBox() {
    this.isAiBoxVisible = false
  }

  logText() {
    const upperCaseFirstCharInInputValue = this.inputValue.split('')[0].toUpperCase() + this.inputValue.slice(1,this.inputValue.length )
    this.prompt = {
      text:`Please give a historical and current overview of this stock more detail about current status ${upperCaseFirstCharInInputValue}`
    }
    this.displayColorOnInputBox = true
    this.postData(this.prompt).subscribe(
      (response) => {
        this.generatedAiText = response.generatedText
        this.displayColorOnInputBox = false
  
      }
    );

  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
