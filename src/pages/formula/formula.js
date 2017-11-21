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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the FormulaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FormulaPage = /** @class */ (function () {
    function FormulaPage(af, navCtrl, navParams) {
        this.af = af;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = [];
    }
    FormulaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad FormulaPage');
        this.username = this.navParams.get('username');
        this.color = this.navParams.get('color');
        this.list = this.af.object('/formulasowned/' + this.username);
        this.subscription = this.list.subscribe(function (item) {
            console.log(JSON.stringify(item) + "     objh objjo   obono oonnono ");
            for (var z in item) {
                console.log(z + " zzzzzzzzzzzzzzzzz");
                _this.list2 = _this.af.object('/formulasowned/' + _this.username + '/' + z);
                _this.subscription2 = _this.list2.subscribe(function (item) {
                    for (var r in item) {
                        console.log(JSON.stringify(item[r]) + "     rrrrrrrrrrrrr");
                        if (item[r].color != _this.color) {
                            _this.items.unshift(item[r]);
                        }
                    }
                });
            }
        });
    };
    FormulaPage.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2 != null) {
            this.subscription2.unsubscribe();
        }
    };
    FormulaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-formula',
            templateUrl: 'formula.html'
        }),
        __metadata("design:paramtypes", [AngularFireDatabase, NavController, NavParams])
    ], FormulaPage);
    return FormulaPage;
}());
export { FormulaPage };
//# sourceMappingURL=formula.js.map