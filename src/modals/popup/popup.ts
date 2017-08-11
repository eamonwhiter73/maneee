import { NavParams, ViewController } from 'ionic-angular';
import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';

@Component({
	selector: 'pop-up',
  templateUrl: 'popup.html'
})
export class PopUp {
  //@ViewChild('salon') salon: ElementRef;
  //@ViewChild('time') time: ElementRef;
  info = {'salon':'','time':''};


 constructor(public params: NavParams, public viewCtrl:ViewController, public renderer: Renderer) {
   console.log('salon', this.params.get('salon'));
   console.log('time', this.params.get('time'));

  this.info.salon = this.params.get('salon');
 	this.info.time = this.params.get('time');

 }

 ionViewDidLoad() {
 	
 	//this.renderer.setText(this.salon.nativeElement, "@"+this.params.get('salon'));
 	//this.renderer.setText(this.time.nativeElement, this.params.get('time'));
 }

 dismiss() {
 	this.viewCtrl.dismiss();
 }

}