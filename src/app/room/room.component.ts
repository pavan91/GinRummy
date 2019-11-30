import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "../api/web-socket.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  cards: [{ suit: any, value: any }];
  topCard: [{ suit: any, value: any }];

  constructor(private webSocketService: WebSocketService) {
    this.webSocketService.listenGame('newState').subscribe((res) => {
      console.log(res);
    });
  }

  ngOnInit() {
    this.webSocketService.listenGame('initData').subscribe((res: any) => {
      this.cards = res.cards;
      this.topCard = res.top;
      console.log(this.topCard);
    });
    this.webSocketService.listenGame('dataUpdate').subscribe((res: any) => {
      this.cards = res.cards;
      this.topCard = res.topCard;
      console.log(this.topCard);
    });
  }

  onClickMove() {
    this.webSocketService.emitGames('move', 123);

  }

  onClickCard(card: any) {
    this.webSocketService.emitGames('move', card);
  }

  onClickTop() {

  }

  getNewCard() {

  }
}