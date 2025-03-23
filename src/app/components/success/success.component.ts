import { Component, inject, OnInit } from '@angular/core';
import { ResultService } from '../../services/result/result.service';
import { EventInfo } from '../../types/viva-types';
import { EVENT_CODES } from '../../constants';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent implements OnInit {

  private resultService = inject(ResultService);

  vivaResponse = this.resultService.getVivaResponse();

  eventInfo: EventInfo = EVENT_CODES[this.vivaResponse.eventId];

  ngOnInit(): void {
    console.log(this.vivaResponse);
    console.log(this.eventInfo);
  }
}
