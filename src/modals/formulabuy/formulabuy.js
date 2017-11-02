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
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { HttpParams } from '@angular/common/http';
var FormulaBuy = /** @class */ (function () {
    function FormulaBuy(http, af, appCtrl, navCtrl, params, viewCtrl, renderer) {
        this.http = http;
        this.af = af;
        this.appCtrl = appCtrl;
        this.navCtrl = navCtrl;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
        this.data = {};
        this.buying = false;
    }
    FormulaBuy.prototype.logForm = function () {
        this.body = {
            "cmd": "_xclick",
            "business": "eamon.white7@gmail.com",
            "lc": "US",
            "item_name": "Formula",
            "item_number": "1",
            "amount": "3.00",
            "currency_code": "USD",
            "button_subtype": "services",
            "no_note": "0",
            "tax_rate": "0.000",
            "shipping": "0.00",
            "bn": "PP-BuyNowBF:btn_buynowCC_LG.gif:NonHostedGuest"
        };
        this.http
            .post('https://www.paypal.com/cgi-bin/webscr', null, { params: new HttpParams().set('cmd', '_xclick')
                .append('business', 'eamon.white7@gmail.com')
                .append('lc', 'US')
                .append('item_name', 'Formula')
                .append('amount', '3.00')
                .append('currency_code', 'USD')
                .append('button_subtype', 'services')
                .append('no_note', '0')
                .append('tax_rate', '0.000')
                .append('shipping', '0.00')
                .append('bn', 'PP-BuyNowBF:btn_buynowCC_LG.gif:NonHostedGuest')
        })
            .subscribe(function (res) {
            console.log(res + "    response from post call");
        }, function (err) { return console.log(err + "   errrrr from post call"); });
    };
    FormulaBuy.prototype.ionViewDidLoad = function () {
        this.username = this.params.get('username');
        this.square = this.params.get('square');
        var database = firebase.database();
        var bool = false;
        var self = this;
        var reff = firebase.database().ref('/formulas').orderByChild('username').equalTo(this.username).on("value", function (snapshot) {
            snapshot.forEach(function (snapshot) {
                // key
                var key = snapshot.key;
                console.log("key: " + key);
                // value, could be object
                var childData = snapshot.val();
                console.log("data: " + JSON.stringify(childData));
                // Do what you want with these key/values here
                if (self.square == childData.square) {
                    self.data = childData;
                }
                return true;
            });
        });
        //this.buy();
        //this.renderer.appendText(this.salon.nativeElement, "@"+this.params.get('salon'));
        //this.renderer.appendText(this.time.nativeElement, this.params.get('time'));
    };
    FormulaBuy.prototype.buy = function () {
        this.buying = true;
    };
    FormulaBuy.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    FormulaBuy.prototype.ngOnDestroy = function () {
    };
    FormulaBuy = __decorate([
        Component({
            selector: 'formula-buy',
            templateUrl: 'formulabuy.html'
        }),
        __metadata("design:paramtypes", [Http, AngularFireDatabase, App, NavController, NavParams, ViewController, Renderer])
    ], FormulaBuy);
    return FormulaBuy;
}());
export { FormulaBuy };
//# sourceMappingURL=formulabuy.js.map