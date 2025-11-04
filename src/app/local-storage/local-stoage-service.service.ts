import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoageServiceService {

  constructor() { }

  setItem(key:string, value:any): void{
    localStorage.setItem(key, value)
  }
  getItem(key: string){
   return localStorage.getItem(key)
  }
}
