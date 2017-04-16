import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  clicks: number = 0;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.clicks++;
  }
}
