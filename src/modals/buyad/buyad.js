var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { App, NavParams, ViewController, NavController } from 'ionic-angular';
import { Component, Renderer } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
var BuyAd = /** @class */ (function () {
    //@ViewChild('salon') salon: ElementRef;
    //@ViewChild('time') time: ElementRef;
    //info = {'salon':'','time':''};
    //userdata: FirebaseObjectObservable<any>;
    //userdata2: FirebaseObjectObservable<any>;
    //subscription: ISubscription;
    //subscription2: ISubscription;
    //phone: string;
    function BuyAd(sms, callNumber, af, appCtrl, navCtrl, params, viewCtrl, renderer) {
        this.sms = sms;
        this.callNumber = callNumber;
        this.af = af;
        this.appCtrl = appCtrl;
        this.navCtrl = navCtrl;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
    }
    BuyAd.prototype.ionViewDidLoad = function () {
        //this.info.salon = this.params.get('salon');
        //this.info.time = this.params.get('time');
        //this.userdata = this.af.object('/profiles/stylists/' + this.info.salon);
        //this.subscription = this.userdata.subscribe(item => {
        //this.phone = item.phone;
        //});
        //this.renderer.setText(this.salon.nativeElement, "@"+this.params.get('salon'));
        //this.renderer.setText(this.time.nativeElement, this.params.get('time'));
    };
    BuyAd.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    BuyAd.prototype.smsFromPopup = function () {
        //if(this.phone.toString().length < 11) {
        this.sms.send("18608491429", 'Hi, I would like to talk about buying an ad!');
    };
    BuyAd.prototype.callFromPopup = function () {
        this.callNumber.callNumber("18608491429", true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    BuyAd = __decorate([
        Component({
            selector: 'buy-ad',
            templateUrl: 'buyad.html'
        }),
        __metadata("design:paramtypes", [SMS, CallNumber, AngularFireDatabase, App, NavController, NavParams, ViewController, Renderer])
    ], BuyAd);
    return BuyAd;
}());
export { BuyAd };
//# sourceMappingURL=buyad.js.map