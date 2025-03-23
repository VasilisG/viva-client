import { Component, inject } from '@angular/core';
import { ResultService } from '../../../services/result/result.service';
import { ECI_CODES, EVENT_CODES } from '../../../constants';
import { EventInfo } from '../../../types/viva-types';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-failure',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './failure.component.html',
  styleUrl: './failure.component.css'
})
export class FailureComponent {

  private resultService = inject(ResultService);

  vivaResponse = this.resultService.getVivaResponse();

  eventInfo: EventInfo = EVENT_CODES[this.vivaResponse.eventId];

  eciInfo = ECI_CODES[this.vivaResponse.eci];

  ngOnInit(): void {
    console.log(this.vivaResponse);
    console.log(this.eventInfo);
    console.log(this.eciInfo);
  }
}
