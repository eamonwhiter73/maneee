var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import dropin from 'braintree-web-drop-in';
import { Http } from '@angular/http';
import { FormulaBuy } from '../../modals/formulabuy/formulabuy';
import { DepositPage } from '../../modals/depositpage/depositpage';
/**
 * Generated class for the DropinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DropinPage = /** @class */ (function () {
    function DropinPage(modalCtrl, navCtrl, navParams, http) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
    }
    DropinPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad DropinPage');
        var square = this.navParams.get('square');
        var username = this.navParams.get('username');
        var comingFrom = this.navParams.get('page');
        var key = this.navParams.get('key');
        var button = document.querySelector('#submit-button');
        this.http.request('http://192.168.1.131:8888/api/generatetoken.php')
            .subscribe(function (res) {
            dropin.create({
                authorization: res.text(),
                container: '#dropin-container',
                paypal: {
                    flow: 'vault'
                }
            }, function (createErr, instance) {
                button.addEventListener('click', function () {
                    instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
                        console.log(JSON.stringify(payload) + "payload");
                        // Submit payload.nonce to your server
                        _this.blurAll();
                        if (comingFrom == 'userprofile') {
                            var profileModal = _this.modalCtrl.create(DepositPage, { payload: payload, username: username });
                            profileModal.present().then(function () {
                                _this.navCtrl.pop();
                            });
                        }
                        else if (comingFrom == null && key == null) {
                            var profileModal = _this.modalCtrl.create(FormulaBuy, { username: username, square: square, payload: payload });
                            profileModal.present();
                            _this.navCtrl.pop();
                        }
                        else if (key != null) {
                            var profileModal = _this.modalCtrl.create(FormulaBuy, { username: username, key: key, payload: payload });
                            profileModal.present();
                            _this.navCtrl.pop();
                        }
                        else {
                            //Add product code here
                        }
                    });
                });
            });
        }, function (err) {
            console.log(err + "     this is errrrrrrrrrrrr");
        });
    };
    DropinPage.prototype.blurAll = function () {
        var tmp = document.createElement("input");
        document.body.appendChild(tmp);
        tmp.focus();
        document.body.removeChild(tmp);
    };
    DropinPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-dropin',
            templateUrl: 'dropin.html'
        }),
        __metadata("design:paramtypes", [ModalController, NavController, NavParams, Http])
    ], DropinPage);
    return DropinPage;
}());
export { DropinPage };
//# sourceMappingURL=dropin.js.map