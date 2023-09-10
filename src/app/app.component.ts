import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { webSocket } from "rxjs/webSocket";
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public socket = io('http://localhost:3000');

  message = 'No connection yet';

  ngOnInit(): void {
    this.message = 'Connection starting';

    fromEvent(this.socket, 'connect').subscribe({
      next: (data) => {
        this.message = 'Connection created';

        this.socket.emit('timersData');
      }
    })

    fromEvent(this.socket, 'timersData').subscribe({
      next: (data) => {
        this.message = 'Data - ' + data;
      }
    })

    
    fromEvent(this.socket, 'disconnect').subscribe({
      next: (data) => {
        this.message = 'Connection closed';
      }
    })

    // this.socket.on('exception', (data: string) => {
    //   console.log('event', data);
    //   this.message = 'ConnectionError -' + data;
    // });

    // this.socket.on('disconnect', function () {
    //   console.log('Disconnected');
    // });
  }

}
