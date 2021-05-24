import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  widgetStatus:boolean;
  dataUrl;
  firstSlide;
  secSlide;
  sliderData;
  slideFirstRow:boolean;
  slideSecRow:boolean;

  constructor(private apiService:ApiService) {
    this.dataUrl = "http://localhost:4200/assets/data/sliderData.json";
  }

  ngOnInit(): void {
    this.widgetStatus = false;
    this.slideFirstRow = true;
    this.slideSecRow = false;
    this.getSliderData();
    this.setWidgetStatus(this.slideFirstRow, this.slideSecRow);
  }

  getSliderData(){
    this.apiService.getData('../assets/data/sliderData.json').subscribe(
      data => { 
        this.sliderData = data;
        this.setSliderData(this.sliderData);
      },
      err => console.error(err),
      () => console.log('done loading slides')
    );
  }

  setSliderData(sliderData):boolean{
    this.sliderData = sliderData;
    this.firstSlide = this.sliderData[0];
    this.secSlide = this.sliderData[1];
    return this.widgetStatus = true;
  }

  setWidgetStatus(slideFirstRow,slideSectRow){
    this.slideFirstRow = slideFirstRow;
    this.slideSecRow = slideSectRow;
    if(this.slideFirstRow == true){
      this.slideFirstRow = false;
      this.slideSecRow = true;
    }else{
      this.slideFirstRow = true;
      this.slideSecRow = false;
    }
  }

}
