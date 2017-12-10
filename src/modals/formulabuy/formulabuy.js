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
import { Http, RequestOptions, Headers } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
var FormulaBuy = /** @class */ (function () {
    function FormulaBuy(storage, http, af, appCtrl, navCtrl, params, viewCtrl, renderer) {
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
    FormulaBuy.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.username = this.params.get('username');
        this.square = this.params.get('square');
        this.payload = this.params.get('payload');
        this.key = this.params.get('key');
        this.storage.get('username').then(function (val) {
            _this.usernameowner = val;
            _this.list2 = _this.af.object('/formulasowned/' + _this.usernameowner);
            _this.subscription = _this.list2.subscribe(function (item) {
                console.log(JSON.stringify(item) + "     objh objjo   obono oonnono ");
                for (var z in item) {
                    console.log(z + " zzzzzzzzzzzzzzzzz");
                    _this.items.push(z);
                }
            });
        });
        if (this.key == null) {
            var database = firebase.database();
            var bool = false;
            var self_1 = this;
            var reff = firebase.database().ref('/formulas').orderByChild('username').equalTo(this.username).on("value", function (snapshot) {
                snapshot.forEach(function (snapshot) {
                    // key
                    var key = snapshot.key;
                    console.log("key: " + key);
                    // value, could be object
                    var childData = snapshot.val();
                    console.log("data: " + JSON.stringify(childData));
                    // Do what you want with these key/values here
                    if (self_1.square == childData.square) {
                        self_1.data = childData;
                    }
                    return true;
                });
            });
        }
        else {
            var database = firebase.database();
            var bool = false;
            var self_2 = this;
            var reff = firebase.database().ref('/formulas').orderByKey().equalTo(this.key).on("value", function (snapshot) {
                snapshot.forEach(function (snapshot) {
                    // key
                    var key = snapshot.key;
                    console.log("key: " + key);
                    // value, could be object
                    var childData = snapshot.val();
                    console.log("data: " + JSON.stringify(childData));
                    // Do what you want with these key/values here
                    self_2.data = childData;
                    return true;
                });
            });
        }
        //this.buy();
        //this.renderer.appendText(this.salon.nativeElement, "@"+this.params.get('salon'));
        //this.renderer.appendText(this.time.nativeElement, this.params.get('time'));
    };
    FormulaBuy.prototype.buy = function () {
        var _this = this;
        var reff = firebase.database().ref('/profiles/stylists').orderByChild('username').equalTo(this.username).on("value", function (snapshot) {
            snapshot.forEach(function (snapshot) {
                // key
                var key = snapshot.key;
                console.log("key: " + key);
                // value, could be object
                var childData = snapshot.val();
                console.log("data: " + JSON.stringify(childData));
                // Do what you want with these key/values here
                _this.payload.merchantid = childData.merchantid;
                _this.payload.publickey = childData.publickey;
                _this.payload.privatekey = childData.privatekey;
                if (_this.folder1 == '' && _this.folder2 == '') {
                    alert("You must select or create a folder for the formula.");
                }
                else {
                    if (_this.folder1 != null && _this.folder2 == null) {
                        _this.list = _this.af.list('/formulasowned/' + _this.usernameowner + '/' + _this.folder1);
                        _this.data.color = _this.folder1;
                    }
                    else {
                        _this.list = _this.af.list('/formulasowned/' + _this.usernameowner + '/' + _this.folder2);
                        _this.data.color = _this.folder2;
                    }
                    console.log(_this.payload + '          paaaaayyyyyylllllooooooaaaaaddddd');
                    var headers = new Headers({
                        'Content-Type': 'application/json'
                    });
                    var options = new RequestOptions({
                        headers: headers
                    });
                    // TODO: Encode the values using encodeURIComponent().
                    var body = JSON.stringify(_this.payload);
                    //INSERT CALL TO BACKEND
                    _this.http.post('http://192.168.1.131:8888/api/buyformula.php', body)
                        .subscribe(function (res) {
                        console.log(res + "response from formula buy");
                        console.log(JSON.stringify(_this.data) + "     data dat d dat add  dat");
                        _this.list.push(_this.data).catch(function (e) { console.log(e) + "this is conosle e"; });
                        alert("You bought a formula! Check the settings page to view it.");
                        _this.dismiss();
                    }, function (err) {
                        console.log(JSON.stringify(err));
                    });
                }
                return true;
            });
        });
    };
    FormulaBuy.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    FormulaBuy.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
    };
    FormulaBuy = __decorate([
        Component({
            selector: 'formula-buy',
            templateUrl: 'formulabuy.html'
        }),
        __metadata("design:paramtypes", [Storage, Http, AngularFireDatabase, App, NavController, NavParams, ViewController, Renderer])
    ], FormulaBuy);
    return FormulaBuy;
}());
export { FormulaBuy };
//# sourceMappingURL=formulabuy.js.map