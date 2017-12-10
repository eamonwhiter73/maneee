var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Renderer, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { ActionSheetController, LoadingController } from 'ionic-angular';
import { CameraServiceProfile } from '../../services/cameraserviceprofile';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { FeedStylist } from '../feedstylist/feedstylist';
import { FeedUser } from '../feeduser/feeduser';
import { SignInPage } from '../signin/signin';
import { UserViewProfile } from '../userviewprofile/userviewprofile';
import { FormulasPage } from '../formulas/formulas';
import { MapPage } from '../map/map';
import { Facebook } from '@ionic-native/facebook';
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SettingsPage = /** @class */ (function () {
    function SettingsPage(facebook, af, afAuth, storage, camera, cameraService, myrenderer, loadingController, actionSheetCtrl, navCtrl, navParams, keyboard) {
        this.facebook = facebook;
        this.af = af;
        this.afAuth = afAuth;
        this.storage = storage;
        this.camera = camera;
        this.cameraService = cameraService;
        this.myrenderer = myrenderer;
        this.loadingController = loadingController;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.keyboard = keyboard;
        this.user = {};
        this.priceRanges = ['<100', '100-149', '150-199', '200-249', '250-300'];
        this.loggedIn = false;
        this.linked = "Link Profile";
        this.merchantid = "";
        this.publickey = "";
        this.privatekey = "";
        this.optionsGetMedia = {
            allowEdit: false,
            quality: 10,
            targetWidth: 600,
            targetHeight: 600,
            encodingType: this.camera.EncodingType.PNG,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            mediaType: this.camera.MediaType.PICTURE,
            destinationType: this.camera.DestinationType.FILE_URI
        };
        this.optionsGetCamera = {
            quality: 10,
            targetWidth: 600,
            targetHeight: 600,
            encodingType: this.camera.EncodingType.PNG,
            sourceType: this.camera.PictureSourceType.CAMERA,
            mediaType: this.camera.MediaType.PICTURE,
            destinationType: this.camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true
        };
    }
    SettingsPage.prototype.formulas = function () {
        this.navCtrl.push(FormulasPage);
    };
    SettingsPage.prototype.linkProfile = function () {
        var _this = this;
        if (this.linked == "Link Profile") {
            if (this.type == 'stylist' || this.type == 'user/stylist/stylist') {
                this.facebook.login(['email', 'public_profile']).then(function (response) {
                    _this.facebook.api('me?fields=id', []).then(function (profile) {
                        console.log(JSON.stringify(profile));
                        _this.facebookURL = "http://www.facebook.com/" + profile['id'];
                        _this.storage.set('fblinkedstylist', true);
                        _this.linked = "Linked";
                        alert("You must press SAVE to finalize the link.");
                        //this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
                    });
                });
            }
            else if (this.type == 'user' || this.type == 'user/stylist/user') {
                this.facebook.login(['email', 'public_profile']).then(function (response) {
                    _this.facebook.api('me?fields=id', []).then(function (profile) {
                        console.log(JSON.stringify(profile));
                        _this.facebookURL = "http://www.facebook.com/" + profile['id'];
                        _this.storage.set('fblinkeduser', true);
                        _this.linked = "Linked";
                        alert("You must press SAVE to finalize the link.");
                        //this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
                    });
                });
            }
        }
        ;
    };
    SettingsPage.prototype.changeShape = function (shape) {
        console.log(shape.value);
        this.price = shape.value;
    };
    SettingsPage.prototype.tappedToggle = function () {
        console.log(this.locationtoggle + "          3344343 locationtoggle");
        if (this.locationtoggle == true) {
            this.af.object('/profiles/users/' + this.username + '/location').remove().then(function (_) { return console.log('item deleted!'); });
        }
        this.storage.set('location', this.locationtoggle);
    };
    SettingsPage.prototype.goToProfile = function () {
        if (this.type == 'stylist' || this.type == 'user/stylist/stylist') {
            this.navCtrl.pop();
        }
        if (this.type == 'user' || this.type == 'user/stylist/user') {
            this.navCtrl.pop();
        }
    };
    SettingsPage.prototype.map = function () {
        this.navCtrl.push(MapPage);
    };
    SettingsPage.prototype.logForm = function () {
        var _this = this;
        console.log("        ADDDDREESSSSS77777777:  " + this.address); //moved up here!
        /*if(this.type == 'user' || this.type == 'user/stylist/user') {
     
           if(this.username == null || this.password == null || this.email == null || this.bio == null) {
             alert("You need to fill out all of the information");
           }
         }*/
        this.subscription3 = this.afAuth.authState.subscribe(function (data) {
            console.log(data + "    data from login");
            if (data != null) {
                if (data.email && data.uid) {
                    console.log("logged in");
                    _this.authUser = data;
                    _this.loggedIn = true;
                }
            }
        });
        console.log(this.authUser + '      authuser       998877');
        this.x = 0;
        console.log(this.passwordIfChanged + "  passwordifchanged                  this.password: " + this.password);
        console.log(this.emailIfChanged + "  passwordifchanged                  this.password: " + this.email);
        this.storage.set('username', this.username);
        if (this.passwordIfChanged != this.password && this.authUser != null) {
            this.authUser.updatePassword(this.password).then(function () { }).catch(function (e) { alert(e); });
        }
        /*else {
          this.password = this.passwordIfChanged;
          alert("You are not logged in yet, you cannot update your password or email.")
        }*/
        this.storage.set('password', this.password);
        if (this.emailIfChanged != this.email && this.authUser != null) {
            this.authUser.updateEmail(this.email).then(function () { }).catch(function (e) { alert(e); });
        }
        /*else {
          this.email = this.emailIfChanged;
          alert("You are not logged in yet, you cannot update your password or email.")
        }*/
        this.storage.set('email', this.email);
        this.storage.set('bio', this.bio);
        this.storage.set('picURL', this.picURL);
        this.storage.set('phone', this.phone);
        this.storage.set('instausername', this.instagramURL);
        if (this.facebookURL == null) {
            this.facebookURL = "";
        }
        //this.storage.get('type').then((val) => {
        if (this.type == 'stylist' || this.type == 'user/stylist/stylist') {
            if (this.username == '' || this.password == '' || this.email == '' || this.bio == '' || this.price == '' || this.merchantId == '' || this.publicKey == '' || this.privateKey == '') {
                alert("You need to fill out all of the information");
            }
            else if (this.phone.match(/\d/g).length !== 10) {
                alert("Please enter a 10 digit phone number, only the digits.");
            }
            else if (this.address.split(' ').length != 5 || this.address.split(' ').length != 6) {
                alert("Please enter a valid address. ex: 99 main st cambridge ma");
            }
            else {
                this.storage.set('address', this.address);
                this.storage.set('price', this.price);
                this.storage.set('merchantid', this.merchantid);
                this.storage.set('publickey', this.publickey);
                this.storage.set('privatekey', this.privatekey);
                if (this.price == "<100") {
                    this.price = "$";
                }
                else if (this.price == "100-149") {
                    this.price = "$$";
                }
                else if (this.price == "150-199") {
                    this.price = "$$$";
                }
                else if (this.price == "200-249") {
                    this.price = "$$$$";
                }
                else if (this.price == "250-300") {
                    this.price = "$$$$$";
                }
                this.items = this.af.list('/profiles/stylists');
                if (this.username == this.oldUser) {
                    this.items.update(this.username, { 'username': this.username, 'password': this.password, 'email': this.email,
                        'address': this.address, 'bio': this.bio, 'price': this.price, 'picURL': this.picURL, 'phone': this.phone,
                        'facebookURL': this.facebookURL, 'instagramURL': "http://www.instagram.com/" + this.instagramURL,
                        'merchantid': this.merchantid, 'publickey': this.publickey, 'privatekey': this.privatekey });
                    if (this.isTypeNull == null) {
                        this.navCtrl.push(StylistProfile);
                    }
                    else {
                        this.navCtrl.setRoot(FeedStylist);
                    }
                }
                else {
                    this.af.object('/profiles/stylists/' + this.oldUser).remove().then(function (_) { return console.log('item deleted!'); });
                    this.items.update(this.username, { 'username': this.username, 'password': this.password, 'email': this.email,
                        'address': this.address, 'bio': this.bio, 'price': this.price, 'picURL': this.picURL, 'phone': this.phone,
                        'facebookURL': this.facebookURL, 'instagramURL': "http://www.instagram.com/" + this.instagramURL,
                        'merchantid': this.merchantid, 'publickey': this.publickey, 'privatekey': this.privatekey,
                        'rating': { 'one': 0, 'two': 0, 'three': 0, 'four': 0, 'five': 0 } });
                    if (this.isTypeNull == null) {
                        this.navCtrl.push(StylistProfile);
                    }
                    else {
                        this.navCtrl.setRoot(FeedStylist);
                    }
                }
            }
        }
        if (this.type == 'user' || this.type == 'user/stylist/user') {
            if (this.username == '' || this.password == '' || this.email == '' || this.bio == '') {
                alert("You need to fill out all of the information");
            }
            else if (this.phone.match(/\d/g).length !== 10) {
                alert("Please enter a 10 digit phone number, only the digits.");
            }
            else {
                this.items = this.af.list('/profiles/users');
                if (this.username == this.oldUser) {
                    this.items.update(this.username, { 'username': this.username, 'password': this.password, 'email': this.email,
                        'bio': this.bio, 'picURL': this.picURL, 'phone': this.phone, 'facebookURL': this.facebookURL, 'instagramURL': "http://www.instagram.com/" + this.instagramURL });
                    if (this.isTypeNull == null) {
                        this.navCtrl.push(UserViewProfile);
                    }
                    else {
                        this.navCtrl.setRoot(FeedUser);
                    }
                }
                else {
                    this.af.object('/profiles/users/' + this.oldUser).remove().then(function (_) { return console.log('item deleted!'); });
                    this.items.update(this.username, { 'username': this.username, 'password': this.password, 'email': this.email,
                        'bio': this.bio, 'picURL': this.picURL, 'phone': this.phone, 'facebookURL': this.facebookURL, 'instagramURL': "http://www.instagram.com/" + this.instagramURL,
                        'rating': { 'one': 0, 'two': 0, 'three': 0, 'four': 0, 'five': 0 } });
                    if (this.isTypeNull == null) {
                        this.navCtrl.push(UserViewProfile);
                    }
                    else {
                        this.navCtrl.setRoot(FeedUser);
                    }
                }
            }
        }
        ;
        //})
    };
    SettingsPage.prototype.logout = function () {
        if (this.loggedIn) {
            console.log("being logged out ()()()()ER()EW()RWE()()REW()");
            this.afAuth.auth.signOut();
            this.storage.set('loggedin', false);
        }
        else {
            this.storage.set('loggedin', false);
        }
        this.navCtrl.push(SignInPage);
    };
    SettingsPage.prototype.ngOnDestroy = function () {
        if (this.subscription3 != null) {
            this.subscription3.unsubscribe();
        }
    };
    SettingsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('type').then(function (val) {
            _this.type = val;
            console.log(_this.typeparam + '       this.typeparam       ');
            console.log(_this.logoutButton + '       this.typeparam       ');
            if (_this.typeparam == 'user') {
                _this.myrenderer.setElementStyle(_this.addressEl._elementRef.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.priceEl._elementRef.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.arrowBackEl.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.logoutButton._elementRef.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.merchantId._elementRef.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.publicKey._elementRef.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.privateKey._elementRef.nativeElement, 'display', 'none');
            }
            if (_this.typeparam == 'user/stylist/user') {
                _this.myrenderer.setElementStyle(_this.addressEl._elementRef.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.priceEl._elementRef.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.arrowBackEl.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.merchantId._elementRef.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.publicKey._elementRef.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.privateKey._elementRef.nativeElement, 'display', 'none');
                //this.myrenderer.setElementStyle(this.logoutButton._elementRef.nativeElement, 'display', 'none');
            }
            else if (_this.type == 'user/stylist/user') {
                _this.myrenderer.setElementStyle(_this.addressEl._elementRef.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.priceEl._elementRef.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.merchantId._elementRef.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.publicKey._elementRef.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.privateKey._elementRef.nativeElement, 'display', 'none');
            }
            else if (_this.typeparam == 'stylist') {
                _this.myrenderer.setElementStyle(_this.arrowBackEl.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.logoutButton._elementRef.nativeElement, 'display', 'none');
                _this.myrenderer.setElementStyle(_this.locationToggle._elementRef.nativeElement, 'display', 'none');
            }
            else if (_this.type == 'user/stylist/stylist') {
                _this.myrenderer.setElementStyle(_this.locationToggle._elementRef.nativeElement, 'display', 'none');
            }
            _this.oldUser = _this.username;
            _this.isTypeNull = _this.navParams.get('type');
            setTimeout(function () {
                console.log('ionViewDidLoad SettingsPage');
                _this.storage.get('username').then(function (val) { _this.username = val; _this.getProfilePic(); console.log(val + "        getting username          3333222222"); });
                _this.storage.get('password').then(function (val) { _this.password = val; _this.passwordIfChanged = _this.password; console.log(val + "        getting password222222"); });
                _this.storage.get('email').then(function (val) { _this.email = val; _this.emailIfChanged = _this.email; console.log(val + "        getting email33333333"); });
                _this.storage.get('bio').then(function (val) { _this.bio = val; console.log(val + "        getting biooooooooo"); });
                _this.storage.get('picURL').then(function (val) { _this.picURL = val; });
                _this.storage.get('phone').then(function (val) { _this.phone = val; });
                _this.storage.get('instausername').then(function (val) { _this.instagramURL = val; });
                if (_this.type == 'stylist' || _this.type == 'user/stylist/stylist') {
                    _this.storage.get('address').then(function (val) { _this.address = val; console.log(val + "        getting addressssssss"); });
                    _this.storage.get('price').then(function (val) { _this.price = val; });
                    _this.storage.get('merchantid').then(function (val) { _this.merchantid = val; });
                    _this.storage.get('publickey').then(function (val) { _this.publickey = val; });
                    _this.storage.get('privatekey').then(function (val) { _this.privatekey = val; });
                    for (var x = 0; x < 5; x++) {
                        if (_this.priceRanges[x] == _this.price) {
                            document.getElementById(x + "").setAttribute('selected', null);
                        }
                    }
                }
            }, 1000);
            if (_this.type == 'user' || _this.type == 'user/stylist/user') {
                _this.storage.get('fblinkeduser').then(function (val) {
                    console.log(val + " val vlal v avlal v allavl val ");
                    console.log(_this.type + " tyope aosefi; fai; sefeji a'aj '' ");
                    if (val) {
                        _this.linked = "Linked";
                    }
                    else {
                        _this.linked = "Link Profile";
                    }
                });
            }
            else if (_this.type == 'stylist' || _this.type == 'user/stylist/stylist') {
                _this.storage.get('fblinkedstylist').then(function (val) {
                    if (val) {
                        _this.linked = "Linked";
                    }
                    else {
                        _this.linked = "Link Profile";
                    }
                });
            }
        });
        this.storage.get('location').then(function (val) {
            _this.locationtoggle = val;
            if (val == true) {
                _this.locationtoggle = false;
            }
            else {
                _this.locationtoggle = true;
            }
            console.log(_this.locationtoggle + "     in view did load locationtoggle");
        });
        this.typeparam = this.navParams.get('type');
    };
    SettingsPage.prototype.getProfilePic = function () {
        var _this = this;
        console.log("inside get profile pic &*&*(&*%^$%$%$%$%$%");
        return new Promise(function (resolve, reject) {
            var storageRef = firebase.storage().ref().child('/settings/' + _this.username + '/profilepicture.png');
            storageRef.getDownloadURL().then(function (url) {
                console.log(url);
                _this.picURL = url;
                _this.myrenderer.setElementAttribute(_this.profilepic.nativeElement, 'src', url);
                resolve();
            }).catch(function (e) {
                console.log(e.message);
            });
        });
    };
    SettingsPage.prototype.goButton = function (code) {
        console.log(code);
        if (code == 13) {
            this.keyboard.close();
        }
    };
    SettingsPage.prototype.change = function () {
        this.presentActionSheet();
    };
    SettingsPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose source',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        _this.cameraService.getMedia(_this.optionsGetCamera, null, _this.username).then(function () {
                            var loading = _this.loadingController.create({ content: "Loading..." });
                            loading.present();
                            return new Promise(function (resolve, reject) {
                                //setTimeout(() => {
                                var storageRef = firebase.storage().ref().child('/settings/' + _this.username + '/profilepicture.png');
                                storageRef.getDownloadURL().then(function (url) {
                                    console.log(url);
                                    _this.picURL = url;
                                    _this.myrenderer.setElementAttribute(_this.profilepic.nativeElement, 'src', url);
                                    loading.dismiss();
                                    resolve();
                                }).catch(function (e) {
                                    alert("Something went wrong with the upload, please try again.");
                                    loading.dismiss();
                                    resolve();
                                });
                                loading.dismiss();
                                //}, 3500);
                            });
                        }); //pass in square choice
                        //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
                        console.log('camera clicked');
                    }
                }, {
                    text: 'Photo Library',
                    handler: function () {
                        _this.cameraService.getMedia(_this.optionsGetMedia, null, _this.username).then(function () {
                            var loading = _this.loadingController.create({ content: "Loading..." });
                            loading.present();
                            return new Promise(function (resolve, reject) {
                                //setTimeout(() => {
                                var storageRef = firebase.storage().ref().child('/settings/' + _this.username + '/profilepicture.png');
                                storageRef.getDownloadURL().then(function (url) {
                                    console.log(url);
                                    _this.picURL = url;
                                    _this.myrenderer.setElementAttribute(_this.profilepic.nativeElement, 'src', url);
                                    loading.dismiss();
                                    resolve();
                                }).catch(function (e) {
                                    alert("Something went wrong with the upload, please try again.");
                                    loading.dismiss();
                                    resolve();
                                });
                                loading.dismiss();
                                //}, 3500);
                            });
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
    __decorate([
        ViewChild('profsquare'),
        __metadata("design:type", ElementRef)
    ], SettingsPage.prototype, "profilepic", void 0);
    __decorate([
        ViewChild('addressEl'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "addressEl", void 0);
    __decorate([
        ViewChild('priceEl'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "priceEl", void 0);
    __decorate([
        ViewChild('arrowback'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "arrowBackEl", void 0);
    __decorate([
        ViewChild('logoutbutton'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "logoutButton", void 0);
    __decorate([
        ViewChild('locationToggle'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "locationToggle", void 0);
    __decorate([
        ViewChild('merchantId'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "merchantId", void 0);
    __decorate([
        ViewChild('publicKey'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "publicKey", void 0);
    __decorate([
        ViewChild('privateKey'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "privateKey", void 0);
    SettingsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-settings',
            templateUrl: 'settings.html',
        }),
        __metadata("design:paramtypes", [Facebook, AngularFireDatabase, AngularFireAuth, Storage, Camera, CameraServiceProfile, Renderer, LoadingController, ActionSheetController, NavController, NavParams, Keyboard])
    ], SettingsPage);
    return SettingsPage;
}());
export { SettingsPage };
//# sourceMappingURL=settings.js.map