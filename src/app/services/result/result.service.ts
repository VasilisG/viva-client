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
    const queryParams = this.route.snapshot.queryParams;
    if(this.missingParams(queryParams)) {
      if(!this.gotVivaResponse()) this.redirectBack();
    }
    else {
      this.assignQueryParamsToResponse(queryParams);
    }
  }

  private gotVivaResponse() {
    return this.vivaResponse.eventId !== '' 
    && this.vivaResponse.eci !== '' 
    && this.vivaResponse.t !== ''
    && this.vivaResponse.s !== '' 
    && this.vivaResponse.lang !== '';
  }

  private assignQueryParamsToResponse(queryParams: any) {
    this.vivaResponse.eventId = queryParams['eventId'];
    this.vivaResponse.eci = queryParams['eci'];
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
    return !queryParams['eventId'] || !queryParams['eci'] || !queryParams['s'] || !queryParams['lang'];
  }
}
