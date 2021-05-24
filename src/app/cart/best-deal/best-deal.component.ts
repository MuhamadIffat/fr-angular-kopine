import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BestDealCommon } from 'src/app/shared/best-deal-common';

@Component({
  selector: 'app-best-deal',
  templateUrl: './best-deal.component.html',
  styleUrls: ['./best-deal.component.scss']
})
export class BestDealComponent implements OnInit {

  @Input () data;
  @Input () cartTotalBd;
  isbnArray:Array<any>
  commercialOffersUrl:string;
  dataOffers;
  bestDealData:any;
  price:number;
  priceBestdeal:number = 0;
  offerSliceTxt:string;
  offerPercentTxt:string;
  offerMinusTxt:string;
  bestDealPercentTxt: string;
  bestDealMinusTxt: string;
  bestDealSliceTxt: string;
  bestDealPriceTxt: string;
  percentVis:boolean = false;
  minusVis:boolean = false;
  sliceVis:boolean = false;
  dataArray;
  //Best deal

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.doBestDeal();
  }

  doBestDeal(){
    this.getBestdealData(); 
  } 
  //get Best deal data
  getBestdealData(){
    this.bestDealData = this.data.products;
    this.isbnArray = this.bestDealData.map(data => data.isbn).sort()
    .filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });

    this.setBestDealUrl(this.isbnArray);
    this.getCommercialOffers(this.commercialOffersUrl);
    
  }

//doSetbestdealUrl
setBestDealUrl(isbnArray):void{
  this.isbnArray = isbnArray;
  for(let o in this.isbnArray){
      this.commercialOffersUrl += this.isbnArray[o] + "," ;
  }
  this.commercialOffersUrl = "http://henri-potier.xebia.fr/books/"+this.commercialOffersUrl+"/commercialOffers";
}

  // Get commercial offers //Todo : use service
  getCommercialOffers(commercialOffersUrl){
    this.commercialOffersUrl = commercialOffersUrl;
    if(this.commercialOffersUrl == ""){
      return;
    }else{
      this.apiService.getoffers(this.commercialOffersUrl).subscribe(
        data => { 
          this.dataArray = data;
          this.dataArray = this.dataArray.offers;
          this.calcBestdeal(this.dataArray);
          return this.dataArray;
        },
        err => console.error(err),
        () => console.log('done loading books')
      );

    }

  } 
  // Calc best deal 
  calcBestdeal(dataOffers):void{
    this.dataOffers = dataOffers;
    console.log("this.dataOffers offer",this.dataOffers);
    this.price = this.data.totalCart;
    console.log("this.price",this.price);
    let percent = !this.dataOffers[0] ?  0: this.dataOffers[0].value;
    let minus =  !this.dataOffers[1] ? 0 : this.dataOffers[1].value;
    let slice = !this.dataOffers[2] ? 0 : this.dataOffers[2].value;
    let sliceValue = !this.dataOffers[0] ? 0 : this.dataOffers[0].sliceValue;
    //pricePercent
    let pricePercent = Math.floor(this.price - ((this.price/100)*percent));  
    //priceMinus
    let priceMinus = pricePercent - minus;
    //priceBestdeal
    if(priceMinus<sliceValue){
      this.priceBestdeal = priceMinus;
    }else{
      this.priceBestdeal = priceMinus - slice;
    }
    //Set besdeal txt  
    this.offerPercentTxt = "Remise de : " + percent + " % ";
    this.offerMinusTxt = "Réduction immédiate en caisse d'un montant de " + minus + " Euro";
    this.offerSliceTxt = "Réduction d'un montant de "+ slice + " Euro";
    //Set visbility //Todo : finir
    this.percentVis = !this.dataOffers[0] ?  false : true;
    this.minusVis =  !this.dataOffers[1] ? false : true;
    this.sliceVis = !this.dataOffers[2] ? false : true;
  }


}


