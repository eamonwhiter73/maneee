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
import { Storage } from '@ionic/storage';
var DepositPage = /** @class */ (function () {
    function DepositPage(storage, http, af, appCtrl, navCtrl, params, viewCtrl, renderer) {
        this.storage = storage;
        this.http = http;
        this.af = af;
        this.appCtrl = appCtrl;
        this.navCtrl = navCtrl;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
        this.data = { 'color': '' };
        this.items = [];
    }
    DepositPage.prototype.ionViewDidLoad = function () {
        this.payload = this.params.get('payload');
        this.username = this.params.get('username');
        //this.renderer.appendText(this.salon.nativeElement, "@"+this.params.get('salon'));
        //this.renderer.appendText(this.time.nativeElement, this.params.get('time'));
    };
    DepositPage.prototype.buy = function () {
        var _this = this;
        console.log(this.username + "    this.username");
        var database = firebase.database();
        var reff = firebase.database().ref('/profiles/stylists').orderByChild('username').equalTo(this.username).on("value", function (snapshot) {
            snapshot.forEach(function (snapshot) {
                // key
                var key = snapshot.key;
                console.log("key: " + key);
                // value, could be object
                var childData = snapshot.val();
                console.log("data: " + JSON.stringify(childData));
                // Do what you want with these key/values here
                if (_this.deposit == '' || isNaN(parseInt(_this.deposit))) {
                    alert("You must fill in an amount to deposit.");
                }
                else {
                    console.log(_this.payload + '          paaaaayyyyyylllllooooooaaaaaddddd');
                    // TODO: Encode the values using encodeURIComponent().
                    _this.payload['deposit'] = _this.deposit;
                    _this.payload.merchantid = childData.merchantid;
                    _this.payload.publickey = childData.publickey;
                    _this.payload.privatekey = childData.privatekey;
                    var body = JSON.stringify(_this.payload);
                    //INSERT CALL TO BACKEND
                    _this.http.post('http://192.168.1.131:8888/api/deposit.php', body)
                        .subscribe(function (res) {
                        alert("Your deposit was successful.");
                        _this.dismiss();
                    }, function (err) {
                        alert("Something went wrong.");
                    });
                }
                return true;
            });
        });
    };
    DepositPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    DepositPage.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
    };
    DepositPage = __decorate([
        Component({
            selector: 'deposit-page',
            templateUrl: 'depositpage.html'
        }),
        __metadata("design:paramtypes", [Storage, Http, AngularFireDatabase, App, NavController, NavParams, ViewController, Renderer])
    ], DepositPage);
    return DepositPage;
}());
export { DepositPage };
//# sourceMappingURL=depositpage.js.map