import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/primeng';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {

  text: string;
  
  constructor() { }

  ngOnInit() {
  }

}
