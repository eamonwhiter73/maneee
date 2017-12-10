var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, trigger, state, style, transition, animate, ViewChild, ViewChildren, QueryList, Renderer, ElementRef } from '@angular/core';
import { NavController, App, Platform, Slides, Content } from 'ionic-angular';
import { LoadingController, ActionSheetController, ModalController } from 'ionic-angular';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { PostpagePage } from '../postpage/postpage';
import { FeedUser } from '../feeduser/feeduser';
import { UserProfile } from '../userprofile/userprofile';
import { DropinPage } from '../dropin/dropin';
import { BuyAd } from '../../modals/buyad/buyad';
import { FollowersPage } from '../followers/followers';
import { Storage } from '@ionic/storage';
import { DatePicker } from '@ionic-native/date-picker';
import { CameraServicePost } from '../../services/cameraservicepost';
import { Camera } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import firebase from 'firebase';
import { CacheService } from "ionic-cache";
import { SMS } from '@ionic-native/sms';
import 'rxjs/add/operator/share';
var FeedStylist = /** @class */ (function () {
    function FeedStylist(modalCtrl, sms, cache, datePicker, storage, platform, af, element, camera, app, cameraServicePost, actionSheetCtrl, myrenderer, loadingController, navCtrl) {
        this.modalCtrl = modalCtrl;
        this.sms = sms;
        this.cache = cache;
        this.datePicker = datePicker;
        this.storage = storage;
        this.platform = platform;
        this.af = af;
        this.element = element;
        this.camera = camera;
        this.app = app;
        this.cameraServicePost = cameraServicePost;
        this.actionSheetCtrl = actionSheetCtrl;
        this.myrenderer = myrenderer;
        this.loadingController = loadingController;
        this.navCtrl = navCtrl;
        this.downState = 'notDown';
        this.moveState = 'up';
        this.toolbarState = 'up';
        this.toolbarClicks = 0;
        this.items = [];
        this.items2 = [];
        this.totalCount = 0;
        this.lastNumRows = 0;
        this.classesListArray = [];
        this.productListArray = [];
        this.formulaListArray = [];
        this.ads = [];
        this.swiperSize = 'begin';
        this.optionsGetMedia = {
            allowEdit: false,
            quality: 2,
            targetWidth: 600,
            targetHeight: 600,
            encodingType: this.camera.EncodingType.PNG,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            mediaType: this.camera.MediaType.PICTURE,
            destinationType: this.camera.DestinationType.FILE_URI
        };
        this.optionsGetCamera = {
            quality: 2,
            targetWidth: 600,
            targetHeight: 600,
            encodingType: this.camera.EncodingType.PNG,
            sourceType: this.camera.PictureSourceType.CAMERA,
            mediaType: this.camera.MediaType.PICTURE,
            destinationType: this.camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true
        };
        this.nav = this.app.getActiveNav();
    }
    FeedStylist.prototype.beginPurchase = function (identity) {
        this.navCtrl.push(DropinPage, { username: this.username, key: identity.$key });
    };
    FeedStylist.prototype.buyAd = function () {
        var profileModal = this.modalCtrl.create(BuyAd);
        profileModal.present();
    };
    FeedStylist.prototype.InfiniteAll = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            _this.items = [];
            _this.listAll();
            infiniteScroll.complete();
        }, 500);
    };
    FeedStylist.prototype.doInfiniteProduct = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            console.log('Begin async operation');
            /*console.log(this.content.directionY + "        upupupupupupu********");
            if(this.content.directionY == 'up') {
              this.show = false
            }
            else {
              this.show = true;
            }*/
            console.log(_this.startAtKey1 + "     before %%^&^&^% start at");
            _this.list2 = _this.af.list('/products', {
                query: {
                    orderByKey: true,
                    endAt: _this.startAtKey1,
                    limitToLast: 11
                }
            });
            _this.subscription11 = _this.list2.subscribe(function (items) {
                var x = 0;
                _this.lastKey1 = _this.startAtKey1;
                items.forEach(function (item) {
                    var storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                    storageRef.getDownloadURL().then(function (url) {
                        console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                        item.customMetadata.picURL = url;
                    }).catch(function (e) {
                        console.log("in caught url !!!!!!!$$$$$$$!!");
                        item.customMetadata.picURL = 'assets/blankprof.png';
                    });
                    if (_this.startAtKey1 !== item.$key && _this.lastKey1 !== item.$key) {
                        console.log(_this.startAtKey1 + "   :startAtKey1 before 4444444        item key:     " + item.$key);
                        _this.productListArray.push(item.customMetadata); //unshift?**************
                    }
                    if (x == 0) {
                        _this.startAtKey1 = item.$key;
                    }
                    x++;
                });
            });
            infiniteScroll.complete();
        }, 500);
    };
    FeedStylist.prototype.doInfiniteFormula = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            console.log('Begin async operation');
            /*console.log(this.content.directionY + "        upupupupupupu********");
            if(this.content.directionY == 'up') {
              this.show = false
            }
            else {
              this.show = true;
            }*/
            console.log(_this.startAtKey2 + "     before %%^&^&^% start at");
            _this.list3 = _this.af.list('/formulas', {
                query: {
                    orderByKey: true,
                    endAt: _this.startAtKey2,
                    limitToLast: 11
                }
            });
            _this.subscription12 = _this.list3.subscribe(function (items) {
                var x = 0;
                _this.lastKey2 = _this.startAtKey2;
                items.forEach(function (item) {
                    var storageRef = firebase.storage().ref().child('/settings/' + item.username + '/profilepicture.png');
                    storageRef.getDownloadURL().then(function (url) {
                        console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                        item.picURL = url;
                    }).catch(function (e) {
                        console.log("in caught url !!!!!!!$$$$$$$!!");
                        item.picURL = 'assets/blankprof.png';
                    });
                    if (_this.startAtKey2 !== item.$key && _this.lastKey2 !== item.$key) {
                        console.log(_this.startAtKey2 + "   :startAtKey1 before 4444444        item key:     " + item.$key);
                        _this.formulaListArray.push(item); //unshift?**************
                    }
                    if (x == 0) {
                        _this.startAtKey2 = item.$key;
                    }
                    x++;
                });
            });
            infiniteScroll.complete();
        }, 500);
    };
    FeedStylist.prototype.doInfiniteClass = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            console.log('Begin async operation');
            /*console.log(this.content.directionY + "        upupupupupupu********");
            if(this.content.directionY == 'up') {
              this.show = false
            }
            else {
              this.show = true;
            }*/
            console.log(_this.startAtKey + "     before %%^&^&^% start at");
            _this.list = _this.af.list('/classes', {
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
                        _this.classesListArray.push(item.customMetadata); //unshift?**************
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
    FeedStylist.prototype.ionViewWillUnload = function () {
        //this.navCtrl.pop();
    };
    FeedStylist.prototype.getID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    ;
    FeedStylist.prototype.modelChanged = function (newObj) {
        var _this = this;
        console.log(typeof newObj + "  nnnnnneeeeeewwww     jo boboobbooooooob");
        var date = new Date(newObj);
        console.log(date.getDate() + "     :     " + date.getDay());
        this.month = this.af.object('/appointments/' + this.username + '/' + date.getMonth());
        var x = 0;
        this.subscription7 = this.month.subscribe(function (item) {
            console.log(JSON.stringify(item) + "    got the month");
            if (item != null) {
                var bo = false;
                var time_1;
                var boool = false;
                var skip = false;
                var _loop_1 = function (objj) {
                    if (objj == "$value") {
                        console.log(objj);
                        var forHold = void 0;
                        var minUnder = "";
                        var ampm = void 0;
                        //console.log(<number>date.getUTCHours() + "<number>date.getUTCHours()");
                        if (date.getUTCHours() > 12) {
                            forHold = date.getUTCHours() - 12;
                            ampm = "PM";
                        }
                        else {
                            forHold = date.getUTCHours();
                            ampm = "AM";
                        }
                        if (date.getMinutes() < 10) {
                            minUnder = "0" + date.getMinutes();
                        }
                        else {
                            minUnder = date.getMinutes().toString();
                        }
                        time_1 = forHold + ":" + minUnder + " " + ampm;
                        var array = [{ "selected": false, "time": "8:00AM" }, { "selected": true, "time": "8:30 AM" }, { "selected": true, "time": "9:00 AM" }, { "selected": false, "time": "9:30 AM" }, { "selected": true, "time": "10:00 AM" }, { "selected": true, "time": "10:30 AM" }, { "selected": false, "time": "11:00 AM" }, { "selected": true, "time": "11:30 AM" }, { "selected": true, "time": "12:00 PM" }, { "selected": false, "time": "12:30 PM" }, { "selected": true, "time": "1:00 PM" }, { "selected": true, "time": "1:30 PM" }, { "selected": false, "time": "2:00 PM" }, { "selected": true, "time": "2:30 PM" }, { "selected": true, "time": "3:00 PM" }, { "selected": false, "time": "3:30 PM" }, { "selected": true, "time": "4:00 PM" }, { "selected": true, "time": "4:30 PM" }, { "selected": false, "time": "5:00 PM" }, { "selected": true, "time": "5:30 PM" }, { "selected": true, "time": "6:00 PM" }, { "selected": false, "time": "6:30 PM" }, { "selected": true, "time": "7:00 PM" }, { "selected": true, "time": "7:30 PM" }];
                        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                            var z = array_1[_i];
                            if (z.time == time_1) {
                                z.selected = true;
                                boool = true;
                                skip = true;
                            }
                        }
                        var u = _this.getID();
                        console.log("looping here above");
                        _this.month.update((_a = {}, _a[u] = { 'date': { 'day': date.getTime() / 1000 }, 'reserved': { 'appointment': array } }, _a));
                    }
                    else {
                        console.log(JSON.stringify(objj));
                        var holderDate = new Date(item[objj].date.day * 1000);
                        //console.log(date.getMinutes() + "   date : getmin   " + holderDate.getMinutes());
                        //console.log(date.getUTCHours() + "   date : gethours    " + holderDate.getUTCHours());
                        //console.log(date.getDate() + "   date : getdate    " + holderDate.getDate());
                        //console.log(date.getMonth() + "   date : getmonth    " + holderDate.getMonth());
                        //console.log(date.getFullYear() + "   date : getyear    " + holderDate.getFullYear());
                        if (date.getDate() == holderDate.getDate() && date.getMonth() == holderDate.getMonth() && date.getFullYear() == holderDate.getFullYear()) {
                            for (var _b = 0, _c = item[objj].reserved.appointment; _b < _c.length; _b++) {
                                var x_1 = _c[_b];
                                var forHold = void 0;
                                var minUnder = "";
                                var ampm = void 0;
                                //console.log(<number>date.getUTCHours() + "<number>date.getUTCHours()");
                                if (date.getUTCHours() > 12) {
                                    forHold = date.getUTCHours() - 12;
                                    ampm = "PM";
                                }
                                else {
                                    forHold = date.getUTCHours();
                                    ampm = "AM";
                                }
                                if (date.getMinutes() < 10) {
                                    minUnder = "0" + date.getMinutes();
                                }
                                else {
                                    minUnder = date.getMinutes().toString();
                                }
                                time_1 = forHold + ":" + minUnder + " " + ampm;
                                console.log(x_1.selected + " selected    " + " xtime:" + x_1.time + "  time  :" + time_1);
                                if (x_1.time == time_1 && x_1.selected == false) {
                                    x_1.selected = true;
                                    boool = true;
                                    //bo = true;
                                }
                                //console.log(x.time + "     x.time");
                                //console.log(time + "     time");
                                //console.log(date.getUTCHours()+":"+date.getUTCMinutes())
                                //if(x.time == date.getHours +":"+ date.getMinutes 
                            }
                        }
                        else {
                            var forHold = void 0;
                            var minUnder = "";
                            var ampm = void 0;
                            //console.log(<number>date.getUTCHours() + "<number>date.getUTCHours()");
                            if (date.getUTCHours() > 12) {
                                forHold = date.getUTCHours() - 12;
                                ampm = "PM";
                            }
                            else {
                                forHold = date.getUTCHours();
                                ampm = "AM";
                            }
                            if (date.getMinutes() < 10) {
                                minUnder = "0" + date.getMinutes();
                            }
                            else {
                                minUnder = date.getMinutes().toString();
                            }
                            time_1 = forHold + ":" + minUnder + " " + ampm;
                            var array = [{ "selected": false, "time": "8:00AM" }, { "selected": true, "time": "8:30 AM" }, { "selected": true, "time": "9:00 AM" }, { "selected": false, "time": "9:30 AM" }, { "selected": true, "time": "10:00 AM" }, { "selected": true, "time": "10:30 AM" }, { "selected": false, "time": "11:00 AM" }, { "selected": true, "time": "11:30 AM" }, { "selected": true, "time": "12:00 PM" }, { "selected": false, "time": "12:30 PM" }, { "selected": true, "time": "1:00 PM" }, { "selected": true, "time": "1:30 PM" }, { "selected": false, "time": "2:00 PM" }, { "selected": true, "time": "2:30 PM" }, { "selected": true, "time": "3:00 PM" }, { "selected": false, "time": "3:30 PM" }, { "selected": true, "time": "4:00 PM" }, { "selected": true, "time": "4:30 PM" }, { "selected": false, "time": "5:00 PM" }, { "selected": true, "time": "5:30 PM" }, { "selected": true, "time": "6:00 PM" }, { "selected": false, "time": "6:30 PM" }, { "selected": true, "time": "7:00 PM" }, { "selected": true, "time": "7:30 PM" }];
                            for (var _d = 0, array_2 = array; _d < array_2.length; _d++) {
                                var z = array_2[_d];
                                if (z.time == time_1) {
                                    z.selected = true;
                                    boool = true;
                                    skip = true;
                                }
                            }
                            var u = _this.getID();
                            console.log("looping here below");
                            _this.month.update((_e = {}, _e[u] = { 'date': { 'day': date.getTime() / 1000 }, 'reserved': { 'appointment': array } }, _e));
                        }
                        if (boool == true) {
                            var r = item[objj];
                            if (!skip) {
                                _this.month.update((_f = {}, _f[objj] = { 'date': { 'day': item[objj].date.day }, 'reserved': { 'appointment': item[objj].reserved.appointment } }, _f));
                            }
                            var string1_1 = '';
                            var promises_array = [];
                            _this.storage.get('username').then(function (val) {
                                console.log('in storage');
                                _this.follow = _this.af.list('/profiles/stylists/' + val + "/followers");
                                _this.subscription = _this.follow.subscribe(function (items) {
                                    var mapped = items.map(function (item) {
                                        return new Promise(function (resolve, reject) {
                                            console.log(JSON.stringify(item) + " item item item");
                                            var arr = Object.keys(item);
                                            console.log(typeof item[arr[0]] + "    type followers");
                                            string1_1 += (item[arr[0]]) + ", ";
                                            console.log(string1_1 + " this is string 1");
                                            resolve();
                                        });
                                    });
                                    Promise.all(mapped).then(function () {
                                        var month1 = date.getUTCMonth() + 1;
                                        var date1 = date.getUTCDate();
                                        console.log(string1_1 + " this is string 1 2");
                                        _this.sms.send(string1_1, val + " just opened up a spot at " + time_1 + " on " + month1 + "/" + date1 + "!")
                                            .catch(function (e) { console.log(JSON.stringify(e)); });
                                    });
                                });
                            });
                        }
                    }
                    var _a, _e, _f;
                };
                for (var objj in item) {
                    _loop_1(objj);
                }
                if (bo) {
                    alert("This spot is already available, or it is in the past.");
                }
                x++;
            }
        });
    };
    FeedStylist.prototype.sendIt = function () {
        console.log("sent sent sent setn");
    };
    FeedStylist.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        //this.navCtrl.push(SignUpPage);
    };
    FeedStylist.prototype.getAds = function () {
        var _this = this;
        var promises_array = [];
        var cacheKey = 'ads';
        this.cache.getItem(cacheKey).catch(function () {
            var store = [];
            console.log("in get addddssss ******");
            _this.objj = _this.af.object('/adcounter/count');
            _this.subscription6 = _this.objj.subscribe(function (item) {
                console.log(JSON.stringify(item) + "in adddd subscribe()()()()()()");
                console.log(typeof item);
                _this.totalAdCount = item.$value;
                var _loop_2 = function (x) {
                    console.log("in promise gafdfsfads");
                    promises_array.push(new Promise(function (resolve, reject) {
                        var storageRef = firebase.storage().ref().child('/ads/ad' + x + '.png');
                        storageRef.getDownloadURL().then(function (url) {
                            console.log(url);
                            store.push(url);
                            console.log("reigh before resolve");
                            resolve();
                        }).catch(function (e) {
                            resolve();
                        });
                    }));
                };
                for (var x = 1; x < item.$value + 1; x++) {
                    _loop_2(x);
                }
                var results = Promise.all(promises_array);
                results.then(function (value) {
                    _this.ads = store;
                    console.log(JSON.stringify(_this.ads) + " value value vlaue");
                    console.log("in list all");
                    return _this.cache.saveItem(cacheKey, _this.ads);
                });
            });
        }).then(function (data) {
            console.log("Saved data: ", data);
            _this.ads = data;
        });
    };
    FeedStylist.prototype.goSeeProfile = function (item) {
        this.navCtrl.push(UserProfile, { username: item.username }, { animate: true, animation: 'ios-transition', duration: 100 });
    };
    FeedStylist.prototype.tappedPost = function () {
        this.navCtrl.push(PostpagePage);
    };
    FeedStylist.prototype.tappedEmergency = function () {
        var _this = this;
        //this.navCtrl.push(BookingPage);
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(function (date) { console.log(date + " this is the date &&&&&&&"); _this.dateofme = date; }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    FeedStylist.prototype.indexChange = function () {
        console.log(this.swiperIndex);
        if (this.swiperSize == 'small' || 'begin') {
            if (this.totalAdCount - 4 == this.swiperIndex) {
                this.navCtrl.push(StylistProfile, {}, { animate: true, animation: 'transition', duration: 100, direction: 'forward' });
            }
            else if (this.swiperIndex == 0) {
                this.navCtrl.push(FollowersPage, {}, { animate: true, animation: 'transition', duration: 100, direction: 'back' });
            }
        }
        else {
            if (this.totalAdCount - 1 == this.swiperIndex) {
                this.navCtrl.push(StylistProfile, {}, { animate: true, animation: 'transition', duration: 100, direction: 'forward' });
            }
            else if (this.swiperIndex == 0) {
                this.navCtrl.push(FollowersPage, {}, { animate: true, animation: 'transition', duration: 100, direction: 'back' });
            }
        }
    };
    FeedStylist.prototype.swipeLeft = function () {
        this.toProfile();
    };
    FeedStylist.prototype.swipeRight = function () {
        this.navCtrl.push(FollowersPage, {}, { animate: true, animation: 'ios-transition', duration: 100, direction: 'back' });
    };
    FeedStylist.prototype.switchView = function () {
        this.navCtrl.push(FeedUser);
    };
    FeedStylist.prototype.toProfile = function () {
        this.navCtrl.push(StylistProfile, {}, { animate: true, animation: 'ios-transition', duration: 100, direction: 'forward' });
    };
    FeedStylist.prototype.loadPost = function () {
        this.presentActionSheet();
    };
    FeedStylist.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose source',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        //let itemArrayTwo = this.profComponents.toArray();
                        _this.cameraServicePost.getMedia(_this.optionsGetCamera).then(function (data) {
                            _this.navCtrl.push(PostpagePage, { path: data });
                            /*let storageRef = firebase.storage().ref().child('/profile/' + this.username + '/profile_' + this.username + '_' + this.square + '.png');
                            let loading = this.loadingController.create({content : "Loading..."});
                            loading.present();
                            setTimeout(() => {
                              storageRef.getDownloadURL().then(url => {
                                console.log(url);
                                this.myrenderer.setElementAttribute(itemArrayTwo[this.square - 1].nativeElement, 'src', url);
                                this.showSquare();
                                loading.dismiss();
                              });
                            }, 3000);*/
                        }); //pass in square choice
                        //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
                        console.log('camera clicked');
                    }
                }, {
                    text: 'Photo Library',
                    handler: function () {
                        //let itemArrayTwo = this.profComponents.toArray();
                        _this.cameraServicePost.getMedia(_this.optionsGetMedia).then(function (data) {
                            console.log(data + "dadadaddkdkktatatat");
                            if (data) {
                                _this.navCtrl.push(PostpagePage, { path: data });
                                /*return new Promise((resolve, reject) => {
                                  let storageRef = firebase.storage().ref().child('/profile/' + this.username + '/profile_' + this.username + '_' + this.square + '.png');
                                  let loading = this.loadingController.create({content : "Loading..."});
                                  loading.present();
                                  setTimeout(() => {
                                    storageRef.getDownloadURL().then(url => {
                                      console.log(url);
                                      this.myrenderer.setElementAttribute(itemArrayTwo[this.square - 1].nativeElement, 'src', url);
                                      this.showSquare();
                                      loading.dismiss();
                                      resolve();
                                    });
                                  }, 3000);
                                });*/
                                //
                            }
                        });
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    FeedStylist.prototype.all = function () {
        this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
        this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.formulasF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.formulaslist.nativeElement, 'display', 'none');
    };
    FeedStylist.prototype.products = function () {
        this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
        this.myrenderer.setElementStyle(this.formulasF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(this.formulaslist.nativeElement, 'display', 'none');
    };
    FeedStylist.prototype.classes = function () {
        console.log("classeslist      " + this.classeslist.nativeElement);
        this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
        this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.formulasF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.formulaslist.nativeElement, 'display', 'none');
    };
    FeedStylist.prototype.formulasList = function () {
        console.log("classeslist      " + this.classeslist.nativeElement);
        this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.formulasF.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
        this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.formulaslist.nativeElement, 'display', 'block');
    };
    FeedStylist.prototype.whatIsIndex1 = function () {
        console.log(this.slidess2.realIndex + "    big version");
        console.log(this.slidess.realIndex + "    small version");
    };
    FeedStylist.prototype.whatIsIndex2 = function () {
        console.log(this.slidess2.realIndex + "    big version");
        console.log(this.slidess.realIndex + "    small version");
    };
    FeedStylist.prototype.toolClicked = function (event) {
        var _this = this;
        this.toolbarClicks++;
        console.log('tapped');
        if (this.toolbarClicks == 1) {
            setTimeout(function () {
                if (_this.toolbarClicks == 2) {
                    console.log('running application');
                    _this.downState = (_this.downState == 'notDown') ? 'down' : 'notDown';
                    _this.moveState = (_this.moveState == 'up') ? 'down' : 'up';
                    _this.toolbarState = (_this.toolbarState == 'up') ? 'down' : 'up';
                    if (_this.toolbarState == 'up') {
                        _this.config = {
                            direction: 'horizontal',
                            slidesPerView: '4',
                            keyboardControl: false
                        };
                        _this.swiperSize = 'small';
                        /*this.adImage.forEach(item => {
                          this.myrenderer.setElementStyle(item.nativeElement, 'height', '17vh');
                        })*/
                        //this.myrenderer.setElementStyle(this.slidess2._elementRef.nativeElement, 'display', 'none');
                        //this.myrenderer.setElementStyle(this.slidess._elementRef.nativeElement, 'display', 'block');
                        /*let index = this.slidess2.realIndex;
                        console.log(index + "REAL INDEX OF BIG ------");
                        console.log(this.slidess2.getActiveIndex() + "active index big -----");
                        console.log(this.slidess.realIndex + "real index small in conditional -----");
                        while(this.slidess.getActiveIndex() <= index) {
                          console.log("in slide next !!!!!!!!!!! small");
                           this.slidess.slideNext();
                        }*/
                    }
                    else {
                        _this.config = {
                            direction: 'horizontal',
                            slidesPerView: '1',
                            keyboardControl: false
                        };
                        //el2.style['min-height'] = '250px';
                        //el2.style['max-width'] = '77%';
                        _this.swiperSize = 'big';
                        /*this.adImage.forEach(item => {
                          this.myrenderer.setElementStyle(item.nativeElement, 'height', '35vh');
                        })*/
                        //this.myrenderer.setElementStyle(this.slidess2._elementRef.nativeElement, 'display', 'block');
                        //this.myrenderer.setElementStyle(this.slidess._elementRef.nativeElement, 'display', 'none');
                        /*let index = this.slidess.getActiveIndex();
                           
                        console.log(index + "ACTIVE INDEX OF small ------");
                        console.log(this.slidess2.getActiveIndex() + "active index big in conditional -----");
                        console.log(this.slidess2.realIndex + "real index big -----");
                        //this.slidess2.slideTo(index, 500);
                        //this.slidess2.update();
            
                        while(this.slidess2.getActiveIndex() <= index) {
                          console.log("in slide next !!!!!!!!!!! big");
                           this.slidess2.slideNext();
                        }*/
                    }
                    _this.toolbarClicks = 0;
                }
                else {
                    _this.toolbarClicks = 0;
                }
            }, 300);
        }
    };
    FeedStylist.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.listProducts().then(function () {
            _this.listFormulas().then(function () {
                _this.listClasses().then(function () {
                    console.log(_this.productListArray + "    proddy proddy product");
                    console.log(_this.classesListArray + "    proddy proddy classes");
                    console.log(_this.formulaListArray + "    proddy proddy formula");
                    _this.listAll();
                });
            });
        });
        this.getAds();
        this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');
        this.storage.get('username').then(function (val) {
            _this.username = val;
        });
    };
    FeedStylist.prototype.ionViewWillLeave = function () {
        //this.myrenderer.setElementStyle(this.ionHeader.nativeElement, 'display', 'none');
    };
    FeedStylist.prototype.ionViewWillEnter = function () {
        //this.myrenderer.setElementStyle(this.ionHeader.nativeElement, 'display', 'block');
    };
    FeedStylist.prototype.contractItem = function (item) {
        console.log("in contract item 8*****");
        var flexArray = this.flexComponents.toArray();
        var feedArray = this.feedComponents.toArray();
        var feedArray2 = this.feedTopTwoComponents.toArray();
        var itemArray = this.components.toArray();
        var imageComps = this.imageComponents.toArray();
        var captionComps = this.captionComponents.toArray();
        this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'flex');
        this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'padding', '4px 4px 0px 4px');
        this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(feedArray2[item].nativeElement, 'display', 'none');
        //flexArray[item].nativeElement.style = 'display: none';
        //feedArray[item].nativeElement.style = 'display: flex';
        this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(captionComps[item].nativeElement, 'display', 'none');
        //imageComps[item].nativeElement.style = 'display: block';
        this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
        //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', '');
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', '');
        //var selectedRow = document.getElementById('item');
        //console.log(selectedRow);
    };
    FeedStylist.prototype.contractItem2 = function (item) {
        var flexArray = this.flexComponents2.toArray();
        var feedArray = this.feedComponents2.toArray();
        var feedArray2 = this.feedTop22Components.toArray();
        var itemArray = this.components2.toArray();
        var imageComps = this.imageComponents2.toArray();
        var captionComps = this.captionComponents2.toArray();
        this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'flex');
        this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'padding', '4px 4px 0px 4px');
        this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(feedArray2[item].nativeElement, 'display', 'none');
        //flexArray[item].nativeElement.style = 'display: none';
        //feedArray[item].nativeElement.style = 'display: flex';
        this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(captionComps[item].nativeElement, 'display', 'none');
        //imageComps[item].nativeElement.style = 'display: block';
        this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
        //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', '');
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', '');
        //var selectedRow = document.getElementById('item');
        //console.log(selectedRow);
    };
    FeedStylist.prototype.contractItem3 = function (item) {
        var flexArray = this.flexComponents3.toArray();
        var feedArray = this.feedComponents3.toArray();
        var feedArray2 = this.feedTop32Components.toArray();
        var itemArray = this.components3.toArray();
        var imageComps = this.imageComponents3.toArray();
        var captionComps = this.captionComponents3.toArray();
        this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'flex');
        this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'padding', '4px 4px 0px 4px');
        this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(feedArray2[item].nativeElement, 'display', 'none');
        //flexArray[item].nativeElement.style = 'display: none';
        //feedArray[item].nativeElement.style = 'display: flex';
        this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(captionComps[item].nativeElement, 'display', 'none');
        //imageComps[item].nativeElement.style = 'display: block';
        this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
        //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', '');
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', '');
        //var selectedRow = document.getElementById('item');
        //console.log(selectedRow);
    };
    FeedStylist.prototype.contractItem4 = function (item) {
        var flexArray = this.flexComponents4.toArray();
        var feedArray = this.feedComponents4.toArray();
        var feedArray2 = this.feedTop42Components.toArray();
        var itemArray = this.components4.toArray();
        var imageComps = this.imageComponents4.toArray();
        var captionComps = this.captionComponents4.toArray();
        this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'flex');
        this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'padding', '4px 4px 0px 4px');
        this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(feedArray2[item].nativeElement, 'display', 'none');
        //flexArray[item].nativeElement.style = 'display: none';
        //feedArray[item].nativeElement.style = 'display: flex';
        this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(captionComps[item].nativeElement, 'display', 'none');
        //imageComps[item].nativeElement.style = 'display: block';
        this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
        //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', '');
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', '');
        //var selectedRow = document.getElementById('item');
        //console.log(selectedRow);
    };
    FeedStylist.prototype.expandItem = function (item) {
        var flexArray = this.flexComponents.toArray();
        var feedArray = this.feedComponents.toArray();
        var feedArray2 = this.feedTopTwoComponents.toArray();
        var itemArray = this.components.toArray();
        var imageComps = this.imageComponents.toArray();
        var captionComps = this.captionComponents.toArray();
        this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'flex');
        this.myrenderer.setElementStyle(feedArray2[item].nativeElement, 'display', 'flex');
        //flexArray[item].nativeElement.style = 'display: none';
        //feedArray[item].nativeElement.style = 'display: flex';
        this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(captionComps[item].nativeElement, 'display', 'block');
        //imageComps[item].nativeElement.style = 'display: block';
        this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
        //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', 'null');
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', 'null');
        //var selectedRow = document.getElementById('item');
        //console.log(selectedRow);
    };
    FeedStylist.prototype.expandItem2 = function (item) {
        var flexArray = this.flexComponents2.toArray();
        var feedArray = this.feedComponents2.toArray();
        var feedArray2 = this.feedTop22Components.toArray();
        var itemArray = this.components2.toArray();
        var imageComps = this.imageComponents2.toArray();
        var captionComps = this.captionComponents2.toArray();
        this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'flex');
        this.myrenderer.setElementStyle(feedArray2[item].nativeElement, 'display', 'flex');
        //flexArray[item].nativeElement.style = 'display: none';
        //feedArray[item].nativeElement.style = 'display: flex';
        this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(captionComps[item].nativeElement, 'display', 'block');
        //imageComps[item].nativeElement.style = 'display: block';
        this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
        //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', 'null');
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', 'null');
        //var selectedRow = document.getElementById('item');
        //console.log(selectedRow);
    };
    FeedStylist.prototype.expandItem3 = function (item) {
        var flexArray = this.flexComponents3.toArray();
        var feedArray = this.feedComponents3.toArray();
        var feedArray2 = this.feedTop32Components.toArray();
        var itemArray = this.components3.toArray();
        var imageComps = this.imageComponents3.toArray();
        var captionComps = this.captionComponents3.toArray();
        this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'flex');
        this.myrenderer.setElementStyle(feedArray2[item].nativeElement, 'display', 'flex');
        //flexArray[item].nativeElement.style = 'display: none';
        //feedArray[item].nativeElement.style = 'display: flex';
        this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(captionComps[item].nativeElement, 'display', 'block');
        //imageComps[item].nativeElement.style = 'display: block';
        this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
        //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', 'null');
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', 'null');
        //var selectedRow = document.getElementById('item');
        //console.log(selectedRow);
    };
    FeedStylist.prototype.expandItem4 = function (item) {
        var flexArray = this.flexComponents4.toArray();
        var feedArray = this.feedComponents4.toArray();
        var feedArray2 = this.feedTop42Components.toArray();
        var itemArray = this.components4.toArray();
        var imageComps = this.imageComponents4.toArray();
        var captionComps = this.captionComponents4.toArray();
        this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'flex');
        this.myrenderer.setElementStyle(feedArray2[item].nativeElement, 'display', 'flex');
        //flexArray[item].nativeElement.style = 'display: none';
        //feedArray[item].nativeElement.style = 'display: flex';
        this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(captionComps[item].nativeElement, 'display', 'block');
        //imageComps[item].nativeElement.style = 'display: block';
        this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
        //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', 'null');
        //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', 'null');
        //var selectedRow = document.getElementById('item');
        //console.log(selectedRow);
    };
    FeedStylist.prototype.listClasses = function () {
        var _this = this;
        var cacheKey = 'classes';
        var promises_array = [];
        //this.cache.removeItem(cacheKey);
        return new Promise(function (resolve, reject) {
            var mapped;
            //this.cache.getItem(cacheKey).catch(() => {
            var store = [];
            _this.list = _this.af.list('/classes', { query: {
                    limitToLast: 10
                } });
            _this.subscription4 = _this.list.subscribe(function (items) {
                mapped = items.map(function (item) {
                    return new Promise(function (resolve, reject) {
                        console.log(JSON.stringify(item.customMetadata) + ":   this is the customdata (((()()()()()");
                        var storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                        storageRef.getDownloadURL().then(function (url) {
                            console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                            item.customMetadata.profilepic = url;
                            console.log(JSON.stringify(item.customMetadata) + "     listclasses item undefined");
                            store.push(item.customMetadata);
                            resolve();
                        }).catch(function (e) {
                            console.log("in caught url !!!!!!!$$$$$$$!!");
                            item.customMetadata.profilepic = 'assets/blankprof.png';
                            console.log(JSON.stringify(item.customMetadata) + "     listclasses item undefined profilepic not found");
                            store.push(item.customMetadata);
                            resolve();
                        });
                        //this.startAtKey = item.$key;
                    });
                });
                _this.startAtKey = items[0].$key;
                _this.lastKey = _this.startAtKey;
                var results = Promise.all(mapped);
                results.then(function () {
                    //setTimeout(() => {
                    console.log(JSON.stringify(_this.classesListArray) + " value value vlaue classsses");
                    _this.classesListArray = store.reverse();
                    //this.classesListArray.reverse();   
                    console.log(JSON.stringify(_this.classesListArray) + " value value vlaue classsses");
                    //return this.cache.saveItem(cacheKey, this.classesListArray);
                    //}, 3000);
                    resolve();
                });
            });
            /*}).then(data => {
              console.log("Saved data: ", data);
              this.classesListArray = data;
              resolve();
            })*/
        });
    };
    FeedStylist.prototype.listProducts = function () {
        var _this = this;
        var cacheKey = 'products';
        var promises_array = [];
        return new Promise(function (resolve, reject) {
            var mapped;
            //this.cache.getItem(cacheKey).catch(() => {
            var store = [];
            _this.list1 = _this.af.list('/products', { query: {
                    limitToLast: 10
                } });
            _this.subscription5 = _this.list1.subscribe(function (items) {
                mapped = items.map(function (item) {
                    return new Promise(function (resolve, reject) {
                        console.log(JSON.stringify(item.customMetadata) + ":   this is the customdata (((()()()()()");
                        var storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                        storageRef.getDownloadURL().then(function (url) {
                            console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                            item.customMetadata.profilepic = url;
                            store.push(item.customMetadata);
                            resolve();
                        }).catch(function (e) {
                            console.log("in caught url !!!!!!!$$$$$$$!!");
                            item.customMetadata.profilepic = 'assets/blankprof.png';
                            store.push(item.customMetadata);
                            resolve();
                        });
                        //this.startAtKey = item.$key;
                    });
                });
                _this.startAtKey1 = items[0].$key;
                _this.lastKey1 = _this.startAtKey1;
                var results = Promise.all(mapped);
                results.then(function () {
                    //setTimeout(() => {
                    console.log(JSON.stringify(_this.productListArray) + " value value vlaue productlistarray");
                    _this.productListArray = store.reverse();
                    resolve();
                    //return this.cache.saveItem(cacheKey, this.productListArray);
                    //}, 3000);
                });
            });
            /*}).then(data => {
              console.log("Saved data: ", data);
              this.productListArray = data;
              resolve();
            })*/
        });
    };
    FeedStylist.prototype.listFormulas = function () {
        var _this = this;
        var cacheKey = 'formulas';
        var promises_array = [];
        return new Promise(function (resolve, reject) {
            var mapped;
            //this.cache.getItem(cacheKey).catch(() => {
            var store = [];
            _this.formulas = _this.af.list('/formulas', { query: {
                    limitToLast: 10
                } });
            _this.subscription8 = _this.formulas.subscribe(function (items) {
                mapped = items.map(function (item) {
                    console.log(JSON.stringify(item) + "       item being mapped");
                    return new Promise(function (resolve, reject) {
                        var storageRef = firebase.storage().ref().child('/settings/' + item.username + '/profilepicture.png');
                        console.log("postdate *** post : " + item.postdate);
                        storageRef.getDownloadURL().then(function (url) {
                            console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                            item.profilepic = url;
                            store.push(item);
                            resolve();
                        }).catch(function (e) {
                            console.log("in caught url !!!!!!!$$$$$$$!!");
                            item.profilepic = 'assets/blankprof.png';
                            store.push(item);
                            resolve();
                        });
                        //this.startAtKey = item.$key;
                    });
                });
                _this.startAtKey2 = items[0].$key;
                _this.lastKey2 = _this.startAtKey2;
                Promise.all(mapped).then(function () {
                    //setTimeout(() => {
                    _this.formulaListArray = store.reverse();
                    console.log(JSON.stringify(_this.formulaListArray) + " value value vlaue productlistarray");
                    //return this.cache.saveItem(cacheKey, this.formulaListArray);
                    resolve();
                    //}, 3000);
                });
            });
            /*}).then(data => {
              console.log("Saved data: ", data);
              this.formulaListArray = data;
              resolve();
            })*/
        });
    };
    /*listFormulas(): Promise<any> {
      let cacheKey = 'formulas';
      this.cache.removeItem(cacheKey);
      let promises_array:Array<any> = [];
  
      return new Promise((resolve, reject) => {
        let mapped;
  
        this.cache.getItem(cacheKey).catch(() => {
          
          this.formulas = this.af.list('/formulas');
  
          this.subscription8 = this.formulas.subscribe(items => {
            mapped = items.map((item) => {
              return new Promise((resolve,reject) => {
                let storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                    
                storageRef.getDownloadURL().then(url => {
                  console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                  item.customMetadata.profilepic = url;
                }).catch((e) => {
                  console.log("in caught url !!!!!!!$$$$$$$!!");
                  item.customMetadata.profilepic = 'assets/blankprof.png';
                });
  
                console.log("item item ----- " + JSON.stringify(item));
                this.formulaListArray.push(item.customMetadata);
              })
            });
           })
          let results = Promise.all(mapped);
          results.then(() => {
          //setTimeout(() => {
            console.log(JSON.stringify(this.formulaListArray) + " value value vlaue productlistarray");
            this.formulaListArray.reverse();
            return this.cache.saveItem(cacheKey, this.formulaListArray);
          //}, 3000);
        
          })
        }).then(data => {
          console.log("Saved data: ", data);
          resolve();
        })
      })
    }*/
    FeedStylist.prototype.listAll = function () {
        console.log("in listall");
        this.items.push.apply(this.items, this.formulaListArray);
        this.items.push.apply(this.items, this.productListArray);
        this.items.push.apply(this.items, this.classesListArray);
        this.items.sort(function (a, b) {
            return b.postdate - a.postdate;
        });
        console.log(JSON.stringify(this.items) + " this.items.sort after 999999");
    };
    FeedStylist.prototype.ngOnDestroy = function () {
        if (this.subscription3 != null) {
            this.subscription3.unsubscribe();
        }
        if (this.subscription4 != null) {
            this.subscription4.unsubscribe();
        }
        if (this.subscription5 != null) {
            this.subscription5.unsubscribe();
        }
        if (this.subscription6 != null) {
            this.subscription6.unsubscribe();
        }
        if (this.subscription7 != null) {
            this.subscription7.unsubscribe();
        }
        if (this.subscription8 != null) {
            this.subscription8.unsubscribe();
        }
        if (this.subscription11 != null) {
            this.subscription11.unsubscribe();
        }
    };
    FeedStylist.prototype.doInfinite = function () {
        console.log('Begin async operation');
        return new Promise(function (resolve) {
            /*let data = new URLSearchParams();
            data.append('page', this.totalCount.toString());*/
            resolve();
            /*this.http
              .post('http://192.168.1.131:8888/maneappback/more-items.php', data)
                .subscribe(res => {
                  //console.log(JSON.stringify(res));
                  //let response = JSON.stringify(res);
                    if(res.json()[0] == "0 results") {
                      console.log('Async operation has ended');
                      //infiniteScroll.complete();
                      resolve();
                      return;
                    }
                    else {
                      for(let i=0; i<res.json().length - 1; i++) {
                        this.totalCount+=1;
                        console.log('items get pushed in more &&&*&**&&*&* \n\n\n\n\n\n\n');
                        this.items.push(res.json()[i]);
                      };
                      console.log('Async operation has ended');
                      //infiniteScroll.complete();
                      resolve();
                    }
                    console.log(this.totalCount + ': totalCount!!!!!!');
                }, error => {
                    console.log(error.json());
                });*/
        });
    };
    FeedStylist.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
            //let element = this.clickme._elementRef.nativeElement;
            //console.log(element);
            //element.style.cssText = "position: fixed; z-index: 99; left: 0; top: 0"; 
        }, 700);
        /*let data = new URLSearchParams();
        data.append('page', this.totalCount.toString());
        data.append('lastNumRows', this.lastNumRows.toString());
    
        console.log("constructed");
    
        this.http
          .post('http://192.168.1.131:8888/maneappback/more-items-refresher.php', data)
            .subscribe(res => {
              console.log('getInitialImages completed ***********');
    
              if(res.json()[0] == "0 results") {
                console.log('Async operation has ended');
                refresher.complete();
                //infiniteScroll.complete();
                return;
              }
    
              for(let i=0; i<res.json().length - 1; i++) {
                this.totalCount+=1;
                this.items.unshift(res.json()[i]);
                console.log('this.items is pushed.....');
              };
    
              this.lastNumRows = res.json()[res.json().length - 1];
              console.log('Async operation has ended');
              refresher.complete();
            }, error => {
              console.log(JSON.stringify(error));
              console.log('Async operation has ended');
              refresher.complete();
            });*/
    };
    __decorate([
        ViewChildren('feedstyle'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "components", void 0);
    __decorate([
        ViewChildren('flex'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "flexComponents", void 0);
    __decorate([
        ViewChildren('feedtop'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedComponents", void 0);
    __decorate([
        ViewChildren('imagepost'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "imageComponents", void 0);
    __decorate([
        ViewChildren('caption'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "captionComponents", void 0);
    __decorate([
        ViewChildren('allF'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "allFeed", void 0);
    __decorate([
        ViewChildren('productsFeed'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "productsF", void 0);
    __decorate([
        ViewChildren('classesFeed'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "classesF", void 0);
    __decorate([
        ViewChildren('formulasFeed'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "formulasF", void 0);
    __decorate([
        ViewChild('contentone'),
        __metadata("design:type", ElementRef)
    ], FeedStylist.prototype, "contentOne", void 0);
    __decorate([
        ViewChild('classeslist'),
        __metadata("design:type", ElementRef)
    ], FeedStylist.prototype, "classeslist", void 0);
    __decorate([
        ViewChild('formulaslist'),
        __metadata("design:type", ElementRef)
    ], FeedStylist.prototype, "formulaslist", void 0);
    __decorate([
        ViewChild('swiper'),
        __metadata("design:type", Object)
    ], FeedStylist.prototype, "swiperEl", void 0);
    __decorate([
        ViewChild('productslist'),
        __metadata("design:type", ElementRef)
    ], FeedStylist.prototype, "productslist", void 0);
    __decorate([
        ViewChildren('adimage'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "adImage", void 0);
    __decorate([
        ViewChild('slides'),
        __metadata("design:type", Slides)
    ], FeedStylist.prototype, "slidess", void 0);
    __decorate([
        ViewChild('slides2'),
        __metadata("design:type", Slides)
    ], FeedStylist.prototype, "slidess2", void 0);
    __decorate([
        ViewChildren('feedtoptwo'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedTopTwoComponents", void 0);
    __decorate([
        ViewChildren('feedstyle2'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "components2", void 0);
    __decorate([
        ViewChildren('flex2'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "flexComponents2", void 0);
    __decorate([
        ViewChildren('feedtop2'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedComponents2", void 0);
    __decorate([
        ViewChildren('feedtop2two'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedTop22Components", void 0);
    __decorate([
        ViewChildren('imagepost2'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "imageComponents2", void 0);
    __decorate([
        ViewChildren('caption2'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "captionComponents2", void 0);
    __decorate([
        ViewChildren('feedstyle3'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "components3", void 0);
    __decorate([
        ViewChildren('flex3'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "flexComponents3", void 0);
    __decorate([
        ViewChildren('feedtop3'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedComponents3", void 0);
    __decorate([
        ViewChildren('feedtop3two'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedTop32Components", void 0);
    __decorate([
        ViewChildren('imagepost3'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "imageComponents3", void 0);
    __decorate([
        ViewChildren('caption3'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "captionComponents3", void 0);
    __decorate([
        ViewChildren('feedstyle4'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "components4", void 0);
    __decorate([
        ViewChildren('flex4'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "flexComponents4", void 0);
    __decorate([
        ViewChildren('feedtop4'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedComponents4", void 0);
    __decorate([
        ViewChildren('feedtop4two'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedTop42Components", void 0);
    __decorate([
        ViewChildren('imagepost4'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "imageComponents4", void 0);
    __decorate([
        ViewChildren('caption4'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "captionComponents4", void 0);
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], FeedStylist.prototype, "content", void 0);
    FeedStylist = __decorate([
        Component({
            selector: 'page-feed-stylist',
            templateUrl: 'feedstylist.html',
            animations: [
                trigger('slideDown', [
                    state('down', style({
                        height: '250px',
                    })),
                    state('notDown', style({
                        height: '88px',
                    })),
                    transition('* => *', animate('400ms ease-in')),
                ]),
                trigger('moveList', [
                    state('down', style({
                        top: 82 + "px",
                    })),
                    state('up', style({
                        top: 0 + "px",
                    })),
                    transition('* => *', animate('400ms ease-in')),
                ]),
                trigger('toolSlide', [
                    state('down', style({
                        top: '0px'
                    })),
                    state('up', style({
                        top: '0px'
                    })),
                    transition('* => *', animate('400ms ease-in')),
                ]),
                trigger('plusSlide', [
                    state('down', style({
                        top: '205px'
                    })),
                    state('notDown', style({
                        top: '50px'
                    })),
                    transition('* => *', animate('400ms ease-in')),
                ]),
            ]
        }),
        __metadata("design:paramtypes", [ModalController, SMS, CacheService, DatePicker, Storage, Platform, AngularFireDatabase, ElementRef, Camera, App, CameraServicePost, ActionSheetController, Renderer, LoadingController, NavController])
    ], FeedStylist);
    return FeedStylist;
}());
export { FeedStylist };
//# sourceMappingURL=feedstylist.js.map