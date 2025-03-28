import { Component, inject } from '@angular/core';
import { ResultService } from '../../services/result/result.service';
import { ECI_CODES, EVENT_CODES } from '../../constants';
import { EventInfo } from '../../types/viva-types';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-failure',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './failure.component.html',
  styleUrl: './failure.component.css'
})
export class FailureComponent {

  private resultService = inject(ResultService);

  vivaQueryParams = this.resultService.getVivaQueryParams();

  eventInfo: EventInfo = EVENT_CODES[this.vivaQueryParams.eventId];

  eciInfo = ECI_CODES[this.vivaQueryParams.eci];

  ngOnInit(): void {
    console.log(this.vivaQueryParams);
    console.log(this.eventInfo);
    console.log(this.eciInfo);
  }
}
