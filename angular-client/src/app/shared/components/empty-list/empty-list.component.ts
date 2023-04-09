import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss'],
})
export class EmptyListComponent implements OnInit {
  @Input() image!: string;
  @Input() titleMessage!: string;
  @Input() secMessage!: string;
  mainPath = './../../assets/images/empty-list/';
  imgUrl!: string;

  constructor() {}

  ngOnInit(): void {
    this.imgUrl = `${this.mainPath}${this.image}`;
  }
}
