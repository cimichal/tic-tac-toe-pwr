import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input()
  data : any;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}
