var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { CacheService } from 'ionic-cache';
/**
 * Generated class for the FullfeedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FullfeedPage = /** @class */ (function () {
    function FullfeedPage(cache, af, navCtrl, navParams) {
        this.cache = cache;
        this.af = af;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = [];
        this.show = true;
    }
    FullfeedPage.prototype.swipeLeft = function () {
        this.navCtrl.popToRoot({ animate: true, animation: 'transition', duration: 100, direction: 'forward' });
    };
    FullfeedPage.prototype.ionViewWillUnload = function () {
        //this.navCtrl.pop();
    };
    FullfeedPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var cacheKey = 'promos';
        var promises_array = [];
        var mapped;
        //this.cache.removeItem(cacheKey);
        //this.cache.getItem(cacheKey).catch(() => {
        var store = [];
        this.list2 = this.af.list('/promos', {
            query: {
                limitToLast: 10
            }
        });
        this.subscription4 = this.list2.subscribe(function (items) {
            mapped = items.map(function (item) {
                return new Promise(function (resolve, reject) {
                    var storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                    storageRef.getDownloadURL().then(function (url) {
                        console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                        item.customMetadata.picURL = url;
                        store.push(item.customMetadata);
                        resolve();
                    }).catch(function (e) {
                        console.log("in caught url !!!!!!!$$$$$$$!!");
                        item.customMetadata.picURL = 'assets/blankprof.png';
                        store.push(item.customMetadata);
                        resolve();
                    });
                });
            });
            console.log(JSON.stringify(mapped) + "    mappped things");
            _this.startAtKey = items[0].$key;
            _this.lastKey = _this.startAtKey;
            var results = Promise.all(mapped);
            results.then(function () {
                //setTimeout(() => {
                _this.items = store.reverse();
                //this.classesListArray.reverse();   
                console.log(JSON.stringify(_this.items) + " value value vlaue items");
                //}, 3000);
            });
        });
    };
    FullfeedPage.prototype.gotoProfile = function () {
        this.navCtrl.push(StylistProfile);
    };
    FullfeedPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        //return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log('Begin async operation');
            console.log(_this.content.directionY + "        upupupupupupu********");
            if (_this.content.directionY == 'up') {
                _this.show = false;
            }
            else {
                _this.show = true;
            }
            console.log(_this.startAtKey + "     before %%^&^&^% start at");
            _this.list = _this.af.list('/promos', {
                query: {
                    orderByKey: true,
                    endAt: _this.startAtKey,
                    limitToLast: 11
                }
            });
            _this.subscription3 = _this.list.subscribe(function (items) {
                var x = 0;
                _this.lastKey = _this.startAtKey;
                items.forEach(function (item) {
                    var storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                    storageRef.getDownloadURL().then(function (url) {
                        console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                        item.customMetadata.picURL = url;
                    }).catch(function (e) {
                        console.log("in caught url !!!!!!!$$$$$$$!!");
                        item.customMetadata.picURL = 'assets/blankprof.png';
                    });
                    if (_this.startAtKey !== item.$key && _this.lastKey !== item.$key) {
                        console.log(_this.startAtKey + "   :startatkey before 4444444        item key:     " + item.$key);
                        _this.items.push(item.customMetadata);
                    }
                    if (x == 0) {
                        _this.startAtKey = item.$key;
                    }
                    x++;
                });
            });
            infiniteScroll.complete();
        }, 500);
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], FullfeedPage.prototype, "content", void 0);
    FullfeedPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-fullfeed',
            templateUrl: 'fullfeed.html',
        }),
        __metadata("design:paramtypes", [CacheService, AngularFireDatabase, NavController, NavParams])
    ], FullfeedPage);
    return FullfeedPage;
}());
export { FullfeedPage };
//# sourceMappingURL=fullfeed.js.map