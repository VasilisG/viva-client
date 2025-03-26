import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VivaQueryParams } from '../../types/viva-types';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private vivaResponse: VivaQueryParams = {
    eventId: '',
    eci: '',
    t: '',
    s: '',
    lang: ''
  };

  constructor() { 
    this.route.queryParamMap.subscribe((data: any) => {
      const queryParams = data['params'];
      if(this.missingParams(queryParams)) {
        this.redirectBack();
      }
      else {
        this.assigneQueryParamsToResponse(queryParams);
      }
    })
  }

  private assigneQueryParamsToResponse(queryParams: any) {
    this.vivaResponse.eventId = queryParams['eventId'];
    this.vivaResponse.eci = queryParams['ECI'];
    this.vivaResponse.t = queryParams['t'] || '';
    this.vivaResponse.s = queryParams['s'];
    this.vivaResponse.lang = queryParams['lang'];
  }

  private redirectBack() {
    this.router.navigate(['/products']);
  }

  getVivaQueryParams(): VivaQueryParams {
    return this.vivaResponse;
  }

  missingParams(queryParams: any): boolean {
    return !queryParams['eventId'] || !queryParams['ECI'] || !queryParams['s'] || !queryParams['lang'];
  }
}
