var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { CameraServicePost } from '../../services/cameraservicepost';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the PostpagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PostpagePage = /** @class */ (function () {
    function PostpagePage(cameraServicePost, actionSheetCtrl, camera, af, viewCtrl, storage, keyboard, datePicker, myrenderer, navCtrl, navParams) {
        this.cameraServicePost = cameraServicePost;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.af = af;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.keyboard = keyboard;
        this.datePicker = datePicker;
        this.myrenderer = myrenderer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.item = { 'date': null, 'title': 'asdfasdf', 'price': '44', 'caption': 'asdfasdfasdfasdf', 'typeofselect': 'Post' };
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
    }
    PostpagePage.prototype.typeChanged = function (event) {
        console.log(event + "   event event event");
        if (this.item.typeofselect == "Class") {
            this.myrenderer.setElementStyle(this.price.nativeElement, 'display', 'none');
            this.myrenderer.setElementStyle(this.date.nativeElement, 'display', 'block');
            this.myrenderer.setElementStyle(this.imagesquare.nativeElement, 'display', 'block');
            this.myrenderer.setElementStyle(this.title.nativeElement, 'display', 'block');
        }
        else if (this.item.typeofselect == "Product") {
            this.myrenderer.setElementStyle(this.price.nativeElement, 'display', 'block');
            this.myrenderer.setElementStyle(this.date.nativeElement, 'display', 'none');
            this.myrenderer.setElementStyle(this.imagesquare.nativeElement, 'display', 'block');
            this.myrenderer.setElementStyle(this.title.nativeElement, 'display', 'block');
        }
        else if (this.item.typeofselect == "Post") {
            this.myrenderer.setElementStyle(this.price.nativeElement, 'display', 'none');
            this.myrenderer.setElementStyle(this.date.nativeElement, 'display', 'none');
            this.myrenderer.setElementStyle(this.imagesquare.nativeElement, 'display', 'block');
            this.myrenderer.setElementStyle(this.title.nativeElement, 'display', 'block');
        }
        else if (this.item.typeofselect == "Promo") {
            this.myrenderer.setElementStyle(this.price.nativeElement, 'display', 'none');
            this.myrenderer.setElementStyle(this.date.nativeElement, 'display', 'none');
            this.myrenderer.setElementStyle(this.imagesquare.nativeElement, 'display', 'none');
            this.myrenderer.setElementStyle(this.title.nativeElement, 'display', 'block');
        }
        else if (this.item.typeofselect == "Formula") {
            this.myrenderer.setElementStyle(this.price.nativeElement, 'display', 'none');
            this.myrenderer.setElementStyle(this.date.nativeElement, 'display', 'none');
            this.myrenderer.setElementStyle(this.imagesquare.nativeElement, 'display', 'block');
            this.myrenderer.setElementStyle(this.title.nativeElement, 'display', 'none');
        }
    };
    PostpagePage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose source',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        //let itemArrayTwo = this.profComponents.toArray();
                        _this.cameraServicePost.getMedia(_this.optionsGetCamera).then(function (data) {
                            _this.image.nativeElement.src = data;
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
                            _this.image.nativeElement.src = data;
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
    PostpagePage.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.subscription2.unsubscribe();
    };
    PostpagePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.myrenderer.setElementStyle(this.price.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.date.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.imagesquare.nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(this.title.nativeElement, 'display', 'block');
        this.imageHolder = this.navParams.get("path");
        console.log(this.imageHolder + " imageholder imagehodl a pefsj'aes");
        this.myrenderer.setElementAttribute(this.image.nativeElement, 'src', this.imageHolder);
        this.subscription = this.keyboard.onKeyboardShow().subscribe(function () {
            _this.myrenderer.setElementStyle(_this.share.getNativeElement(), 'bottom', '-150px');
        });
        this.subscription2 = this.keyboard.onKeyboardHide().subscribe(function () {
            console.log("keyboard being hid **&^&^&^&^&^&");
            console.log(_this.share.getNativeElement() + " * f8d fd8 f8df8 fd8 f8d 8f fd8 8 fd");
            _this.myrenderer.setElementStyle(_this.share.getNativeElement(), 'bottom', '0');
        });
        this.storage.get('username').then(function (val) { _this.username = val; console.log(val + "        getting username"); });
    };
    PostpagePage.prototype.goToFeed = function () {
        this.navCtrl.pop();
    };
    PostpagePage.prototype.showDatePicker = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(function (date) { console.log(date + " this is the date &&&&&&&"); _this.item.date = date; }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    PostpagePage.prototype.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [day, month, year].join('-');
    };
    PostpagePage.prototype.isPromo = function () {
        var metadata = {
            customMetadata: {
                'title': this.item.title,
                'caption': this.item.caption,
                //'price': this.item.price,
                //'date': this.item.date,
                'typeofselect': this.item.typeofselect,
                'username': this.username,
                'postdate': Date.now()
            }
        };
        this.list = this.af.list('/promotions');
        this.list.push(metadata);
    };
    PostpagePage.prototype.isPost = function () {
        var _this = this;
        var image = 'promo_' + this.username + '_' + new Date() + '.png', storageRef, parseUpload;
        return new Promise(function (resolve, reject) {
            storageRef = firebase.storage().ref('/promos/' + image);
            parseUpload = storageRef.putString(_this.image.nativeElement.src, 'data_url');
            parseUpload.on('state_changed', function (_snapshot) {
                // We could log the progress here IF necessary
                console.log('snapshot progess ' + _snapshot);
            }, function (_err) {
                reject(_err);
                console.log(_err.messsage);
            }, function (success) {
                resolve(parseUpload.snapshot);
            });
        }).then(function (value) {
            console.log("storing post post post &&&&&&&");
            storageRef.getDownloadURL()
                .then(function (url) {
                var metadata = {
                    customMetadata: {
                        'title': _this.item.title,
                        'caption': _this.item.caption,
                        //'price': this.item.price,
                        //'date': this.item.date,
                        'typeofselect': _this.item.typeofselect,
                        'username': _this.username,
                        'url': url,
                        'postdate': Date.now()
                    }
                };
                _this.list = _this.af.list('/promos');
                _this.list.push(metadata);
            });
        }).catch(function (error) {
            console.log(error.message);
        });
    };
    PostpagePage.prototype.isClass = function () {
        var _this = this;
        if (!this.item.date) {
            alert("Please select a date for your class");
        }
        else {
            var image_1 = 'class_' + this.username + '_' + new Date() + '.png', storageRef_1, parseUpload_1;
            return new Promise(function (resolve, reject) {
                storageRef_1 = firebase.storage().ref('/classes/' + image_1);
                parseUpload_1 = storageRef_1.putString(_this.image.nativeElement.src, 'data_url');
                parseUpload_1.on('state_changed', function (_snapshot) {
                    // We could log the progress here IF necessary
                    console.log('snapshot progess ' + _snapshot);
                }, function (_err) {
                    reject(_err);
                    console.log(_err.messsage);
                }, function (success) {
                    resolve(parseUpload_1.snapshot);
                });
            }).then(function (value) {
                storageRef_1.getDownloadURL()
                    .then(function (url) {
                    var metadata = {
                        customMetadata: {
                            'title': _this.item.title,
                            'caption': _this.item.caption,
                            //'price': this.item.price,
                            //'date': this.formatDate(this.item.date),
                            'typeofselect': _this.item.typeofselect,
                            'username': _this.username,
                            'url': url,
                            'postdate': Date.now()
                        }
                    };
                    _this.list = _this.af.list('/classes');
                    _this.list.push(metadata);
                });
            }).catch(function (error) {
                console.log(error.message);
            });
        }
    };
    PostpagePage.prototype.isProduct = function () {
        var _this = this;
        var image = 'product_' + this.username + '_' + new Date() + '.png', storageRef, parseUpload;
        return new Promise(function (resolve, reject) {
            storageRef = firebase.storage().ref('/products/' + image);
            parseUpload = storageRef.putString(_this.imageHolder, 'data_url');
            parseUpload.on('state_changed', function (_snapshot) {
                // We could log the progress here IF necessary
                console.log('snapshot progess ' + _snapshot);
            }, function (_err) {
                reject(_err);
                console.log(_err.messsage);
            }, function (success) {
                resolve(parseUpload.snapshot);
            });
        }).then(function (value) {
            storageRef.getDownloadURL()
                .then(function (url) {
                var metadata = {
                    customMetadata: {
                        'title': _this.item.title,
                        'caption': _this.item.caption,
                        'price': _this.item.price,
                        //'date': this.item.date,
                        'typeofselect': _this.item.typeofselect,
                        'username': _this.username,
                        'url': url,
                        'postdate': Date.now()
                    }
                };
                _this.list = _this.af.list('/products');
                _this.list.push(metadata);
            });
        }).catch(function (error) {
            console.log(error.message);
        });
    };
    PostpagePage.prototype.isFormula = function () {
        var metadata = {
            'formula': this.item.caption,
            'price': '3',
            'username': this.username,
            'url': this.image.nativeElement.src,
            'postdate': Date.now(),
            'square': '0'
        };
        var self = this;
        var database = firebase.database();
        var bool = false;
        firebase.database().ref('/formulas').push(metadata);
    };
    PostpagePage.prototype.shareItem = function () {
        console.log(this.item.title);
        console.log(this.item.caption);
        console.log(this.item.price);
        console.log(this.item.date);
        console.log(this.imageHolder + "                    **************************** src ****************");
        console.log("****&*&&*&*&*&*&*          " + this.item.typeofselect);
        if (this.item.typeofselect == "Post") {
            if (this.item.title == '' || this.item.caption == '' || this.image.nativeElement.src == null) {
                alert("You need to fill in all of the information");
            }
            else {
                this.isPost();
                this.navCtrl.popToRoot();
            }
        }
        else if (this.item.typeofselect == 'Formula') {
            if (this.item.caption == '' || this.image.nativeElement.src == null) {
                alert("You need to fill in all of the information");
            }
            else {
                this.isFormula();
                this.navCtrl.popToRoot();
            }
        }
        else if (this.item.typeofselect == 'Class') {
            if (this.item.title == '' || this.item.caption == '' || this.image.nativeElement.src == null || this.item.date == '') {
                alert("You need to fill in all of the information");
            }
            else {
                this.isClass();
                this.navCtrl.popToRoot();
            }
        }
        else if (this.item.typeofselect == 'Product') {
            if (this.item.title == '' || this.item.caption == '' || this.image.nativeElement.src == null || this.item.price == '') {
                alert("You need to fill in all of the information");
            }
            else {
                this.isProduct();
                this.navCtrl.popToRoot();
            }
        }
        else if (this.item.typeofselect == 'Promo') {
            if (this.item.title == '' || this.item.caption == '') {
                alert("You need to fill in all of the information");
            }
            else {
                this.isPromo();
                this.navCtrl.popToRoot();
            }
        }
        /*var dataURL = data;
    
        let image       : string  = 'profile_' + this.username + '_' + square + '.png',
          storageRef  : any,
          parseUpload : any;
    
        return new Promise((resolve, reject) => {
          storageRef       = firebase.storage().ref('/profile/' + this.username + '/' + image);
          parseUpload      = storageRef.putString(dataURL, 'data_url');
    
          parseUpload.on('state_changed', (_snapshot) => {
              // We could log the progress here IF necessary
              console.log('snapshot progess ' + _snapshot);
            },
            (_err) => {
               reject(_err);
               console.log(_err.messsage);
            },
            (success) => {
               resolve(parseUpload.snapshot);
            })
          }).then(value => {
            //this.af.list('/profile/' + self.username).push({ pic: image });
          }).catch(function(error) {
            console.log(error.message);
          });*/
    };
    PostpagePage.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        //this.navCtrl.push(SignUpPage);
    };
    __decorate([
        ViewChild('imagey'),
        __metadata("design:type", ElementRef)
    ], PostpagePage.prototype, "image", void 0);
    __decorate([
        ViewChild('price'),
        __metadata("design:type", ElementRef)
    ], PostpagePage.prototype, "price", void 0);
    __decorate([
        ViewChild('date'),
        __metadata("design:type", ElementRef)
    ], PostpagePage.prototype, "date", void 0);
    __decorate([
        ViewChild('imageholder'),
        __metadata("design:type", ElementRef)
    ], PostpagePage.prototype, "imagesquare", void 0);
    __decorate([
        ViewChild('title'),
        __metadata("design:type", ElementRef)
    ], PostpagePage.prototype, "title", void 0);
    __decorate([
        ViewChild('sharer'),
        __metadata("design:type", Object)
    ], PostpagePage.prototype, "share", void 0);
    PostpagePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-postpage',
            templateUrl: 'postpage.html'
        }),
        __metadata("design:paramtypes", [CameraServicePost, ActionSheetController, Camera, AngularFireDatabase, ViewController, Storage, Keyboard, DatePicker, Renderer, NavController, NavParams])
    ], PostpagePage);
    return PostpagePage;
}());
export { PostpagePage };
//# sourceMappingURL=postpage.js.map