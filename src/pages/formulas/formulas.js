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
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from "@ionic/storage";
import { FormulaPage } from '../formula/formula';
/**
 * Generated class for the FormulasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FormulasPage = /** @class */ (function () {
    function FormulasPage(app, storage, af, navCtrl, navParams) {
        this.app = app;
        this.storage = storage;
        this.af = af;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = [{ 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' },
            { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' },
            { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }, { 'url': 'assets/lock.png' }];
    }
    FormulasPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad FormulasPage');
        this.storage.get('username').then(function (val) {
            _this.username = val;
            _this.list = _this.af.object('/formulasowned/' + val);
            _this.subscription = _this.list.subscribe(function (item) {
                console.log(JSON.stringify(item) + "     objh objjo   obono oonnono ");
                for (var z in item) {
                    console.log(z + " zzzzzzzzzzzzzzzzz");
                    _this.list2 = _this.af.object('/formulasowned/' + val + '/' + z);
                    _this.subscription2 = _this.list2.subscribe(function (item) {
                        var c = 0;
                        for (var r in item) {
                            console.log(JSON.stringify(item[r]) + "     rrrrrrrrrrrrr");
                            if (c > 0) {
                                break;
                            }
                            _this.items.unshift(item[r]);
                            c++;
                        }
                    });
                }
            });
        });
    };
    FormulasPage.prototype.loadFolder = function (color) {
        console.log("load folder");
        console.log(color);
        this.navCtrl.push(FormulaPage, {
            color: color,
            username: this.username
        });
    };
    FormulasPage.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2 != null) {
            this.subscription2.unsubscribe();
        }
    };
    FormulasPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-formulas',
            templateUrl: 'formulas.html'
        }),
        __metadata("design:paramtypes", [App, Storage, AngularFireDatabase, NavController, NavParams])
    ], FormulasPage);
    return FormulasPage;
}());
export { FormulasPage };
//# sourceMappingURL=formulas.js.map