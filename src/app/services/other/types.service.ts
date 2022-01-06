import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Type } from 'src/app/components/Interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  types!: Type[]

  constructor(private http: HttpClient) { 
  }

  fetchTypes() {
    this.http.get<Type[]>('types').pipe().subscribe({
      next: (res: any) => {
        this.types = res.types;
      }
    })
  }
}
