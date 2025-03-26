import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading = signal(false);

  setLoading(loading: boolean){
    this.loading.set(loading);
  }

  isLoading(){
    return this.loading();
  }
}
