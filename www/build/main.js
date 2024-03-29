webpackJsonp([11],{

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_transfer__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








//import { Ng2ImgMaxService } from 'ng2-img-max';
//import { Ng2ImgToolsModule } from 'ng2-img-tools'; // <-- import the module

var CameraService = (function () {
    function CameraService(storage, transfer, http, platform, camera, crop, file) {
        var _this = this;
        this.storage = storage;
        this.transfer = transfer;
        this.http = http;
        this.platform = platform;
        this.camera = camera;
        this.crop = crop;
        this.file = file;
        this.http = http;
        this.storage.get('username').then(function (val) { _this.username = val; console.log(val + "        getting username"); });
        //console.log(JSON.stringify(compress));
    }
    CameraService.prototype.getFileEntryRead = function (fileURI, square) {
        var _this = this;
        var fileName = fileURI.substring(fileURI.lastIndexOf("/") + 1, fileURI.length);
        var filePath = fileURI.substring(8, fileURI.lastIndexOf("/"));
        this.file.listDir('file:///', filePath).then(function (files) {
            console.log(fileName);
            for (var i = 0; i < files.length; i++) {
                if (files[i]['name'] == fileName) {
                    _this.readFile(files[i], square);
                }
            }
        }).catch(function (err) {
            console.log(JSON.stringify(err));
        });
    };
    CameraService.prototype.dataURItoBlob = function (dataURI, callback) {
        return new Promise(function (resolve, reject) {
            var byteString = atob(dataURI);
            //console.log(byteString);
            // separate out the mime component
            //let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            // write the ArrayBuffer to a blob, and you're done
            var bb = new Blob([ab], { type: 'image/jpeg' });
            resolve(bb);
        });
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    };
    CameraService.prototype.readFile = function (fileEntry, square) {
        console.log('in readfile');
        var self = this;
        var compressed;
        fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var dataURL = reader.result;
                var image = 'profile_' + self.username + '_' + square + '.png', storageRef, parseUpload;
                return new Promise(function (resolve, reject) {
                    storageRef = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.storage().ref('/profile/' + self.username + '/' + image);
                    parseUpload = storageRef.putString(dataURL, 'data_url');
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
                    //this.af.list('/profile/' + self.username).push({ pic: image });
                }).catch(function (error) {
                    console.log(error.message);
                });
            };
            reader.readAsDataURL(file);
        });
        //self.ng2ImgToolsService.compress([file], 1, false, false).subscribe(result => {
        //console.log(result + "this is result");
        /*var reader = new FileReader();

        reader.onload = (e) => {
          var dataURL = reader.result;

          let image       : string  = 'profile_' + self.username + '_' + square + '.jpg',
            storageRef  : any,
            parseUpload : any;

          return new Promise((resolve, reject) => {
            storageRef       = firebase.storage().ref('/profile/' + self.username + '/' + image);
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
            });
        }

        reader.readAsDataURL(file);*/
        /*}, error => {
            //something went wrong
            console.log(JSON.stringify(error));
            //use result.compressedFile or handle specific error cases individually
        });*/
        /*console.log(JSON.stringify(file));
  
        console.log(file.name + 'filename');
  
        var readerFirst = new FileReader();
  
        readerFirst.onload = (e) => {
          let data = readerFirst.result;
  
          console.log(file.name + "filename in readerfirst");
  
          // Construct a file
          //var newFile = this.file.writeFile(this.file.tempDirectory, file.name, strImage, true);
  
          /**/
        //let f = new File([""], file.name, {type:"image/jpeg", lastModifiedDate: file.lastModifiedDate});
        //readerFirst.readAsDataURL(file);
    };
    ;
    // Return a promise to catch errors while loading image
    CameraService.prototype.getMedia = function (options, square) {
        var _this = this;
        // Get Image from ionic-native's built in camera plugin
        return this.camera.getPicture(options)
            .then(function (fileUri) {
            // op Image, on android this returns something like, '/storage/emulated/0/Android/...'
            // Only giving an android example as ionic-native camera has built in cropping ability
            if (_this.platform.is('ios')) {
                return _this.crop.crop(fileUri, { quality: 2 });
            }
            else if (_this.platform.is('android')) {
                // Modify fileUri format, may not always be necessary
                fileUri = 'file://' + fileUri;
                /* Using cordova-plugin-crop starts here */
                return _this.crop.crop(fileUri, { quality: 2 });
            }
        })
            .then(function (newPath) {
            console.log(newPath);
            if (newPath) {
                var fileName = newPath.substring(newPath.lastIndexOf("/") + 1, newPath.length);
                var filePath = newPath.substring(0, newPath.lastIndexOf("/"));
                _this.file.readAsDataURL(filePath, fileName).then(function (data) {
                    //let strImage = data.replace(/^data:image\/[a-z]+;base64,/, "");
                    //this.file.writeFile(this.file.tempDirectory, "image.jpg", strImage);
                    //let blob = dataURItoBlob(data);
                    //let file
                    //this.getFileEntryRead(this.file.tempDirectory + '/image.jpg', square);
                    var dataURL = data;
                    var image = 'profile_' + _this.username + '_' + square + '.png', storageRef, parseUpload;
                    return new Promise(function (resolve, reject) {
                        storageRef = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.storage().ref('/profile/' + _this.username + '/' + image);
                        parseUpload = storageRef.putString(dataURL, 'data_url');
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
                        //this.af.list('/profile/' + self.username).push({ pic: image });
                    }).catch(function (error) {
                        console.log(error.message);
                    });
                });
            }
        });
    };
    // Return a promise to catch errors while loading image
    CameraService.prototype.getMediaFormulas = function (options, square) {
        var _this = this;
        // Get Image from ionic-native's built in camera plugin
        return this.camera.getPicture(options)
            .then(function (fileUri) {
            // op Image, on android this returns something like, '/storage/emulated/0/Android/...'
            // Only giving an android example as ionic-native camera has built in cropping ability
            if (_this.platform.is('ios')) {
                console.log("in getmediaformulasios");
                return _this.crop.crop(fileUri, { quality: 2 });
            }
            else if (_this.platform.is('android')) {
                // Modify fileUri format, may not always be necessary
                fileUri = 'file://' + fileUri;
                /* Using cordova-plugin-crop starts here */
                return _this.crop.crop(fileUri, { quality: 2 });
            }
        })
            .then(function (newPath) {
            console.log(newPath);
            if (newPath) {
                var fileName = newPath.substring(newPath.lastIndexOf("/") + 1, newPath.length);
                var filePath = newPath.substring(0, newPath.lastIndexOf("/"));
                return _this.file.readAsDataURL(filePath, fileName).then(function (data) {
                    console.log("IN READASDATAURL GETMEDIAFORMULAS");
                    //let strImage = data.replace(/^data:image\/[a-z]+;base64,/, "");
                    //this.file.writeFile(this.file.tempDirectory, "image.jpg", strImage);
                    //let blob = dataURItoBlob(data);
                    //let file
                    //this.getFileEntryRead(this.file.tempDirectory + '/image.jpg', square);
                    var dataURL = data;
                    var image = 'formula_' + _this.username + '_' + square + '.png', storageRef, parseUpload, thisUrl;
                    return new Promise(function (resolve, reject) {
                        storageRef = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.storage().ref('/formulas/' + _this.username + '/' + image);
                        parseUpload = storageRef.putString(dataURL, 'data_url');
                        parseUpload.on('state_changed', function (_snapshot) {
                            // We could log the progress here IF necessary
                            console.log('snapshot progess ' + _snapshot);
                        }, function (_err) {
                            reject(_err);
                            console.log(_err.messsage);
                        }, function (success) {
                            storageRef.getDownloadURL().then(function (url) {
                                console.log(url);
                                thisUrl = url;
                                console.log("IN READASDATAURL GETMEDIAFORMULAS UERLRLRLR");
                                resolve(thisUrl);
                            });
                        });
                    }).catch(function (error) {
                        console.log(error.message);
                    });
                });
            }
            /*let source_img = new Image(300, 300);
    
            source_img.src = newPath;
            //(NOTE: see the examples/js/demo.js file to understand how this object could be a local image
            //from your filesystem using the File API)
    
            //An Integer from 0 to 100
            let quality =  50,
            // output file format (jpg || png)
            output_format = 'jpg',
            //This function returns an Image Object
            snuffle = new Image(300, 300);
            console.log(JSON.stringify(jic));*/
            //snuffle.src = jic.compress(source_img,quality,output_format).src;
            //console.log(snuffle.src);
            //this.getFileEntryRead(newPath, square);
            //return newPath;
        });
    };
    CameraService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_transfer__["a" /* Transfer */], __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__["a" /* Crop */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */]])
    ], CameraService);
    return CameraService;
}());

//# sourceMappingURL=cameraservice.js.map

/***/ }),

/***/ 1197:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(704);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(703);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_signin_signin__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_cache__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__ = __webpack_require__(705);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, cache, screenOrientation) {
        this.screenOrientation = screenOrientation;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_signin_signin__["a" /* SignInPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            statusBar.styleBlackOpaque();
            statusBar.backgroundColorByName('black');
            statusBar.overlaysWebView(false);
            statusBar.isVisible;
            splashScreen.hide();
            cache.setDefaultTTL(60 * 5); //set default cache TTL for 1 hour
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/app/app.html"*/'<ion-nav [root]="rootPage" swipeBackEnabled="true"></ion-nav>\n'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5_ionic_cache__["b" /* CacheService */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__["a" /* ScreenOrientation */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignInPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__feeduser_feeduser__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feedstylist_feedstylist__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_keyboard__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SignInPage = (function () {
    //subscription: ISubscription
    function SignInPage(af, loadingCtrl, storage, afAuth, keyboard, navCtrl) {
        this.af = af;
        this.storage = storage;
        this.afAuth = afAuth;
        this.keyboard = keyboard;
        this.navCtrl = navCtrl;
        this.user = {};
    }
    SignInPage.prototype.ionViewWillUnload = function () {
        //this.navCtrl.pop();
    };
    SignInPage.prototype.ngOnDestroy = function () {
        //if(this.subscription != null) {
        //this.subscription.unsubscribe();
        //}
    };
    SignInPage.prototype.ionViewDidLoad = function () {
        //let loading = this.loadingCtrl.create({content : "Loading..."});
        //loading.present();
        var _this = this;
        this.storage.get('email').then(function (val) {
            _this.email = val;
        });
        this.storage.get('password').then(function (val) {
            _this.password = val;
        });
        this.storage.get('type').then(function (val) {
            _this.type = val;
        });
        this.storage.get('loggedin').then(function (val) {
            console.log(val + " logged innnnnnnn");
            if (val == true) {
                console.log(_this.type + " logged typeeeeee");
                if (_this.type == 'user/stylist/user' || _this.type == 'user') {
                    //loading.dismiss();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__feeduser_feeduser__["a" /* FeedUser */]);
                }
                else if (_this.type == 'user/stylist/stylist' || _this.type == 'stylist') {
                    //loading.dismiss();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__feedstylist_feedstylist__["a" /* FeedStylist */]);
                }
            }
            else {
                console.log("Val == false......");
            }
        });
    };
    SignInPage.prototype.selectOneStylist = function () {
        console.log("in select one stylist");
        if (this.users) {
            this.users = false;
        }
    };
    SignInPage.prototype.selectOneUser = function () {
        if (this.stylist) {
            this.stylist = false;
        }
    };
    SignInPage.prototype.goButton = function (code) {
        console.log(code);
        if (code == 13) {
            this.keyboard.close();
        }
    };
    SignInPage.prototype.login = function (userx) {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        /**/
        var _this = this;
        if (!userx.email || !userx.password) {
            alert("You need to enter an email and password");
        }
        else if (this.stylist && this.type == 'user') {
            alert("You do not have a stylist account, you can add one using the signup page");
        }
        else if (this.users && this.type == 'stylist') {
            alert("You do not have a user account, you can add one using the signup page");
        }
        else if (!this.users && !this.stylist) {
            alert('You need to select "Hair Stylist" or "User"');
        }
        else {
            this.afAuth.auth.signInWithEmailAndPassword(userx.email, userx.password).then(function (data) {
                console.log(data);
                if (data.email && data.uid) {
                    if (_this.stylist) {
                        console.log("chose stylist");
                        _this.storage.set('type', 'user/stylist/stylist');
                        _this.storage.set('loggedin', true);
                        var database = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.database();
                        var reff = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.database().ref('/profiles/stylists').orderByChild('email').equalTo(userx.email).on("value", function (snapshot) {
                            snapshot.forEach(function (snapshot) {
                                // key
                                var key = snapshot.key;
                                console.log("key: " + key);
                                // value, could be object
                                var childData = snapshot.val();
                                console.log("data: " + JSON.stringify(childData));
                                // Do what you want with these key/values here
                                console.log(childData.address + "    childdata address");
                                _this.storage.set('address', childData.address);
                                _this.storage.set('bio', childData.bio);
                                _this.storage.set('email', userx.email);
                                _this.storage.set('picURL', childData.picURL);
                                _this.storage.set('price', childData.price);
                                _this.storage.set('phone', childData.phone);
                                _this.storage.set('instausername', childData.instagramURL);
                                _this.storage.set('username', childData.username);
                                return true;
                            });
                        });
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__feedstylist_feedstylist__["a" /* FeedStylist */]);
                    }
                    else {
                        _this.storage.set('type', 'user/stylist/user');
                        _this.storage.set('loggedin', true);
                        var database = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.database();
                        var reff = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.database().ref('/profiles/users').orderByChild('email').equalTo(userx.email).on("value", function (snapshot) {
                            snapshot.forEach(function (snapshot) {
                                // key
                                var key = snapshot.key;
                                console.log("key: " + key);
                                // value, could be object
                                var childData = snapshot.val();
                                console.log("data: " + JSON.stringify(childData));
                                // Do what you want with these key/values here
                                //this.storage.set('address', childData.address);
                                _this.storage.set('bio', childData.bio);
                                _this.storage.set('email', userx.email);
                                _this.storage.set('picURL', childData.picURL);
                                _this.storage.set('phone', childData.phone);
                                _this.storage.set('instausername', childData.instagramURL);
                                _this.storage.set('username', childData.username);
                                return true;
                            });
                        });
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__feeduser_feeduser__["a" /* FeedUser */]);
                    }
                }
            }).catch(function (e) { alert(e); });
        }
    };
    SignInPage.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignUpPage */]);
    };
    SignInPage.prototype.logForm = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
    };
    SignInPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sign-in',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/signin/signin.html"*/'<ion-content padding>\n  <h1 class="logo">Mane Emergency</h1>\n  <form (ngSubmit)="logForm()">\n  	<input [(ngModel)]="user.email" class="inputone" (keypress)="goButton($event.keyCode)" type="text" name="username" placeholder="Email"> <!--[(ngModel)]="user.username"-->\n  	<input type="text" [(ngModel)]="user.password" (keypress)="goButton($event.keyCode)" name="password" placeholder="Password"> <!--[(ngModel)]="user.username" name="password"-->\n  	<!--<div class=\'circle circone\'></div>\n  	<div class=\'circle circtwo\'></div>-->\n  	<ion-checkbox [(ngModel)]="stylist" name="stylist" class="circone" (tap)="selectOneStylist()"></ion-checkbox>\n  	<ion-checkbox [(ngModel)]="users" name="user" class="circtwo" (tap)="selectOneUser()"></ion-checkbox>\n  	<h2 class=\'hairstylist\'>Hair Stylist</h2>\n  	<h2 class=\'user\'>User</h2>\n  	<div class="signincontainer" style="text-align: center;">\n  		<button ion-button round color="primary" (tap)="login(user)">Sign In</button>\n  	</div>\n  </form>\n  <div class="account">\n    <p>Don\'t have an account? <a (click)="pushPage()">Sign Up</a></p>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/signin/signin.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */]])
    ], SignInPage);
    return SignInPage;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropinPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_braintree_web_drop_in__ = __webpack_require__(736);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_braintree_web_drop_in___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_braintree_web_drop_in__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_formulabuy_formulabuy__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_depositpage_depositpage__ = __webpack_require__(414);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the DropinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DropinPage = (function () {
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
            __WEBPACK_IMPORTED_MODULE_2_braintree_web_drop_in___default.a.create({
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
                            var profileModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__modals_depositpage_depositpage__["a" /* DepositPage */], { payload: payload, username: username });
                            profileModal.present().then(function () {
                                _this.navCtrl.pop();
                            });
                        }
                        else if (comingFrom == null && key == null) {
                            var profileModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_formulabuy_formulabuy__["a" /* FormulaBuy */], { username: username, square: square, payload: payload });
                            profileModal.present();
                            _this.navCtrl.pop();
                        }
                        else if (key != null) {
                            var profileModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_formulabuy_formulabuy__["a" /* FormulaBuy */], { username: username, key: key, payload: payload });
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-dropin',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/dropin/dropin.html"*/'<!--\n  Generated template for the DropinPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Payment</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n	<div id="dropin-container"></div>\n	<button ion-button id="submit-button">Next</button>\n</ion-content>\n'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/dropin/dropin.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
    ], DropinPage);
    return DropinPage;
}());

//# sourceMappingURL=dropin.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FollowersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__userviewuserprofile_userviewuserprofile__ = __webpack_require__(276);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the FollowersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FollowersPage = (function () {
    function FollowersPage(callNumber, geolocation, storage, af, navCtrl, navParams) {
        this.callNumber = callNumber;
        this.geolocation = geolocation;
        this.storage = storage;
        this.af = af;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.followers = [];
        this.followersList = [];
    }
    FollowersPage.prototype.ionViewDidUnload = function () {
        //this.navCtrl.pop()
    };
    FollowersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad FollowersPage');
        this.storage.get('username').then(function (val) {
            console.log('in storage');
            _this.follow = _this.af.list('/profiles/stylists/' + val + "/followers");
            _this.subscription = _this.follow.subscribe(function (items) { return items.forEach(function (item) {
                console.log(JSON.stringify(item) + "    type followers");
                _this.followlist = _this.af.object('/profiles/users/' + Object.keys(item)[0]);
                _this.subscription2 = _this.followlist.subscribe(function (item1) {
                    _this.sendBio = item1.bio;
                    console.log('inside subscribe   ' + JSON.stringify(item1));
                    if (item1.picURL == null) {
                        item1.picURL = 'assets/blankprof.png';
                    }
                    _this.geolocation.getCurrentPosition().then(function (resp) {
                        if (item1.location != null) {
                            var rr = _this.round(_this.distance(item1.location.latitude, item1.location.longitude, resp.coords.latitude, resp.coords.longitude, "M"), 1);
                            item1.distanceFrom = rr;
                        }
                    });
                    _this.followers.push(item1);
                });
            }); });
        });
    };
    FollowersPage.prototype.distance = function (lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344;
        }
        if (unit == "N") {
            dist = dist * 0.8684;
        }
        return dist;
    };
    FollowersPage.prototype.round = function (number, precision) {
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    };
    ;
    FollowersPage.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2 != null) {
            this.subscription2.unsubscribe();
        }
    };
    FollowersPage.prototype.swipeLeft = function () {
        this.navCtrl.popToRoot({ animate: false, animation: 'transition', duration: 100, direction: 'forward' });
    };
    FollowersPage.prototype.makePhoneCall = function (userPhone) {
        this.userPhone = userPhone;
        this.callNumber.callNumber(userPhone, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    FollowersPage.prototype.goToProfile = function (username) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__userviewuserprofile_userviewuserprofile__["a" /* UserviewuserprofilePage */], { 'username': username, 'bio': this.sendBio, 'phone': this.userPhone });
    };
    FollowersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-followers',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/followers/followers.html"*/'<!--\n  Generated template for the FollowersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header (swipeleft)="swipeLeft()">\n\n  <ion-navbar>\n    <ion-title>Followers</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content no-padding>\n  <div (swipeleft)="swipeLeft()" class="followerscont">\n   <ion-list no-padding>\n     <ion-item *ngFor="let z of followers" no-padding>\n      <div class="feedtoptextcontainer" (tap)="makePhoneCall(z.phone)">\n        <div class="imageparent">\n          <img class="postprofilepic" src="{{z.picURL}}">\n        </div>\n        <div class="usernamecontainer">\n          <h4 class="postusername">@{{z.username}}</h4><br>\n          <h4 class="poststudio">{{z.phone}}</h4>\n        </div>\n      </div>\n      <div class=\'clickforprofile\' (tap)="goToProfile(z.username)">\n      	<div class=\'distance\'>{{z.distanceFrom}} mi</div>\n      </div>\n     </ion-item>\n   </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/followers/followers.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__["a" /* CallNumber */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
    ], FollowersPage);
    return FollowersPage;
}());

//# sourceMappingURL=followers.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraServicePost; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_transfer__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CameraServicePost = (function () {
    function CameraServicePost(storage, transfer, http, platform, camera, crop, file) {
        var _this = this;
        this.storage = storage;
        this.transfer = transfer;
        this.http = http;
        this.platform = platform;
        this.camera = camera;
        this.crop = crop;
        this.file = file;
        this.http = http;
        this.storage.get('username').then(function (val) { _this.username = val; console.log(val + "        getting username"); });
        //console.log(JSON.stringify(compress));
    }
    CameraServicePost.prototype.getFileEntryRead = function (fileURI, square) {
        var _this = this;
        var fileName = fileURI.substring(fileURI.lastIndexOf("/") + 1, fileURI.length);
        var filePath = fileURI.substring(8, fileURI.lastIndexOf("/"));
        this.file.listDir('file:///', filePath).then(function (files) {
            console.log(fileName);
            for (var i = 0; i < files.length; i++) {
                if (files[i]['name'] == fileName) {
                    _this.readFile(files[i], square);
                }
            }
        }).catch(function (err) {
            console.log(JSON.stringify(err));
        });
    };
    CameraServicePost.prototype.dataURItoBlob = function (dataURI, callback) {
        return new Promise(function (resolve, reject) {
            var byteString = atob(dataURI);
            //console.log(byteString);
            // separate out the mime component
            //let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            // write the ArrayBuffer to a blob, and you're done
            var bb = new Blob([ab], { type: 'image/jpeg' });
            resolve(bb);
        });
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    };
    CameraServicePost.prototype.readFile = function (fileEntry, square) {
        console.log('in readfile');
        var self = this;
        fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var dataURL = reader.result;
                var image = 'profile_' + self.username + '_' + square + '.png', storageRef, parseUpload;
                return new Promise(function (resolve, reject) {
                    storageRef = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.storage().ref('/profile/' + self.username + '/' + image);
                    parseUpload = storageRef.putString(dataURL, 'data_url');
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
                    //this.af.list('/profile/' + self.username).push({ pic: image });
                }).catch(function (error) {
                    console.log(error.message);
                });
            };
            reader.readAsDataURL(file);
        });
        //self.ng2ImgToolsService.compress([file], 1, false, false).subscribe(result => {
        //console.log(result + "this is result");
        /*var reader = new FileReader();

        reader.onload = (e) => {
          var dataURL = reader.result;

          let image       : string  = 'profile_' + self.username + '_' + square + '.jpg',
            storageRef  : any,
            parseUpload : any;

          return new Promise((resolve, reject) => {
            storageRef       = firebase.storage().ref('/profile/' + self.username + '/' + image);
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
            });
        }

        reader.readAsDataURL(file);*/
        /*}, error => {
            //something went wrong
            console.log(JSON.stringify(error));
            //use result.compressedFile or handle specific error cases individually
        });*/
        /*console.log(JSON.stringify(file));
  
        console.log(file.name + 'filename');
  
        var readerFirst = new FileReader();
  
        readerFirst.onload = (e) => {
          let data = readerFirst.result;
  
          console.log(file.name + "filename in readerfirst");
  
          // Construct a file
          //var newFile = this.file.writeFile(this.file.tempDirectory, file.name, strImage, true);
  
          /**/
        //let f = new File([""], file.name, {type:"image/jpeg", lastModifiedDate: file.lastModifiedDate});
        //readerFirst.readAsDataURL(file);
    };
    ;
    // Return a promise to catch errors while loading image
    CameraServicePost.prototype.getMedia = function (options) {
        var _this = this;
        // Get Image from ionic-native's built in camera plugin
        return this.camera.getPicture(options)
            .then(function (fileUri) {
            // op Image, on android this returns something like, '/storage/emulated/0/Android/...'
            // Only giving an android example as ionic-native camera has built in cropping ability
            if (_this.platform.is('ios')) {
                return _this.crop.crop(fileUri, { quality: 2 });
            }
            else if (_this.platform.is('android')) {
                // Modify fileUri format, may not always be necessary
                fileUri = 'file://' + fileUri;
                /* Using cordova-plugin-crop starts here */
                return _this.crop.crop(fileUri, { quality: 2 });
            }
        })
            .then(function (newPath) {
            return new Promise(function (resolve, reject) {
                var fileName = newPath.substring(newPath.lastIndexOf("/") + 1, newPath.length);
                var filePath = newPath.substring(0, newPath.lastIndexOf("/"));
                _this.file.readAsDataURL(filePath, fileName).then(function (data) {
                    console.log("readasdataurl                " + data);
                    resolve(data);
                });
            });
        }).catch(function (e) {
            console.log(e);
        });
        /*let source_img = new Image(300, 300);

        source_img.src = newPath;
        //(NOTE: see the examples/js/demo.js file to understand how this object could be a local image
        //from your filesystem using the File API)

        //An Integer from 0 to 100
        let quality =  50,
        // output file format (jpg || png)
        output_format = 'jpg',
        //This function returns an Image Object
        snuffle = new Image(300, 300);
        console.log(JSON.stringify(jic));*/
        //snuffle.src = jic.compress(source_img,quality,output_format).src;
        //console.log(snuffle.src);
        //this.getFileEntryRead(newPath, square);
        //return newPath;
    };
    CameraServicePost = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_transfer__["a" /* Transfer */], __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__["a" /* Crop */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */]])
    ], CameraServicePost);
    return CameraServicePost;
}());

//# sourceMappingURL=cameraservicepost.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserBooking; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_feeduser_feeduser__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stylistprofile_stylistprofile__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the BookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var UserBooking = (function () {
    function UserBooking(elRef, myrenderer, loadingController, storage, navCtrl, navParams, af) {
        this.elRef = elRef;
        this.myrenderer = myrenderer;
        this.loadingController = loadingController;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.viewDate = new Date();
        this.events = [];
        this.calendar = { 'mode': 'month', 'currentDate': this.viewDate };
        this.times = [];
        this.slot = [];
        this.appointments = [];
        this.datesToSelect = [];
        this.timesOpen = [];
        this.show = false;
        this.times = [{ 'time': '8:00 AM', 'selected': false }, { 'time': '12:00 PM', 'selected': false }, { 'time': '4:00 PM', 'selected': false },
            { 'time': '8:30 AM', 'selected': false }, { 'time': '12:30 PM', 'selected': false }, { 'time': '4:30 PM', 'selected': false },
            { 'time': '9:00 AM', 'selected': false }, { 'time': '1:00 PM', 'selected': false }, { 'time': '5:00 PM', 'selected': false },
            { 'time': '9:30 AM', 'selected': false }, { 'time': '1:30 PM', 'selected': false }, { 'time': '5:30 PM', 'selected': false },
            { 'time': '10:00 AM', 'selected': false }, { 'time': '2:00 PM', 'selected': false }, { 'time': '6:00 PM', 'selected': false },
            { 'time': '10:30 AM', 'selected': false }, { 'time': '2:30 PM', 'selected': false }, { 'time': '6:30 PM', 'selected': false },
            { 'time': '11:00 AM', 'selected': false }, { 'time': '3:00 PM', 'selected': false }, { 'time': '7:00 PM', 'selected': false },
            { 'time': '11:30 AM', 'selected': false }, { 'time': '3:30 PM', 'selected': false }, { 'time': '7:30 PM', 'selected': false }
        ];
        //this.items = this.af.list('/appointments/' + this.username);
        //console.log(this.items);
    }
    UserBooking.prototype.ngAfterViewInit = function () {
        console.log("IN NGAFTER");
        //console.log(this.elRef.nativeElement.querySelectorAll('td[tappable]'));
    };
    UserBooking.prototype.emergency = function (i) {
        console.log(this.slots);
        var slotsarray = this.slots.toArray();
        this.myrenderer.setElementStyle(slotsarray[i]._elementRef.nativeElement, 'background-color', 'red');
        this.times[i].selected = true;
        alert("Mane Emergency text sent to followers.");
    };
    UserBooking.prototype.swipe = function (e, when) {
        var coord = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        var time = new Date().getTime();
        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        }
        else if (when === 'end') {
            var direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            var duration = time - this.swipeTime;
            if (duration < 1000 //Short enough
                && Math.abs(direction[1]) < Math.abs(direction[0]) //Horizontal enough
                && Math.abs(direction[0]) > 30) {
                var swipe = direction[0] < 0 ? 'next' : 'previous';
                console.log(swipe);
                if (swipe == 'next') {
                    this.goToFeed();
                    //this.loading.present();
                }
                else {
                    this.goToProfile();
                }
                //Do whatever you want with swipe
            }
        }
    };
    UserBooking.prototype.swipeLeft = function () {
        this.goToFeed();
    };
    UserBooking.prototype.swipeRight = function () {
        this.goToFeed();
    };
    UserBooking.prototype.logForm = function () {
        var _this = this;
        var foundit = false;
        console.log(JSON.stringify(this.times) + "               in logform");
        //let appoint = {} as Appointment;
        //console.log(this.selectedDate);
        //appoint.datex = this.selectedDate;
        //appoint.reserved = this.appointments;
        //console.log(appoint);
        //let timestamp = this.toTimeStamp(this.selectedDate.toString());
        this.items = this.af.list('/appointments/' + this.username + '/' + this.selectedDate.getMonth());
        this.subscription = this.items.subscribe(function (items) { return items.forEach(function (item) {
            var str = new Date(item.date.day * 1000);
            var mon = str.getMonth();
            var dy = str.getDate();
            if (mon == _this.selectedDate.getMonth() && dy == _this.selectedDate.getDate()) {
                console.log("             inside update");
                foundit = true;
                _this.items.update(item.$key, { 'reserved': { 'appointment': _this.times } });
            }
        }); });
        if (!foundit) {
            var bool = false;
            console.log(this.username + 'down here');
            for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
                var x = _a[_i];
                if (x.selected) {
                    bool = true;
                }
            }
            if (bool) {
                this.items.push({ date: { day: this.selectedDate.getTime() / 1000 }, reserved: { appointment: this.times } }).then(function (snap) {
                    var key = snap.key;
                    console.log(key);
                });
            }
        }
        alert("Availability Saved");
    };
    UserBooking.prototype.checkboxCheck = function (z) {
    };
    UserBooking.prototype.arraysEqual = function (a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return false;
        if (a.length != b.length)
            return false;
        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    UserBooking.prototype.getData = function (val) {
        this.username = val;
    };
    UserBooking.prototype.goToFeed = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_feeduser_feeduser__["a" /* FeedUser */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'forward' });
    };
    UserBooking.prototype.goToProfile = function () {
        //this.loading = this.loadingController.create({content : "Loading..."});
        //this.loading.present();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__stylistprofile_stylistprofile__["a" /* StylistProfile */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'back' });
    };
    UserBooking.prototype.ionViewWillLeave = function () {
        //this.loading.dismiss()
    };
    UserBooking.prototype.ionViewDidLeave = function () {
        //this.loading.dismiss();
    };
    //ionViewDidLoad() {
    /*this.isSomething = true;

    this.storage.get('username').then((val) => {
      this.getData(val);
    });*/
    //}
    UserBooking.prototype.ionViewDidLoad = function () {
        var _this = this;
        //let loading = this.loadingController.create({content : "Loading..."});
        //loading.present();
        this.isSomething = true;
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        this.username = this.navParams.get('username');
        console.log(this.viewDate + " view date ");
        //setTimeout(()=>{
        this.timesOpen = [];
        this.selectedDate = this.viewDate;
        console.log(this.username + "this.username");
        var bool = false;
        this.items2 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
        this.subscription2 = this.items2.subscribe(function (items) {
            var mapped = items.map(function (item) {
                return new Promise(function (resolve, reject) {
                    console.log(item);
                    var da = new Date(item.date.day * 1000);
                    var boool = false;
                    console.log(da + "da");
                    console.log(da.getDate() + "dagetdate");
                    console.log(_this.selectedDate.getDate());
                    if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                        console.log("selected = item");
                        console.log(JSON.stringify(item.reserved) + "         item resesrved above");
                        //for(let m = 0; m < item.reserved.length; m++) {
                        //for(let r of item.reserved) {
                        //console.log(JSON.stringify(r));
                        for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                            var r = _a[_i];
                            if (r.selected == true) {
                                _this.timesOpen.push(r);
                                console.log('hit appointment');
                                bool = true;
                            }
                        }
                        //count++;
                        /*for(let x of this.times) {
                          if(x.time == r) {
                            console.log('change selected');
                            x.selected = true;
                          }
                        }*/
                        //}
                    }
                    for (var _b = 0, _c = item.reserved.appointment; _b < _c.length; _b++) {
                        var r = _c[_b];
                        console.log(" in r of item.reserved.appointment");
                        if (r.selected == true) {
                            boool = true;
                        }
                    }
                    if (boool) {
                        console.log("in bool twice in bool once");
                        _this.datesToSelect.push(da.getDate());
                        resolve();
                    }
                    else {
                        resolve();
                    }
                });
            });
            Promise.all(mapped).then(function () {
                for (var _i = 0, _a = _this.tds; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (!item.classList.contains('text-muted')) {
                        console.log(typeof item.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                        if (_this.datesToSelect.indexOf(parseInt(item.innerText)) != -1) {
                            console.log("Inner text in      " + item.innerText);
                            _this.myrenderer.setElementClass(item, "greencircle", true);
                        }
                        else {
                            //this.myrenderer.setElementClass(item,"monthview-selected",false);
                        }
                    }
                }
            });
        });
        if (!bool) {
            this.myrenderer.setElementStyle(this.noavail.nativeElement, 'display', 'block');
        }
        else {
            this.myrenderer.setElementStyle(this.noavail.nativeElement, 'display', 'none');
        }
        //loading.dismiss();
        //},1500)
    };
    UserBooking.prototype.toTimeStamp = function (dateString) {
        return new Date(dateString.split('-').reverse().join('/')).getTime();
    };
    UserBooking.prototype.onCurrentDateChanged = function ($event) {
        var _this = this;
        //console.log(typeof $event);
        for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
            var x = _a[_i];
            x.selected = false;
        }
        var bool = false;
        console.log(typeof $event + "event event event *******");
        this.selectedDate = new Date($event);
        console.log(this.selectedDate + " thi si the selected date ((())))))");
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        //console.log($event);
        this.timesOpen = [];
        this.items4 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
        this.subscription4 = this.items4.subscribe(function (items) { return items.forEach(function (item) {
            //console.log(JSON.stringify(item));
            //console.log(item.date.day);\
            console.log("dafirst    " + item.date.day);
            var da = new Date(item.date.day * 1000);
            _this.datesToSelect = [];
            _this.datesToSelect.push(da.getDate());
            console.log(da + "da");
            console.log(da.getDate() + "dagetdate");
            console.log(_this.selectedDate.getDate());
            if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                console.log("selected = item");
                console.log(JSON.stringify(item.reserved) + "         item resesrved");
                //for(let r of item.reserved.appointment) {
                //console.log(JSON.stringify(r));
                for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                    var r = _a[_i];
                    if (r.selected == true) {
                        _this.timesOpen.push(r);
                        console.log('hit appointment');
                        bool = true;
                    }
                }
                /*for(let x of this.times) {
                  if(x.time == r) {
                    console.log('change selected');
                    x.selected = true;
                  }
                }*/
                //}
            }
        }); });
        if (!bool) {
            this.myrenderer.setElementStyle(this.noavail.nativeElement, 'display', 'block');
        }
        else {
            this.myrenderer.setElementStyle(this.noavail.nativeElement, 'display', 'none');
        }
    };
    UserBooking.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.subscription2.unsubscribe();
        this.subscription3.unsubscribe();
        this.subscription4.unsubscribe();
    };
    UserBooking.prototype.reloadSource = function (startTime, endTime) {
        console.log(startTime + " : starttime           endtime: " + endTime);
    };
    UserBooking.prototype.onEventSelected = function ($event) { };
    UserBooking.prototype.onViewTitleChanged = function (title) {
        var array = title.split(" ");
        //array[1];
        this.viewTitle = array[0];
        this.titleYear = array[1];
    };
    UserBooking.prototype.onTimeSelected = function ($event) {
        var _this = this;
        console.log(JSON.stringify($event) + "      THI SIIS EVENT @(@(@(@(@(");
        this.selectedDate = new Date($event.selectedTime);
        console.log(this.selectedDate + " thi si the selected date ((())))))");
        var bool = false;
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        if ($event.dontRunCode) {
            this.timesOpen = [];
            //console.log($event);
            this.items3 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
            this.subscription3 = this.items3.subscribe(function (items) { return items.forEach(function (item) {
                //console.log(JSON.stringify(item));
                //console.log(item.date.day);
                console.log("dafirst    " + item.date.day);
                var da = new Date(item.date.day * 1000);
                _this.datesToSelect = [];
                _this.datesToSelect.push(da.getDate());
                console.log(da + "da");
                console.log(da.getDate() + "dagetdate");
                console.log(_this.selectedDate.getDate());
                if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                    console.log("selected = item");
                    console.log(JSON.stringify(item.reserved) + "         item resesrved");
                    //for(let r of item.reserved.appointment) {
                    //console.log(JSON.stringify(r));
                    /*let bool = false;
                    for(let r in item.reserved.appointment) {
                      if(r['selected'] == "true") {
                        bool = true;
                      }
                    }*/
                    for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                        var r = _a[_i];
                        if (r.selected == true) {
                            _this.timesOpen.push(r);
                            console.log('hit appointment');
                            bool = true;
                        }
                    }
                    /*for(let x of this.times) {
                      if(x.time == r) {
                        console.log('change selected');
                        x.selected = true;
                      }
                    }*/
                    //}
                }
                //console.log($event.runCode + "     dont run code!!!!!!");
                //if($event.runCode == true) {
                for (var _b = 0, _c = _this.tds; _b < _c.length; _b++) {
                    var item_1 = _c[_b];
                    if (!item_1.classList.contains('text-muted')) {
                        console.log(typeof item_1.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                        var count = 0;
                        if (_this.datesToSelect.indexOf(parseInt(item_1.innerText)) != -1) {
                            console.log("Inner text in      " + item_1.innerText);
                            _this.myrenderer.setElementClass(item_1, "greencircle", true);
                        }
                        else {
                            //this.myrenderer.setElementClass(item,"monthview-selected",false);
                        }
                    }
                }
                //}
            }); });
            if (!bool) {
                this.myrenderer.setElementStyle(this.noavail.nativeElement, 'display', 'block');
            }
            else {
                this.myrenderer.setElementStyle(this.noavail.nativeElement, 'display', 'none');
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('slot'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], UserBooking.prototype, "slots", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('noavail'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], UserBooking.prototype, "noavail", void 0);
    UserBooking = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-user-booking',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/userbooking/userbooking.html"*/'<!--\n  Generated template for the BookingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content (swiperight)="swipeRight()" no-padding>\n	<div class=\'arrowleftholder\'>\n	<ion-icon class=\'forward\' name="arrow-back"></ion-icon>\n    </div>\n    <div style="width: 100%; position: absolute; left: 50%; width: 35%; z-index: 14;">\n	    <div style="position: relative; left: -50%; width:100%;">\n	    	<div class="titleholder">\n		      <div class="monthclass">{{viewTitle}}</div><div class="yearclass">{{titleYear}}</div>\n		    </div>\n		  </div>\n	  </div>\n    <div class=\'arrowrightholder\' (tap)="selectArrowRight()">\n    	<ion-icon class=\'forward\' name="arrow-forward"></ion-icon>\n    </div>\n	<calendar class=\'cal\' \n	  [eventSource]="eventSource"\n	  [calendarMode]="calendar.mode"\n	  [currentDate]="calendar.currentDate"\n	  (onCurrentDateChanged)="onCurrentDateChanged($event)"\n	  (onRangeChanged)="reloadSource(startTime, endTime)"\n	  (onEventSelected)="onEventSelected($event)"\n	  (onTitleChanged)="onViewTitleChanged($event)"\n	  (onTimeSelected)="onTimeSelected($event)"\n	  step="30">\n	</calendar>\n	<!--<form>-->\n	<!--<div class="slots">-->\n	  <ion-list class="scrolling">\n	     <ion-item *ngFor="let i of timesOpen ; let z = index" #slot no-padding>\n	      	<ion-label>{{i.time}}</ion-label>\n	     	<!--<ion-checkbox name="time" [(ngModel)]="times[z].selected" [checked]="times[z].selected" (ionChange)="checkboxCheck(z)"></ion-checkbox>-->\n	     </ion-item>\n	  </ion-list>\n	  <div class="noavail" #noavail>NO AVAILABILITIES</div>\n	<!--</div>-->\n	<!--</form>-->\n</ion-content>\n'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/userbooking/userbooking.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database_deprecated__["a" /* AngularFireDatabase */]])
    ], UserBooking);
    return UserBooking;
}());

//# sourceMappingURL=userbooking.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserViewProfile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__booking_booking__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__postpage_postpage__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_settings__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_cameraservice__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_img_viewer__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_geocoder__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_geolocation__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









//\import { /*AngularFireDatabase,*/ FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';







//import { IonicApp, IonicModule } from 'ionic-angular';
//import { MyApp } from './app/app.component';
var UserViewProfile = (function () {
    function UserViewProfile(http, nativeGeocoder, geolocation, elRef, storage, imageViewerCtrl, loadingController, /*public firebase: FirebaseApp, */ myrenderer, af, actionSheetCtrl, camera, navCtrl, cameraService) {
        this.http = http;
        this.nativeGeocoder = nativeGeocoder;
        this.geolocation = geolocation;
        this.elRef = elRef;
        this.storage = storage;
        this.imageViewerCtrl = imageViewerCtrl;
        this.loadingController = loadingController;
        this.myrenderer = myrenderer;
        this.af = af;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.cameraService = cameraService;
        this.viewDate = new Date();
        this.events = [];
        this.calendar = { 'mode': 'month', 'currentDate': this.viewDate };
        this.moveState = 'up';
        this.picURLS = [];
        this.square = 0;
        this.datesToSelect = [];
        this.bool = false;
        this.optionsGetMedia = {
            //allowEdit: false,
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
        };
        this.times = [{ 'time': '8:00 AM', 'selected': false }, { 'time': '12:00 PM', 'selected': false }, { 'time': '4:00 PM', 'selected': false },
            { 'time': '8:30 AM', 'selected': false }, { 'time': '12:30 PM', 'selected': false }, { 'time': '4:30 PM', 'selected': false },
            { 'time': '9:00 AM', 'selected': false }, { 'time': '1:00 PM', 'selected': false }, { 'time': '5:00 PM', 'selected': false },
            { 'time': '9:30 AM', 'selected': false }, { 'time': '1:30 PM', 'selected': false }, { 'time': '5:30 PM', 'selected': false },
            { 'time': '10:00 AM', 'selected': false }, { 'time': '2:00 PM', 'selected': false }, { 'time': '6:00 PM', 'selected': false },
            { 'time': '10:30 AM', 'selected': false }, { 'time': '2:30 PM', 'selected': false }, { 'time': '6:30 PM', 'selected': false },
            { 'time': '11:00 AM', 'selected': false }, { 'time': '3:00 PM', 'selected': false }, { 'time': '7:00 PM', 'selected': false },
            { 'time': '11:30 AM', 'selected': false }, { 'time': '3:30 PM', 'selected': false }, { 'time': '7:30 PM', 'selected': false }
        ];
    }
    UserViewProfile.prototype.ionViewWillUnload = function () {
        this.navCtrl.pop();
    };
    UserViewProfile.prototype.ionViewDidEnter = function () {
        //let loading = this.loadingController.create({content : "Loading..."});
        //loading.present();
    };
    UserViewProfile.prototype.getFollowers = function () {
    };
    UserViewProfile.prototype.setLocation = function () {
        var _this = this;
        this.bool = true;
        var loading = this.loadingController.create({ content: "Loading..." });
        loading.present();
        this.geolocation.getCurrentPosition().then(function (resp) {
            var location = resp;
            _this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
                .then(function (result) {
                console.log("I AM IN THE GEOCODING ***&&*&*&*&*");
                //console.log(JSON.stringify(address.street + "      " + address.city + "    add street city9999"));
                var newResult = JSON.parse(JSON.stringify(result));
                _this.af.object('/distances/' + _this.username).remove();
                _this.thoroughfare = newResult.thoroughfare;
                _this.locality = newResult.locality;
                _this.storage.set('locality', _this.locality);
                _this.storage.set('thoroughfare', _this.thoroughfare);
                console.log(JSON.stringify(_this.locationListed) + "     thisislocaitonlistedste    3223i32ip 3ij223");
                _this.myrenderer.setElementStyle(_this.locationListed.nativeElement, 'display', 'block');
                _this.item1 = _this.af.object('/profiles/users/' + _this.username);
                _this.item1.update({ 'location': { 'latitude': resp.coords.latitude, 'longitude': resp.coords.longitude } }).then(function () {
                    alert("Your location has been updated");
                    _this.storage.set('location', false);
                }).catch(function (e) { loading.dismiss(); alert("Something went wrong with setting your location, please try again."); });
                var a = _this.http.get('https://us-central1-mane-4152c.cloudfunctions.net/sortDistance?text=' + resp.coords.latitude + ':' + resp.coords.longitude + ':' + _this.username);
                _this.subscription6 = a.subscribe(function (res) {
                    console.log(res + "response from firesbase functions");
                    loading.dismiss();
                }, function (err) {
                    console.log(JSON.stringify(err));
                    loading.dismiss();
                });
            }).catch(function (e) {
                console.log(e.message + " caught this error");
                loading.dismiss();
            });
        }).catch(function (e) {
            console.log(e.message + " caught this error");
            loading.dismiss();
        });
        loading.dismiss();
    };
    UserViewProfile.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('bio').then(function (val) {
            _this.bio = val;
        });
        this.storage.get('locality').then(function (val) {
            _this.locality = val;
            _this.storage.get('thoroughfare').then(function (val) {
                _this.thoroughfare = val;
            });
        });
        this.storage.get('location').then(function (val) {
            if (val == true) {
                _this.myrenderer.setElementStyle(_this.locationListed.nativeElement, 'display', 'none');
            }
            ;
        });
        this.storage.get('username').then(function (val) {
            _this.username = val;
            console.log(val);
            _this.downloadImages();
            /*this.item2 = this.af.object('/profiles/stylists/' + this.username + '/followers');
            this.subscription5 = this.item2.subscribe(item => {
              console.log(JSON.stringify(item) + "      followers number 98989899889");
              if(Object.keys(item)[0] == '$value') {
                this.followers = 0;
              }
              else {
                this.followers = item.length;
              }
            });
      
            this.item9 = this.af.object('/profiles/stylists/' + this.username);
            this.subscription9 = this.item9.subscribe(item => {
              console.log(JSON.stringify(item) + "      rating number 989898222229889");
              let total = 0;
              for(let u in item.rating) {
                total += item.rating[u];
              }
              this.totalRatings = total;
      
              let totalPotential = item.rating.one * 5 + item.rating.two * 5 + item.rating.three * 5 + item.rating.four * 5 + item.rating.five * 5;
              let ratings = item.rating.one + item.rating.two * 2 + item.rating.three * 3 + item.rating.four * 4 + item.rating.five *5;
              
              console.log(ratings + "   ratings          total potential:    " + totalPotential);
      
              if(ratings == 0 && totalPotential == 0) {
                this.stars = '\u2606\u2606\u2606\u2606\u2606';
              }
      
              let i = (ratings / totalPotential) * 100;
              if(Math.round(i) <= 20) {
                this.stars = '\u2605\u2606\u2606\u2606\u2606';
              }
              if(Math.round(i) > 20 && Math.round(i) <= 40) {
                this.stars = '\u2605\u2605\u2606\u2606\u2606';
              }
              if(Math.round(i) > 40 && Math.round(i) <= 60) {
                this.stars = '\u2605\u2605\u2605\u2606\u2606';
              }
              if(Math.round(i) > 60 && Math.round(i) <= 80) {
                this.stars = '\u2605\u2605\u2605\u2605\u2606';
              }
              if(Math.round(i) > 80) {
                this.stars = '\u2605\u2605\u2605\u2605\u2605';
              }
              
            });*/
        });
        this.storage.get('picURL').then(function (val) {
            _this.profilePic = val;
            if (_this.profilePic == null) {
                _this.profilePic = 'assets/blankprof.png';
            }
        });
        //this.isSomething = true;
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        console.log(this.viewDate + " view date ");
        setTimeout(function () {
            _this.selectedDate = _this.viewDate;
            console.log(_this.username + "this.username");
            //this.items2 = this.af.list();
            _this.af.list('appointments/' + _this.username + '/' + _this.selectedDate.getMonth(), function (ref) { return ref; }).snapshotChanges().map(function (actions) {
                return actions.map(function (action) { return ({ key: action.key, data: action.payload.val() }); });
            }).subscribe(function (items) { return items.forEach(function (item) {
                console.log(item.data);
                var da = new Date(item.data.date.day * 1000);
                _this.datesToSelect.push(da.getDate());
                console.log(da + "da");
                console.log(da.getDate() + "dagetdate");
                console.log(_this.selectedDate.getDate());
                if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                    console.log("selected = item");
                    console.log(JSON.stringify(item.data.reserved) + "         item resesrved above");
                    _this.times = item.data.reserved.appointment.slice(0);
                    console.log('hit appointment');
                }
                for (var _i = 0, _a = _this.tds; _i < _a.length; _i++) {
                    var item_1 = _a[_i];
                    if (!item_1.classList.contains('text-muted')) {
                        console.log(typeof item_1.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                        if (_this.datesToSelect.indexOf(parseInt(item_1.innerText)) != -1) {
                            console.log("Inner text in      " + item_1.innerText);
                            _this.myrenderer.setElementClass(item_1, "greencircle", true);
                        }
                        else {
                            //this.myrenderer.setElementClass(item,"monthview-selected",false);
                        }
                    }
                }
            }); });
            //loading.dismiss();
        }, 1500);
    };
    UserViewProfile.prototype.ngOnDestroy = function () {
        if (this.subscription2 != null) {
            this.subscription2.unsubscribe();
        }
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
        if (this.subscription9 != null) {
            this.subscription9.unsubscribe();
        }
    };
    UserViewProfile.prototype.openCamera = function (squarez) {
        this.presentActionSheet();
        this.square = squarez;
    };
    UserViewProfile.prototype.removePic = function (squarez) {
        console.log("in remove pic 333333333          " + squarez);
        var itemArray = this.components.toArray();
        var itemArrayTwo = this.profComponents.toArray();
        var itemArraythree = this.xclass.toArray();
        console.log(JSON.stringify(itemArray) + " item array");
        this.myrenderer.setElementStyle(itemArray[squarez - 1].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(itemArrayTwo[squarez - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArraythree[squarez - 1].nativeElement, 'display', 'none');
        this.storage.set("profile" + squarez, null);
    };
    UserViewProfile.prototype.presentImage = function (squarez) {
        this.square = squarez;
        var itemArrayTwo = this.profComponents.toArray();
        console.log(JSON.stringify(itemArrayTwo[this.square - 1]));
        var imageViewer = this.imageViewerCtrl.create(itemArrayTwo[this.square - 1].nativeElement);
        imageViewer.present();
    };
    UserViewProfile.prototype.showSquare = function () {
        var itemArray = this.components.toArray();
        var itemArrayTwo = this.profComponents.toArray();
        var itemArraythree = this.xclass.toArray();
        this.myrenderer.setElementStyle(itemArray[this.square - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArrayTwo[this.square - 1].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(itemArraythree[this.square - 1].nativeElement, 'display', 'block');
    };
    UserViewProfile.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose source',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        var itemArrayTwo = _this.profComponents.toArray();
                        _this.cameraService.getMedia(_this.optionsGetCamera, _this.square).then(function () {
                            return new Promise(function (resolve, reject) {
                                var storageRef = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.storage().ref().child('/profile/' + _this.username + '/profile_' + _this.username + '_' + _this.square + '.png');
                                var loading = _this.loadingController.create({ content: "Loading..." });
                                loading.present();
                                setTimeout(function () {
                                    storageRef.getDownloadURL().then(function (url) {
                                        console.log(url);
                                        _this.storage.set("profile" + _this.square, url);
                                        _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                                        _this.showSquare();
                                    });
                                    loading.dismiss();
                                }, 3000);
                            });
                        }); //pass in square choice
                        //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
                        console.log('camera clicked');
                    }
                }, {
                    text: 'Photo Library',
                    handler: function () {
                        var itemArrayTwo = _this.profComponents.toArray();
                        _this.cameraService.getMedia(_this.optionsGetMedia, _this.square).then(function () {
                            return new Promise(function (resolve, reject) {
                                var storageRef = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.storage().ref().child('/profile/' + _this.username + '/profile_' + _this.username + '_' + _this.square + '.png');
                                var loading = _this.loadingController.create({ content: "Loading..." });
                                loading.present();
                                setTimeout(function () {
                                    storageRef.getDownloadURL().then(function (url) {
                                        console.log(url);
                                        _this.storage.set("profile" + _this.square, url);
                                        _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                                        _this.showSquare();
                                        resolve();
                                    });
                                    loading.dismiss();
                                }, 3500);
                            });
                            //
                        }).catch(function (e) {
                            console.log(e + "       eeeee");
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
    UserViewProfile.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        //this.navCtrl.push(SignUpPage);
    };
    UserViewProfile.prototype.tappedPost = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__postpage_postpage__["a" /* PostpagePage */]);
    };
    UserViewProfile.prototype.tappedEmergency = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__booking_booking__["a" /* BookingPage */]);
    };
    UserViewProfile.prototype.goToSettings = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__settings_settings__["a" /* SettingsPage */]);
    };
    UserViewProfile.prototype.backToCal = function () {
        //if(this.navParams.get('param1') == 'user') {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__booking_booking__["a" /* BookingPage */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'forward' });
        //this.navCtrl.push(BookingPage);
        //}
        //else {
        //this.navCtrl.push(FeedStylist);
        //}
    };
    UserViewProfile.prototype.swipe = function (e, when) {
        var coord = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        var time = new Date().getTime();
        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        }
        else if (when === 'end') {
            var direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            var duration = time - this.swipeTime;
            if (duration < 1000 //Short enough
                && Math.abs(direction[1]) < Math.abs(direction[0]) //Horizontal enough
                && Math.abs(direction[0]) > 30) {
                var swipe = direction[0] < 0 ? 'next' : 'previous';
                console.log(swipe);
                if (swipe == 'next') {
                    this.backToCal();
                }
                else {
                }
                //Do whatever you want with swipe
            }
        }
    };
    UserViewProfile.prototype.swipeLeft = function () {
        this.backToCal();
    };
    UserViewProfile.prototype.swipeRight = function () {
        /*if(this.bool) {
          console.log("in set rooooooooooooot");
          this.navCtrl.push(FeedUser, { param: 'fromprofile' }, {animate:true,animation:'transition',duration:100,direction:'back'});
        }
        else {*/
        this.navCtrl.popToRoot({ animate: true, animation: 'transition', duration: 100, direction: 'back' });
        //}
    };
    UserViewProfile.prototype.downloadImages = function () {
        var self = this;
        var promises_array = [];
        var itemArrayTwo = this.profComponents.toArray();
        var itemArray = this.components.toArray();
        var itemArraythree = this.xclass.toArray();
        var _loop_1 = function (z) {
            self.storage.get("profile" + z).then(function (val) {
                if (val != null) {
                    self.myrenderer.setElementAttribute(itemArrayTwo[z - 1].nativeElement, 'src', val);
                    self.myrenderer.setElementStyle(itemArrayTwo[z - 1].nativeElement, 'display', 'block');
                    self.myrenderer.setElementStyle(itemArray[z - 1].nativeElement, 'display', 'none');
                    self.myrenderer.setElementStyle(itemArraythree[z - 1].nativeElement, 'display', 'block');
                    console.log(z);
                }
                //resolve();
            });
        };
        for (var z = 1; z < 10; z++) {
            _loop_1(z);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('pluscontain'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], UserViewProfile.prototype, "components", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('profsquare'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], UserViewProfile.prototype, "profComponents", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('xclass'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], UserViewProfile.prototype, "xclass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('locationlisted'),
        __metadata("design:type", Object)
    ], UserViewProfile.prototype, "locationListed", void 0);
    UserViewProfile = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'user-view-profile',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/userviewprofile/userviewprofile.html"*/'<ion-header (swiperight)="swipeRight()">\n  <ion-toolbar>\n    <ion-title>@{{username}}</ion-title>\n\n    <div class="settingscontainer">\n    	<ion-icon class="settings" name="settings" (tap)="goToSettings()"></ion-icon>\n    </div>\n  </ion-toolbar>\n    <!--<div class="stylistview">\n	    <button class="stylistviewbutton" ion-button color="secondary">Stylist View</button>\n	  </div>-->\n</ion-header>\n\n<ion-content no-padding>\n<div >\n	<ion-item no-padding no-lines class="itemforprofile" (swiperight)="swipeRight()">\n		<div class="imageparent">\n		  <img class="postprofilepic" src="{{profilePic}}">\n		</div>\n	    <div class="rateandsocial">\n		    <!--<div class=\'ratecontain\'>\n			    <div class=\'stars\'>{{stars}}</div>\n			    <div class=\'ratings\'>({{totalRatings}} ratings)</div>\n			</div>-->\n		    <div class="social">\n				<div class="fb inlineblock">\n					<img src="img/facebook.png">\n				</div>\n				<div class="insta inlineblock">\n		  			<img src="img/instagram.png">\n				</div>\n			</div>\n		</div>\n	  	<div class="setlocationbox" >\n	    	<button class="" (tap)="setLocation()" ion-button color="tertiary">Set Location</button>\n	  	</div>\n	  	<div class=\'location\' #locationlisted>{{thoroughfare}}, {{locality}}</div> <!--{{thoroughfare}}, {{locality}}-->\n	  	<div class=\'stylistsect\'>\n			<div class="name">{{username}}</div>\n			<div class="bio">{{bio}}</div>\n		</div>\n		<!--<calendar (tap)=\'moveCover()\' class=\'cal\' [eventSource]="eventSource"\n	      [calendarMode]="calendar.mode"\n	      [currentDate]="calendar.currentDate"\n	      (onCurrentDateChanged)="onCurrentDateChanged($event)"\n	      (onRangeChanged)="reloadSource(startTime, endTime)"\n	      (onEventSelected)="onEventSelected($event)"\n	      (onTitleChanged)="onViewTitleChanged($event)"\n	      (onTimeSelected)="onTimeSelected($event)"\n	      step="30">\n	    </calendar>-->\n	</ion-item>\n	<ion-grid (swiperight)="swipeRight()">\n	  <ion-item>Hair Goals</ion-item>\n	  <ion-row>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(1)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(1)">&#10005;</div>\n	      	<img  (tap)="presentImage(1)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(2)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(2)">&#10005;</div>\n	      <img  (tap)="presentImage(2)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(3)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(3)">&#10005;</div>\n	      <img  (tap)="presentImage(3)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	  </ion-row>\n	  <ion-item>Current Hair</ion-item>\n	  <ion-row>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(4)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(4)">&#10005;</div>\n	      <img  (tap)="presentImage(4)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(5)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(5)">&#10005;</div>\n	      <img  (tap)="presentImage(5)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(6)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(6)">&#10005;</div>\n	      <img  (tap)="presentImage(6)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	  </ion-row>\n	  <!--<ion-row>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(7)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(7)">&#10005;</div>\n	      <img  (tap)="presentImage(7)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(8)"class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(8)">&#10005;</div>\n	      <img  (tap)="presentImage(8)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain  (tap)="openCamera(9)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(9)">&#10005;</div>\n	      <img  (tap)="presentImage(9)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	  </ion-row>-->\n	</ion-grid>\n</div>\n\n<!--<ion-fab bottom center >\n  <button ion-fab></button>\n  <ion-fab-list side="right">\n    <button class="textsizebutton" (tap)=\'tappedPost()\' ion-fab>Post</button>\n  </ion-fab-list>\n  <ion-fab-list side="left">\n    <button class="textsizebutton" (tap)=\'tappedEmergency()\' ion-fab><ion-icon name="alarm"></ion-icon></button>\n  </ion-fab-list>\n</ion-fab>-->\n</ion-content>'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/userviewprofile/userviewprofile.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('moveCover', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('down', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        height: '100%',
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('up', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        height: '75px',
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms ease-in')),
                ]),
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_13__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_geocoder__["a" /* NativeGeocoder */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_9_ionic_img_viewer__["a" /* ImageViewerController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__services_cameraservice__["a" /* CameraService */]])
    ], UserViewProfile);
    return UserViewProfile;
}());

//# sourceMappingURL=userviewprofile.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserviewuserprofilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__booking_booking__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__postpage_postpage__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__followers_followers__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_settings__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_cameraservice__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_img_viewer__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_native_geocoder__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_call_number__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















/**
 * Generated class for the UserviewuserprofilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var UserviewuserprofilePage = (function () {
    function UserviewuserprofilePage(callNumber, navParams, nativeGeocoder, geolocation, elRef, storage, imageViewerCtrl, loadingController, /*public firebase: FirebaseApp, */ myrenderer, af, actionSheetCtrl, camera, navCtrl, cameraService) {
        this.callNumber = callNumber;
        this.navParams = navParams;
        this.nativeGeocoder = nativeGeocoder;
        this.geolocation = geolocation;
        this.elRef = elRef;
        this.storage = storage;
        this.imageViewerCtrl = imageViewerCtrl;
        this.loadingController = loadingController;
        this.myrenderer = myrenderer;
        this.af = af;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.cameraService = cameraService;
        this.viewDate = new Date();
        this.events = [];
        this.calendar = { 'mode': 'month', 'currentDate': this.viewDate };
        this.moveState = 'up';
        this.picURLS = [];
        this.square = 0;
        this.datesToSelect = [];
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
        this.times = [{ 'time': '8:00 AM', 'selected': false }, { 'time': '12:00 PM', 'selected': false }, { 'time': '4:00 PM', 'selected': false },
            { 'time': '8:30 AM', 'selected': false }, { 'time': '12:30 PM', 'selected': false }, { 'time': '4:30 PM', 'selected': false },
            { 'time': '9:00 AM', 'selected': false }, { 'time': '1:00 PM', 'selected': false }, { 'time': '5:00 PM', 'selected': false },
            { 'time': '9:30 AM', 'selected': false }, { 'time': '1:30 PM', 'selected': false }, { 'time': '5:30 PM', 'selected': false },
            { 'time': '10:00 AM', 'selected': false }, { 'time': '2:00 PM', 'selected': false }, { 'time': '6:00 PM', 'selected': false },
            { 'time': '10:30 AM', 'selected': false }, { 'time': '2:30 PM', 'selected': false }, { 'time': '6:30 PM', 'selected': false },
            { 'time': '11:00 AM', 'selected': false }, { 'time': '3:00 PM', 'selected': false }, { 'time': '7:00 PM', 'selected': false },
            { 'time': '11:30 AM', 'selected': false }, { 'time': '3:30 PM', 'selected': false }, { 'time': '7:30 PM', 'selected': false }
        ];
    }
    UserviewuserprofilePage.prototype.ionViewDidEnter = function () {
        //let loading = this.loadingController.create({content : "Loading..."});
        //loading.present();
    };
    UserviewuserprofilePage.prototype.getFollowers = function () {
    };
    UserviewuserprofilePage.prototype.goBack = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__followers_followers__["a" /* FollowersPage */]);
    };
    UserviewuserprofilePage.prototype.makeCall = function () {
        this.callNumber.callNumber(this.userPhone, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    UserviewuserprofilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userPhone = this.navParams.get('phone');
        this.bio = this.navParams.get('bio');
        this.username = this.navParams.get('username');
        this.item = this.af.object('/profiles/users/' + this.username);
        this.item.subscribe(function (snapshot) {
            _this.nativeGeocoder.reverseGeocode(snapshot.location.latitude, snapshot.location.longitude)
                .then(function (result) {
                console.log("I AM IN THE GEOCODING ***&&*&*&*&*");
                //console.log(JSON.stringify(address.street + "      " + address.city + "    add street city9999"));
                var newResult = JSON.parse(JSON.stringify(result));
                _this.thoroughfare = newResult.thoroughfare;
                _this.locality = newResult.locality;
                console.log(JSON.stringify(_this.locationListed) + "     thisislocaitonlistedste    3223i32ip 3ij223");
                _this.myrenderer.setElementStyle(_this.locationListed.nativeElement, 'display', 'block');
            }).catch(function (e) {
                console.log(e.message + " caught this error");
            });
        });
        this.downloadImages();
        /*this.item2 = this.af.object('/profiles/stylists/' + this.username + '/followers');
        this.subscription5 = this.item2.subscribe(item => {
          console.log(JSON.stringify(item) + "      followers number 98989899889");
          if(Object.keys(item)[0] == '$value') {
            this.followers = 0;
          }
          else {
            this.followers = item.length;
          }
        });
  
        this.item9 = this.af.object('/profiles/stylists/' + this.username);
        this.subscription9 = this.item9.subscribe(item => {
          console.log(JSON.stringify(item) + "      rating number 989898222229889");
          let total = 0;
          for(let u in item.rating) {
            total += item.rating[u];
          }
          this.totalRatings = total;
  
          let totalPotential = item.rating.one * 5 + item.rating.two * 5 + item.rating.three * 5 + item.rating.four * 5 + item.rating.five * 5;
          let ratings = item.rating.one + item.rating.two * 2 + item.rating.three * 3 + item.rating.four * 4 + item.rating.five *5;
          
          console.log(ratings + "   ratings          total potential:    " + totalPotential);
  
          if(ratings == 0 && totalPotential == 0) {
            this.stars = '\u2606\u2606\u2606\u2606\u2606';
          }
  
          let i = (ratings / totalPotential) * 100;
          if(Math.round(i) <= 20) {
            this.stars = '\u2605\u2606\u2606\u2606\u2606';
          }
          if(Math.round(i) > 20 && Math.round(i) <= 40) {
            this.stars = '\u2605\u2605\u2606\u2606\u2606';
          }
          if(Math.round(i) > 40 && Math.round(i) <= 60) {
            this.stars = '\u2605\u2605\u2605\u2606\u2606';
          }
          if(Math.round(i) > 60 && Math.round(i) <= 80) {
            this.stars = '\u2605\u2605\u2605\u2605\u2606';
          }
          if(Math.round(i) > 80) {
            this.stars = '\u2605\u2605\u2605\u2605\u2605';
          }
          
        });*/
        this.storage.get('picURL').then(function (val) {
            _this.profilePic = val;
            if (_this.profilePic == null) {
                _this.profilePic = 'assets/blankprof.png';
            }
        });
        //this.isSomething = true;
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        console.log(this.viewDate + " view date ");
        setTimeout(function () {
            _this.selectedDate = _this.viewDate;
            console.log(_this.username + "this.username");
            _this.items2 = _this.af.list('appointments/' + _this.username + '/' + _this.selectedDate.getMonth());
            _this.subscription2 = _this.items2.subscribe(function (items) { return items.forEach(function (item) {
                console.log(item);
                var da = new Date(item.date.day * 1000);
                _this.datesToSelect.push(da.getDate());
                console.log(da + "da");
                console.log(da.getDate() + "dagetdate");
                console.log(_this.selectedDate.getDate());
                if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                    console.log("selected = item");
                    console.log(JSON.stringify(item.reserved) + "         item resesrved above");
                    _this.times = item.reserved.appointment.slice(0);
                    console.log('hit appointment');
                }
                for (var _i = 0, _a = _this.tds; _i < _a.length; _i++) {
                    var item_1 = _a[_i];
                    if (!item_1.classList.contains('text-muted')) {
                        console.log(typeof item_1.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                        if (_this.datesToSelect.indexOf(parseInt(item_1.innerText)) != -1) {
                            console.log("Inner text in      " + item_1.innerText);
                            _this.myrenderer.setElementClass(item_1, "greencircle", true);
                        }
                        else {
                            //this.myrenderer.setElementClass(item,"monthview-selected",false);
                        }
                    }
                }
            }); });
            //loading.dismiss();
        }, 1500);
    };
    UserviewuserprofilePage.prototype.ngOnDestroy = function () {
        if (this.subscription2 != null) {
            this.subscription2.unsubscribe();
        }
        if (this.subscription3 != null) {
            this.subscription3.unsubscribe();
        }
        if (this.subscription4 != null) {
            this.subscription4.unsubscribe();
        }
        if (this.subscription5 != null) {
            this.subscription5.unsubscribe();
        }
        if (this.subscription9 != null) {
            this.subscription9.unsubscribe();
        }
    };
    UserviewuserprofilePage.prototype.openCamera = function (squarez) {
        this.presentActionSheet();
        this.square = squarez;
    };
    UserviewuserprofilePage.prototype.removePic = function (squarez) {
        console.log("in remove pic 333333333          " + squarez);
        var itemArray = this.components.toArray();
        var itemArrayTwo = this.profComponents.toArray();
        console.log(JSON.stringify(itemArray) + " item array");
        this.myrenderer.setElementStyle(itemArray[squarez - 1].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(itemArrayTwo[squarez - 1].nativeElement, 'display', 'none');
        this.storage.set("profile" + squarez, null);
    };
    UserviewuserprofilePage.prototype.presentImage = function (squarez) {
        this.square = squarez;
        var itemArrayTwo = this.profComponents.toArray();
        console.log(JSON.stringify(itemArrayTwo[this.square - 1]));
        var imageViewer = this.imageViewerCtrl.create(itemArrayTwo[this.square - 1].nativeElement);
        imageViewer.present();
    };
    UserviewuserprofilePage.prototype.showSquare = function () {
        var itemArray = this.components.toArray();
        var itemArrayTwo = this.profComponents.toArray();
        this.myrenderer.setElementStyle(itemArray[this.square - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArrayTwo[this.square - 1].nativeElement, 'display', 'block');
    };
    UserviewuserprofilePage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose source',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        var itemArrayTwo = _this.profComponents.toArray();
                        _this.cameraService.getMedia(_this.optionsGetCamera, _this.square).then(function () {
                            return new Promise(function (resolve, reject) {
                                var storageRef = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.storage().ref().child('/profile/' + _this.username + '/profile_' + _this.username + '_' + _this.square + '.png');
                                var loading = _this.loadingController.create({ content: "Loading..." });
                                loading.present();
                                setTimeout(function () {
                                    storageRef.getDownloadURL().then(function (url) {
                                        console.log(url);
                                        _this.storage.set("profile" + _this.square, url);
                                        _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                                        _this.showSquare();
                                    });
                                    loading.dismiss();
                                }, 3000);
                            });
                        }); //pass in square choice
                        //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
                        console.log('camera clicked');
                    }
                }, {
                    text: 'Photo Library',
                    handler: function () {
                        var itemArrayTwo = _this.profComponents.toArray();
                        _this.cameraService.getMedia(_this.optionsGetMedia, _this.square).then(function () {
                            return new Promise(function (resolve, reject) {
                                var storageRef = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.storage().ref().child('/profile/' + _this.username + '/profile_' + _this.username + '_' + _this.square + '.png');
                                var loading = _this.loadingController.create({ content: "Loading..." });
                                loading.present();
                                setTimeout(function () {
                                    storageRef.getDownloadURL().then(function (url) {
                                        console.log(url);
                                        _this.storage.set("profile" + _this.square, url);
                                        _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                                        _this.showSquare();
                                        resolve();
                                    });
                                    loading.dismiss();
                                }, 3500);
                            });
                            //
                        }).catch(function (e) {
                            console.log(e + "       eeeee");
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
    UserviewuserprofilePage.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        //this.navCtrl.push(SignUpPage);
    };
    UserviewuserprofilePage.prototype.tappedPost = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__postpage_postpage__["a" /* PostpagePage */]);
    };
    UserviewuserprofilePage.prototype.tappedEmergency = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__booking_booking__["a" /* BookingPage */]);
    };
    UserviewuserprofilePage.prototype.goToSettings = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__settings_settings__["a" /* SettingsPage */]);
    };
    UserviewuserprofilePage.prototype.backToFeed = function () {
        /*if(this.navParams.get('param1') == 'user') {
          this.navCtrl.push(FeedUser);
        }*/
        //else {
        this.navCtrl.popToRoot({ animate: true, animation: 'transition', duration: 100, direction: 'back' });
        //this.navCtrl.push(FeedStylist);
        //}
    };
    UserviewuserprofilePage.prototype.backToCal = function () {
        //if(this.navParams.get('param1') == 'user') {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__booking_booking__["a" /* BookingPage */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'forward' });
        //this.navCtrl.push(BookingPage);
        //}
        //else {
        //this.navCtrl.push(FeedStylist);
        //}
    };
    UserviewuserprofilePage.prototype.swipe = function (e, when) {
        var coord = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        var time = new Date().getTime();
        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        }
        else if (when === 'end') {
            var direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            var duration = time - this.swipeTime;
            if (duration < 1000 //Short enough
                && Math.abs(direction[1]) < Math.abs(direction[0]) //Horizontal enough
                && Math.abs(direction[0]) > 30) {
                var swipe = direction[0] < 0 ? 'next' : 'previous';
                console.log(swipe);
                if (swipe == 'next') {
                    this.backToCal();
                }
                else {
                    this.backToFeed();
                }
                //Do whatever you want with swipe
            }
        }
    };
    UserviewuserprofilePage.prototype.swipeRight = function () {
        this.backToFeed();
    };
    UserviewuserprofilePage.prototype.downloadImages = function () {
        var self = this;
        var promises_array = [];
        var itemArrayTwo = this.profComponents.toArray();
        var itemArray = this.components.toArray();
        var _loop_1 = function (z) {
            self.storage.get("profile" + z).then(function (val) {
                if (val != null) {
                    self.myrenderer.setElementAttribute(itemArrayTwo[z - 1].nativeElement, 'src', val);
                    self.myrenderer.setElementStyle(itemArrayTwo[z - 1].nativeElement, 'display', 'block');
                    self.myrenderer.setElementStyle(itemArray[z - 1].nativeElement, 'display', 'none');
                    console.log(z);
                }
                //resolve();
            });
        };
        for (var z = 1; z < 10; z++) {
            _loop_1(z);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChildren"])('pluscontain'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["QueryList"])
    ], UserviewuserprofilePage.prototype, "components", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChildren"])('profsquare'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["QueryList"])
    ], UserviewuserprofilePage.prototype, "profComponents", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChildren"])('xclass'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["QueryList"])
    ], UserviewuserprofilePage.prototype, "xclass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('locationlisted'),
        __metadata("design:type", Object)
    ], UserviewuserprofilePage.prototype, "locationListed", void 0);
    UserviewuserprofilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-userviewuserprofile',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/userviewuserprofile/userviewuserprofile.html"*/'<ion-header (swiperight)="swipeRight()"> <!--(swiperight)="swipeRight()" (swipeleft)="swipeLeft()"-->\n  <ion-toolbar>\n    <ion-title>@{{username}}</ion-title>\n    <div class="gobackcontainer">\n    	<ion-icon (tap)="goBack()" name="arrow-back" id="customArrow" color="primary"></ion-icon>\n    </div>\n  </ion-toolbar>\n    <!--<div class="stylistview">\n	    <button class="stylistviewbutton" ion-button color="secondary">Stylist View</button>\n	  </div>-->\n</ion-header>\n\n<ion-content no-padding>\n<div (swiperight)="swipeRight()"> <!-- (swiperight)="swipeRight()" (swipeleft)="swipeLeft()"-->\n	<ion-item no-padding no-lines class="itemforprofile">\n		<div class="imageparent">\n		  <img class="postprofilepic" src="{{profilePic}}">\n		</div>\n	    <div class="rateandsocial">\n		    <!--<div class=\'ratecontain\'>\n			    <div class=\'stars\'>{{stars}}</div>\n			    <div class=\'ratings\'>({{totalRatings}} ratings)</div>\n			</div>-->\n		    <div class="social">\n				<div class="fb inlineblock">\n					<img src="img/facebook.png" (tap)=>\n				</div>\n				<div class="insta inlineblock">\n		  			<img src="img/instagram.png">\n				</div>\n			</div>\n		</div>\n	  	<div class="setlocationbox" >\n	    	<button class="" (tap)="makeCall()" ion-button color="tertiary">Call</button>\n	  	</div>\n	  	<div class=\'location\' #locationlisted>{{thoroughfare}}, {{locality}}</div> <!--{{thoroughfare}}, {{locality}}-->\n	  	<div class=\'stylistsect\'>\n			<div class="name">{{username}}</div>\n			<div class="bio">{{bio}}</div>\n		</div>\n		<!--<calendar (tap)=\'moveCover()\' class=\'cal\' [eventSource]="eventSource"\n	      [calendarMode]="calendar.mode"\n	      [currentDate]="calendar.currentDate"\n	      (onCurrentDateChanged)="onCurrentDateChanged($event)"\n	      (onRangeChanged)="reloadSource(startTime, endTime)"\n	      (onEventSelected)="onEventSelected($event)"\n	      (onTitleChanged)="onViewTitleChanged($event)"\n	      (onTimeSelected)="onTimeSelected($event)"\n	      step="30">\n	    </calendar>-->\n	</ion-item>\n	<ion-grid>\n	  <ion-item>Hair Goals</ion-item>\n	  <ion-row>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(1)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    \n	      	<img  (tap)="presentImage(1)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(2)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n	      <img  (tap)="presentImage(2)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(3)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n	      <img  (tap)="presentImage(3)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	  </ion-row>\n	  <ion-item>Current Hair</ion-item>\n	  <ion-row>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(4)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n	      <img  (tap)="presentImage(4)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(5)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n	      <img  (tap)="presentImage(5)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(6)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n	      <img  (tap)="presentImage(6)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	  </ion-row>\n	  <!--<ion-row>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(7)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n	      <img  (tap)="presentImage(7)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(8)"class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n	      <img  (tap)="presentImage(8)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain  (tap)="openCamera(9)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n	      <img  (tap)="presentImage(9)" class="imagesquare" #profsquare [src]="">\n	    </ion-col>\n	  </ion-row>-->\n	</ion-grid>\n</div>\n\n<!--<ion-fab bottom center >\n  <button ion-fab></button>\n  <ion-fab-list side="right">\n    <button class="textsizebutton" (tap)=\'tappedPost()\' ion-fab>Post</button>\n  </ion-fab-list>\n  <ion-fab-list side="left">\n    <button class="textsizebutton" (tap)=\'tappedEmergency()\' ion-fab><ion-icon name="alarm"></ion-icon></button>\n  </ion-fab-list>\n</ion-fab>-->\n</ion-content>'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/userviewuserprofile/userviewuserprofile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_14__ionic_native_call_number__["a" /* CallNumber */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_native_geocoder__["a" /* NativeGeocoder */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_10_ionic_img_viewer__["a" /* ImageViewerController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_8_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__services_cameraservice__["a" /* CameraService */]])
    ], UserviewuserprofilePage);
    return UserviewuserprofilePage;
}());

//# sourceMappingURL=userviewuserprofile.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormulapostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stylistprofile_stylistprofile__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_keyboard__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database_deprecated__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the PostpagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FormulapostPage = (function () {
    function FormulapostPage(af, viewCtrl, storage, keyboard, myrenderer, navCtrl, navParams) {
        this.af = af;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.keyboard = keyboard;
        this.myrenderer = myrenderer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.item = { 'date': null, 'title': '', 'price': '', 'caption': '', 'typeofselect': 'formula', 'description': '' };
    }
    FormulapostPage.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.subscription2.unsubscribe();
        this.subscription3.unsubscribe();
    };
    FormulapostPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.square = this.navParams.get("square");
        this.imageHolder = this.navParams.get("path");
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
    FormulapostPage.prototype.goToProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__stylistprofile_stylistprofile__["a" /* StylistProfile */], { square: this.square }, { animate: true, animation: 'transition', duration: 100, direction: 'back' });
    };
    FormulapostPage.prototype.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [day, month, year].join('-');
    };
    FormulapostPage.prototype.isFormula = function () {
        console.log();
        var metadata = {
            'formula': this.item.caption,
            'price': '3',
            'username': this.username,
            'url': this.imageHolder,
            'postdate': Date.now(),
            'square': this.square
        };
        var self = this;
        var database = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database();
        var bool = false;
        var reff = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref('/formulas').orderByChild('username').equalTo(this.username).on("value", function (snapshot) {
            snapshot.forEach(function (snapshot) {
                // key
                var key = snapshot.key;
                console.log("key: " + key);
                // value, could be object
                var childData = snapshot.val();
                console.log("data: " + JSON.stringify(childData));
                // Do what you want with these key/values here
                if (self.square == childData.square) {
                    var updates = {};
                    updates['/formulas/' + key] = metadata;
                    console.log("in self square childdata");
                    __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref().update(updates);
                    bool = true;
                    return true;
                }
            });
            if (!bool) {
                __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref('/formulas').push(metadata);
            }
        });
        /*this.af.list('/formulas', {query:{orderByChild:'username', equalTo:this.username}}).subscribe(items => items.forEach(item => {
   
            console.log("in subscription nowwwwww");
           
          })).unsubscribe();*/
        //this.navCtrl.pop();
        //this.list.push(metadata); 
    };
    FormulapostPage.prototype.shareItem = function () {
        console.log(this.item.title);
        console.log(this.item.caption);
        console.log(this.imageHolder + "                    **************************** src ****************");
        if (this.item.caption == '' || this.imageHolder == null) {
            alert("You need to fill in all of the information");
        }
        else {
            this.isFormula();
            this.navCtrl.pop();
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
    FormulapostPage.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        //this.navCtrl.push(SignUpPage);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('imagey'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FormulapostPage.prototype, "image", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('sharer'),
        __metadata("design:type", Object)
    ], FormulapostPage.prototype, "share", void 0);
    FormulapostPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-formulapost',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/formulapost/formulapost.html"*/'<!--\n  Generated template for the PostpagePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>New Formula</ion-title>\n    <ion-icon (tap)="goToProfile()" class=\'backk\' name="arrow-back"></ion-icon>\n    <!--<div class="stylistview">\n	    <button class="stylistviewbutton" ion-button color="secondary">Stylist View</button>\n	  </div>-->\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n	<div class="caption">\n		<div class="captione">\n			<div class=\'detailpictwo\'>\n				<h1>...</h1>\n			</div>\n			<div class="inputcaption">\n				<ion-input name=\'caption\' [(ngModel)]="item.caption" class="captioninput" type="text" placeholder="Write the formula..."></ion-input>\n				<div class="postimagecontain">\n					<img class="postimage" #imagey [src]="">\n				</div>\n			</div>\n		</div>\n	</div>\n	<button #sharer class="share" (tap)="shareItem()" ion-button full color="black">CREATE</button>\n</ion-content>\n'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/formulapost/formulapost.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
    ], FormulapostPage);
    return FormulapostPage;
}());

//# sourceMappingURL=formulapost.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FullfeedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__userprofile_userprofile__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_cache__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the FullfeedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FullfeedPage = (function () {
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
                    var storageRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
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
    FullfeedPage.prototype.gotoProfile = function (i) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__userprofile_userprofile__["a" /* UserProfile */], { username: i.username });
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
                    var storageRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
    ], FullfeedPage.prototype, "content", void 0);
    FullfeedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-fullfeed',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/fullfeed/fullfeed.html"*/'<!--\n  Generated template for the FullfeedPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content (swipeLeft)="swipeLeft()" no-padding>\n	<ion-list class="marginstatus" no-padding>      \n	   <ion-item *ngFor="let i of items" (tap)="gotoProfile(i)" no-padding no-lines>\n	    <div class="feedtoptextcontainer">\n	      <div class="imageparent">\n	        <img class="postprofilepic" src="{{i.picURL}}">\n	      </div>\n	      <div class="usernamecontainer">\n	        <h4 class="postusername">@{{i.username}}</h4><br>\n	        <!--<h4 class="poststudio">Ed\'s Studio</h4>-->\n	      </div>\n	      <div class="postprofilelink">\n	        <div class="book">{{i.title}}<!--</div><div style="display: inline-block">@edbundyhair--></div>\n	      </div>\n	    </div>\n	    <img class="imagepost" src="{{i.url}}">\n	    <div class=\'caption\'>\n	      {{i.caption}}\n	    </div>\n	    <br>\n	   </ion-item> \n	</ion-list>\n	<ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="show">\n	   <ion-infinite-scroll-content \n	      loadingSpinner="bubbles"\n	      loadingText="Loading more data..."\n	      threshold="1%">\n	   </ion-infinite-scroll-content>\n	</ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/fullfeed/fullfeed.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_cache__["b" /* CacheService */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
    ], FullfeedPage);
    return FullfeedPage;
}());

//# sourceMappingURL=fullfeed.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormulasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__formula_formula__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the FormulasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FormulasPage = (function () {
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__formula_formula__["a" /* FormulaPage */], {
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-formulas',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/formulas/formulas.html"*/'<!--\n  Generated template for the FormulasPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Formulas</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n	<div class="formula" *ngFor="let j of items ; let i = index" id=\'{{i}}\' (tap)="loadFolder(j.color)" no-lines no-padding>\n		<ion-grid>\n		  <ion-row>\n		    <ion-col>\n	  			<img src="{{j.url}}">\n	  			<div class="formulabar" #formulabar>{{j.color}}</div>\n	  		</ion-col>\n	  	 </ion-row>\n	  </ion-grid>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/formulas/formulas.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
    ], FormulasPage);
    return FormulasPage;
}());

//# sourceMappingURL=formulas.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormulaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the FormulaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FormulaPage = (function () {
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-formula',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/formula/formula.html"*/'<!--\n  Generated template for the FormulaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{color}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div class =\'contentone\'>\n   <ion-list no-padding>\n     <ion-item class="changepadding" *ngFor="let j of items ; let i = index" id=\'{{i}}\' text-wrap>\n      <div class="flex">\n        <div class="nonzoomimage">\n          <img class="imagepost" src="{{j.url}}">\n        </div>\n        <div class="descholder">\n          <div class=\'description\'>{{j.formula}}</div>\n        </div>\n      </div>\n     </ion-item>\n   </ion-list>\n   <!--<ion-infinite-scroll (ionInfinite)="$event.waitFor(doInfinite())">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more data...">\n    </ion-infinite-scroll-content>\n   </ion-infinite-scroll>-->\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/formula/formula.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
    ], FormulaPage);
    return FormulaPage;
}());

//# sourceMappingURL=formula.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_google_maps__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MapPage = (function () {
    function MapPage(googleMaps, navCtrl, navParams) {
        this.googleMaps = googleMaps;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    MapPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
    };
    MapPage.prototype.loadMap = function () {
        var _this = this;
        console.log("in loadMap");
        setTimeout(function () {
            var mapOptions = {
                camera: {
                    target: {
                        lat: 43.0741904,
                        lng: -89.3809802
                    },
                    zoom: 18,
                    tilt: 30
                }
            };
            _this.map = _this.googleMaps.create(_this.mapElement.nativeElement, mapOptions);
            // Wait the MAP_READY before using any methods.
            _this.map.one(__WEBPACK_IMPORTED_MODULE_0__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_READY)
                .then(function () {
                console.log('Map is ready!');
                // Now you can use all methods safely.
                _this.map.addMarker({
                    title: 'Ionic',
                    icon: 'blue',
                    animation: 'DROP',
                    position: {
                        lat: 43.0741904,
                        lng: -89.3809802
                    }
                })
                    .then(function (marker) {
                    marker.on(__WEBPACK_IMPORTED_MODULE_0__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MARKER_CLICK)
                        .subscribe(function () {
                        alert('clicked');
                    });
                });
            });
        }, 2000);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], MapPage.prototype, "mapElement", void 0);
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-map',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/map/map.html"*/'<!--\n  Generated template for the MapPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>map</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n	<div #map id="map"></div>\n</ion-content>\n'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/map/map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_native_google_maps__["a" /* GoogleMaps */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* NavParams */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 293:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 293;

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/booking/booking.module": [
		1233,
		10
	],
	"../pages/dropin/dropin.module": [
		1231,
		9
	],
	"../pages/followers/followers.module": [
		1232,
		8
	],
	"../pages/formula/formula.module": [
		1234,
		7
	],
	"../pages/formulapost/formulapost.module": [
		1235,
		6
	],
	"../pages/formulas/formulas.module": [
		1236,
		5
	],
	"../pages/fullfeed/fullfeed.module": [
		1237,
		4
	],
	"../pages/map/map.module": [
		1238,
		3
	],
	"../pages/postpage/postpage.module": [
		1239,
		2
	],
	"../pages/settings/settings.module": [
		1240,
		1
	],
	"../pages/userviewuserprofile/userviewuserprofile.module": [
		1241,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 336;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormulaBuy; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FormulaBuy = (function () {
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
            var database = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database();
            var bool = false;
            var self_1 = this;
            var reff = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/formulas').orderByChild('username').equalTo(this.username).on("value", function (snapshot) {
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
            var database = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database();
            var bool = false;
            var self_2 = this;
            var reff = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/formulas').orderByKey().equalTo(this.key).on("value", function (snapshot) {
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
        var reff = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/profiles/stylists').orderByChild('username').equalTo(this.username).on("value", function (snapshot) {
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
                    var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                        'Content-Type': 'application/json'
                    });
                    var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* RequestOptions */]({
                        headers: headers
                    });
                    // TODO: Encode the values using encodeURIComponent().
                    var body = JSON.stringify(_this.payload);
                    //INSERT CALL TO BACKEND
                    _this.http.post('http://192.168.1.131:8888/api/buyformula.php', body)
                        .subscribe(function (res) {
                        console.log(res + "response from formula buy");
                        console.log(JSON.stringify(_this.data) + "     data dat d dat add  dat");
                        _this.list.push(_this.data);
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'formula-buy',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/modals/formulabuy/formulabuy.html"*/'<ion-content class="main-view">\n	<div class="overlay" (tap)="dismiss()"></div>\n  <div class="modal_content">\n    <ion-item>\n        <ion-label>Pick a folder:</ion-label>\n        <ion-select [(ngModel)]="folder1">\n            <ion-option *ngFor="let j of items ; let i = index">{{j}}</ion-option>\n        </ion-select>\n    </ion-item>\n    <ion-item>\n        <ion-label>Create a folder:</ion-label>\n        <ion-input [(ngModel)]="folder2" type="text" name="foldercreate"></ion-input>\n    </ion-item>\n\n    <button ion-button (tap)="buy()" block>Buy</button>\n\n      <!--<header>\n        <h1>Payment Method</h1>\n      </header>\n\n      <form id="my-sample-form" (ngSubmit)="submitForm()">\n        <div class="cardinfo-card-number">\n          <ion-label class="cardinfo-label" for="card-number">Card Number</ion-label>\n          <ion-input class=\'input-wrapper\' id="card-number" type="text"></ion-input>\n          <div id="card-image"></div>\n        </div>\n\n        <div class="cardinfo-wrapper">\n          <div class="cardinfo-exp-date">\n            <ion-label class="cardinfo-label" for="expiration-date">Valid Thru</ion-label>\n            <ion-input class=\'input-wrapper\' id="expiration-date" type=\'text\'></ion-input>\n          </div>\n\n          <div class="cardinfo-cvv">\n            <ion-label class="cardinfo-label" for="cvv">CVV</ion-label>\n            <ion-input class=\'input-wrapper\' id="cvv" type=\'text\'></ion-input>\n          </div>\n        </div>\n      </form>\n\n      <input id="button-pay" type="submit" value="Continue" />-->\n\n\n      <!--<h1>Payment Method</h1>\n\n      <form id="my-sample-form" class="scale-down">\n        <div class="cardinfo-card-number">\n          <label class="cardinfo-label" for="card-number">Card Number</label>\n          <input class=\'input-wrapper\' id="card-number">\n          <div id="card-image"></div>\n        </div>\n\n        <div class="cardinfo-wrapper">\n          <div class="cardinfo-exp-date">\n            <label class="cardinfo-label" for="expiration-date">Valid Thru</label>\n            <input class=\'input-wrapper\' id="expiration-date">\n          </div>\n\n          <div class="cardinfo-cvv">\n            <label class="cardinfo-label" for="cvv">CVV</label>\n            <input class=\'input-wrapper\' id="cvv">\n          </div>\n        </div>\n      </form>\n\n      <input id="button-pay" type="submit" value="Continue" />-->\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/modals/formulabuy/formulabuy.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"]])
    ], FormulaBuy);
    return FormulaBuy;
}());

//# sourceMappingURL=formulabuy.js.map

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DepositPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DepositPage = (function () {
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
        var database = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database();
        var reff = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/profiles/stylists').orderByChild('username').equalTo(this.username).on("value", function (snapshot) {
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'deposit-page',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/modals/depositpage/depositpage.html"*/'<ion-content class="main-view">\n	<div class="overlay" (tap)="dismiss()"></div>\n  <div class="modal_content">\n    <div>\n        <ion-label>Enter the deposit amount:</ion-label>\n        <ion-item>\n          <ion-input [(ngModel)]="deposit" type="text" name="deposit"></ion-input>\n        </ion-item>\n    </div>\n\n    <button ion-button (tap)="buy()" block>Deposit</button>\n\n      <!--<header>\n        <h1>Payment Method</h1>\n      </header>\n\n      <form id="my-sample-form" (ngSubmit)="submitForm()">\n        <div class="cardinfo-card-number">\n          <ion-label class="cardinfo-label" for="card-number">Card Number</ion-label>\n          <ion-input class=\'input-wrapper\' id="card-number" type="text"></ion-input>\n          <div id="card-image"></div>\n        </div>\n\n        <div class="cardinfo-wrapper">\n          <div class="cardinfo-exp-date">\n            <ion-label class="cardinfo-label" for="expiration-date">Valid Thru</ion-label>\n            <ion-input class=\'input-wrapper\' id="expiration-date" type=\'text\'></ion-input>\n          </div>\n\n          <div class="cardinfo-cvv">\n            <ion-label class="cardinfo-label" for="cvv">CVV</ion-label>\n            <ion-input class=\'input-wrapper\' id="cvv" type=\'text\'></ion-input>\n          </div>\n        </div>\n      </form>\n\n      <input id="button-pay" type="submit" value="Continue" />-->\n\n\n      <!--<h1>Payment Method</h1>\n\n      <form id="my-sample-form" class="scale-down">\n        <div class="cardinfo-card-number">\n          <label class="cardinfo-label" for="card-number">Card Number</label>\n          <input class=\'input-wrapper\' id="card-number">\n          <div id="card-image"></div>\n        </div>\n\n        <div class="cardinfo-wrapper">\n          <div class="cardinfo-exp-date">\n            <label class="cardinfo-label" for="expiration-date">Valid Thru</label>\n            <input class=\'input-wrapper\' id="expiration-date">\n          </div>\n\n          <div class="cardinfo-cvv">\n            <label class="cardinfo-label" for="cvv">CVV</label>\n            <input class=\'input-wrapper\' id="cvv">\n          </div>\n        </div>\n      </form>\n\n      <input id="button-pay" type="submit" value="Continue" />-->\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/modals/depositpage/depositpage.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"]])
    ], DepositPage);
    return DepositPage;
}());

//# sourceMappingURL=depositpage.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraServiceProfile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_transfer__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CameraServiceProfile = (function () {
    function CameraServiceProfile(storage, transfer, http, platform, camera, crop, file) {
        this.storage = storage;
        this.transfer = transfer;
        this.http = http;
        this.platform = platform;
        this.camera = camera;
        this.crop = crop;
        this.file = file;
        this.http = http;
        //console.log(JSON.stringify(compress));
    }
    CameraServiceProfile.prototype.getFileEntryRead = function (fileURI, square) {
        var _this = this;
        var fileName = fileURI.substring(fileURI.lastIndexOf("/") + 1, fileURI.length);
        var filePath = fileURI.substring(8, fileURI.lastIndexOf("/"));
        this.file.listDir('file:///', filePath).then(function (files) {
            console.log(fileName);
            for (var i = 0; i < files.length; i++) {
                if (files[i]['name'] == fileName) {
                    _this.readFile(files[i], square);
                }
            }
        }).catch(function (err) {
            console.log(JSON.stringify(err));
        });
    };
    CameraServiceProfile.prototype.dataURItoBlob = function (dataURI, callback) {
        return new Promise(function (resolve, reject) {
            var byteString = atob(dataURI);
            //console.log(byteString);
            // separate out the mime component
            //let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            // write the ArrayBuffer to a blob, and you're done
            var bb = new Blob([ab], { type: 'image/jpeg' });
            resolve(bb);
        });
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    };
    CameraServiceProfile.prototype.readFile = function (fileEntry, square) {
        console.log('in readfile');
        var self = this;
        fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var dataURL = reader.result;
                var image = 'profile_' + self.username + '_' + square + '.png', storageRef, parseUpload;
                return new Promise(function (resolve, reject) {
                    storageRef = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.storage().ref('/profile/' + self.username + '/' + image);
                    parseUpload = storageRef.putString(dataURL, 'data_url');
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
                    //this.af.list('/profile/' + self.username).push({ pic: image });
                }).catch(function (error) {
                    console.log(error.message);
                });
            };
            reader.readAsDataURL(file);
        });
        //self.ng2ImgToolsService.compress([file], 1, false, false).subscribe(result => {
        //console.log(result + "this is result");
        /*var reader = new FileReader();

        reader.onload = (e) => {
          var dataURL = reader.result;

          let image       : string  = 'profile_' + self.username + '_' + square + '.jpg',
            storageRef  : any,
            parseUpload : any;

          return new Promise((resolve, reject) => {
            storageRef       = firebase.storage().ref('/profile/' + self.username + '/' + image);
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
            });
        }

        reader.readAsDataURL(file);*/
        /*}, error => {
            //something went wrong
            console.log(JSON.stringify(error));
            //use result.compressedFile or handle specific error cases individually
        });*/
        /*console.log(JSON.stringify(file));
  
        console.log(file.name + 'filename');
  
        var readerFirst = new FileReader();
  
        readerFirst.onload = (e) => {
          let data = readerFirst.result;
  
          console.log(file.name + "filename in readerfirst");
  
          // Construct a file
          //var newFile = this.file.writeFile(this.file.tempDirectory, file.name, strImage, true);
  
          /**/
        //let f = new File([""], file.name, {type:"image/jpeg", lastModifiedDate: file.lastModifiedDate});
        //readerFirst.readAsDataURL(file);
    };
    ;
    // Return a promise to catch errors while loading image
    CameraServiceProfile.prototype.getMedia = function (options, square, username) {
        //this.storage.get('username').then((val) => {this.username = val; console.log(this.username + "        getting usern34433245555555ame")});
        var _this = this;
        // Get Image from ionic-native's built in camera plugin
        return this.camera.getPicture(options)
            .then(function (fileUri) {
            // op Image, on android this returns something like, '/storage/emulated/0/Android/...'
            // Only giving an android example as ionic-native camera has built in cropping ability
            if (_this.platform.is('ios')) {
                return _this.crop.crop(fileUri, { quality: 2 });
            }
            else if (_this.platform.is('android')) {
                // Modify fileUri format, may not always be necessary
                fileUri = 'file://' + fileUri;
                /* Using cordova-plugin-crop starts here */
                return _this.crop.crop(fileUri, { quality: 2 });
            }
        })
            .then(function (newPath) {
            console.log(newPath);
            if (newPath) {
                var fileName = newPath.substring(newPath.lastIndexOf("/") + 1, newPath.length);
                var filePath = newPath.substring(0, newPath.lastIndexOf("/"));
                _this.file.readAsDataURL(filePath, fileName).then(function (data) {
                    //let strImage = data.replace(/^data:image\/[a-z]+;base64,/, "");
                    //this.file.writeFile(this.file.tempDirectory, "image.jpg", strImage);
                    //let blob = dataURItoBlob(data);
                    var dataURL = data;
                    console.log(username + "    this is passed usernameeeeeeeeee    ==");
                    var image = 'profilepicture.png', storageRef, parseUpload;
                    return new Promise(function (resolve, reject) {
                        storageRef = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.storage().ref('/settings/' + username + '/' + image);
                        parseUpload = storageRef.putString(dataURL, 'data_url');
                        console.log(username + "     username in promise  !!!!!!");
                        console.log("got to storageref after");
                        parseUpload.on('state_changed', function (_snapshot) {
                            // We could log the progress here IF necessary
                            console.log('snapshot progess ' + _snapshot);
                            for (var r in _snapshot) {
                                console.log(r + '           snapshot 6666665555555');
                            }
                        }, function (_err) {
                            reject(_err);
                            console.log(_err.messsage);
                        }, function (success) {
                            console.log(' was     a      suc    cesssssss');
                            resolve(parseUpload.snapshot);
                        });
                    }).then(function (value) {
                        //this.af.list('/profile/' + self.username).push({ pic: image });
                    }).catch(function (error) {
                        console.log(error.message);
                    });
                    //let file
                });
            }
        });
    };
    CameraServiceProfile = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_transfer__["a" /* Transfer */], __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__["a" /* Crop */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */]])
    ], CameraServiceProfile);
    return CameraServiceProfile;
}());

//# sourceMappingURL=cameraserviceprofile.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopUp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_userprofile_userprofile__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_sms__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PopUp = (function () {
    function PopUp(sms, callNumber, af, appCtrl, navCtrl, params, viewCtrl, renderer) {
        this.sms = sms;
        this.callNumber = callNumber;
        this.af = af;
        this.appCtrl = appCtrl;
        this.navCtrl = navCtrl;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
        //@ViewChild('salon') salon: ElementRef;
        //@ViewChild('time') time: ElementRef;
        this.info = { 'salon': '', 'time': '' };
    }
    PopUp.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.info.salon = this.params.get('salon');
        this.info.time = this.params.get('time');
        this.userdata = this.af.object('/profiles/stylists/' + this.info.salon);
        this.subscription = this.userdata.subscribe(function (item) {
            console.log(JSON.stringify(item) + "in modal thing");
            _this.phone = item.phone;
        });
        //this.renderer.setText(this.salon.nativeElement, "@"+this.params.get('salon'));
        //this.renderer.setText(this.time.nativeElement, this.params.get('time'));
    };
    PopUp.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    PopUp.prototype.smsFromPopup = function () {
        if (this.phone.toString().length < 11) {
            this.sms.send("1" + this.phone, 'Hi, I would like to talk about making an appointment!]');
        }
        else {
            this.sms.send(this.phone.toString(), 'Hi, I would like to talk about making an appointment!');
        }
    };
    PopUp.prototype.callFromPopup = function () {
        if (this.phone.toString().length < 11) {
            this.callNumber.callNumber("1" + this.phone, true)
                .then(function () { return console.log('Launched dialer!'); })
                .catch(function () { return console.log('Error launching dialer'); });
        }
        else {
            this.callNumber.callNumber(this.phone.toString(), true)
                .then(function () { return console.log('Launched dialer!'); })
                .catch(function () { return console.log('Error launching dialer'); });
        }
    };
    PopUp.prototype.viewProfile = function () {
        this.dismiss();
        this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__pages_userprofile_userprofile__["a" /* UserProfile */], {
            username: this.info.salon
        });
    };
    PopUp.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2 != null) {
            this.subscription2.unsubscribe();
        }
    };
    PopUp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'pop-up',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/modals/popup/popup.html"*/'<ion-content class="main-view">\n	<div class="overlay" (tap)="dismiss()"></div>\n  <div class="modal_content">\n    <div class="innerbox">\n    	<div class="titletext">\n    		<h3>Would you like to reserve this slot at: </h3>\n    		<h3 [(ngModel)]="info.salon" class=\'salon\' ngDefaultControl>@{{info.salon}}</h3>\n    		<h3> salon at</h3>\n    		<h3 [(ngModel)]="info.time" class=\'time\' ngDefaultControl>{{info.time}}</h3>\n    	</div>\n    	<div class="buttoncont">\n            <div class="inlineblock">\n                <div class="icon-container" (tap)="callFromPopup()">\n            		<ion-icon name="call" color="tertiary"></ion-icon>\n                </div>\n            </div>\n            <div class="inlineblock">\n                <div class="icon-container" (tap)="smsFromPopup()">\n                    <ion-icon name="text" color="tertiary"></ion-icon>\n                </div>\n            </div>\n    	</div>\n        <div class="buttoncont">\n            <button class="viewprofile" (tap)="viewProfile()" ion-button>Maybe later, view stylist profile ></button>\n        </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/modals/popup/popup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_sms__["a" /* SMS */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"]])
    ], PopUp);
    return PopUp;
}());

//# sourceMappingURL=popup.js.map

/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Rate = (function () {
    function Rate(af, navCtrl, params, viewCtrl, renderer) {
        this.af = af;
        this.navCtrl = navCtrl;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
        this.selected = 0;
    }
    Rate.prototype.ionViewDidLoad = function () {
        this.username = this.params.get('user');
        //this.renderer.setText(this.salon.nativeElement, "@"+this.params.get('salon'));
        //this.renderer.setText(this.time.nativeElement, this.params.get('time'));
    };
    Rate.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    Rate.prototype.star = function (number) {
        console.log("STAR WENT OFF");
        this.selected = number;
        if (number == 1) {
            console.log('changed element');
            if (this.star1.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
            }
            if (this.starfull1.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');
            }
        }
        if (number == 2) {
            if (this.star2.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
            }
            if (this.starfull2.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');
            }
        }
        if (number == 3) {
            if (this.star3.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
            }
            if (this.starfull3.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');
            }
        }
        if (number == 4) {
            if (this.star4.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'block');
            }
            if (this.starfull4.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');
            }
        }
        if (number == 5) {
            if (this.starfull5.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'block');
            }
            else {
                /*this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');*/
            }
        }
    };
    Rate.prototype.ngOnDestroy = function () {
        //this.subscription.unsubscribe();  
    };
    Rate.prototype.rate = function () {
        var _this = this;
        var added;
        var ratingObject;
        console.log(this.username + "       :::::IJOSDF:IJ:IJ:J I:IJ :::::           " + this.selected);
        this.item = this.af.object('/profiles/stylists/' + this.username);
        this.item.subscribe(function (snapshot) {
            console.log(JSON.stringify(snapshot));
            var object = snapshot;
            if (_this.selected == 1) {
                added = object.rating.one;
                added++;
                ratingObject = { 'rating': { "one": added, "two": snapshot.rating.two, "three": snapshot.rating.three,
                        "four": snapshot.rating.four, "five": snapshot.rating.five } };
            }
            if (_this.selected == 2) {
                added = object.rating.two;
                added++;
                ratingObject = { 'rating': { "one": snapshot.rating.one, "two": added, "three": snapshot.rating.three,
                        "four": snapshot.rating.four, "five": snapshot.rating.five } };
            }
            if (_this.selected == 3) {
                added = object.rating.three;
                added++;
                ratingObject = { 'rating': { "three": added, "two": snapshot.rating.two, "one": snapshot.rating.one,
                        "four": snapshot.rating.four, "five": snapshot.rating.five } };
            }
            if (_this.selected == 4) {
                added = object.rating.four;
                added++;
                ratingObject = { 'rating': { "three": snapshot.rating.three, "two": snapshot.rating.two, "one": snapshot.rating.one,
                        "four": added, "five": snapshot.rating.five } };
            }
            if (_this.selected == 5) {
                added = object.rating.five;
                added++;
                ratingObject = { 'rating': { "five": added, "two": snapshot.rating.two, "one": snapshot.rating.one,
                        "four": snapshot.rating.four, "three": snapshot.rating.three } };
            }
            //console.log(object.rating[select] +    "          obhjec;ijoa rating   ");
            //added = object.rating.select++;
        });
        this.item.update(ratingObject);
        this.dismiss();
        /*let object = {'username': this.items.username, 'password': this.items.password, 'email': this.items.email,
                      'address': this.items.address, 'bio': this.items.bio, 'price': this.items.price, 'picURL': this.items.picURL,
                      'rating': this.selected}
        this.items.update(this.username, object);*/
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('star1'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], Rate.prototype, "star1", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('star2'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], Rate.prototype, "star2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('star3'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], Rate.prototype, "star3", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('star4'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], Rate.prototype, "star4", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('star5'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], Rate.prototype, "star5", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('star1full'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], Rate.prototype, "starfull1", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('star2full'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], Rate.prototype, "starfull2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('star3full'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], Rate.prototype, "starfull3", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('star4full'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], Rate.prototype, "starfull4", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('star5full'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], Rate.prototype, "starfull5", void 0);
    Rate = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'rate-popup',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/modals/rate/rate.html"*/'<ion-content class="main-view">\n<div class="overlay" (tap)="dismiss()"></div>\n  <div class="modal_content"> <!-- (tap)="dismiss()"-->\n    <div class="innerbox">\n    	<div class="titletext">\n    		<h3>Rate: </h3>\n            <ion-grid>\n              <ion-row>\n                <ion-col (tap)="star(1)">\n                    <ion-icon #star1 name="star-outline"></ion-icon>\n                    <ion-icon #star1full name="star" color="primary" class="full"></ion-icon>\n                </ion-col>\n                <ion-col (tap)="star(2)">\n                    <ion-icon #star2 name="star-outline"></ion-icon>\n                    <ion-icon #star2full name="star" color="primary" class="full"></ion-icon>\n\n                </ion-col>\n                <ion-col (tap)="star(3)">\n                    <ion-icon #star3 name="star-outline"></ion-icon>\n                    <ion-icon #star3full name="star" color="primary" class="full"></ion-icon>\n\n                </ion-col>\n                <ion-col (tap)="star(4)">\n                    <ion-icon #star4 name="star-outline"></ion-icon>\n                    <ion-icon #star4full name="star" color="primary" class="full"></ion-icon>\n\n                </ion-col>\n                <ion-col (tap)="star(5)">\n                    <ion-icon #star5 name="star-outline"></ion-icon>\n                    <ion-icon #star5full name="star" color="primary" class="full"></ion-icon>\n\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n    	</div>\n        <div class="buttoncont">\n            <button class="reservebutton" ion-button (tap)="rate()" round>Rate</button>\n        </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/modals/rate/rate.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"]])
    ], Rate);
    return Rate;
}());

//# sourceMappingURL=rate.js.map

/***/ }),

/***/ 656:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopUpOther; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_userprofile_userprofile__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_sms__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PopUpOther = (function () {
    function PopUpOther(sms, callNumber, af, appCtrl, navCtrl, params, viewCtrl, renderer) {
        this.sms = sms;
        this.callNumber = callNumber;
        this.af = af;
        this.appCtrl = appCtrl;
        this.navCtrl = navCtrl;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
        //@ViewChild('salon') salon: ElementRef;
        //@ViewChild('time') time: ElementRef;
        this.info = { 'salon': '', 'time': '' };
    }
    PopUpOther.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.info.salon = this.params.get('salon');
        this.info.time = this.params.get('time');
        this.userdata = this.af.object('/profiles/stylists/' + this.info.salon);
        this.subscription = this.userdata.subscribe(function (item) {
            console.log(JSON.stringify(item) + "in modal thing");
            _this.phone = item.phone;
        });
        //this.renderer.setText(this.salon.nativeElement, "@"+this.params.get('salon'));
        //this.renderer.setText(this.time.nativeElement, this.params.get('time'));
    };
    PopUpOther.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    PopUpOther.prototype.smsFromPopup = function () {
        if (this.phone.toString().length < 11) {
            this.sms.send("1" + this.phone, 'Hi, I would like to talk about making an appointment!]');
        }
        else {
            this.sms.send(this.phone.toString(), 'Hi, I would like to talk about making an appointment!');
        }
    };
    PopUpOther.prototype.callFromPopup = function () {
        if (this.phone.toString().length < 11) {
            this.callNumber.callNumber("1" + this.phone, true)
                .then(function () { return console.log('Launched dialer!'); })
                .catch(function () { return console.log('Error launching dialer'); });
        }
        else {
            this.callNumber.callNumber(this.phone.toString(), true)
                .then(function () { return console.log('Launched dialer!'); })
                .catch(function () { return console.log('Error launching dialer'); });
        }
    };
    PopUpOther.prototype.viewProfile = function () {
        this.dismiss();
        this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__pages_userprofile_userprofile__["a" /* UserProfile */], {
            username: this.info.salon
        });
    };
    PopUpOther.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2 != null) {
            this.subscription2.unsubscribe();
        }
    };
    PopUpOther = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'pop-up-other',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/modals/popupother/popupother.html"*/'<ion-content class="main-view">\n  <div class="overlay" (tap)="dismiss()"></div>\n  <div class="modal_content">\n    <div class="innerbox">\n    	<div class="titletext">\n    		<h3>Would you like to reserve an appointment with </h3>\n    		<h3 [(ngModel)]="info.salon" class=\'salon\' ngDefaultControl>@{{info.salon}}</h3>\n    		<h3> salon?</h3>\n    	</div>\n    	<div class="buttoncont">\n            <div class="inlineblock">\n                <div class="icon-container" (tap)="callFromPopup()">\n            		<ion-icon name="call" color="tertiary"></ion-icon>\n                </div>\n            </div>\n            <div class="inlineblock">\n                <div class="icon-container" (tap)="smsFromPopup()">\n                    <ion-icon name="text" color="tertiary"></ion-icon>\n                </div>\n            </div>\n    	</div>\n        <div class="buttoncont">\n            <button class="viewprofile" (tap)="viewProfile()" ion-button>Maybe later, view stylist profile ></button>\n        </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/modals/popupother/popupother.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_sms__["a" /* SMS */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"]])
    ], PopUpOther);
    return PopUpOther;
}());

//# sourceMappingURL=popupother.js.map

/***/ }),

/***/ 659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signin_signin__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__feeduser_feeduser__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feedstylist_feedstylist__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_settings__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_facebook__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_google_plus__ = __webpack_require__(660);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};













var SignUpPage = (function () {
    function SignUpPage(loadingController, googlePlus, facebook, storage, afAuth, navCtrl, keyboard, af) {
        this.loadingController = loadingController;
        this.googlePlus = googlePlus;
        this.facebook = facebook;
        this.storage = storage;
        this.afAuth = afAuth;
        this.navCtrl = navCtrl;
        this.keyboard = keyboard;
        this.af = af;
        this.user1 = {};
        this.isLoggedIn = false;
        this.bool = false;
        this.boool = false;
    }
    SignUpPage.prototype.ionViewWillUnload = function () {
        this.navCtrl.pop();
    };
    SignUpPage.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var loading_1, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.bool) return [3 /*break*/, 1];
                        loading_1 = this.loadingController.create({ content: "Loading..." });
                        loading_1.present();
                        try {
                            //if(this.stylist) {
                            this.items = this.af.object('/profiles/stylists/' + this.user1.username);
                            this.subscription = this.items.subscribe(function (item) {
                                console.log(JSON.stringify(item) + "        this is the null");
                                console.log(JSON.stringify(_this.user1) + "        this is the user");
                                if (item.username == _this.user1.username) {
                                    //
                                }
                                else {
                                    _this.boool = true;
                                    console.log("turning thisbool true");
                                }
                            });
                            //}
                            //else if(this.users) {
                            this.items3 = this.af.object('/profiles/users/' + this.user1.username);
                            this.subscription3 = this.items3.subscribe(function (item) {
                                console.log(JSON.stringify(item) + "        this is the null");
                                if (item.username == _this.user1.username) {
                                    //
                                }
                                else {
                                    console.log("turning thisbool true");
                                    _this.boool = true;
                                }
                            });
                            //}
                            setTimeout(function () {
                                if (_this.boool) {
                                    if (_this.user1.email && _this.user1.password && _this.user1.username && (_this.stylist || _this.users)) {
                                        console.log('createuserwithemail above 999999');
                                        _this.afAuth.auth.createUserWithEmailAndPassword(_this.user1.email, _this.user1.password).then(function () {
                                            setTimeout(function () {
                                                console.log('createuserwithemail 88888');
                                                loading_1.dismiss();
                                                _this.setUserStylist(_this.user1);
                                            }, 1500);
                                        }).catch(function (e) {
                                            alert(e.message);
                                        });
                                    }
                                    else {
                                        loading_1.dismiss();
                                        alert("You need to fill in all the information");
                                    }
                                }
                                else {
                                    loading_1.dismiss();
                                    alert("This username is taken");
                                }
                            }, 1000);
                        }
                        catch (e) {
                            loading_1.dismiss();
                            alert(e.message);
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!(this.email && this.password && (this.stylist || this.users))) return [3 /*break*/, 4];
                        if (!!this.isLoggedIn) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)];
                    case 2:
                        result = _a.sent();
                        _a.label = 3;
                    case 3:
                        //console.log(result);
                        this.user1.username = this.username;
                        this.user1.email = this.email;
                        this.user1.password = this.password;
                        this.setUserStylist(this.user1);
                        return [3 /*break*/, 5];
                    case 4:
                        alert("You need to fill in all the information");
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        alert(e_1.message);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SignUpPage.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        if (this.subscription3 != null) {
            this.subscription3.unsubscribe();
        }
    };
    SignUpPage.prototype.setUserStylist = function (usery) {
        console.log(usery + "           in setuserstylist");
        var profile = { 'username': usery.username, 'password': usery.password,
            'email': usery.email, 'bio': "", 'address': "", 'type': "", 'rating': { 'one': '0', 'two': '0', 'three': '0', 'four': '0', 'five': '0' } };
        if (this.type == 'user' && this.users) {
            alert("You already have a user account");
        }
        else if (this.type == 'stylist' && this.stylist) {
            alert("You already have a stylist account");
        }
        else if (this.type == 'user/stylist/user' || this.type == 'user/stylist/stylist') {
            alert("You already have a user account and a stylist account");
        }
        else {
            if (this.users) {
                profile.type = "user";
                this.storage.set('username', usery.username);
                this.storage.set('password', usery.password);
                this.storage.set('email', usery.email);
                this.items2 = this.af.object('/profiles/users/' + this.user1.username);
                this.items2.update(profile);
                if (this.type == 'stylist' || this.type == 'user/stylist/stylist') {
                    this.storage.set('type', 'user/stylist/user');
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__settings_settings__["a" /* SettingsPage */], { type: 'user/stylist/user' });
                }
                else {
                    this.storage.set('type', 'user');
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__settings_settings__["a" /* SettingsPage */], { type: 'user' });
                }
                //TEST SAME USERNAME USER AND STYLIST!!S
            }
            else if (this.stylist) {
                profile.type = "stylist";
                console.log(JSON.stringify(usery) + "     : usery 55555555");
                this.storage.set('username', usery.username);
                this.storage.set('password', usery.password);
                this.storage.set('email', usery.email);
                console.log("in this.stylist choice");
                this.items2 = this.af.object('/profiles/stylists/' + this.user1.username);
                this.items2.update(profile);
                if (this.type == 'user' || this.type == 'user/stylist/user') {
                    this.storage.set('type', 'user/stylist/stylist');
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__settings_settings__["a" /* SettingsPage */], { type: 'user/stylist/stylist' });
                }
                else {
                    this.storage.set('type', 'stylist');
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__settings_settings__["a" /* SettingsPage */], { type: 'stylist' });
                }
            }
            else {
                alert("You need to select User or Stylist.");
            }
        }
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
    };
    SignUpPage.prototype.setUserStylistG = function (usery, email) {
        console.log(email + "           in setuserstylist email");
        var profile = { 'username': usery.username, 'password': usery.password,
            'email': email, 'bio': "", 'address': "", 'type': "", 'rating': { 'one': '0', 'two': '0', 'three': '0', 'four': '0', 'five': '0' } };
        if (this.type == 'user' && this.users) {
            alert("You already have a user account");
        }
        else if (this.type == 'stylist' && this.stylist) {
            alert("You already have a stylist account");
        }
        else if (this.type == 'user/stylist/user' || this.type == 'user/stylist/stylist') {
            alert("You already have a user account and a stylist account");
        }
        else {
            if (this.users) {
                profile.type = "user";
                this.storage.set('username', usery.username);
                this.storage.set('password', usery.password);
                this.storage.set('email', email);
                this.items.set(profile);
                if (this.type == 'stylist' || this.type == 'user/stylist/stylist') {
                    this.storage.set('type', 'user/stylist/user');
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__settings_settings__["a" /* SettingsPage */], { type: 'user/stylist/user' });
                }
                else {
                    this.storage.set('type', 'user');
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__settings_settings__["a" /* SettingsPage */], { type: 'user' });
                }
            }
            else if (this.stylist) {
                profile.type = "stylist";
                console.log(JSON.stringify(usery) + "     : usery 55555555");
                this.storage.set('username', usery.username);
                this.storage.set('password', usery.password);
                this.storage.set('email', usery.email);
                console.log("in this.stylist choice");
                this.items.set(profile);
                if (this.type == 'user' || this.type == 'user/stylist/user') {
                    this.storage.set('type', 'user/stylist/stylist');
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__settings_settings__["a" /* SettingsPage */], { type: 'user/stylist/stylist' });
                }
                else {
                    this.storage.set('type', 'stylist');
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__settings_settings__["a" /* SettingsPage */], { type: 'stylist' });
                }
            }
            else {
                alert("You need to select User or Stylist.");
            }
        }
    };
    SignUpPage.prototype.fbLogin = function (userx) {
        var _this = this;
        if (userx.username == null || userx.password == null) {
            alert("Please enter a username and password");
        }
        else {
            if (this.users || this.stylist) {
                return this.facebook.login(["email"])
                    .then(function (response) {
                    var facebookCredential = __WEBPACK_IMPORTED_MODULE_11_firebase___default.a.auth.FacebookAuthProvider
                        .credential(response.authResponse.accessToken);
                    __WEBPACK_IMPORTED_MODULE_11_firebase___default.a.auth().signInWithCredential(facebookCredential)
                        .then(function (success) {
                        console.log("Firebase success: " + JSON.stringify(success));
                        _this.setUserStylistG(userx, success.email);
                    }).catch(function (error) {
                        alert(error.message);
                    });
                }).catch(function (error) { console.log(error); });
            }
            else {
                alert("You need to select user or stylist");
            }
        }
    };
    SignUpPage.prototype.gLogin = function (userx) {
        var _this = this;
        var bool = false;
        var email;
        if (userx.username == null || userx.password == null) {
            alert("Please enter a username and password");
        }
        else {
            this.googlePlus.login({})
                .then(function (res) {
                __WEBPACK_IMPORTED_MODULE_11_firebase___default.a.auth().signInWithCredential(__WEBPACK_IMPORTED_MODULE_11_firebase___default.a.auth.GoogleAuthProvider.credential(res.idToken))
                    .then(function (success) {
                    console.log("Firebase success: " + JSON.stringify(success));
                    bool = true;
                    email = success.email;
                }).catch(function (error) { return console.log("Firebase failure: " + JSON.stringify(error)); });
            }).catch(function (err) { return alert(err.message); });
            setTimeout(function () {
                if (bool) {
                    _this.setUserStylistG(userx, email);
                }
            }, 3000);
        }
    };
    SignUpPage.prototype.ionViewDidLoad = function () {
        //TAKE OUT!!!!!!!!
        //this.storage.set('email', '');
        //this.storage.set('type', '');
        //this.storage.set('password', '');
        var _this = this;
        this.subscription = this.afAuth.authState.subscribe(function (data) {
            if (data != null) {
                if (data.email && data.uid) {
                    console.log("logged in");
                    _this.isLoggedIn = true;
                }
            }
        });
        this.storage.get('type').then(function (val) {
            if (val == null) {
                _this.bool = true;
            }
            else {
                _this.type = val;
            }
        });
        this.storage.get('email').then(function (val) {
            _this.email = val;
        });
        this.storage.get('password').then(function (val) {
            _this.password = val;
        });
        this.storage.get('username').then(function (val) {
            _this.username = val;
        });
    };
    SignUpPage.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signin_signin__["a" /* SignInPage */]);
    };
    SignUpPage.prototype.goButton = function (code) {
        console.log(code);
        if (code == 13) {
            this.keyboard.close();
        }
    };
    SignUpPage.prototype.selectOneStylist = function () {
        if (this.users) {
            this.users = false;
        }
    };
    SignUpPage.prototype.selectOneUser = function () {
        if (this.stylist) {
            this.stylist = false;
        }
    };
    SignUpPage.prototype.loadNext = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        if (this.users) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__feeduser_feeduser__["a" /* FeedUser */]);
        }
        if (this.stylist) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__feedstylist_feedstylist__["a" /* FeedStylist */]);
        }
    };
    SignUpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sign-up',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/signup/signup.html"*/'<ion-content padding>\n  <!--<div class="stylistview">\n    <button class="stylistviewbutton" ion-button color="secondary">Stylist View</button>\n  </div>-->\n  <br>\n  <div class="signup">\n    <h3>Sign Up</h3>\n  </div>\n  <form (ngSubmit)="logForm()">\n    <br>\n    <ion-label stacked>Username</ion-label>\n  	<ion-input type="text" (keypress)="goButton($event.keyCode)" [(ngModel)]="user1.username" name="username"></ion-input> <!--[(ngModel)]="user.username"-->\n  	<br>\n    <ion-label stacked>Password</ion-label>\n    <ion-input type="text" (keypress)="goButton($event.keyCode)" [(ngModel)]="user1.password" name="password"></ion-input>\n    <br>\n    <ion-label stacked>Email Address</ion-label>\n    <ion-input type="text" (keypress)="goButton($event.keyCode)" [(ngModel)]="user1.email" name="email"></ion-input> <!--[(ngModel)]="user.username" name="password"-->\n    <p class="or">or</p>\n    <div class="oauth">\n      <div class="fbimagecont">\n        <img src="assets/facebook.png" (tap)="fbLogin(user)">\n      </div>\n      <div class="gimagecont">\n        <img src="assets/google.png" (tap)="gLogin(user)">\n      </div>\n      <div class="instacont">\n        <img src="assets/instagram.png" (tap)="instaLogin(user)">\n      </div>\n    </div>\n    <div class="flex">\n      <div id=\'labelone\' class=\'labelz\'>\n        <ion-label stacked>Stylist</ion-label>\n        <ion-checkbox [(ngModel)]="stylist" name="stylist" class="moveleft" (tap)="selectOneStylist()"></ion-checkbox>\n      </div>\n      <div id=\'labeltwo\' class=\'labelz\'>\n        <ion-label id="labelstacktwo" stacked>User</ion-label>\n        <ion-checkbox [(ngModel)]="users" name="user" class="moveleftuser" (tap)="selectOneUser()"></ion-checkbox> <!--[(ngModel)]="mushrooms"-->\n      </div>\n    </div>\n    <!--<br><br><br><br>-->\n  </form>\n  <div class="signincontainer" style="text-align: center;">\n    <button class="next" type="submit" ion-button round color="tertiary" (tap)="register()">Next</button>\n  </div>\n  <p>Already have an account? <a (click)="pushPage()">Sign In</a></p>\n</ion-content>\n'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/signup/signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_7_angularfire2_database_deprecated__["a" /* AngularFireDatabase */]])
    ], SignUpPage);
    return SignUpPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 662:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuyAd; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sms__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BuyAd = (function () {
    //@ViewChild('salon') salon: ElementRef;
    //@ViewChild('time') time: ElementRef;
    //info = {'salon':'','time':''};
    //userdata: FirebaseObjectObservable<any>;
    //userdata2: FirebaseObjectObservable<any>;
    //subscription: ISubscription;
    //subscription2: ISubscription;
    //phone: string;
    function BuyAd(sms, callNumber, af, appCtrl, navCtrl, params, viewCtrl, renderer) {
        this.sms = sms;
        this.callNumber = callNumber;
        this.af = af;
        this.appCtrl = appCtrl;
        this.navCtrl = navCtrl;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
    }
    BuyAd.prototype.ionViewDidLoad = function () {
        //this.info.salon = this.params.get('salon');
        //this.info.time = this.params.get('time');
        //this.userdata = this.af.object('/profiles/stylists/' + this.info.salon);
        //this.subscription = this.userdata.subscribe(item => {
        //this.phone = item.phone;
        //});
        //this.renderer.setText(this.salon.nativeElement, "@"+this.params.get('salon'));
        //this.renderer.setText(this.time.nativeElement, this.params.get('time'));
    };
    BuyAd.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    BuyAd.prototype.smsFromPopup = function () {
        //if(this.phone.toString().length < 11) {
        this.sms.send("18608491429", 'Hi, I would like to talk about buying an ad!');
    };
    BuyAd.prototype.callFromPopup = function () {
        this.callNumber.callNumber("18608491429", true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    BuyAd = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'buy-ad',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/modals/buyad/buyad.html"*/'<ion-content class="main-view">\n  <div class="overlay" (tap)="dismiss()"></div>\n  <div class="modal_content">\n    <div class="innerbox">\n    	<div class="titletext">\n    		<h3>BUY AN AD! Call or text below.</h3>\n    	</div>\n    	<div class="buttoncont">\n            <div class="inlineblock">\n                <div class="icon-container" (tap)="callFromPopup()">\n            		<ion-icon name="call" color="tertiary"></ion-icon>\n                </div>\n            </div>\n            <div class="inlineblock">\n                <div class="icon-container" (tap)="smsFromPopup()">\n                    <ion-icon name="text" color="tertiary"></ion-icon>\n                </div>\n            </div>\n    	</div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/modals/buyad/buyad.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_sms__["a" /* SMS */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"]])
    ], BuyAd);
    return BuyAd;
}());

//# sourceMappingURL=buyad.js.map

/***/ }),

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_web_animations_js_web_animations_min__ = __webpack_require__(715);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_web_animations_js_web_animations_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_web_animations_js_web_animations_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(716);



Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 716:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(703);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(704);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(1220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_signin_signin__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_signup_signup__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_feedstylist_feedstylist__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_feeduser_feeduser__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_postpage_postpage__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__ = __webpack_require__(1221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_stylistprofile_stylistprofile__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_booking_booking__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_settings_settings__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_userprofile_userprofile__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_userbooking_userbooking__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_userviewprofile_userviewprofile__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_followers_followers__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_formulapost_formulapost__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_formulas_formulas__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_formula_formula__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_dropin_dropin__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_userviewuserprofile_userviewuserprofile__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ngx_swiper_wrapper__ = __webpack_require__(1223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ngx_swiper_wrapper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_ngx_swiper_wrapper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_fullfeed_fullfeed__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ionic2_calendar__ = __webpack_require__(663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_keyboard__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_angularfire2__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_angularfire2_auth__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_angularfire2_database__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_transfer__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_crop__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_file__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__services_cameraservice__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__services_cameraservicepost__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__services_cameraserviceprofile__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_ionic_img_viewer__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_facebook__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ionic_native_google_plus__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__modals_popup_popup__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__modals_popupother_popupother__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__modals_formulabuy_formulabuy__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__modals_depositpage_depositpage__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__modals_buyad_buyad__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__modals_rate_rate__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49_ionic_image_loader__ = __webpack_require__(1227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__ionic_native_native_geocoder__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ionic_native_geolocation__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ionic_native_diagnostic__ = __webpack_require__(657);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__ionic_native_location_accuracy__ = __webpack_require__(1229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__ionic_native_call_number__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__ionic_native_sms__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_map_map__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__ionic_native_google_maps__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58_ionic_cache__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__ionic_native_screen_orientation__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60_ngx_infinite_scroll__ = __webpack_require__(1230);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




























// Import the AF2 Module



//import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';




















//import { DatePicker } from '@ionic-native/date-picker';











//import { Ng2ImgMaxModule } from 'ng2-img-max'; // <-- import the module
var firebaseConfig = {
    apiKey: "AIzaSyC1pFZzY3w0zT7hB2hcc6zhLwYgaK0MhvQ",
    authDomain: "mane-4152c.firebaseapp.com",
    databaseURL: "https://mane-4152c.firebaseio.com",
    projectId: "mane-4152c",
    storageBucket: "mane-4152c.appspot.com",
    messagingSenderId: "446057524325"
};
var SWIPER_CONFIG = {
    direction: 'horizontal',
    slidesPerView: '4',
    keyboardControl: false
};
//firebase.initializeApp(firebaseConfig);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_signin_signin__["a" /* SignInPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_signup_signup__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_feedstylist_feedstylist__["a" /* FeedStylist */],
                __WEBPACK_IMPORTED_MODULE_9__pages_feeduser_feeduser__["a" /* FeedUser */],
                __WEBPACK_IMPORTED_MODULE_12__pages_stylistprofile_stylistprofile__["a" /* StylistProfile */],
                __WEBPACK_IMPORTED_MODULE_10__pages_postpage_postpage__["a" /* PostpagePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_booking_booking__["a" /* BookingPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_userbooking_userbooking__["a" /* UserBooking */],
                __WEBPACK_IMPORTED_MODULE_43__modals_popup_popup__["a" /* PopUp */],
                __WEBPACK_IMPORTED_MODULE_44__modals_popupother_popupother__["a" /* PopUpOther */],
                __WEBPACK_IMPORTED_MODULE_47__modals_buyad_buyad__["a" /* BuyAd */],
                __WEBPACK_IMPORTED_MODULE_45__modals_formulabuy_formulabuy__["a" /* FormulaBuy */],
                __WEBPACK_IMPORTED_MODULE_46__modals_depositpage_depositpage__["a" /* DepositPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_userprofile_userprofile__["a" /* UserProfile */],
                __WEBPACK_IMPORTED_MODULE_48__modals_rate_rate__["a" /* Rate */],
                __WEBPACK_IMPORTED_MODULE_17__pages_userviewprofile_userviewprofile__["a" /* UserViewProfile */],
                __WEBPACK_IMPORTED_MODULE_18__pages_followers_followers__["a" /* FollowersPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_userviewuserprofile_userviewuserprofile__["a" /* UserviewuserprofilePage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_fullfeed_fullfeed__["a" /* FullfeedPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_formulapost_formulapost__["a" /* FormulapostPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_formulas_formulas__["a" /* FormulasPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_formula_formula__["a" /* FormulaPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_dropin_dropin__["a" /* DropinPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/dropin/dropin.module#DropinPageModule', name: 'DropinPage', segment: 'dropin', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/followers/followers.module#FollowersPageModule', name: 'FollowersPage', segment: 'followers', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/booking/booking.module#BookingPageModule', name: 'BookingPage', segment: 'booking', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/formula/formula.module#FormulaPageModule', name: 'FormulaPage', segment: 'formula', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/formulapost/formulapost.module#FormulapostPageModule', name: 'FormulapostPage', segment: 'formulapost', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/formulas/formulas.module#FormulasPageModule', name: 'FormulasPage', segment: 'formulas', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/fullfeed/fullfeed.module#FullfeedPageModule', name: 'FullfeedPage', segment: 'fullfeed', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/map/map.module#MapPageModule', name: 'MapPage', segment: 'map', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/postpage/postpage.module#PostpagePageModule', name: 'PostpagePage', segment: 'postpage', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/userviewuserprofile/userviewuserprofile.module#UserviewuserprofilePageModule', name: 'UserviewuserprofilePage', segment: 'userviewuserprofile', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_38__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_26_ionic2_calendar__["a" /* NgCalendarModule */],
                __WEBPACK_IMPORTED_MODULE_28_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_30_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_29_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_39_ionic_img_viewer__["b" /* IonicImageViewerModule */],
                __WEBPACK_IMPORTED_MODULE_40__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_49_ionic_image_loader__["a" /* IonicImageLoader */],
                __WEBPACK_IMPORTED_MODULE_24_ngx_swiper_wrapper__["SwiperModule"].forRoot(SWIPER_CONFIG),
                __WEBPACK_IMPORTED_MODULE_58_ionic_cache__["a" /* CacheModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_60_ngx_infinite_scroll__["a" /* InfiniteScrollModule */]
                //Ng2ImgMaxModule
                /*CalendarModule.forRoot()*/
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_signin_signin__["a" /* SignInPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_signup_signup__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_feedstylist_feedstylist__["a" /* FeedStylist */],
                __WEBPACK_IMPORTED_MODULE_9__pages_feeduser_feeduser__["a" /* FeedUser */],
                __WEBPACK_IMPORTED_MODULE_12__pages_stylistprofile_stylistprofile__["a" /* StylistProfile */],
                __WEBPACK_IMPORTED_MODULE_10__pages_postpage_postpage__["a" /* PostpagePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_booking_booking__["a" /* BookingPage */],
                __WEBPACK_IMPORTED_MODULE_43__modals_popup_popup__["a" /* PopUp */],
                __WEBPACK_IMPORTED_MODULE_44__modals_popupother_popupother__["a" /* PopUpOther */],
                __WEBPACK_IMPORTED_MODULE_47__modals_buyad_buyad__["a" /* BuyAd */],
                __WEBPACK_IMPORTED_MODULE_45__modals_formulabuy_formulabuy__["a" /* FormulaBuy */],
                __WEBPACK_IMPORTED_MODULE_46__modals_depositpage_depositpage__["a" /* DepositPage */],
                __WEBPACK_IMPORTED_MODULE_48__modals_rate_rate__["a" /* Rate */],
                __WEBPACK_IMPORTED_MODULE_14__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_userprofile_userprofile__["a" /* UserProfile */],
                __WEBPACK_IMPORTED_MODULE_16__pages_userbooking_userbooking__["a" /* UserBooking */],
                __WEBPACK_IMPORTED_MODULE_17__pages_userviewprofile_userviewprofile__["a" /* UserViewProfile */],
                __WEBPACK_IMPORTED_MODULE_18__pages_followers_followers__["a" /* FollowersPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_userviewuserprofile_userviewuserprofile__["a" /* UserviewuserprofilePage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_fullfeed_fullfeed__["a" /* FullfeedPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_formulapost_formulapost__["a" /* FormulapostPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_formulas_formulas__["a" /* FormulasPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_formula_formula__["a" /* FormulaPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_dropin_dropin__["a" /* DropinPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_35__services_cameraservice__["a" /* CameraService */],
                __WEBPACK_IMPORTED_MODULE_36__services_cameraservicepost__["a" /* CameraServicePost */],
                __WEBPACK_IMPORTED_MODULE_37__services_cameraserviceprofile__["a" /* CameraServiceProfile */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_crop__["a" /* Crop */],
                __WEBPACK_IMPORTED_MODULE_34__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_39_ionic_img_viewer__["a" /* ImageViewerController */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_42__ionic_native_google_plus__["a" /* GooglePlus */],
                //DatePicker,
                __WEBPACK_IMPORTED_MODULE_50__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
                __WEBPACK_IMPORTED_MODULE_51__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_52__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_53__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_54__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_55__ionic_native_sms__["a" /* SMS */],
                __WEBPACK_IMPORTED_MODULE_57__ionic_native_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_59__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StylistProfile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__booking_booking__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__postpage_postpage__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__formulapost_formulapost__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_settings__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_cameraservice__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_img_viewer__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














//import { IonicApp, IonicModule } from 'ionic-angular';
//import { MyApp } from './app/app.component';
var StylistProfile = (function () {
    function StylistProfile(myrenderer2, navParams, elRef, storage, imageViewerCtrl, loadingController, /*public firebase: FirebaseApp, */ myrenderer, af, actionSheetCtrl, camera, navCtrl, cameraService) {
        this.myrenderer2 = myrenderer2;
        this.navParams = navParams;
        this.elRef = elRef;
        this.storage = storage;
        this.imageViewerCtrl = imageViewerCtrl;
        this.loadingController = loadingController;
        this.myrenderer = myrenderer;
        this.af = af;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.cameraService = cameraService;
        this.viewDate = new Date();
        this.events = [];
        this.calendar = { 'mode': 'month', 'currentDate': this.viewDate };
        this.moveState = 'up';
        this.picURLS = [];
        this.square = 0;
        this.datesToSelect = [];
        this.optionsGetMedia = {
            //allowEdit: false,
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
        };
        this.times = [{ 'time': '8:00 AM', 'selected': false }, { 'time': '12:00 PM', 'selected': false }, { 'time': '4:00 PM', 'selected': false },
            { 'time': '8:30 AM', 'selected': false }, { 'time': '12:30 PM', 'selected': false }, { 'time': '4:30 PM', 'selected': false },
            { 'time': '9:00 AM', 'selected': false }, { 'time': '1:00 PM', 'selected': false }, { 'time': '5:00 PM', 'selected': false },
            { 'time': '9:30 AM', 'selected': false }, { 'time': '1:30 PM', 'selected': false }, { 'time': '5:30 PM', 'selected': false },
            { 'time': '10:00 AM', 'selected': false }, { 'time': '2:00 PM', 'selected': false }, { 'time': '6:00 PM', 'selected': false },
            { 'time': '10:30 AM', 'selected': false }, { 'time': '2:30 PM', 'selected': false }, { 'time': '6:30 PM', 'selected': false },
            { 'time': '11:00 AM', 'selected': false }, { 'time': '3:00 PM', 'selected': false }, { 'time': '7:00 PM', 'selected': false },
            { 'time': '11:30 AM', 'selected': false }, { 'time': '3:30 PM', 'selected': false }, { 'time': '7:30 PM', 'selected': false }
        ];
    }
    StylistProfile.prototype.ionViewDidEnter = function () {
        //let loading = this.loadingController.create({content : "Loading..."});
        //loading.present();
    };
    StylistProfile.prototype.getFollowers = function () {
    };
    StylistProfile.prototype.downloadImages = function () {
        var self = this;
        var promises_array = [];
        var itemArrayTwo = this.profComponents.toArray();
        var itemArray = this.components.toArray();
        var itemArraythree = this.xclass.toArray();
        var itemArrayfour = this.formulaBars.toArray();
        var _loop_1 = function (z) {
            //promises_array.push(new Promise(function(resolve,reject) {
            //let storageRef = firebase.storage().ref().child('/profile/'+ self.username + '/profile_' + self.username + '_' + z + '.png');
            //storageRef.getDownloadURL().then(url => {
            self.storage.get("profile" + z).then(function (val) {
                if (val != null) {
                    self.myrenderer.setElementAttribute(itemArrayTwo[z - 1].nativeElement, 'src', val);
                    self.myrenderer.setElementStyle(itemArrayTwo[z - 1].nativeElement, 'display', 'block');
                    self.myrenderer.setElementStyle(itemArray[z - 1].nativeElement, 'display', 'none');
                    self.myrenderer.setElementStyle(itemArraythree[z - 1].nativeElement, 'display', 'block');
                    console.log(z);
                }
                //resolve();
            });
            self.storage.get("formula" + z).then(function (val) {
                if (val != null) {
                    self.myrenderer.setElementAttribute(itemArrayTwo[z - 1].nativeElement, 'src', val);
                    self.myrenderer2.addClass(itemArrayTwo[z - 1].nativeElement, 'formula');
                    self.myrenderer.setElementStyle(itemArrayTwo[z - 1].nativeElement, 'display', 'block');
                    self.myrenderer.setElementStyle(itemArray[z - 1].nativeElement, 'display', 'none');
                    self.myrenderer.setElementStyle(itemArraythree[z - 1].nativeElement, 'display', 'block');
                    self.myrenderer.setElementStyle(itemArrayfour[z - 1].nativeElement, 'display', 'flex');
                    console.log(z);
                }
                //resolve();
            });
            /*}).catch(error => {
              console.log(error.message);
              resolve();*/
            //}));
        };
        for (var z = 1; z < 10; z++) {
            _loop_1(z);
        }
        //return Promise.all(promises_array);
    };
    StylistProfile.prototype.ionViewDidUnload = function () {
    };
    StylistProfile.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.square2 = this.navParams.get("square");
        if (this.square2 != null) {
            this.removePicFormula(this.square2);
        }
        this.storage.get('bio').then(function (val) {
            _this.bio = val;
        });
        this.storage.get('username').then(function (val) {
            _this.username = val;
            console.log(val);
            _this.downloadImages();
            _this.item2 = _this.af.object('/profiles/stylists/' + _this.username + '/followers');
            _this.subscription5 = _this.item2.subscribe(function (item) {
                console.log(JSON.stringify(item) + "      followers number 98989899889");
                if (Object.keys(item)[0] == '$value') {
                    _this.followers = 0;
                }
                else {
                    _this.followers = item.length;
                }
            });
            _this.item9 = _this.af.object('/profiles/stylists/' + _this.username);
            _this.subscription9 = _this.item9.subscribe(function (item) {
                console.log(JSON.stringify(item) + "      rating number 989898222229889");
                var total = 0;
                for (var u in item.rating) {
                    total += item.rating[u];
                }
                _this.totalRatings = total;
                var totalPotential = item.rating.one * 5 + item.rating.two * 5 + item.rating.three * 5 + item.rating.four * 5 + item.rating.five * 5;
                var ratings = item.rating.one + item.rating.two * 2 + item.rating.three * 3 + item.rating.four * 4 + item.rating.five * 5;
                console.log(ratings + "   ratings          total potential:    " + totalPotential);
                if (ratings == 0 && totalPotential == 0) {
                    _this.stars = '\u2606\u2606\u2606\u2606\u2606';
                }
                var i = (ratings / totalPotential) * 100;
                if (Math.round(i) <= 20) {
                    _this.stars = '\u2605\u2606\u2606\u2606\u2606';
                }
                if (Math.round(i) > 20 && Math.round(i) <= 40) {
                    _this.stars = '\u2605\u2605\u2606\u2606\u2606';
                }
                if (Math.round(i) > 40 && Math.round(i) <= 60) {
                    _this.stars = '\u2605\u2605\u2605\u2606\u2606';
                }
                if (Math.round(i) > 60 && Math.round(i) <= 80) {
                    _this.stars = '\u2605\u2605\u2605\u2605\u2606';
                }
                if (Math.round(i) > 80) {
                    _this.stars = '\u2605\u2605\u2605\u2605\u2605';
                }
            });
        });
        this.storage.get('picURL').then(function (val) {
            _this.profilePic = val;
            if (_this.profilePic == null) {
                _this.profilePic = 'assets/blankprof.png';
            }
        });
        //this.isSomething = true;
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        console.log(this.viewDate + " view date ");
        setTimeout(function () {
            _this.selectedDate = _this.viewDate;
            console.log(_this.username + "this.username");
            _this.items2 = _this.af.list('appointments/' + _this.username + '/' + _this.selectedDate.getMonth());
            _this.subscription2 = _this.items2.subscribe(function (items) {
                var mapped = items.map(function (item) {
                    return new Promise(function (resolve, reject) {
                        //console.log(JSON.stringify(item));
                        //console.log(item.date.day);
                        var boool = false;
                        var da = new Date(item.date.day * 1000);
                        console.log(da + "da");
                        console.log(da.getDate() + "dagetdate");
                        console.log(_this.selectedDate.getDate());
                        if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                            console.log("selected = item");
                            console.log(JSON.stringify(item.reserved) + "         item resesrved above");
                            _this.times = item.reserved.appointment.slice(0);
                            console.log('hit appointment');
                            resolve();
                        }
                        else {
                            resolve();
                        }
                        for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                            var r = _a[_i];
                            console.log(" in r of item.reserved.appointment");
                            if (r.selected == true) {
                                boool = true;
                            }
                        }
                        if (boool) {
                            console.log("in bool twice in bool once");
                            _this.datesToSelect.push(da.getDate());
                        }
                    });
                });
                Promise.all(mapped).then(function () {
                    for (var _i = 0, _a = _this.tds; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (!item.classList.contains('text-muted')) {
                            console.log(JSON.stringify(_this.datesToSelect));
                            if (_this.datesToSelect.indexOf(parseInt(item.innerText)) != -1) {
                                console.log("Inner text in      " + item.innerText);
                                _this.myrenderer.setElementClass(item, "greencircle", true);
                            }
                            else {
                                //this.myrenderer.setElementClass(item,"monthview-selected",false);
                            }
                        }
                    }
                });
            });
            //loading.dismiss();
        }, 1500);
    };
    StylistProfile.prototype.ngOnDestroy = function () {
        this.subscription2.unsubscribe();
        if (this.subscription3 != null) {
            this.subscription3.unsubscribe();
        }
        this.subscription4.unsubscribe();
        this.subscription5.unsubscribe();
        this.subscription9.unsubscribe();
    };
    StylistProfile.prototype.openCamera = function (squarez) {
        this.presentActionSheet2();
        this.square = squarez;
    };
    StylistProfile.prototype.removePic = function (squarez) {
        var _this = this;
        console.log("in remove pic 333333333          " + squarez);
        var itemArray = this.components.toArray();
        var itemArrayTwo = this.profComponents.toArray();
        var itemArraythree = this.xclass.toArray();
        var itemArrayfour = this.formulaBars.toArray();
        console.log(JSON.stringify(itemArray) + " item array");
        this.myrenderer.setElementStyle(itemArray[squarez - 1].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(itemArrayTwo[squarez - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArraythree[squarez - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArrayfour[squarez - 1].nativeElement, 'display', 'none');
        this.storage.set("profile" + squarez, null);
        this.storage.set("formula" + squarez, null);
        var postdata = {
            square: null,
            visible: false
        };
        var arrr = [];
        this.items5 = this.af.list('/formulas', {
            query: {
                orderByChild: 'username',
                equalTo: this.username
            }
        });
        this.subscription6 = this.items5.subscribe(function (items) {
            var mapped = items.map(function (item) {
                return new Promise(function (resolve, reject) {
                    console.log(JSON.stringify(item) + "       getting an item");
                    if (item.square == squarez) {
                        console.log(" in update update te update te update");
                        _this.items5.update(item.$key, postdata);
                    }
                });
            });
        });
        /*let reff = firebase.database().ref('/formulas').orderByChild('username').equalTo(this.username).on("value", (snapshot) => {
          snapshot.forEach(snapshot => {
              // key
              let key = snapshot.key;
              console.log("key: " + key);
              // value, could be object
              let childData = snapshot.val();
              console.log("data: " + JSON.stringify(childData));
              // Do what you want with these key/values here
              arrr.push({key: key, data: childData});
              return true;
          });
        });
    
        for(let x of arrr) {
          console.log(typeof squarez + "        :      jjjjyjy      " + typeof x.data.square);
          if(squarez == x.data.square) {
            console.log("in squarez ---========---- childata.square");
            let updates = {};
            updates['/formulas/' + x.key] = postdata;
    
            firebase.database().ref().update(updates);
            
          }
        }*/
        /*let image : string  = 'formula_' + this.username + '_' + squarez + '.png';
        let storageRef = firebase.storage().ref('/formulas/' + this.username + '/' + image);
        storageRef.delete().catch(e => {console.log(e)});
    
        let image2 : string  = 'profile_' + this.username + '_' + squarez + '.png';
        let storageRef2 = firebase.storage().ref('/profiles/' + this.username + '/' + image2);
        storageRef2.delete().catch(e => {console.log(e)});*/
    };
    StylistProfile.prototype.removePicFormula = function (squarez) {
        console.log("in remove pic 333333333          " + squarez);
        var itemArray = this.components.toArray();
        var itemArrayTwo = this.profComponents.toArray();
        var itemArraythree = this.xclass.toArray();
        console.log(JSON.stringify(itemArray) + " item array");
        this.myrenderer.setElementStyle(itemArray[squarez - 1].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(itemArrayTwo[squarez - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArraythree[squarez - 1].nativeElement, 'display', 'none');
        this.storage.set("formula" + squarez, null);
    };
    StylistProfile.prototype.presentImage = function (squarez) {
        this.square = squarez;
        var itemArrayTwo = this.profComponents.toArray();
        console.log(JSON.stringify(itemArrayTwo[this.square - 1]));
        if (itemArrayTwo[this.square - 1].nativeElement.classList.contains('formula')) {
        }
        else {
            var imageViewer = this.imageViewerCtrl.create(itemArrayTwo[this.square - 1].nativeElement);
            imageViewer.present();
        }
    };
    StylistProfile.prototype.showSquare = function () {
        var itemArray = this.components.toArray();
        var itemArrayTwo = this.profComponents.toArray();
        var itemArraythree = this.xclass.toArray();
        this.myrenderer.setElementStyle(itemArray[this.square - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArrayTwo[this.square - 1].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(itemArraythree[this.square - 1].nativeElement, 'display', 'block');
    };
    StylistProfile.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose source',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        var itemArrayTwo = _this.profComponents.toArray();
                        _this.cameraService.getMedia(_this.optionsGetCamera, _this.square).then(function () {
                            return new Promise(function (resolve, reject) {
                                var storageRef = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.storage().ref().child('/profile/' + _this.username + '/profile_' + _this.username + '_' + _this.square + '.png');
                                var loading = _this.loadingController.create({ content: "Loading..." });
                                loading.present();
                                setTimeout(function () {
                                    storageRef.getDownloadURL().then(function (url) {
                                        console.log(url);
                                        _this.storage.set("profile" + _this.square, url);
                                        _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                                        _this.showSquare();
                                    });
                                    loading.dismiss();
                                }, 3000);
                            });
                        }); //pass in square choice
                        //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
                        console.log('camera clicked');
                    }
                }, {
                    text: 'Photo Library',
                    handler: function () {
                        var itemArrayTwo = _this.profComponents.toArray();
                        _this.cameraService.getMedia(_this.optionsGetMedia, _this.square).then(function () {
                            return new Promise(function (resolve, reject) {
                                var storageRef = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.storage().ref().child('/profile/' + _this.username + '/profile_' + _this.username + '_' + _this.square + '.png');
                                var loading = _this.loadingController.create({ content: "Loading..." });
                                loading.present();
                                setTimeout(function () {
                                    storageRef.getDownloadURL().then(function (url) {
                                        console.log(url);
                                        _this.storage.set("profile" + _this.square, url);
                                        _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                                        _this.showSquare();
                                        resolve();
                                    });
                                    loading.dismiss();
                                }, 3500);
                            });
                            //
                        }).catch(function (e) {
                            console.log(e + "       eeeee");
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
    StylistProfile.prototype.presentActionSheet2 = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose type',
            buttons: [
                {
                    text: 'Formula',
                    handler: function () {
                        _this.presentActionSheet3();
                    }
                }, {
                    text: 'Picture',
                    handler: function () {
                        _this.presentActionSheet();
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
    ////////////********************************************** SAVING FORMULAS TO SERVER
    StylistProfile.prototype.presentActionSheet3 = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose source',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        var itemArrayTwo = _this.profComponents.toArray();
                        var itemArrayFour = _this.formulaBars.toArray();
                        _this.cameraService.getMediaFormulas(_this.optionsGetCamera, _this.square).then(function (url) {
                            console.log(url + " url url url url");
                            actionSheet.dismiss();
                            _this.storage.set("formula" + _this.square, url);
                            _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                            _this.myrenderer.setElementStyle(itemArrayFour[_this.square - 1].nativeElement, 'display', 'flex');
                            _this.myrenderer2.addClass(itemArrayTwo[_this.square - 1].nativeElement, 'formula');
                            _this.showSquare();
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__formulapost_formulapost__["a" /* FormulapostPage */], { path: url, square: _this.square });
                        });
                        //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
                        console.log('camera clicked');
                        //actionSheet.dismiss();
                    }
                }, {
                    text: 'Photo Library',
                    handler: function () {
                        var itemArrayTwo = _this.profComponents.toArray();
                        var itemArrayFour = _this.formulaBars.toArray();
                        _this.cameraService.getMediaFormulas(_this.optionsGetMedia, _this.square).then(function (url) {
                            console.log(url + " url url url url");
                            actionSheet.dismiss();
                            _this.storage.set("formula" + _this.square, url);
                            _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                            _this.myrenderer.setElementStyle(itemArrayFour[_this.square - 1].nativeElement, 'display', 'flex');
                            _this.myrenderer2.addClass(itemArrayTwo[_this.square - 1].nativeElement, 'formula');
                            _this.showSquare();
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__formulapost_formulapost__["a" /* FormulapostPage */], { path: url, square: _this.square });
                        }); //pass in square choice
                        //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
                        console.log('photo clicked');
                        //actionSheet.dismiss();
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
    StylistProfile.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        //this.navCtrl.push(SignUpPage);
    };
    StylistProfile.prototype.tappedPost = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__postpage_postpage__["a" /* PostpagePage */]);
    };
    StylistProfile.prototype.tappedEmergency = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__booking_booking__["a" /* BookingPage */]);
    };
    StylistProfile.prototype.goToSettings = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__settings_settings__["a" /* SettingsPage */]);
    };
    StylistProfile.prototype.backToCal = function () {
        //if(this.navParams.get('param1') == 'user') {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__booking_booking__["a" /* BookingPage */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'forward' });
        //this.navCtrl.push(BookingPage);
        //}
        //else {
        //this.navCtrl.push(FeedStylist);
        //}
    };
    StylistProfile.prototype.swipeLeft = function () {
        this.backToCal();
    };
    StylistProfile.prototype.openCal = function () {
        this.backToCal();
    };
    StylistProfile.prototype.swipeRight = function () {
        this.navCtrl.popToRoot({ animate: true, animation: 'transition', duration: 100, direction: 'back' });
    };
    //changed this***
    StylistProfile.prototype.moveCover = function () {
        this.moveState = (this.moveState == 'up') ? 'down' : 'up';
        this.tds = this.elRef.nativeElement.querySelector('body > ion-app > ng-component > ion-nav > page-stylist-profile > ion-content > div.scroll-content > div > ion-item > div.item-inner > div > ion-label > calendar > div > monthview > div:nth-child(3) > ion-slides');
        this.myrenderer.setElementClass(this.tds, 'moveCover', true);
        var thisel = this.elRef.nativeElement.querySelector('body > ion-app > ng-component > ion-nav > page-stylist-profile > ion-content > div.scroll-content > div > ion-item > div.item-inner > div > ion-label > calendar > div > monthview > div:nth-child(3) > ion-slides > div > div.swiper-wrapper > ion-slide.swiper-slide.swiper-slide-active > div > table');
        this.myrenderer.setElementClass(thisel, 'marginchange', true);
        console.log('element class list   ' + thisel.classList);
    };
    StylistProfile.prototype.onCurrentDateChanged = function ($event) {
        var _this = this;
        //console.log(typeof $event);
        for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
            var x = _a[_i];
            x.selected = false;
        }
        console.log(typeof $event + "event event event *******");
        this.selectedDate = new Date($event);
        console.log(this.selectedDate + " thi si the selected date ((())))))");
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        //console.log($event);
        this.items4 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
        this.subscription4 = this.items4.subscribe(function (items) { return items.forEach(function (item) {
            //console.log(JSON.stringify(item));
            //console.log(item.date.day);
            console.log("dafirst    " + item.date.day);
            var da = new Date(item.date.day * 1000);
            _this.datesToSelect = [];
            _this.datesToSelect.push(da.getDate());
            console.log(da + "da");
            console.log(da.getDate() + "dagetdate");
            console.log(_this.selectedDate.getDate());
            if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                console.log("selected = item");
                console.log(JSON.stringify(item.reserved) + "         item resesrved");
                //for(let r of item.reserved.appointment) {
                //console.log(JSON.stringify(r));
                _this.times = item.reserved.appointment.slice(0);
                console.log('hit appointment');
                console.log(JSON.stringify(_this.times));
                /*for(let x of this.times) {
                  if(x.time == r) {
                    console.log('change selected');
                    x.selected = true;
                  }
                }*/
                //}
            }
        }); });
    };
    StylistProfile.prototype.reloadSource = function (startTime, endTime) {
        console.log(startTime + " : starttime           endtime: " + endTime);
    };
    StylistProfile.prototype.onEventSelected = function ($event) { };
    StylistProfile.prototype.onViewTitleChanged = function (title) {
        var array = title.split(" ");
        //array[1];
        this.viewTitle = array[0].substring(0, 3);
        this.titleYear = array[1];
    };
    StylistProfile.prototype.onTimeSelected = function ($event) {
        var _this = this;
        console.log(JSON.stringify($event) + "      THI SIIS EVENT @(@(@(@(@(");
        this.selectedDate = new Date($event.selectedTime);
        console.log(this.selectedDate + " thi si the selected date ((())))))");
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        if ($event.dontRunCode) {
            //console.log($event);
            this.items3 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
            this.subscription3 = this.items3.subscribe(function (items) {
                var mapped = items.map(function (item) {
                    return new Promise(function (resolve, reject) {
                        //console.log(JSON.stringify(item));
                        //console.log(item.date.day);
                        _this.datesToSelect = [];
                        var boool = false;
                        var da = new Date(item.date.day * 1000);
                        for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                            var r = _a[_i];
                            if (r.selected == true) {
                                boool = true;
                            }
                        }
                        if (boool) {
                            console.log("in bool twice in bool once");
                            _this.datesToSelect.push(da.getDate());
                        }
                        console.log(da + "da");
                        console.log(da.getDate() + "dagetdate");
                        console.log(_this.selectedDate.getDate());
                        if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                            console.log("selected = item");
                            console.log(JSON.stringify(item.reserved) + "         item resesrved");
                            for (var _b = 0, _c = item.reserved.appointment; _b < _c.length; _b++) {
                                var r = _c[_b];
                                //console.log(JSON.stringify(r));
                                /*for(let r in item.reserved.appointment) {
                                  if(r['selected'] == "true") {
                                    bool = true;
                                  }
                                }*/
                                _this.times = item.reserved.appointment.slice(0);
                                console.log('hit appointment');
                                console.log(JSON.stringify(_this.times));
                                /*for(let x of this.times) {
                                  if(x.time == r) {
                                    console.log('change selected');
                                    x.selected = true;
                                  }
                                }*/
                                //}
                            }
                        }
                    });
                });
                Promise.all(mapped).then(function () {
                    for (var _i = 0, _a = _this.tds; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (!item.classList.contains('text-muted')) {
                            console.log(typeof item.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                            if (_this.datesToSelect.indexOf(parseInt(item.innerText)) != -1) {
                                console.log("Inner text in      " + item.innerText);
                                _this.myrenderer.setElementClass(item, "greencircle", true);
                            }
                            else {
                                //this.myrenderer.setElementClass(item,"monthview-selected",false);
                            }
                        }
                    }
                });
                //console.log($event.runCode + "     dont run code!!!!!!");
                //if($event.runCode == true) {
                //}
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('pluscontain'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], StylistProfile.prototype, "components", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('profsquare'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], StylistProfile.prototype, "profComponents", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('xclass'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], StylistProfile.prototype, "xclass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('formulabar'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], StylistProfile.prototype, "formulaBars", void 0);
    StylistProfile = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-stylist-profile',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/stylistprofile/stylistprofile.html"*/'<ion-header (swiperight)="swipeRight()"> <!--(swipeleft)="swipeLeft()"-->\n  <ion-toolbar>\n    <ion-title>@{{username}}</ion-title>\n\n    <div class="settingscontainer">\n    	<ion-icon class="settings" name="settings" (tap)="goToSettings()"></ion-icon>\n    </div>\n  </ion-toolbar>\n    <!--<div class="stylistview">\n	    <button class="stylistviewbutton" ion-button color="secondary">Stylist View</button>\n	  </div>-->\n</ion-header>\n\n<ion-content no-padding>\n<div (swiperight)="swipeRight()"> <!-- (swipeleft)="swipeLeft()"-->\n	<ion-item no-padding no-lines>\n		<div class="imageparent">\n		  <img class="postprofilepic" src="{{profilePic}}">\n		</div>\n	    <div class="rateandsocial">\n		    <div class=\'ratecontain\'>\n			    <div class=\'stars\'>{{stars}}</div>\n			    <div class=\'ratings\'>({{totalRatings}} ratings)</div>\n			</div>\n		    <div class="social">\n				<div class="fb inlineblock">\n					<img src="img/facebook.png">\n				</div>\n				<div class="insta inlineblock">\n		  			<img src="img/instagram.png">\n				</div>\n			</div>\n		</div>\n	  	<div class="stylistviewtwo">\n	    	<button class="stylistviewbuttontwo" ion-button color="primary">{{followers}} Followers</button>\n	  	</div>\n	  	<div class=\'stylistsect\'>\n			<div class="name">{{username}}</div>\n			<div class="bio">{{bio}}</div>\n		</div>\n		<div class=\'arrowleftholder\'>\n	    	<ion-icon class=\'forward\' name="arrow-back"></ion-icon>\n	    </div>\n		<div class="caltitle">{{viewTitle}} {{titleYear}}</div>\n		<div class=\'arrowrightholder\'>\n	    	<ion-icon class=\'forward\' name="arrow-forward"></ion-icon>\n	    </div>\n		<div class="clearcover" (tap)="openCal()"></div>\n		<calendar class=\'cal\' [eventSource]="eventSource"\n	      [calendarMode]="calendar.mode"\n	      [currentDate]="calendar.currentDate"\n	      (onCurrentDateChanged)="onCurrentDateChanged($event)"\n	      (onRangeChanged)="reloadSource(startTime, endTime)"\n	      (onEventSelected)="onEventSelected($event)"\n	      (onTitleChanged)="onViewTitleChanged($event)"\n	      (onTimeSelected)="onTimeSelected($event)"\n	      step="30">\n	    </calendar>\n	</ion-item>\n	<ion-grid>\n	  <ion-row>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(1)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(1)">&#10005;</div>\n	      	<img  (tap)="presentImage(1)" class="imagesquare" #profsquare [src]="">\n	      	<div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(2)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(2)">&#10005;</div>\n	      <img  (tap)="presentImage(2)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(3)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(3)">&#10005;</div>\n	      <img  (tap)="presentImage(3)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	  </ion-row>\n	  <ion-row>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(4)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(4)">&#10005;</div>\n	      <img  (tap)="presentImage(4)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(5)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(5)">&#10005;</div>\n	      <img  (tap)="presentImage(5)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(6)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(6)">&#10005;</div>\n	      <img  (tap)="presentImage(6)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	  </ion-row>\n	  <ion-row>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(7)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(7)">&#10005;</div>\n	      <img  (tap)="presentImage(7)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain (tap)="openCamera(8)"class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(8)">&#10005;</div>\n	      <img  (tap)="presentImage(8)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	    <ion-col>\n	    	<div #pluscontain  (tap)="openCamera(9)" class=\'pluscontainer\'>\n		      <ion-icon class=\'plussy\' name="add"></ion-icon>\n		    </div>\n		    <div class="xclass" #xclass (tap)="removePic(9)">&#10005;</div>\n	      <img  (tap)="presentImage(9)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	  </ion-row>\n	</ion-grid>\n</div>\n\n<!--<ion-fab bottom center >\n  <button ion-fab></button>\n  <ion-fab-list side="right">\n    <button class="textsizebutton" (tap)=\'tappedPost()\' ion-fab>Post</button>\n  </ion-fab-list>\n  <ion-fab-list side="left">\n    <button class="textsizebutton" (tap)=\'tappedEmergency()\' ion-fab><ion-icon name="alarm"></ion-icon></button>\n  </ion-fab-list>\n</ion-fab>-->\n</ion-content>'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/stylistprofile/stylistprofile.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('moveCover', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('down', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({})),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('up', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({})),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms ease-in')),
                ]),
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_10_ionic_img_viewer__["a" /* ImageViewerController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_8_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__services_cameraservice__["a" /* CameraService */]])
    ], StylistProfile);
    return StylistProfile;
}());

//# sourceMappingURL=stylistprofile.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostpagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_keyboard__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_cameraservicepost__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the PostpagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PostpagePage = (function () {
    function PostpagePage(cameraServicePost, actionSheetCtrl, camera, af, viewCtrl, storage, keyboard, myrenderer, navCtrl, navParams) {
        this.cameraServicePost = cameraServicePost;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.af = af;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.keyboard = keyboard;
        this.myrenderer = myrenderer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.item = { 'date': null, 'title': '', 'price': '', 'caption': '', 'typeofselect': 'Post' };
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
        if (this.imageHolder != null) {
            this.myrenderer.setElementAttribute(this.image.nativeElement, 'src', this.imageHolder);
        }
        else {
        }
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
            storageRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.storage().ref('/promos/' + image);
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
                storageRef_1 = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.storage().ref('/classes/' + image_1);
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
            storageRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.storage().ref('/products/' + image);
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
        var database = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database();
        var bool = false;
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/formulas').push(metadata);
    };
    PostpagePage.prototype.shareItem = function () {
        console.log(this.item.title);
        console.log(this.item.caption);
        console.log(this.item.price);
        console.log(this.item.date);
        console.log(this.image.nativeElement.src + "                    **************************** src ****************");
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('imagey'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], PostpagePage.prototype, "image", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('price'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], PostpagePage.prototype, "price", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('date'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], PostpagePage.prototype, "date", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('imageholder'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], PostpagePage.prototype, "imagesquare", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('title'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], PostpagePage.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('sharer'),
        __metadata("design:type", Object)
    ], PostpagePage.prototype, "share", void 0);
    PostpagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-postpage',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/postpage/postpage.html"*/'<!--\n  Generated template for the PostpagePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>New Post</ion-title>\n    <ion-icon (tap)="goToFeed()" class=\'backk\' name="arrow-back"></ion-icon>\n    <!--<div class="stylistview">\n	    <button class="stylistviewbutton" ion-button color="secondary">Stylist View</button>\n	  </div>-->\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n	<ion-item class="typeofpost" no-padding>\n		<ion-label class="headerr">What type of post is this?</ion-label>\n		<ion-select class="selector" [(ngModel)]="item.typeofselect" (ngModelChange)="typeChanged($event)">\n		    <ion-option selected>Post</ion-option>\n		    <ion-option>Promo</ion-option>\n		    <ion-option>Class</ion-option>\n		    <ion-option>Product</ion-option>\n		    <ion-option>Formula</ion-option>\n		</ion-select>\n	</ion-item>\n	<div class="titlecaption" #title>\n		<div class="titlee">\n			<div class=\'detailpic\'>\n				<ion-icon ios="ios-bookmarks" md="md-bookmarks" class="titleicon"></ion-icon>\n			</div>\n			<div class="inputtitle">\n				<input name=\'title\' [(ngModel)]="item.title" class="titleinput" type="text" placeholder="Write a title">\n			</div>\n		</div>\n	</div>\n	<div class="caption">\n		<div class="captione">\n			<div class=\'detailpictwo\'>\n				<h1>...</h1>\n			</div>\n			<div class="inputcaption">\n				<input name=\'caption\' [(ngModel)]="item.caption" class="captioninput" type="text" placeholder="Write a caption">\n				<div class="postimagecontain" (tap)="presentActionSheet()" #imageholder>\n					<img class="postimage" #imagey src="assets/camera.png">\n				</div>\n			</div>\n		</div>\n	</div>\n	<div class="titlecaption" #price>\n		<div class="titlee">\n			<div class=\'detailpic\'>\n				<ion-icon name="pricetags" class="titleicon"></ion-icon>\n			</div>\n			<div class="inputtitle">\n				<input name=\'price\' [(ngModel)]="item.price" class="titleinput" type="text" placeholder="Enter price">\n			</div>\n		</div>\n	</div>\n	<div class="datepickcont" #date>\n		<div class="datepickk">\n			<!--<button  ion-button class="pickadate"> <!--(tap)="showDatePicker()"-->\n			<ion-item>\n				<ion-datetime displayFormat="MMMM/D/YYYY" [(ngModel)]="item.date"></ion-datetime>\n			</ion-item>\n			<!--</button>\n			<!--<div class=\'detailpic\'>\n				<img src="">\n			</div>\n			<div class="inputtitle">\n				<input name=\'price\' class="titleinput" type="text"></input>\n			</div>-->\n		</div>\n	</div>\n	<button #sharer class="share" (tap)="shareItem()" ion-button full color="black">SHARE</button>\n</ion-content>\n'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/postpage/postpage.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__services_cameraservicepost__["a" /* CameraServicePost */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
    ], PostpagePage);
    return PostpagePage;
}());

//# sourceMappingURL=postpage.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedStylist; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stylistprofile_stylistprofile__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__postpage_postpage__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feeduser_feeduser__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__userprofile_userprofile__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dropin_dropin__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modals_buyad_buyad__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__followers_followers__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_cameraservicepost__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ionic_cache__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_sms__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var FeedStylist = (function () {
    function FeedStylist(modalCtrl, sms, cache, storage, platform, af, element, camera, app, cameraServicePost, actionSheetCtrl, myrenderer, loadingController, navCtrl) {
        this.modalCtrl = modalCtrl;
        this.sms = sms;
        this.cache = cache;
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__dropin_dropin__["a" /* DropinPage */], { username: this.username, key: identity.$key });
    };
    FeedStylist.prototype.buyAd = function () {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__modals_buyad_buyad__["a" /* BuyAd */]);
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
                    var storageRef = __WEBPACK_IMPORTED_MODULE_13_firebase___default.a.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
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
                    var storageRef = __WEBPACK_IMPORTED_MODULE_13_firebase___default.a.storage().ref().child('/settings/' + item.username + '/profilepicture.png');
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
                    var storageRef = __WEBPACK_IMPORTED_MODULE_13_firebase___default.a.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
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
                        var storageRef = __WEBPACK_IMPORTED_MODULE_13_firebase___default.a.storage().ref().child('/ads/ad' + x + '.png');
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__userprofile_userprofile__["a" /* UserProfile */], { username: item.username }, { animate: true, animation: 'ios-transition', duration: 100 });
    };
    FeedStylist.prototype.tappedPost = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__postpage_postpage__["a" /* PostpagePage */]);
    };
    FeedStylist.prototype.indexChange = function () {
        console.log(this.swiperIndex);
        if (this.swiperSize == 'small' || 'begin') {
            if (this.totalAdCount - 4 == this.swiperIndex) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__stylistprofile_stylistprofile__["a" /* StylistProfile */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'forward' });
            }
            else if (this.swiperIndex == 0) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__followers_followers__["a" /* FollowersPage */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'back' });
            }
        }
        else {
            if (this.totalAdCount - 1 == this.swiperIndex) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__stylistprofile_stylistprofile__["a" /* StylistProfile */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'forward' });
            }
            else if (this.swiperIndex == 0) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__followers_followers__["a" /* FollowersPage */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'back' });
            }
        }
    };
    FeedStylist.prototype.swipeLeft = function () {
        this.toProfile();
    };
    FeedStylist.prototype.swipeRight = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__followers_followers__["a" /* FollowersPage */], {}, { animate: true, animation: 'ios-transition', duration: 100, direction: 'back' });
    };
    FeedStylist.prototype.switchView = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__feeduser_feeduser__["a" /* FeedUser */]);
    };
    FeedStylist.prototype.toProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__stylistprofile_stylistprofile__["a" /* StylistProfile */], {}, { animate: true, animation: 'ios-transition', duration: 100, direction: 'forward' });
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
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__postpage_postpage__["a" /* PostpagePage */], { path: data });
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
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__postpage_postpage__["a" /* PostpagePage */], { path: data });
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
                        var storageRef = __WEBPACK_IMPORTED_MODULE_13_firebase___default.a.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
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
                        var storageRef = __WEBPACK_IMPORTED_MODULE_13_firebase___default.a.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
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
                        var storageRef = __WEBPACK_IMPORTED_MODULE_13_firebase___default.a.storage().ref().child('/settings/' + item.username + '/profilepicture.png');
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('feedstyle'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "components", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('flex'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "flexComponents", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('feedtop'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "feedComponents", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('imagepost'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "imageComponents", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('caption'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "captionComponents", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('allF'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "allFeed", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('productsFeed'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "productsF", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('classesFeed'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "classesF", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('formulasFeed'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "formulasF", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('contentone'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FeedStylist.prototype, "contentOne", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('classeslist'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FeedStylist.prototype, "classeslist", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formulaslist'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FeedStylist.prototype, "formulaslist", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('swiper'),
        __metadata("design:type", Object)
    ], FeedStylist.prototype, "swiperEl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('productslist'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FeedStylist.prototype, "productslist", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('adimage'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "adImage", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('slides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* Slides */])
    ], FeedStylist.prototype, "slidess", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('slides2'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* Slides */])
    ], FeedStylist.prototype, "slidess2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('feedtoptwo'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "feedTopTwoComponents", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('feedstyle2'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "components2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('flex2'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "flexComponents2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('feedtop2'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "feedComponents2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('feedtop2two'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "feedTop22Components", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('imagepost2'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "imageComponents2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('caption2'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "captionComponents2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('feedstyle3'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "components3", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('flex3'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "flexComponents3", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('feedtop3'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "feedComponents3", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('feedtop3two'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "feedTop32Components", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('imagepost3'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "imageComponents3", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('caption3'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "captionComponents3", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('feedstyle4'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "components4", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('flex4'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "flexComponents4", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('feedtop4'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "feedComponents4", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('feedtop4two'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "feedTop42Components", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('imagepost4'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "imageComponents4", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('caption4'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], FeedStylist.prototype, "captionComponents4", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
    ], FeedStylist.prototype, "content", void 0);
    FeedStylist = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-feed-stylist',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/feedstylist/feedstylist.html"*/'<ion-header>\n  <div (swiperight)="swipeRight()" (swipeleft)="swipeLeft()">\n    <ion-toolbar #clickme class="itemadspace" [@slideDown]="downState" no-padding>\n      <div class="stylistview">\n        <button class="stylistviewbutton" (tap)=\'switchView()\' ion-button color="secondary">User View</button>\n      </div>\n\n      <swiper #swiper [config]="config" [(index)]="swiperIndex" (indexChange)="indexChange()">\n        <div *ngFor="let ad of ads; let i = index" class="adcontainer">\n          <img src="{{ad}}" class="adimage" #adimage>\n        </div>\n      </swiper>\n    </ion-toolbar>\n        \n    <div class=\'pluscontainer\' [@plusSlide]="downState" (tap)=\'buyAd()\'>\n      <p>BUY</p><br><p>AD</p>\n    </div>\n\n    <div (tap)="toolClicked($event)">\n      <ion-navbar  color="black" [@toolSlide]="toolbarState" id="iontoolbar">\n        <ion-icon class=\'custom-icon\' name="play"></ion-icon>\n        <button class="all toolbarstyle" #allF ion-button color="black" (tap)="all()">All</button>\n        <button class="toolbarstyle" #classesFeed ion-button color="black" (tap)="classes()">Classes</button>\n        <button class="toolbarstyle" #productsFeed ion-button color="black" (tap)="products()">Products</button>\n        <button class="toolbarstyle" #formulasFeed ion-button color="black" (tap)="formulasList()">Formulas</button>\n      </ion-navbar>\n    </div>\n  </div>\n</ion-header>\n\n<ion-content [@moveList]=\'moveState\' no-padding> \n\n<div class="swipecont" (swiperight)="swipeRight()" (swipeleft)="swipeLeft()">\n\n  <div class =\'contentone\' [@moveList]=\'moveState\' #contentone>\n   <ion-list no-padding>\n     <ion-item class="changepadding" *ngFor="let j of items ; let i = index" id=\'{{i}}\' #feedstyle text-wrap>\n      <div class="flex" (tap)=\'expandItem(i)\' #flex>\n        <div class="nonzoomimage">\n          <img class="imagepost" src="{{j.url}}">\n        </div>\n        <div class="descholder">\n          <div class=\'description\'>{{j.title}}</div>\n          <div class=\'link\'>{{j.date}}</div>\n        </div>\n        <div class="priceholder" *ngIf="j.price > 0">\n          <div class=\'description\'>${{j.price}}</div>\n        </div>\n      </div>\n      <div class="feedtoptextcontainer" #feedtop (tap)="goSeeProfile(j)"> \n        <div class="imageparent">\n          <img class="postprofilepic" src="{{j.profilepic}}">\n        </div>\n        <div class="usernamecontainer">\n          <h4 class="postusername">@{{j.username}}</h4><br>\n          \n        </div>\n      </div>\n      <div class="feedtoptextcontainertwo" #feedtoptwo (tap)=\'contractItem(i)\'>\n        <div class="postprofilelink">\n          <div class="book">{{j.title}}</div>\n          <div class="book price" *ngIf="j.title == null">${{j.price}}</div>\n        </div>\n      </div>\n      <img class="imageposttwo" #imagepost src="{{j.url}}">\n      <div class=\'caption\' #caption>\n        <div *ngIf="j.title == null || j.date == null" style="text-align: center">\n          TAP TO BUY\n        </div>\n        <div *ngIf="j.title != null">\n          <br>\n          {{j.caption}}\n        </div>\n      </div>\n     </ion-item>\n   </ion-list>\n   <ion-infinite-scroll (ionInfinite)="doInfiniteAll($event)">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more data...">\n    </ion-infinite-scroll-content>\n   </ion-infinite-scroll>\n  </div>\n\n\n  <div class =\'contentone classeslist\' [@moveList]=\'moveState\' #classeslist>\n   <ion-list no-padding>\n     <ion-item class="changepadding" *ngFor="let j of classesListArray ; let i = index" id=\'{{i}}\' #feedstyle2 text-wrap>\n      <div class="flex" (tap)=\'expandItem2(i)\' #flex2>\n        <div class="nonzoomimage">\n          <img class="imagepost" src="{{j.url}}">\n        </div>\n        <div class="descholder">\n          <div class=\'description\'>{{j.title}}</div>\n          <div class=\'link\'>{{j.date}}</div>\n        </div>\n      </div>\n      <div class="feedtoptextcontainer" #feedtop2 (tap)="goSeeProfile(j)">\n        <div class="imageparent">\n          <img class="postprofilepic" src="{{j.profilepic}}">\n        </div>\n        <div class="usernamecontainer">\n          <h4 class="postusername">@{{j.username}}</h4><br>\n        </div>\n      </div>\n      <div class="feedtoptextcontainertwo" #feedtop2two (tap)=\'contractItem2(i)\'>\n        <div class="postprofilelink">\n          <div class="book">{{j.title}}</div>\n        </div>\n      </div>\n      <img class="imageposttwo" #imagepost2 src="{{j.url}}">\n      <div class=\'caption\' #caption2>\n        {{j.caption}}\n      <br>\n      </div>\n     </ion-item>\n   </ion-list>\n   <ion-infinite-scroll (ionInfinite)="(doInfiniteClass($event))">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more data...">\n    </ion-infinite-scroll-content>\n   </ion-infinite-scroll>\n  </div>\n\n  <div class =\'contentone productslist\' [@moveList]=\'moveState\' #productslist>\n   <ion-list no-padding>\n     <ion-item class="changepadding" *ngFor="let j of productListArray ; let i = index" id=\'{{i}}\' #feedstyle3 text-wrap>\n      <div class="flex" (tap)=\'expandItem3(i)\' #flex3>\n        <div class="nonzoomimage">\n          <img class="imagepost" src="{{j.url}}">\n        </div>\n        <div class="descholder">\n          <div class=\'description\'>{{j.title}}</div>\n        </div>\n        <div class="priceholder">\n          <div class=\'description\'>${{j.price}}</div>\n        </div>\n      </div>\n      <div class="feedtoptextcontainer" #feedtop3 (tap)="goSeeProfile(j)"> \n        <div class="imageparent">\n          <img class="postprofilepic" src="{{j.profilepic}}">\n        </div>\n        <div class="usernamecontainer">\n          <h4 class="postusername">@{{j.username}}</h4><br>\n        </div>\n      </div>\n      <div class="feedtoptextcontainertwo" #feedtop3two (tap)=\'contractItem3(i)\'>\n        <div class="postprofilelink">\n          <div class="book">{{j.title}}</div>\n        </div>\n      </div>\n      <img class="imageposttwo" #imagepost3 src="{{j.url}}">\n      <div class=\'caption\' #caption3>\n        <div style="text-align: center">\n          TAP TO BUY\n        </div>\n        <br>\n        {{j.caption}}\n      </div>\n     </ion-item>\n   </ion-list>\n   <ion-infinite-scroll (ionInfinite)="doInfiniteProduct($event)">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more data...">\n    </ion-infinite-scroll-content>\n   </ion-infinite-scroll>\n  </div>\n</div>\n\n<div class="swipecont2" (swiperight)="swipeRight()" (swipeleft)="swipeLeft()">\n  <div class =\'contentone formulaslist\' [@moveList]=\'moveState\' #formulaslist>\n   <ion-list no-padding>\n     <ion-item class="changepadding" *ngFor="let j of formulaListArray ; let i = index" id=\'{{i}}\' #feedstyle4 text-wrap>\n      <div class="flex" (tap)=\'expandItem4(i)\' #flex4>\n        <div class="nonzoomimage">\n          <img class="imagepost" src="{{j.url}}">\n        </div>\n        <div class="priceholder">\n          <div class=\'description\'>${{j.price}}</div>\n        </div>\n      </div>\n      <div class="feedtoptextcontainer" #feedtop4 (tap)="goSeeProfile(j)"> \n        <div class="imageparent">\n          <img class="postprofilepic" src="{{j.profilepic}}">\n        </div>\n        <div class="usernamecontainer">\n          <h4 class="postusername">@{{j.username}}</h4><br>\n        </div>\n      </div>\n      <div class="feedtoptextcontainertwo" #feedtop4two (tap)=\'contractItem4(i)\'>\n        <div class="postprofilelink">\n          <div class="book price">${{j.price}}</div>\n        </div>\n      </div>\n      <img class="imageposttwo" #imagepost4 src="{{j.url}}" (tap)="beginPurchase(j)">\n      <div class=\'caption\' #caption4 style="text-align: center">\n        TAP TO BUY\n      </div>\n     </ion-item>\n   </ion-list>\n   <ion-infinite-scroll (ionInfinite)="doInfiniteFormula($event)">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more data...">\n    </ion-infinite-scroll-content>\n   </ion-infinite-scroll>\n  </div>\n</div>\n\n\n\n<ion-fab bottom center >\n  <button class="ionfab" ion-fab></button>\n  <ion-fab-list side="right">\n    <button class="textsizebutton" (tap)=\'tappedPost()\' ion-fab>Post</button>\n  </ion-fab-list>\n  <ion-fab-list side="left">\n    <button class="textsizebutton" ion-fab>\n      <ion-datetime displayFormat="MMM/D/YY h:mm:a" [(ngModel)]="dateofme" (ngModelChange)="modelChanged($event)"></ion-datetime>\n      <ion-icon name="alarm"></ion-icon>\n    </button>\n  </ion-fab-list>\n</ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/feedstylist/feedstylist.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('slideDown', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('down', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        height: '250px',
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('notDown', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        height: '88px',
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms ease-in')),
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('moveList', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('down', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        top: 82 + "px",
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('up', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        top: 0 + "px",
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms ease-in')),
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('toolSlide', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('down', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        top: '0px'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('up', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        top: '0px'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms ease-in')),
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('plusSlide', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('down', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        top: '205px'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('notDown', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        top: '50px'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms ease-in')),
                ]),
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ModalController */], __WEBPACK_IMPORTED_MODULE_15__ionic_native_sms__["a" /* SMS */], __WEBPACK_IMPORTED_MODULE_14_ionic_cache__["b" /* CacheService */], __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */], __WEBPACK_IMPORTED_MODULE_12_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_10__services_cameraservicepost__["a" /* CameraServicePost */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */]])
    ], FeedStylist);
    return FeedStylist;
}());

//# sourceMappingURL=feedstylist.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedUser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stylistprofile_stylistprofile__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__feedstylist_feedstylist__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userbooking_userbooking__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modals_popup_popup__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modals_popupother_popupother__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_native_geocoder__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_diagnostic__ = __webpack_require__(657);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__userviewprofile_userviewprofile__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__userprofile_userprofile__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__fullfeed_fullfeed__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ionic_cache__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



















var FeedUser = (function () {
    function FeedUser(navParams, elRef, cache, diagnostic, nativeGeocoder, geolocation, zone, modalCtrl, af, storage, afAuth, renderer, loadingController, navCtrl) {
        this.navParams = navParams;
        this.elRef = elRef;
        this.cache = cache;
        this.diagnostic = diagnostic;
        this.nativeGeocoder = nativeGeocoder;
        this.geolocation = geolocation;
        this.zone = zone;
        this.modalCtrl = modalCtrl;
        this.af = af;
        this.storage = storage;
        this.afAuth = afAuth;
        this.renderer = renderer;
        this.loadingController = loadingController;
        this.navCtrl = navCtrl;
        this.downState = 'notDown';
        this.moveState = 'up';
        this.toolbarState = 'up';
        this.showDropDown = 'up';
        this.showDropDownHeight = 'up';
        this.show = true;
        this.lastScrollTop = 0;
        this.direction = "";
        this.pricesArray = [];
        this.distances = [];
        this.starsArray = [];
        this.queryable = true;
        this.toolbarClicks = 0;
        this.availabilities = [];
        this.items = [];
        this.rating = [];
        this.promotions = [];
        this.totalCount = 0;
        this.lastNumRows = 0;
        this.ads = [];
        this.swiperSize = 'begin';
    }
    FeedUser.prototype.loadModal = function (salon) {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__modals_popupother_popupother__["a" /* PopUpOther */], { salon: salon });
        profileModal.present();
    };
    FeedUser.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log("in doinfinite promotionsssssss");
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
            _this.af.list('/promotions', function (ref) { return ref.orderByKey().endAt(_this.startAtKey1).limitToLast(11); }).snapshotChanges().map(function (actions) {
                return actions.map(function (action) { return ({ key: action.key, data: action.payload.val() }); });
            }).subscribe(function (items) {
                var x = 0;
                _this.lastKey1 = _this.startAtKey1;
                return items.map(function (item) {
                    var storageRef = __WEBPACK_IMPORTED_MODULE_10_firebase__["storage"]().ref().child('/settings/' + item.data.customMetadata.username + '/profilepicture.png');
                    storageRef.getDownloadURL().then(function (url) {
                        console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                        item.data.customMetadata.picURL = url;
                    }).catch(function (e) {
                        console.log("in caught url !!!!!!!$$$$$$$!!");
                        item.data.customMetadata.picURL = 'assets/blankprof.png';
                    });
                    if (_this.startAtKey1 !== item.key && _this.lastKey1 !== item.key) {
                        console.log(_this.startAtKey1 + "   :startAtKey1 before 4444444        item key:     " + item.key);
                        if (item.data.customMetadata.username != null) {
                            _this.promotions.push(item.data.customMetadata); //unshift?**************
                        }
                    }
                    if (x == 0) {
                        _this.startAtKey1 = item.key;
                    }
                    x++;
                });
            });
            //);
            //queryObservable.subscribe(items => {
            //});
            infiniteScroll.complete();
        }, 500);
    };
    FeedUser.prototype.doInfiniteP = function () {
        var _this = this;
        console.log("in doinfinite promotionsssssss");
        setTimeout(function () {
            console.log('Begin async operation');
            /*console.log(this.content.directionY + "        upupupupupupu********");
            if(this.content.directionY == 'up') {
              this.show = false
            }
            else {
              this.show = true;
            }*/
            _this.af.list('/products', function (ref) { return ref.orderByKey().startAt(_this.startAtKey2).limitToLast(11); }).snapshotChanges().map(function (actions) {
                return actions.map(function (action) { return ({ key: action.key, data: action.payload.val() }); });
            }).subscribe(function (items) {
                if (items.length > 0) {
                    var x_1 = 0;
                    console.log(JSON.stringify(items[0]) + "     items 00000000000000");
                    _this.lastKey2 = _this.startAtKey2;
                    _this.startAtKey2 = items[items.length - 1].key;
                    return items.map(function (item) {
                        if (x_1 == 0) {
                        }
                        else {
                            var storageRef = __WEBPACK_IMPORTED_MODULE_10_firebase__["storage"]().ref().child('/settings/' + item.data.username + '/profilepicture.png');
                            storageRef.getDownloadURL().then(function (url) {
                                console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                                item.data.picURL = url;
                            }).catch(function (e) {
                                console.log("in caught url !!!!!!!$$$$$$$!!");
                                item.data.picURL = 'assets/blankprof.png';
                            });
                            if (_this.startAtKey2 !== item.key && _this.lastKey2 !== item.key) {
                                console.log(_this.startAtKey2 + "   :startAtKey2:");
                                console.log(item.key + "   :itemkey:");
                                console.log(_this.lastKey2 + "   :lastkey:");
                                if (item.data.price != null) {
                                    _this.pricesArray.push(item.data); //unshift?**************
                                }
                            }
                        }
                        x_1++;
                    });
                }
            });
            _this.pricesArray.sort(function (a, b) {
                return a.price.length - b.price.length;
            });
            //infiniteScroll.complete(); 
        }, 500);
    };
    FeedUser.prototype.doInfiniteR = function () {
        var _this = this;
        console.log("in doinfinite promotionsssssss");
        setTimeout(function () {
            console.log('Begin async operation');
            /*console.log(this.content.directionY + "        upupupupupupu********");
            if(this.content.directionY == 'up') {
              this.show = false
            }
            else {
              this.show = true;
      
            }*/
            _this.af.list('/ratings', function (ref) { return ref.orderByKey().endAt(_this.startAtKey3).limitToLast(11); }).snapshotChanges().map(function (actions) {
                return actions.map(function (action) { return ({ key: action.key, data: action.payload.val() }); });
            }).subscribe(function (items) {
                var x = 0;
                console.log(JSON.stringify(items[0]) + "     items 00000000000000");
                _this.lastKey3 = _this.startAtKey3;
                console.log(_this.lastKey3 + " lastkey3333333333333asdfasdasdfasdfweew32323223fasdfasdf beginning");
                items.forEach(function (item) {
                    var storageRef = __WEBPACK_IMPORTED_MODULE_10_firebase__["storage"]().ref().child('/settings/' + item.data.username + '/profilepicture.png');
                    storageRef.getDownloadURL().then(function (url) {
                        console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                        item.data.picURL = url;
                    }).catch(function (e) {
                        console.log("in caught url !!!!!!!$$$$$$$!!");
                        item.data.picURL = 'assets/blankprof.png';
                    });
                    if (item.data.rating.one == 0 && item.data.rating.two == 0 && item.data.rating.three == 0 && item.data.rating.four == 0 && item.data.rating.five == 0) {
                        _this.stars = "No ratings";
                    }
                    else {
                        console.log("making the stars");
                        var totalPotential = void 0;
                        var ratings = void 0;
                        totalPotential = item.data.rating.one * 5 + item.data.rating.two * 5 + item.data.rating.three * 5 + item.data.rating.four * 5 + item.data.rating.five * 5;
                        ratings = item.data.rating.one + item.data.rating.two * 2 + item.data.rating.three * 3 + item.data.rating.four * 4 + item.data.rating.five * 5;
                        var i = (ratings / totalPotential) * 100;
                        if (Math.round(i) <= 20) {
                            _this.stars = '\u2605';
                        }
                        if (Math.round(i) > 20 && Math.round(i) <= 40) {
                            _this.stars = '\u2605\u2605';
                        }
                        if (Math.round(i) > 40 && Math.round(i) <= 60) {
                            _this.stars = '\u2605\u2605\u2605';
                        }
                        if (Math.round(i) > 60 && Math.round(i) <= 80) {
                            _this.stars = '\u2605\u2605\u2605\u2605';
                        }
                        if (Math.round(i) > 80) {
                            _this.stars = '\u2605\u2605\u2605\u2605\u2605';
                        }
                    }
                    item.data.stars = _this.stars;
                    //this.renderer.setElementStyle(this.noavail.nativeElement, 'display', 'none');
                    if (_this.startAtKey3 !== item.key && _this.lastKey3 !== item.key) {
                        console.log(_this.startAtKey3 + "   :startAtKey3 being pushed       item key:     " + item.key);
                        if (item.data.username != null && (item.data.rating.five + item.data.rating.four + item.data.rating.three + item.data.rating.two + item.data.rating.one) > 0) {
                            _this.rating.push(item.data); //unshift?**************
                        }
                    }
                    if (x == 0) {
                        _this.startAtKey3 = item.key;
                    }
                    console.log(_this.startAtKey3 + " startatkeyyyyyyyy33333dddddddd33333333asdfasdfasdfasdf end");
                    console.log(item.key + " item.$key       33dddddddd33333333asdfasdfasdfasdf end");
                    x++;
                });
            });
            _this.rating.sort(function (a, b) {
                if (a.stars !== "No ratings" && b.stars !== "No ratings") {
                    if (a.stars === b.stars) {
                        return 0;
                    }
                    else {
                        return a.stars.length < b.stars.length ? 1 : -1;
                    }
                }
                else {
                    if (a.stars === "No ratings") {
                        return 1;
                    }
                    else if (b.stars === "No ratings") {
                        return -1;
                    }
                }
            });
            //infiniteScroll.complete(); 
        }, 500);
    };
    FeedUser.prototype.doInfiniteD = function () {
        var _this = this;
        console.log("in doinfinite distance");
        setTimeout(function () {
            console.log('Begin async operation');
            /*console.log(this.content.directionY + "        upupupupupupu********");
            if(this.content.directionY == 'up') {
              this.show = false
            }
            else {
              this.show = true;
      
            }*/
            _this.af.list('/distances/' + _this.username, function (ref) { return ref.orderByChild('distance').startAt(_this.startAtKey4).limitToLast(11); }).snapshotChanges().map(function (actions) {
                return actions.map(function (action) { return ({ key: action.key, data: action.payload.val() }); });
            }).subscribe(function (items) {
                var x = 0;
                console.log(JSON.stringify(items[0]) + "     items 00000000000000");
                _this.lastKey4 = _this.startAtKey4;
                console.log(_this.lastKey4 + " lastkey3333333333333asdfasdasdfasdfweew32323223fasdfasdf beginning");
                items.forEach(function (item) {
                    var arr;
                    if (x == 0) {
                        //
                    }
                    else {
                        var storageRef = __WEBPACK_IMPORTED_MODULE_10_firebase__["storage"]().ref().child('/settings/' + item.data.username + '/profilepicture.png');
                        storageRef.getDownloadURL().then(function (url) {
                            console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                            item.data.picURL = url;
                            _this.distances.push(item);
                        }).catch(function (e) {
                            console.log("in caught url !!!!!!!$$$$$$$!!");
                            item.data.picURL = 'assets/blankprof.png';
                            _this.distances.push(item.data);
                        });
                        console.log(_this.startAtKey4 + " startatkeyyyyyyyy33333dddddddd33333333asdfasdfasdfasdf end");
                        //console.log(item.$key + " item.$key       33dddddddd33333333asdfasdfasdfasdf end");
                    }
                    if (x == items.length - 1) {
                        _this.startAtKey4 = item.data.distance;
                    }
                    x++;
                });
            });
            //})      
        }, 500);
    };
    FeedUser.prototype.doInfiniteA = function () {
        var _this = this;
        console.log("in doinfinite promotionsssssss");
        setTimeout(function () {
            console.log('Begin async operation');
            _this.af.list('/availabilities', function (ref) { return ref.orderByKey().startAt(_this.startAtKey5).limitToLast(11); }).snapshotChanges().map(function (actions) {
                return actions.map(function (action) { return ({ key: action.key, data: action.payload.val() }); });
            }).subscribe(function (items) {
                var x = 0;
                _this.startAtKey5 = items[items.length - 1].key;
                new Promise(function (resolve, reject) {
                    items.forEach(function (item) {
                        if (x == 0) {
                            //
                        }
                        else {
                            var storageRef = __WEBPACK_IMPORTED_MODULE_10_firebase__["storage"]().ref().child('/settings/' + item.data.salon + '/profilepicture.png');
                            storageRef.getDownloadURL().then(function (url) {
                                console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                                item.data.pic = url;
                                _this.availabilities.push(item);
                            }).catch(function (e) {
                                console.log("in caught url !!!!!!!$$$$$$$!!");
                                item.data.pic = 'assets/blankprof.png';
                                _this.availabilities.push(item.data);
                            });
                        }
                        if (x == items.length - 1) {
                            resolve();
                        }
                        x++;
                    });
                }).then(function () {
                    setTimeout(function () {
                        console.log("in load availabilities ......... ");
                        console.log(JSON.stringify(_this.availabilities));
                        _this.availabilities.sort(function (a, b) {
                            return Date.parse('01/01/2013 ' + a.time) - Date.parse('01/01/2013 ' + b.time);
                        });
                        console.log('*****previous******');
                        console.log(JSON.stringify(_this.availabilities));
                        console.log('*****sorted********');
                        for (var _i = 0, _a = _this.availabilities; _i < _a.length; _i++) {
                            var i = _a[_i];
                            console.log(i.time + "          this is itime");
                            var date = new Date('01/01/2013 ' + i.time);
                            console.log(date + "          this is date in idate");
                            var str = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
                            console.log(str);
                            i.time = str;
                        }
                    }, 500);
                });
            });
        }, 500);
    };
    FeedUser.prototype.getAds = function () {
        var _this = this;
        var promises_array = [];
        var cacheKey = 'ads';
        this.cache.getItem(cacheKey).catch(function () {
            var store = [];
            console.log("in get addddssss ******");
            _this.objj = _this.af.object('/adcounter/count').valueChanges();
            _this.subscription8 = _this.objj.subscribe(function (item) {
                console.log(JSON.stringify(item) + "in adddd subscribe()()()()()()");
                console.log(typeof item);
                _this.totalAdCount = item.$value;
                var _loop_1 = function (x) {
                    console.log("in promise gafdfsfads");
                    promises_array.push(new Promise(function (resolve, reject) {
                        var storageRef = __WEBPACK_IMPORTED_MODULE_10_firebase__["storage"]().ref().child('/ads/ad' + x + '.png');
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
                    _loop_1(x);
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
    FeedUser.prototype.indexChange = function () {
        console.log(this.swiperIndex);
        if (this.swiperSize == 'small' || 'begin') {
            if (this.totalAdCount - 4 == this.swiperIndex) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_15__userprofile_userprofile__["a" /* UserProfile */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'forward' });
            }
            else if (this.swiperIndex == 0) {
                //this.navCtrl.push(FollowersPage,{},{animate:true,animation:'transition',duration:100,direction:'back'});
            }
        }
        else {
            if (this.totalAdCount - 1 == this.swiperIndex) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_15__userprofile_userprofile__["a" /* UserProfile */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'forward' });
            }
            else if (this.swiperIndex == 0) {
                //this.navCtrl.push(FollowersPage,{},{animate:true,animation:'transition',duration:100,direction:'back'});
            }
        }
    };
    FeedUser.prototype.swipeLeft = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__userviewprofile_userviewprofile__["a" /* UserViewProfile */], {
            param1: 'user'
        }, { animate: true, animation: 'transition', duration: 100, direction: 'forward' });
    };
    FeedUser.prototype.toUserBooking = function () {
    };
    FeedUser.prototype.toProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__stylistprofile_stylistprofile__["a" /* StylistProfile */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'forward' });
    };
    FeedUser.prototype.toFull = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_16__fullfeed_fullfeed__["a" /* FullfeedPage */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'back' });
    };
    FeedUser.prototype.toBooking = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__userbooking_userbooking__["a" /* UserBooking */], {
            param1: 'user'
        }, { animate: true, animation: 'transition', duration: 100, direction: 'back' });
    };
    FeedUser.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2 != null) {
            this.subscription2.unsubscribe();
        }
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
        if (this.subscription9 != null) {
            this.subscription9.unsubscribe();
        }
        if (this.subscription10 != null) {
            this.subscription10.unsubscribe();
        }
        if (this.subscription11 != null) {
            this.subscription11.unsubscribe();
        }
        if (this.subscription12 != null) {
            this.subscription12.unsubscribe();
        }
        if (this.subscription13 != null) {
            this.subscription13.unsubscribe();
        }
        if (this.subscription14 != null) {
            this.subscription14.unsubscribe();
        }
    };
    FeedUser.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        //this.navCtrl.push(SignUpPage);
    };
    FeedUser.prototype.ionViewWillLoad = function () {
        this.subscription = this.afAuth.authState.subscribe(function (data) {
            /*if(data.email && data.uid) {
              console.log("logged in");
            }*/
        });
    };
    FeedUser.prototype.scrollHandler = function (event) {
        var _this = this;
        //console.log(JSON.stringify(event));
        this.zone.run(function () {
            if (event.directionY == 'up') {
                _this.show = false;
            }
            else {
                _this.show = true;
            }
            // since scrollAmount is data-binded,
            // the update needs to happen in zone
            //this.scrollAmount++
        });
    };
    FeedUser.prototype.distance = function (lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344;
        }
        if (unit == "N") {
            dist = dist * 0.8684;
        }
        return dist;
    };
    FeedUser.prototype.round = function (number, precision) {
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    };
    ;
    FeedUser.prototype.loadDistances = function () {
        //return new Promise((resolve, reject) => {
        var cacheKey = "distances";
        var arr = [];
        var mapped;
        console.log("IN LOADDISTANCES #$$$$$$$$$$$$$$$$$$$$$");
        var x = 0;
        this.distanceList = this.af.list('/distances/' + this.username, function (ref) { return ref.orderByChild("distance").limitToFirst(50); }).valueChanges(); //.map(e => { console.log(e+"eeeeeeeeeeee")});
        /*this.distanceList = this.distanceList.map(items => (item => {
          console.log(JSON.stringify(item) + "      length - 1 load");
             
             
             //items.forEach(item => {
               let storageRef = firebase.storage().ref().child('/settings/' + item.username + '/profilepicture.png');
                           
                storageRef.getDownloadURL().then(url => {
                  console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                  item.picURL = url;
                }).catch((e) => {
                  console.log("in caught url !!!!!!!$$$$$$$!!");
                  item.picURL = 'assets/blankprof.png';
                });
               //this.distances.push(item);
               if(x == items.length - 1) {
                 this.startAtKey4 = item.distance;
               }
               x++;
             //})
        }))*/
        /*.map(actions => {
            return actions.map(action => ({ key: action.key, data: action.payload.val() }));
          }).subscribe(items => { */
        //this.subscription6.unsubscribe();
        //})
        //this.items = this.af.list('distances/' + this.username).valueChanges();
    };
    FeedUser.prototype.loadPromotions = function () {
        var _this = this;
        console.log("In loadPromotions fdskkfdskldfkfdslkfds");
        this.af.list('/promotions', function (ref) { return ref.limitToLast(14); }).snapshotChanges().map(function (actions) {
            return actions.map(function (action) { return ({ key: action.key, data: action.payload.val() }); });
        }).subscribe(function (items) {
            _this.startAtKey1 = items[0].key;
            _this.lastKey1 = _this.startAtKey1;
            items.forEach(function (item) {
                //mapped = items.map((item) => {
                //return new Promise(resolve => {
                _this.promotions.push(item.data.customMetadata);
                console.log("pushing ITEM (((((()()()()()() promotions" + JSON.stringify(item.data.customMetadata));
                //this.renderer.setElementStyle(this.noavail.nativeElement, 'display', 'none');
                //})  
                //})
            });
        });
        if (this.promotions != []) {
            //this.renderer.setElementStyle(this.noavail._elementRef.nativeElement, 'display', 'none');
        }
    };
    FeedUser.prototype.loadPrices = function () {
        //let mapped;
        //let cacheKey = "prices";
        //let results2;
        var _this = this;
        //this.cache.removeItem(cacheKey);
        //this.cache.getItem(cacheKey).catch(() => {
        //let array = [];
        this.af.list('/profiles/stylists', function (ref) { return ref.orderByChild('price').limitToFirst(50); }).snapshotChanges().map(function (actions) {
            return actions.map(function (action) { return ({ key: action.key, data: action.payload.val() }); });
        }).subscribe(function (items) {
            _this.startAtKey2 = items[items.length - 1].key;
            _this.lastKey2 = _this.startAtKey2;
            var x = 0;
            items.forEach(function (item) {
                //mapped = items.map((item) => {
                //return new Promise(resolve => {
                if (x == 0) {
                    //
                }
                else {
                    if (item.data.price == null) {
                        //
                    }
                    else {
                        console.log(JSON.stringify(item));
                        if (!item.data.picURL) {
                            item.data.picURL = 'assets/blankprof.png';
                        }
                        if (item.data.price !== undefined) {
                            _this.pricesArray.push(item.data); //unshift?**************
                        }
                        //this.renderer.setElementStyle(this.noavail.nativeElement, 'display', 'none');
                    }
                }
                x++;
                //})  
                //})
            });
        });
        //results2 = Promise.all(mapped);
        //results2.then(() => {  
        //this.pricesArray = array;
        //console.log(this.pricesArray + "     pricesathis.rrrraaayyy ITEM (((((()()()()()() loadprices")   
        //return this.cache.saveItem(cacheKey, this.pricesArray);
        //})    
        /*}).then(data => {
          this.pricesArray = data;
        })*/
    };
    FeedUser.prototype.loadRatings = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mapped;
            var cacheKey = "ratings";
            var results;
            var array = [];
            //this.cache.getItem(cacheKey).catch(() => {
            _this.af.list('/profiles/stylists', function (ref) { return ref.orderByKey().limitToLast(50); }).snapshotChanges().map(function (actions) {
                return actions.map(function (action) { return ({ key: action.key, data: action.payload.val() }); });
            }).subscribe(function (items) {
                _this.startAtKey3 = items[0].key;
                _this.lastKey3 = _this.startAtKey3;
                console.log(_this.startAtKey3 + " startatkey3333333333333 beginning");
                console.log(_this.lastKey3 + " lastkey3333333333333asdfasdfasdfasdf beginning");
                mapped = items.map(function (item) {
                    return new Promise(function (resolve) {
                        if (!item.data.picURL) {
                            item.data.picURL = 'assets/blankprof.png';
                        }
                        for (var z in item.data.rating) {
                            console.log(z + "this is the rating string");
                        }
                        console.log(JSON.stringify(item) + "stringifyied item &&^^&%^%^%^$$%%$");
                        if ((item.data.rating.five + item.data.rating.four + item.data.rating.three + item.data.rating.two + item.data.rating.one) > 0) {
                            console.log("getting pushed &&%$$##@#@#@#@#@#");
                            array.push(item.data);
                        }
                        resolve();
                    });
                });
                Promise.all(mapped).then(function () {
                    //return this.cache.saveItem(cacheKey, array);
                    console.log("resolved ***&&&^^^%%%$$$$$$$");
                    resolve(array);
                });
            });
        });
    };
    FeedUser.prototype.ionViewDidEnter = function () {
        this.startAtKey4 = null;
        this.distances = [];
        this.loadDistances();
    };
    FeedUser.prototype.ionViewDidLeave = function () {
    };
    FeedUser.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('username').then(function (val) {
            _this.username = val;
        });
        this.fromprofile = this.navParams.get('param');
        this.loadAvailabilities();
        setTimeout(function () {
            _this.renderer.setElementStyle(_this.elRef.nativeElement.querySelector('.scroll-content'), 'margin-top', '6%');
        }, 750);
        var element = this.elRef.nativeElement.querySelector('.scroll-content');
        element.addEventListener('scroll', function (event) {
            var element = event.target;
            if (element.scrollHeight - element.scrollTop === element.clientHeight) {
                setTimeout(function () {
                    console.log('scrolled');
                    if (_this.weekly.nativeElement.style.display != 'none') {
                        console.log("in doinfinite promotionsssssss");
                        console.log(_this.startAtKey1 + "     before %%^&^&^% start at");
                        _this.af.list('/promotions', function (ref) { return ref.orderByKey().endAt(_this.startAtKey1).limitToLast(11); }).snapshotChanges().map(function (actions) {
                            return actions.map(function (action) { return ({ key: action.key, data: action.payload.val() }); });
                        }).subscribe(function (items) {
                            var x = 0;
                            _this.lastKey1 = _this.startAtKey1;
                            items.forEach(function (item) {
                                var storageRef = __WEBPACK_IMPORTED_MODULE_10_firebase__["storage"]().ref().child('/settings/' + item.data.customMetadata.username + '/profilepicture.png');
                                storageRef.getDownloadURL().then(function (url) {
                                    console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                                    item.data.customMetadata.picURL = url;
                                }).catch(function (e) {
                                    console.log("in caught url !!!!!!!$$$$$$$!!");
                                    item.data.customMetadata.picURL = 'assets/blankprof.png';
                                });
                                if (_this.startAtKey1 !== item.key && _this.lastKey1 !== item.key) {
                                    console.log(_this.startAtKey1 + "   :startAtKey1 before 4444444        item key:     " + item.key);
                                    if (item.data.customMetadata.username != null) {
                                        _this.promotions.push(item.data.customMetadata); //unshift?**************
                                    }
                                }
                                if (x == 0) {
                                    _this.startAtKey1 = item.key;
                                }
                                x++;
                            });
                        });
                        //infiniteScroll.complete(); 
                    }
                    else if (_this.price.nativeElement.style.display != 'none') {
                        _this.doInfiniteP();
                    }
                    else if (_this.ratingbox.nativeElement.style.display != 'none') {
                        _this.doInfiniteR();
                    }
                    else if (_this.distancey.nativeElement.style.display != 'none') {
                        _this.doInfiniteD();
                        //element.removeEventListener('scroll', '.scroll-content');
                    }
                    else if (_this.availability.nativeElement.style.display != 'none') {
                        _this.doInfiniteA();
                    }
                }, 500);
            }
        });
        this.loadPromotions();
        this.getAds();
        //setTimeout(() => {
        //div.style.marginTop = "-47%";
        //}, 1000);
        var ratings;
        var totalPotential;
        this.loadRatings().then(function (array) {
            console.log(array + '    ararrya &&*&&*&^^&%^%^');
            var r = 0;
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var item = array_1[_i];
                if (item.rating.one == 0 && item.rating.two == 0 && item.rating.three == 0 && item.rating.four == 0 && item.rating.five == 0) {
                    _this.stars = "No ratings";
                }
                else {
                    console.log("making the stars");
                    totalPotential = item.rating.one * 5 + item.rating.two * 5 + item.rating.three * 5 + item.rating.four * 5 + item.rating.five * 5;
                    ratings = item.rating.one + item.rating.two * 2 + item.rating.three * 3 + item.rating.four * 4 + item.rating.five * 5;
                    var i = (ratings / totalPotential) * 100;
                    if (Math.round(i) <= 20) {
                        _this.stars = '\u2605';
                    }
                    if (Math.round(i) > 20 && Math.round(i) <= 40) {
                        _this.stars = '\u2605\u2605';
                    }
                    if (Math.round(i) > 40 && Math.round(i) <= 60) {
                        _this.stars = '\u2605\u2605\u2605';
                    }
                    if (Math.round(i) > 60 && Math.round(i) <= 80) {
                        _this.stars = '\u2605\u2605\u2605\u2605';
                    }
                    if (Math.round(i) > 80) {
                        _this.stars = '\u2605\u2605\u2605\u2605\u2605';
                    }
                }
                item.stars = _this.stars;
                _this.rating.push(item);
                //this.renderer.setElementStyle(this.noavail.nativeElement, 'display', 'none');
                r++;
            }
            console.log("THIS IS THE SORTED ARRAY TO BE SOthis.rrrED        " + JSON.stringify(_this.rating));
            _this.rating.sort(function (a, b) {
                if (a.stars !== "No ratings" && b.stars !== "No ratings") {
                    if (a.stars === b.stars) {
                        return 0;
                    }
                    else {
                        return a.stars.length < b.stars.length ? 1 : -1;
                    }
                }
                else {
                    if (a.stars === "No ratings") {
                        return 1;
                    }
                    else if (b.stars === "No ratings") {
                        return -1;
                    }
                }
            });
            //this.loadDistances().then(() => {
            _this.loadPrices();
            //});
            setTimeout(function () {
                console.log("in load availabilities ......... ");
                console.log(JSON.stringify(_this.availabilities));
                _this.availabilities.sort(function (a, b) {
                    return Date.parse('01/01/2013 ' + a.time) - Date.parse('01/01/2013 ' + b.time);
                });
                console.log('*****previous******');
                console.log(JSON.stringify(_this.availabilities));
                console.log('*****sorted********');
                for (var _i = 0, _a = _this.availabilities; _i < _a.length; _i++) {
                    var i = _a[_i];
                    console.log(i.time + "          this is itime");
                    var date = new Date('01/01/2013 ' + i.time);
                    console.log(date + "          this is date in idate");
                    var str = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
                    console.log(str);
                    i.time = str;
                }
                /*console.log("UNSUBSCRIBED");
                if(this.subscription6 != null) {
                  this.subscription6.unsubscribe();
                }*/
            }, 1500);
            _this.loadDistances();
        });
        ////this.renderer.setElementStyle(this.promos.nativeElement, 'color', '#e6c926');
        this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'block');
        this.renderer.setElementStyle(this.price.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.distancey.nativeElement, 'display', 'none');
        /*setTimeout(() => {
          this.loadDistances();
        },1000)*/
    };
    FeedUser.prototype.presentProfileModal = function (salon, time) {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__modals_popup_popup__["a" /* PopUp */], { salon: salon, time: time });
        profileModal.present();
    };
    FeedUser.prototype.presentProfileModalDistance = function (salon) {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__modals_popupother_popupother__["a" /* PopUpOther */], { salon: salon });
        profileModal.present();
    };
    FeedUser.prototype.presentProfileModalRatings = function (salon) {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__modals_popupother_popupother__["a" /* PopUpOther */], { salon: salon });
        profileModal.present();
    };
    FeedUser.prototype.presentProfileModalPrice = function (salon) {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__modals_popupother_popupother__["a" /* PopUpOther */], { salon: salon });
        profileModal.present();
    };
    FeedUser.prototype.toolClicked = function (event) {
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
                    }
                    else {
                        _this.config = {
                            direction: 'horizontal',
                            slidesPerView: '1',
                            keyboardControl: false
                        };
                        _this.swiperSize = 'big';
                    }
                    _this.toolbarClicks = 0;
                }
                else {
                    _this.toolbarClicks = 0;
                }
            }, 300);
        }
    };
    FeedUser.prototype.switchView = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__feedstylist_feedstylist__["a" /* FeedStylist */]);
    };
    FeedUser.prototype.closeMenu = function () {
        if (this.showDropDown == 'down' || this.showDropDownHeight == 'down') {
            this.showDropDown = 'up';
            this.showDropDownHeight = 'up';
        }
        else {
            //
        }
        this.renderer.setElementStyle(this.changeText.nativeElement, 'color', 'gray');
        this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', '#e6c926');
        //this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');
        //this.renderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.availability.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.ratingbox.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'block');
        this.renderer.setElementStyle(this.price.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.distancey.nativeElement, 'display', 'none');
    };
    FeedUser.prototype.closeMenuP = function () {
        if (this.showDropDown == 'down' || this.showDropDownHeight == 'down') {
            this.showDropDown = 'up';
            this.showDropDownHeight = 'up';
        }
        else {
            //
        }
        this.renderer.setElementStyle(this.changeText.nativeElement, 'color', 'gray');
        //this.renderer.setElementStyle(this.contentOne.nativeElement, 'display', 'block');
        this.renderer.setElementStyle(this.availability.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.ratingbox.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'none');
        //this.renderer.setElementStyle(this.promos.nativeElement, 'color', '#e6c926');
        this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
        this.renderer.setElementStyle(this.price.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.distancey.nativeElement, 'display', 'none');
    };
    FeedUser.prototype.dropDown = function () {
        //this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');
        this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
        if (this.downState == 'down') {
            this.showDropDownHeight = (this.showDropDownHeight == 'up') ? 'down' : 'up';
        }
        else {
            this.showDropDown = (this.showDropDown == 'up') ? 'down' : 'up';
        }
    };
    FeedUser.prototype.dropDownD = function () {
        this.renderer.setElementStyle(this.elRef.nativeElement.querySelector('.scroll-content'), 'margin-top', '8%');
        this.renderer.setElementStyle(this.changeText.nativeElement, 'color', '#e6c926');
        this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
        //this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');
        //this.renderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.availability.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.ratingbox.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.price.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.distancey.nativeElement, 'display', 'block');
        this.changeText.nativeElement.innerHTML = "Distance";
        this.dropDown();
    };
    FeedUser.prototype.dropDownA = function () {
        this.changeText.nativeElement.innerHTML = "Availability";
        this.renderer.setElementStyle(this.changeText.nativeElement, 'color', '#e6c926');
        //this.renderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.availability.nativeElement, 'display', 'block');
        this.renderer.setElementStyle(this.ratingbox.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.price.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.distancey.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
        //this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');
        this.dropDown();
    };
    FeedUser.prototype.dropDownP = function () {
        this.changeText.nativeElement.innerHTML = "Price";
        this.renderer.setElementStyle(this.changeText.nativeElement, 'color', '#e6c926');
        this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
        //this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');
        this.renderer.setElementStyle(this.elRef.nativeElement.querySelector('.scroll-content'), 'margin-top', '6%');
        this.renderer.setElementStyle(this.price.nativeElement, 'display', 'block');
        //this.renderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.availability.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.ratingbox.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.distancey.nativeElement, 'display', 'none');
        //setTimeout(() => {
        //this.renderer.setElementStyle(this.elRef.nativeElement.querySelector('.scroll-content'), 'margin-top', '-47%');
        //}, 1000);
        this.dropDown();
    };
    FeedUser.prototype.dropDownR = function () {
        this.changeText.nativeElement.innerHTML = "Rating";
        this.renderer.setElementStyle(this.elRef.nativeElement.querySelector('.scroll-content'), 'margin-top', '6%');
        this.renderer.setElementStyle(this.changeText.nativeElement, 'color', '#e6c926');
        this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
        //this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');
        //this.renderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.availability.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.ratingbox.nativeElement, 'display', 'block');
        this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.price.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.distancey.nativeElement, 'display', 'none');
        this.dropDown();
    };
    FeedUser.prototype.gotoProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__stylistprofile_stylistprofile__["a" /* StylistProfile */]);
    };
    FeedUser.prototype.onScroll = function (event) {
        console.log(event);
    };
    FeedUser.prototype.loadAvailabilities = function () {
        var _this = this;
        //return new Promise((resolve, reject) => {
        this.af.list('/today', function (ref) { return ref.orderByKey().limitToFirst(48); }).snapshotChanges().map(function (actions) {
            return actions.map(function (action) { return ({ key: action.key, data: action.payload.val() }); });
        }).subscribe(function (items) {
            _this.startAtKey5 = items[items.length - 1].key;
            items.forEach(function (item) {
                console.log(item + "    item item item");
                var storageRef = __WEBPACK_IMPORTED_MODULE_10_firebase__["storage"]().ref().child('/settings/' + item.data.salon + '/profilepicture.png');
                storageRef.getDownloadURL().then(function (url) {
                    console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                    item.data.pic = url;
                    _this.availabilities.push(item.data);
                }).catch(function (e) {
                    console.log("in caught url !!!!!!!$$$$$$$!!");
                    item.data.pic = 'assets/blankprof.png';
                    _this.availabilities.push(item.data);
                });
            });
        });
    };
    FeedUser.prototype.setDateTime = function (time) {
        var date = new Date();
        var index = time.indexOf(":"); // replace with ":" for differently displayed time.
        var index2 = time.indexOf(" ");
        var hours = time.substring(0, index);
        var minutes = time.substring(index + 1, index2);
        var mer = time.substring(index2 + 1, time.length);
        console.log(mer + "        *******AMPM");
        if (mer == "PM") {
            console.log(hours + "        ())()()(()hours before(()()(");
            var number = parseInt(hours) + 12;
            hours = number.toString();
            console.log(hours + "      **********hours after*******");
        }
        date.setHours(hours);
        date.setMinutes(minutes);
        return date;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('changeText'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FeedUser.prototype, "changeText", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('availability'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FeedUser.prototype, "availability", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('contentone'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FeedUser.prototype, "contentOne", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('ratings'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FeedUser.prototype, "ratingbox", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('weeklydeals'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FeedUser.prototype, "weekly", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('promos'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FeedUser.prototype, "promos", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('weekly'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FeedUser.prototype, "weeklyyellow", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('price'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FeedUser.prototype, "price", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('distance'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FeedUser.prototype, "distancey", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('noavail'),
        __metadata("design:type", Object)
    ], FeedUser.prototype, "noavail", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('infinitescroll'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FeedUser.prototype, "infinitescroll", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
    ], FeedUser.prototype, "content", void 0);
    FeedUser = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-feed-user',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/feeduser/feeduser.html"*/'<ion-header (swipeleft)="swipeLeft()" (swiperight)="toFull()"> <!---->\n<div> <!--(swiperight)="swipeRight()" (swipeleft)="swipeLeft()"-->\n  <ion-item class="itemadspace" [@slideDown]="downState" no-padding no-lines>\n    <div class="stylistview">\n      <button class="stylistviewbutton" (tap)="switchView()" ion-button color="secondary">Stylist View</button>\n    </div>\n    <!--<h3 class="feedtitle">User Feed</h3>-->\n\n    <swiper #swiper [config]="config" [(index)]="swiperIndex" (indexChange)="indexChange()">\n      <div *ngFor="let ad of ads; let i = index" class="adcontainer">\n        <img src="{{ad}}" class="adimage" #adimage>\n      </div>\n    </swiper>\n  </ion-item>\n  \n  <div class="clickme" (tap)="toolClicked($event)">\n    <ion-toolbar [@toolSlide]="toolbarState" color="black" id="iontoolbar">\n      <ion-icon class=\'custom-icon\' name="play"></ion-icon>\n      <button #changeText class="all toolbarstyle" (tap)="dropDown()">Availability</button><ion-icon class=\'down-icon\' name="arrow-down"></ion-icon>\n\n      <!--<button #promos class="promos toolbarstyle" (tap)="closeMenuP()">Promos</button>-->\n      <button #weekly class="weekly toolbarstyle" (tap)="closeMenu()">Promotions</button>\n    </ion-toolbar>\n  </div>\n\n  <ul [@show]="showDropDown" class="dropdown">\n    <li (tap)="dropDownA()">Availability</li>\n    <li (tap)="dropDownD()">Distance</li>\n    <li (tap)="dropDownP()">Price</li>\n    <li (tap)="dropDownR()">Rating</li>\n  </ul>\n\n  <ul [@showHeight]="showDropDownHeight" class="dropdowntwo">\n    <li (tap)="dropDownA()">Availability</li>\n    <li (tap)="dropDownD()">Distance</li>\n    <li (tap)="dropDownP()">Price</li>\n    <li (tap)="dropDownR()">Rating</li>\n  </ul>\n</div>\n</ion-header>\n\n<ion-content no-padding>\n<div (swipeLeft)="swipeLeft()" (swipeRight)="toFull()"> <!--(swipeRight)="toProfile()"-->\n  \n\n  \n  <!--<ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>-->\n\n\n  <div class =\'availability contentone\' #availability [@moveList]=\'moveState\'>\n   <ion-list class="marginstatus" no-padding>\n     <ion-item *ngFor="let z of availabilities" no-padding (tap)="presentProfileModal(z.salon, z.time)">\n      <div class="feedtoptextcontainer">\n        <div class="imageparent">\n          <img class="postprofilepic" src="{{z.pic}}">\n        </div>\n        <div class="usernamecontainer">\n          <h4 class="postusername">@{{z.salon}}</h4><br>\n          <h4 class="poststudio">{{z.time}}</h4>\n        </div>\n      </div>\n      <!--<img class="imagepost" src="{{i}}">-->\n     </ion-item>\n   </ion-list>\n  </div>\n\n  <div class =\'distance contentone\' #distance [@moveList]=\'moveState\'>\n   <ion-list class="marginstatus" no-padding>\n     <ion-item *ngFor="let z of (distanceList|async)" no-padding>\n      <div class="feedtoptextcontainer">\n        <div class="imageparent">\n          <img class="postprofilepic" src="{{z.picURL}}"> <!--{{z.pic}}-->\n        </div>\n        <div class="usernamecontainer">\n          <h4 class="postusername">@{{z.username}}</h4><br>\n          <h4 class="poststudio">{{z.distance}} mi</h4>\n        </div>\n      </div>\n      <!--<img class="imagepost" src="{{i}}">-->\n     </ion-item>\n   </ion-list>\n  </div>\n\n  <div class =\'ratings contentone\' #ratings [@moveList]=\'moveState\'>\n   <ion-list class="marginstatus" no-padding>\n     <ion-item *ngFor="let a of rating ; let i = index" no-padding (tap)="presentProfileModalRatings(a.username)">\n      <div class="feedtoptextcontainer">\n        <div class="imageparent">\n          <img class="postprofilepic" src="{{a.picURL}}">\n        </div>\n        <div class="usernamecontainer">\n          <h4 class="postusername">@{{a.username}}</h4><br>\n          <h4 class="poststudio">{{a.stars}}</h4>\n        </div>\n      </div>\n      <!--<img class="imagepost" src="{{i}}">-->\n     </ion-item>\n   </ion-list>\n  </div>\n\n  <div class =\'price contentone\' #price [@moveList]=\'moveState\'>\n   <ion-list class="marginstatus" no-padding>\n     <ion-item *ngFor="let a of pricesArray" no-padding (tap)="presentProfileModalPrice(a.username)">\n      <div class="feedtoptextcontainer">\n        <div class="imageparent">\n          <img class="postprofilepic" src="{{a.picURL}}">\n        </div>\n        <div class="usernamecontainer">\n          <h4 class="postusername">@{{a.username}}</h4><br>\n          <h4 class="poststudio">{{a.price}}</h4>\n        </div>\n      </div>\n      <!--<img class="imagepost" src="{{i}}">-->\n     </ion-item>\n   </ion-list>\n   <!--<ion-infinite-scroll (ionInfinite)="doInfiniteP($event)">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more data...">\n    </ion-infinite-scroll-content>\n   </ion-infinite-scroll>-->\n  </div>\n\n  <div class =\'contentone weeklydeals\' #weeklydeals [@moveList]=\'moveState\'>\n   <ion-list class="marginstatus weeklyy" no-padding>\n     <ion-item *ngFor="let a of promotions" no-padding (tap)="loadModal(a.username)">\n      <div class="feedtoptextcontainer">\n        <!--<div class="imageparent">\n          <img class="postprofilepic" src="{{a.url}}">\n        </div>-->\n        <div class="usernamecontainer">\n          <h4 class="postusername">@{{a.username}}</h4><br>\n        </div>\n        <h3 class="promotitle">{{a.title}}</h3>\n        <div class="desccontainer">\n          <h4 class="deal">{{a.caption}}</h4>\n        </div>\n      </div>\n      <!--<img class="imagepost" src="{{i}}">-->\n     </ion-item>\n   </ion-list>\n   <!--<ion-infinite-scroll (ionInfinite)="doInfinite($event)" #infinitescroll>\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more data...">\n    </ion-infinite-scroll-content>\n   </ion-infinite-scroll>-->\n  </div>\n\n  <ion-item class="noavail" #noavail no-padding no-lines>NO RESULTS</ion-item>\n</div>\n</ion-content>'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/feeduser/feeduser.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('slideDown', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('down', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        height: '250px',
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('notDown', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        height: '88px',
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms ease-in')),
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('moveList', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('down', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        'margin-top': "270px",
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('up', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        'margin-top': "112px",
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms ease-in')),
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('toolSlide', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('down', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        top: '0px'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('up', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        top: '0px'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms ease-in')),
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('show', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('down', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        display: 'block',
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('up', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        display: 'none',
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms ease-in')),
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('showHeight', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('down', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        display: 'block',
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('up', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        display: 'none',
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms ease-in')),
                ]),
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_17_ionic_cache__["b" /* CacheService */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_native_geocoder__["a" /* NativeGeocoder */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */]])
    ], FeedUser);
    return FeedUser;
}());

//# sourceMappingURL=feeduser.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__booking_booking__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__postpage_postpage__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userbooking_userbooking__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dropin_dropin__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_cameraservice__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_firebase__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_img_viewer__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__modals_rate_rate__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ionic_native__ = __webpack_require__(951);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















//import { IonicApp, IonicModule } from 'ionic-angular';
//import { MyApp } from './app/app.component';
var UserProfile = (function () {
    function UserProfile(app, afAuth, elRef, params, modalCtrl, storage, imageViewerCtrl, loadingController, myrenderer, af, actionSheetCtrl, camera, navCtrl, navParams, cameraService) {
        this.app = app;
        this.afAuth = afAuth;
        this.elRef = elRef;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.imageViewerCtrl = imageViewerCtrl;
        this.loadingController = loadingController;
        this.myrenderer = myrenderer;
        this.af = af;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cameraService = cameraService;
        this.viewDate = new Date();
        this.events = [];
        this.calendar = { 'mode': 'month', 'currentDate': this.viewDate };
        this.moveState = 'up';
        this.picURLS = [];
        this.square = 0;
        this.picURL = "";
        this.bio = "";
        this.datesToSelect = [];
        this.timesOpen = [];
        this.set = false;
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
        this.times = [{ 'time': '8:00 AM', 'selected': false }, { 'time': '12:00 PM', 'selected': false }, { 'time': '4:00 PM', 'selected': false },
            { 'time': '8:30 AM', 'selected': false }, { 'time': '12:30 PM', 'selected': false }, { 'time': '4:30 PM', 'selected': false },
            { 'time': '9:00 AM', 'selected': false }, { 'time': '1:00 PM', 'selected': false }, { 'time': '5:00 PM', 'selected': false },
            { 'time': '9:30 AM', 'selected': false }, { 'time': '1:30 PM', 'selected': false }, { 'time': '5:30 PM', 'selected': false },
            { 'time': '10:00 AM', 'selected': false }, { 'time': '2:00 PM', 'selected': false }, { 'time': '6:00 PM', 'selected': false },
            { 'time': '10:30 AM', 'selected': false }, { 'time': '2:30 PM', 'selected': false }, { 'time': '6:30 PM', 'selected': false },
            { 'time': '11:00 AM', 'selected': false }, { 'time': '3:00 PM', 'selected': false }, { 'time': '7:00 PM', 'selected': false },
            { 'time': '11:30 AM', 'selected': false }, { 'time': '3:30 PM', 'selected': false }, { 'time': '7:30 PM', 'selected': false }
        ];
    }
    UserProfile.prototype.ngOnDestroy = function () {
        if (this.subscription2 != null) {
            this.subscription2.unsubscribe();
        }
        if (this.subscription3 != null) {
            this.subscription3.unsubscribe();
        }
        if (this.subscription4 != null) {
            this.subscription4.unsubscribe();
        }
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        if (this.subscription6 != null) {
            this.subscription6.unsubscribe();
        }
        if (this.subscription7 != null) {
            this.subscription7.unsubscribe();
        }
        if (this.subscription9 != null) {
            this.subscription9.unsubscribe();
        }
    };
    UserProfile.prototype.instagramOpen = function () {
        var url;
        this.item5 = this.af.object('/profiles/stylists/' + this.username + '/instagramURL');
        this.item5.subscribe(function (item) {
            if (item["$value"] == null) {
                //
            }
            else {
                var browser = new __WEBPACK_IMPORTED_MODULE_14_ionic_native__["a" /* InAppBrowser */](item['$value'], "_system");
            }
        }).unsubscribe();
    };
    UserProfile.prototype.facebookOpen = function () {
        this.item6 = this.af.object('/profiles/stylists/' + this.username + '/facebookURL');
        this.item6.subscribe(function (item) {
            if (item["$value"] == null) {
                //
            }
            else {
                var browser = new __WEBPACK_IMPORTED_MODULE_14_ionic_native__["a" /* InAppBrowser */](item['$value'], "_system");
            }
        }).unsubscribe();
    };
    UserProfile.prototype.depositOpen = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__dropin_dropin__["a" /* DropinPage */], { page: 'userprofile', username: this.username });
    };
    UserProfile.prototype.followStylist = function () {
        var _this = this;
        this.item = this.af.object('/profiles/stylists/' + this.username + '/followers');
        this.subscription = this.item.subscribe(function (item) {
            if (item.$value == null) {
                var array = [];
                array.push((_a = {}, _a[_this.userusername] = _this.phone, _a));
                _this.followsty._elementRef.nativeElement.innerHTML = "FOLLOWING";
                _this.item.update(array);
            }
            else {
                if (item.indexOf(_this.userusername) == -1) {
                    item.push((_b = {}, _b[_this.userusername] = _this.phone, _b));
                    _this.item.update(item);
                }
                else {
                    _this.followsty._elementRef.nativeElement.innerHTML = "FOLLOWING";
                }
            }
            var _a, _b;
        });
    };
    UserProfile.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.username = this.params.get('username');
        this.storage.get('phone').then(function (val) { _this.phone = val; });
        this.subscription7 = this.afAuth.authState.subscribe(function (data) {
            if (data.email && data.uid) {
                console.log("logged in");
                _this.uuid = data.uid;
            }
        });
        this.storage.get('username').then(function (val) {
            _this.userusername = val;
        });
        this.storage.get('type').then(function (val) {
            _this.type = val;
        });
        console.log(this.username + "         this is item @@#2332dfdffdfd23");
        this.item2 = this.af.object('/profiles/stylists/' + this.username + '/followers');
        this.item2.subscribe(function (item) {
            var bool = false;
            if (Object.keys(item)[0] == '$value') {
                bool = true;
            }
            if (!bool) {
                console.log(typeof item + " type of type of type of");
                var index = item.findIndex(function (item) { return item[_this.userusername] === _this.uuid; });
                console.log(index + "         this.userusername   8888888*&&&*&*&*&*");
                if (index !== -1) {
                    _this.followsty._elementRef.nativeElement.innerHTML = "FOLLOWING";
                }
            }
        }).unsubscribe();
        var storageRef = __WEBPACK_IMPORTED_MODULE_10_firebase___default.a.storage().ref().child('/settings/' + this.username + '/profilepicture.png');
        storageRef.getDownloadURL().then(function (url) {
            console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
            _this.profilePic = url;
        }).catch(function (e) {
            console.log("in caught url !!!!!!!$$$$$$$!!");
            _this.profilePic = 'assets/blankprof.png';
        });
        this.username = this.navParams.get("username");
        this.downloadImages().then(function () {
            _this.getProfileInfo();
            _this.downloadImagesFormula().then(function () {
            });
        });
        this.item9 = this.af.object('/profiles/stylists/' + this.username);
        this.subscription9 = this.item9.subscribe(function (item) {
            console.log(JSON.stringify(item) + "      rating number 989898222229889");
            var total = 0;
            for (var u in item.rating) {
                total += item.rating[u];
            }
            //this.facebook.nativeElement.src = item.facebookURL;
            //this.instagram.nativeElement.src = item.instagramURL;
            _this.totalRatings = total;
            var totalPotential = item.rating.one * 5 + item.rating.two * 5 + item.rating.three * 5 + item.rating.four * 5 + item.rating.five * 5;
            var ratings = item.rating.one + item.rating.two * 2 + item.rating.three * 3 + item.rating.four * 4 + item.rating.five * 5;
            console.log(ratings + "   ratings          total potential:    " + totalPotential);
            if (ratings == 0 && totalPotential == 0) {
                _this.stars = '\u2606\u2606\u2606\u2606\u2606';
            }
            var i = (ratings / totalPotential) * 100;
            if (Math.round(i) <= 20) {
                _this.stars = '\u2605\u2606\u2606\u2606\u2606';
            }
            if (Math.round(i) > 20 && Math.round(i) <= 40) {
                _this.stars = '\u2605\u2605\u2606\u2606\u2606';
            }
            if (Math.round(i) > 40 && Math.round(i) <= 60) {
                _this.stars = '\u2605\u2605\u2605\u2606\u2606';
            }
            if (Math.round(i) > 60 && Math.round(i) <= 80) {
                _this.stars = '\u2605\u2605\u2605\u2605\u2606';
            }
            if (Math.round(i) > 80) {
                _this.stars = '\u2605\u2605\u2605\u2605\u2605';
            }
        });
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        this.username = this.navParams.get('username');
        console.log(this.viewDate + " view date ");
        setTimeout(function () {
            _this.timesOpen = [];
            _this.selectedDate = _this.viewDate;
            console.log(_this.username + "this.username");
            var bool = false;
            _this.items2 = _this.af.list('appointments/' + _this.username + '/' + _this.selectedDate.getMonth());
            _this.subscription2 = _this.items2.subscribe(function (items) {
                var mapped = items.map(function (item) {
                    return new Promise(function (resolve, reject) {
                        console.log(item);
                        var boool = false;
                        var da = new Date(item.date.day * 1000);
                        console.log(da + "da");
                        console.log(da.getDate() + "dagetdate");
                        console.log(_this.selectedDate.getDate());
                        if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                            console.log("selected = item");
                            console.log(JSON.stringify(item.reserved) + "         item resesrved above");
                            //for(let m = 0; m < item.reserved.length; m++) {
                            //for(let r of item.reserved) {
                            //console.log(JSON.stringify(r));
                            for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                                var r = _a[_i];
                                if (r.selected == true) {
                                    _this.timesOpen.push(r);
                                    console.log('hit appointment');
                                    bool = true;
                                }
                            }
                        }
                        for (var _b = 0, _c = item.reserved.appointment; _b < _c.length; _b++) {
                            var r = _c[_b];
                            console.log(" in r of item.reserved.appointment");
                            if (r.selected == true) {
                                boool = true;
                            }
                        }
                        if (boool) {
                            console.log("in bool twice in bool once");
                            _this.datesToSelect.push(da.getDate());
                            resolve();
                        }
                        else {
                            resolve();
                        }
                    });
                });
                Promise.all(mapped).then(function () {
                    for (var _i = 0, _a = _this.tds; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (!item.classList.contains('text-muted')) {
                            console.log(typeof item.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                            if (_this.datesToSelect.indexOf(parseInt(item.innerText)) != -1) {
                                console.log("Inner text in      " + item.innerText);
                                _this.myrenderer.setElementClass(item, "greencircle", true);
                            }
                            else {
                                //this.myrenderer.setElementClass(item,"monthview-selected",false);
                            }
                        }
                    }
                });
            });
            //loading.dismiss();
        }, 1500);
    };
    UserProfile.prototype.getProfileInfo = function () {
        var _this = this;
        this.item = this.af.object('/profiles/stylists/' + this.username);
        this.subscription6 = this.item.subscribe(function (item) { _this.picURL = item.picURL; _this.bio = item.bio; });
    };
    UserProfile.prototype.openCamera = function (squarez) {
        this.presentActionSheet();
        this.square = squarez;
    };
    UserProfile.prototype.presentImage = function (squarez) {
        this.square = squarez;
        var itemArrayTwo = this.profComponents.toArray();
        var itemArrayfour = this.formulaBars.toArray();
        if (itemArrayfour[this.square - 1].nativeElement.style.display != 'none') {
            console.log("inside formula box");
            /*let profileModal = this.modalCtrl.create(FormulaBuy, { username: this.username, square: this.square });
            profileModal.present();*/
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__dropin_dropin__["a" /* DropinPage */], { username: this.username, square: this.square });
        }
        else {
            console.log(JSON.stringify(itemArrayTwo[this.square - 1]));
            var imageViewer = this.imageViewerCtrl.create(itemArrayTwo[this.square - 1].nativeElement);
            imageViewer.present();
        }
    };
    UserProfile.prototype.showSquare = function () {
        var itemArray = this.components.toArray();
        var itemArrayTwo = this.profComponents.toArray();
        this.myrenderer.setElementStyle(itemArray[this.square - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArrayTwo[this.square - 1].nativeElement, 'display', 'block');
    };
    UserProfile.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose source',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        var itemArrayTwo = _this.profComponents.toArray();
                        _this.cameraService.getMedia(_this.optionsGetCamera, _this.square).then(function () {
                            return new Promise(function (resolve, reject) {
                                var storageRef = __WEBPACK_IMPORTED_MODULE_10_firebase___default.a.storage().ref().child('/profile/' + _this.username + '/profile_' + _this.username + '_' + _this.square + '.png');
                                var loading = _this.loadingController.create({ content: "Loading..." });
                                loading.present();
                                setTimeout(function () {
                                    storageRef.getDownloadURL().then(function (url) {
                                        console.log(url);
                                        _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                                        _this.showSquare();
                                    });
                                    loading.dismiss();
                                }, 3000);
                            });
                        }); //pass in square choice
                        //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
                        console.log('camera clicked');
                    }
                }, {
                    text: 'Photo Library',
                    handler: function () {
                        var itemArrayTwo = _this.profComponents.toArray();
                        _this.cameraService.getMedia(_this.optionsGetMedia, _this.square).then(function () {
                            return new Promise(function (resolve, reject) {
                                var storageRef = __WEBPACK_IMPORTED_MODULE_10_firebase___default.a.storage().ref().child('/profile/' + _this.username + '/profile_' + _this.username + '_' + _this.square + '.png');
                                var loading = _this.loadingController.create({ content: "Loading..." });
                                loading.present();
                                setTimeout(function () {
                                    storageRef.getDownloadURL().then(function (url) {
                                        console.log(url);
                                        _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                                        _this.showSquare();
                                        resolve();
                                    });
                                    loading.dismiss();
                                }, 3000);
                            });
                            //
                        }).catch(function (e) {
                            console.log(e + "       eeeee");
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
    UserProfile.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        //this.navCtrl.push(SignUpPage);
    };
    UserProfile.prototype.presentRateModal = function () {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_12__modals_rate_rate__["a" /* Rate */], { "user": this.username });
        profileModal.present();
    };
    UserProfile.prototype.tappedPost = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__postpage_postpage__["a" /* PostpagePage */]);
    };
    UserProfile.prototype.tappedEmergency = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__booking_booking__["a" /* BookingPage */]);
    };
    UserProfile.prototype.backToFeed = function () {
        /*if(this.navParams.get('param1') == 'user') {
          this.navCtrl.push(FeedUser);
        }*/
        //else {
        this.navCtrl.popToRoot({ animate: true, animation: 'transition', duration: 100, direction: 'back' });
        //this.navCtrl.push(FeedStylist);
        //}
    };
    UserProfile.prototype.backToCal = function () {
        //if(this.navParams.get('param1') == 'user') {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__booking_booking__["a" /* BookingPage */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'forward' });
        //this.navCtrl.push(BookingPage);
        //}
        //else {
        //this.navCtrl.push(FeedStylist);
        //}
    };
    UserProfile.prototype.swipe = function (e, when) {
        var coord = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        var time = new Date().getTime();
        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        }
        else if (when === 'end') {
            var direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            var duration = time - this.swipeTime;
            if (duration < 1000 //Short enough
                && Math.abs(direction[1]) < Math.abs(direction[0]) //Horizontal enough
                && Math.abs(direction[0]) > 30) {
                var swipe = direction[0] < 0 ? 'next' : 'previous';
                console.log(swipe);
                if (swipe == 'next') {
                    this.backToCal();
                }
                else {
                    this.backToFeed();
                }
                //Do whatever you want with swipe
            }
        }
    };
    UserProfile.prototype.swipeLeft = function () {
        this.backToCal();
    };
    UserProfile.prototype.swipeRight = function () {
        this.backToFeed();
    };
    UserProfile.prototype.openCal = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__userbooking_userbooking__["a" /* UserBooking */], { username: this.username });
    };
    UserProfile.prototype.downloadImagesFormula = function () {
        console.log("IN DOWNLOAD IMAGES FORMULS __@_@_+_+@_@+_+@_+@");
        var self = this;
        var promises_array = [];
        var itemArrayTwo = this.profComponents.toArray();
        var itemArrayfour = this.formulaBars.toArray();
        var _loop_1 = function (z) {
            this_1.items5 = this_1.af.list('/formulas', {
                query: {
                    orderByChild: 'username',
                    equalTo: this_1.username
                }
            });
            this_1.subscription8 = this_1.items5.subscribe(function (items) {
                var mapped = items.map(function (item) {
                    return new Promise(function (resolve, reject) {
                        console.log(JSON.stringify(item) + "       getting an item");
                        if (item.visible == null && z == item.square) {
                            console.log(" in update update te update te update");
                            promises_array.push(new Promise(function (resolve, reject) {
                                var storageRef = __WEBPACK_IMPORTED_MODULE_10_firebase___default.a.storage().ref().child('/formulas/' + self.username + '/formula_' + self.username + '_' + z + '.png');
                                storageRef.getDownloadURL().then(function (url) {
                                    self.myrenderer.setElementAttribute(itemArrayTwo[z - 1].nativeElement, 'src', url);
                                    self.myrenderer.setElementStyle(itemArrayTwo[z - 1].nativeElement, 'display', 'block');
                                    self.myrenderer.setElementStyle(itemArrayfour[z - 1].nativeElement, 'display', 'block');
                                    //self.myrenderer.setElementStyle(itemArray[z - 1].nativeElement, 'display', 'none');
                                    console.log(z);
                                    resolve();
                                }).catch(function (error) {
                                    resolve();
                                    console.log(error.message);
                                });
                            }));
                        }
                    });
                });
            });
        };
        var this_1 = this;
        for (var z = 1; z < 10; z++) {
            _loop_1(z);
        }
        return Promise.all(promises_array);
    };
    UserProfile.prototype.downloadImages = function () {
        var self = this;
        var promises_array = [];
        var itemArrayTwo = this.profComponents.toArray();
        var _loop_2 = function (z) {
            promises_array.push(new Promise(function (resolve, reject) {
                var storageRef = __WEBPACK_IMPORTED_MODULE_10_firebase___default.a.storage().ref().child('/profile/' + self.username + '/profile_' + self.username + '_' + z + '.png');
                storageRef.getDownloadURL().then(function (url) {
                    self.myrenderer.setElementAttribute(itemArrayTwo[z - 1].nativeElement, 'src', url);
                    self.myrenderer.setElementStyle(itemArrayTwo[z - 1].nativeElement, 'display', 'block');
                    //self.myrenderer.setElementStyle(itemArray[z - 1].nativeElement, 'display', 'none');
                    console.log(z);
                    resolve();
                }).catch(function (error) {
                    resolve();
                    console.log(error.message);
                });
            }));
        };
        for (var z = 1; z < 10; z++) {
            _loop_2(z);
        }
        return Promise.all(promises_array);
    };
    UserProfile.prototype.ionViewDidEnter = function () {
    };
    UserProfile.prototype.moveCover = function () {
        if (this.set == false) {
            try {
                this.set = true;
                this.moveState = 'down';
                this.tds = this.elRef.nativeElement.querySelector('body > ion-app > ng-component > ion-nav > page-user-profile > ion-content > div.scroll-content > div > ion-item > div.item-inner > div > ion-label > calendar > div > monthview > div:nth-child(3) > ion-slides');
                console.log(this.tds + "   >>>>>>> >>>>>>");
                this.myrenderer.setElementClass(this.tds, 'moveCover', true);
                var thisel = this.elRef.nativeElement.querySelector('body > ion-app > page-user-profile > ion-content > div.scroll-content > div > ion-item > div.item-inner > div > ion-label > calendar > div > monthview > div:nth-child(3) > ion-slides > div > div.swiper-wrapper > ion-slide.swiper-slide.swiper-slide-active > div > table');
                this.myrenderer.setElementClass(thisel, 'marginchange', true);
                console.log('element class list   ' + thisel.classList);
            }
            catch (e) {
                console.log(e.message);
            }
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__userbooking_userbooking__["a" /* UserBooking */], { username: this.username });
        }
    };
    UserProfile.prototype.onCurrentDateChanged = function ($event) {
        var _this = this;
        //console.log(typeof $event);
        for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
            var x = _a[_i];
            x.selected = false;
        }
        console.log(typeof $event + "event event event *******");
        this.selectedDate = new Date($event);
        console.log(this.selectedDate + " thi si the selected date ((())))))");
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        //console.log($event);
        this.items4 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
        this.subscription4 = this.items4.subscribe(function (items) { return items.forEach(function (item) {
            //console.log(JSON.stringify(item));
            //console.log(item.date.day);
            console.log("dafirst    " + item.date.day);
            var da = new Date(item.date.day * 1000);
            _this.datesToSelect = [];
            _this.datesToSelect.push(da.getDate());
            console.log(da + "da");
            console.log(da.getDate() + "dagetdate");
            console.log(_this.selectedDate.getDate());
            if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                console.log("selected = item");
                console.log(JSON.stringify(item.reserved) + "         item resesrved");
                //for(let r of item.reserved.appointment) {
                //console.log(JSON.stringify(r));
                _this.times = item.reserved.appointment.slice(0);
                console.log('hit appointment');
                console.log(JSON.stringify(_this.times));
                /*for(let x of this.times) {
                  if(x.time == r) {
                    console.log('change selected');
                    x.selected = true;
                  }
                }*/
                //}
            }
        }); });
    };
    UserProfile.prototype.reloadSource = function (startTime, endTime) {
        console.log(startTime + " : starttime           endtime: " + endTime);
    };
    UserProfile.prototype.onEventSelected = function ($event) { };
    UserProfile.prototype.onViewTitleChanged = function (title) {
        var array = title.split(" ");
        //array[1];
        this.viewTitle = array[0].substring(0, 3);
        this.titleYear = array[1];
    };
    UserProfile.prototype.onTimeSelected = function ($event) {
        var _this = this;
        console.log(JSON.stringify($event) + "      THI SIIS EVENT @(@(@(@(@(");
        this.selectedDate = new Date($event.selectedTime);
        console.log(this.selectedDate + " thi si the selected date ((())))))");
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        if ($event.dontRunCode) {
            //console.log($event);
            this.items3 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
            this.subscription3 = this.items3.subscribe(function (items) { return items.forEach(function (item) {
                //console.log(JSON.stringify(item));
                //console.log(item.date.day);
                console.log("dafirst    " + item.date.day);
                var da = new Date(item.date.day * 1000);
                _this.datesToSelect = [];
                _this.datesToSelect.push(da.getDate());
                console.log(da + "da");
                console.log(da.getDate() + "dagetdate");
                console.log(_this.selectedDate.getDate());
                if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                    console.log("selected = item");
                    console.log(JSON.stringify(item.reserved) + "         item resesrved");
                    //for(let r of item.reserved.appointment) {
                    //console.log(JSON.stringify(r));
                    /*let bool = lse;
                    for(let r in item.reserved.appointment) {
                      if(r['selected'] == "true") {
                        bool = true;
                      }
                    }*/
                    _this.times = item.reserved.appointment.slice(0);
                    console.log('hit appointment');
                    console.log(JSON.stringify(_this.times));
                    /*for(let x of this.times) {
                      if(x.time == r) {
                        console.log('change selected');
                        x.selected = true;
                      }
                    }*/
                    //}
                }
                //console.log($event.runCode + "     dont run code!!!!!!");
                //if($event.runCode == true) {
                for (var _i = 0, _a = _this.tds; _i < _a.length; _i++) {
                    var item_1 = _a[_i];
                    if (!item_1.classList.contains('text-muted')) {
                        console.log(typeof item_1.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                        if (_this.datesToSelect.indexOf(parseInt(item_1.innerText)) != -1) {
                            console.log("Inner text in      " + item_1.innerText);
                            _this.myrenderer.setElementClass(item_1, "greencircle", true);
                        }
                        else {
                            //this.myrenderer.setElementClass(item,"monthview-selected",false);
                        }
                    }
                }
                //}
            }); });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('pluscontain'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], UserProfile.prototype, "components", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('profsquare'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], UserProfile.prototype, "profComponents", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('followsty'),
        __metadata("design:type", Object)
    ], UserProfile.prototype, "followsty", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('instagram'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], UserProfile.prototype, "instagram", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('facebook'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], UserProfile.prototype, "facebook", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('formulabar'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], UserProfile.prototype, "formulaBars", void 0);
    UserProfile = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-user-profile',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/userprofile/userprofile.html"*/'<ion-header (swipeRight)="swipeRight()">\n  <ion-toolbar>\n    <ion-title>@{{username}}</ion-title>\n\n    <!--<div class="settingscontainer">\n    	<ion-icon class="settings" name="settings" (tap)="goToSettings()"></ion-icon>\n    </div>-->\n  </ion-toolbar>\n    <!--<div class="stylistview">\n	    <button class="stylistviewbutton" ion-button color="secondary">Stylist View</button>\n	  </div>-->\n</ion-header>\n\n<ion-content no-padding>\n<div (swiperight)="swipeRight()">\n	<ion-item no-padding no-lines>\n		<div class="imageparent">\n		  <img class="postprofilepic" src="{{profilePic}}">\n		</div>\n	    <div class="rateandsocial">\n		    <div class=\'ratecontain\' (tap)="presentRateModal()">\n			    <div class=\'stars\'>{{stars}}</div>\n			    <div class=\'ratings\'>({{totalRatings}} ratings)</div>\n			</div>\n		    <div class="social">\n				<div class="fb inlineblock">\n					<img src="img/facebook.png" (tap)="facebookOpen()" #facebook>\n				</div>\n				<div class="insta inlineblock">\n		  			<img src="img/instagram.png" (tap)="instagramOpen()" #instagram>\n				</div>\n				<div class="deposit" (tap)="depositOpen()">\n		  			<img src="assets/dollarsign.png" #deposit>\n				</div>\n			</div>\n		</div>\n	  	<div class="stylistviewtwo">\n	    	<button class="stylistviewbuttontwo" ion-button (tap)="followStylist()" #followsty color="primary">Follow Stylist</button>\n	  	</div>\n	  	<div class=\'stylistsect\'>\n			<div class="name">@{{username}}</div>\n			<div class="bio">{{bio}}</div>\n		</div>\n		<div class=\'arrowleftholder\'>\n	    	<ion-icon class=\'forward\' name="arrow-back"></ion-icon>\n	    </div>\n		<div class="caltitle">{{viewTitle}} {{titleYear}}</div>\n		<div class=\'arrowrightholder\'>\n	    	<ion-icon class=\'forward\' name="arrow-forward"></ion-icon>\n	    </div>\n		<calendar (tap)="openCal()" class=\'cal\' [eventSource]="eventSource"\n	      [calendarMode]="calendar.mode"\n	      [currentDate]="calendar.currentDate"\n	      (onCurrentDateChanged)="onCurrentDateChanged($event)"\n	      (onRangeChanged)="reloadSource(startTime, endTime)"\n	      (onEventSelected)="onEventSelected($event)"\n	      (onTitleChanged)="onViewTitleChanged($event)"\n	      (onTimeSelected)="onTimeSelected($event)"\n	      step="30">\n	    </calendar>\n	</ion-item>\n	<ion-grid>\n	  <ion-row>\n	    <ion-col>\n\n	      <img (tap)="presentImage(1)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	    <ion-col>\n\n	      <img (tap)="presentImage(2)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	    <ion-col>\n\n	      <img (tap)="presentImage(3)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	  </ion-row>\n	  <ion-row>\n	    <ion-col>\n\n	      <img (tap)="presentImage(4)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	    <ion-col>\n\n	      <img (tap)="presentImage(5)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	    <ion-col>\n\n	      <img (tap)="presentImage(6)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	  </ion-row>\n	  <ion-row>\n	    <ion-col>\n\n	      <img (tap)="presentImage(7)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	    <ion-col>\n\n	      <img (tap)="presentImage(8)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	    <ion-col>\n\n	      <img (tap)="presentImage(9)" class="imagesquare" #profsquare [src]="">\n	      <div class="formulabar" #formulabar>Formula</div>\n	    </ion-col>\n	  </ion-row>\n	</ion-grid>\n</div>\n\n<!--<ion-fab bottom center >\n  <button ion-fab></button>\n  <ion-fab-list side="right">\n    <button class="textsizebutton" (tap)=\'tappedPost()\' ion-fab>Post</button>\n  </ion-fab-list>\n  <ion-fab-list side="left">\n    <button class="textsizebutton" (tap)=\'tappedEmergency()\' ion-fab><ion-icon name="alarm"></ion-icon></button>\n  </ion-fab-list>\n</ion-fab>-->\n</ion-content>'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/userprofile/userprofile.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('moveCover', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('down', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({})),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('up', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({})),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms ease-in')),
                ]),
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ModalController */], __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_11_ionic_img_viewer__["a" /* ImageViewerController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_8_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__services_cameraservice__["a" /* CameraService */]])
    ], UserProfile);
    return UserProfile;
}());

//# sourceMappingURL=userprofile.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_feedstylist_feedstylist__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stylistprofile_stylistprofile__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic2_calendar__ = __webpack_require__(663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_sms__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { Appointment } from '../../models/appointment';







/**
 * Generated class for the BookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BookingPage = (function () {
    function BookingPage(sms, elRef, myrenderer, loadingController, storage, navCtrl, navParams, af) {
        this.sms = sms;
        this.elRef = elRef;
        this.myrenderer = myrenderer;
        this.loadingController = loadingController;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.viewDate = new Date();
        this.events = [];
        this.calendar = { 'mode': 'month', 'currentDate': this.viewDate };
        this.times = [];
        this.slot = [];
        this.appointments = [];
        this.datesToSelect = [];
    }
    BookingPage.prototype.selectArrowRight = function () {
        console.log("month view component   *******  ******8    " + JSON.stringify(__WEBPACK_IMPORTED_MODULE_6_ionic2_calendar__["a" /* NgCalendarModule */]));
    };
    BookingPage.prototype.emergency = function (i) {
        var _this = this;
        console.log(JSON.stringify(i) + " this is i in emergency");
        var slotsarray = this.slots.toArray();
        this.myrenderer.setElementStyle(slotsarray[i].nativeElement, 'background-color', 'red');
        this.times[i].selected = true;
        var string1 = '';
        console.log('in emergency');
        this.follow = this.af.list('/profiles/stylists/' + this.username + "/followers");
        this.subscription4 = this.follow.subscribe(function (items) {
            var mapped = items.map(function (item) {
                return new Promise(function (resolve, reject) {
                    console.log(JSON.stringify(item) + " item item item");
                    var arr = Object.keys(item);
                    console.log(typeof item[arr[0]] + "    type followers");
                    string1 += (item[arr[0]]) + ", ";
                    console.log(string1 + " this is string 1");
                    resolve();
                });
            });
            Promise.all(mapped).then(function () {
                //let month1 = date.getUTCMonth() + 1;
                //let date1 = date.getUTCDate();
                console.log(string1 + " this is string 1 2");
                _this.sms.send(string1, _this.username + " just opened up a spot at " + _this.times[i].time + " on " + _this.viewTitle + " " + _this.viewDate.getUTCDate() + "!").then(function () {
                    alert("Press SAVE to update your calendar with the new time.");
                }).catch(function (e) { console.log(JSON.stringify(e)); });
            });
        });
    };
    BookingPage.prototype.swipe = function (e, when) {
        var coord = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        var time = new Date().getTime();
        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        }
        else if (when === 'end') {
            var direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            var duration = time - this.swipeTime;
            if (duration < 1000 //Short enough
                && Math.abs(direction[1]) < Math.abs(direction[0]) //Horizontal enough
                && Math.abs(direction[0]) > 30) {
                var swipe = direction[0] < 0 ? 'next' : 'previous';
                console.log(swipe);
                if (swipe == 'next') {
                    this.goToFeed();
                    //this.loading.present();
                }
                else {
                    this.goToProfile();
                }
                //Do whatever you want with swipe
            }
        }
    };
    BookingPage.prototype.swipeLeft = function () {
        this.goToFeed();
    };
    BookingPage.prototype.swipeRight = function () {
        this.goToProfile();
    };
    BookingPage.prototype.logForm = function () {
        var _this = this;
        var foundit = false;
        console.log(JSON.stringify(this.times) + "               in logform");
        //let appoint = {} as Appointment;
        //console.log(this.selectedDate);
        //appoint.datex = this.selectedDate;
        //appoint.reserved = this.appointments;
        //console.log(appoint);
        //let timestamp = this.toTimeStamp(this.selectedDate.toString());
        this.items = this.af.list('/appointments/' + this.username + '/' + this.selectedDate.getMonth());
        this.subscription = this.items.subscribe(function (items) { return items.forEach(function (item) {
            var str = new Date(item.date.day * 1000);
            var mon = str.getMonth();
            var dy = str.getDate();
            var boool = false;
            if (mon == _this.selectedDate.getMonth() && dy == _this.selectedDate.getDate()) {
                console.log("             inside update");
                foundit = true;
                _this.items.update(item.$key, { 'reserved': { 'appointment': _this.times } });
                for (var _i = 0, _a = _this.times; _i < _a.length; _i++) {
                    var r = _a[_i];
                    if (r.selected == true) {
                        boool = true;
                    }
                }
                if (!boool) {
                    _this.datesToSelect.splice(_this.datesToSelect.indexOf(_this.selectedDate.getDate()), 1);
                    for (var _b = 0, _c = _this.tds; _b < _c.length; _b++) {
                        var item_1 = _c[_b];
                        //if(!item.classList.contains('text-muted')) {
                        console.log(item_1.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                        if (_this.datesToSelect.indexOf(parseInt(item_1.innerText)) != -1) {
                            _this.myrenderer.setElementClass(item_1, "greencircle", true);
                        }
                        else {
                            _this.myrenderer.setElementClass(item_1, "greencircle", false);
                        }
                    }
                }
            }
        }); });
        if (!foundit) {
            var bool = false;
            console.log(this.username + 'down here');
            for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
                var x = _a[_i];
                if (x.selected) {
                    bool = true;
                }
            }
            if (bool) {
                this.items.push({ date: { day: this.selectedDate.getTime() / 1000 }, reserved: { appointment: this.times } }).then(function (snap) {
                    var key = snap.key;
                    console.log(key);
                });
            }
            else {
            }
        }
        alert("Availability Saved");
    };
    BookingPage.prototype.checkboxCheck = function (z) {
    };
    BookingPage.prototype.arraysEqual = function (a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return false;
        if (a.length != b.length)
            return false;
        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    BookingPage.prototype.getData = function (val) {
        this.username = val;
    };
    BookingPage.prototype.goToFeed = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_feedstylist_feedstylist__["a" /* FeedStylist */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'forward' });
    };
    BookingPage.prototype.goToProfile = function () {
        //this.loading = this.loadingController.create({content : "Loading..."});
        //this.loading.present();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__stylistprofile_stylistprofile__["a" /* StylistProfile */], {}, { animate: true, animation: 'transition', duration: 100, direction: 'back' });
    };
    BookingPage.prototype.ionViewWillLeave = function () {
        //this.loading.dismiss()
    };
    BookingPage.prototype.ionViewDidLeave = function () {
        //this.loading.dismiss();
    };
    //ionViewDidLoad() {
    /*this.isSomething = true;

    this.storage.get('username').then((val) => {
      this.getData(val);
    });*/
    //}
    BookingPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //let loading = this.loadingController.create({content : "Loading..."});
        //loading.present();
        this.times = [{ 'time': '8:00 AM', 'selected': false }, { 'time': '8:30 AM', 'selected': false }, { 'time': '9:00 AM', 'selected': false },
            { 'time': '9:30 AM', 'selected': false }, { 'time': '10:00 AM', 'selected': false }, { 'time': '10:30 AM', 'selected': false },
            { 'time': '11:00 AM', 'selected': false }, { 'time': '11:30 AM', 'selected': false }, { 'time': '12:00 PM', 'selected': false },
            { 'time': '12:30 PM', 'selected': false }, { 'time': '1:00 PM', 'selected': false }, { 'time': '1:30 PM', 'selected': false },
            { 'time': '2:00 PM', 'selected': false }, { 'time': '2:30 PM', 'selected': false }, { 'time': '3:00 PM', 'selected': false },
            { 'time': '3:30 PM', 'selected': false }, { 'time': '4:00 PM', 'selected': false }, { 'time': '4:30 PM', 'selected': false },
            { 'time': '5:00 PM', 'selected': false }, { 'time': '5:30 PM', 'selected': false }, { 'time': '6:00 PM', 'selected': false },
            { 'time': '6:30 PM', 'selected': false }, { 'time': '7:00 PM', 'selected': false }, { 'time': '7:30 PM', 'selected': false }
        ];
        this.isSomething = true;
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        this.storage.get('username').then(function (val) {
            _this.username = val;
            //this.getData(val);
            console.log(_this.viewDate + " view date ");
            _this.selectedDate = _this.viewDate;
            _this.items2 = _this.af.list('appointments/' + _this.username + '/' + _this.selectedDate.getMonth());
            _this.subscription2 = _this.items2.subscribe(function (items) { return items.forEach(function (item) {
                var boool = false;
                var da = new Date(item.date.day * 1000);
                for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                    var r = _a[_i];
                    if (r.selected == true) {
                        boool = true;
                    }
                }
                if (boool) {
                    _this.datesToSelect.push(da.getDate());
                }
                console.log(da + "da");
                console.log(da.getDate() + "dagetdate");
                console.log(_this.selectedDate.getDate());
                if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                    console.log("selected = item");
                    //for(let m = 0; m < item.reserved.length; m++) {
                    //for(let r of item.reserved) {
                    //console.log(JSON.stringify(r));
                    _this.times = item.reserved.appointment.slice(0);
                    console.log('hit appointment');
                    //count++;
                    /*for(let x of this.times) {
                      if(x.time == r) {
                        console.log('change selected');
                        x.selected = true;
                      }
                    }*/
                    //}
                }
                /*let da = new Date(item.date.day*1000);
                if(this.viewDate.getDate() == da.getDate() && this.viewDate.getMonth() == da.getMonth()) {
                  console.log("selected = item");
                  let count = 0;
                  console.log(JSON.stringify(item.reserved) + "         item resesrved");
                  for(let r in item.reserved) {
                    this.times[count].selected = r[count].selected;
                    console.log('hit appointment');
                    count++;
                    /*for(let x of this.times) {
                      if(x.time == r) {
                        console.log('change selected');
                        x.selected = true;
                      }
                    }*/
                /*}
              }*/
                for (var _b = 0, _c = _this.tds; _b < _c.length; _b++) {
                    var item_2 = _c[_b];
                    if (!item_2.classList.contains('text-muted')) {
                        console.log(typeof item_2.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                        if (_this.datesToSelect.indexOf(parseInt(item_2.innerText)) != -1) {
                            console.log("Inner text in      " + item_2.innerText);
                            _this.myrenderer.setElementClass(item_2, "greencircle", true);
                        }
                        else {
                            //this.myrenderer.setElementClass(item,"monthview-selected",false);
                        }
                    }
                }
            }); });
        });
    };
    BookingPage.prototype.toTimeStamp = function (dateString) {
        return new Date(dateString.split('-').reverse().join('/')).getTime();
    };
    BookingPage.prototype.onCurrentDateChanged = function ($event) {
        var _this = this;
        //console.log(typeof $event);
        for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
            var x = _a[_i];
            x.selected = false;
        }
        console.log(typeof $event + "event event event *******");
        this.selectedDate = new Date($event);
        console.log(this.selectedDate + " thi si the selected date ((())))))");
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        //console.log($event);
        this.items3 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
        this.subscription3 = this.items3.subscribe(function (items) { return items.forEach(function (item) {
            //console.log(JSON.stringify(item));
            //console.log(item.date.day);
            console.log("dafirst    " + item.date.day);
            var da = new Date(item.date.day * 1000);
            _this.datesToSelect = [];
            var boool = false;
            for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                var r = _a[_i];
                if (r.selected == true) {
                    boool = true;
                }
            }
            if (boool) {
                _this.datesToSelect.push(da.getDate());
            }
            console.log(da + "da");
            console.log(da.getDate() + "dagetdate");
            console.log(_this.selectedDate.getDate());
            if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                console.log("selected = item");
                console.log(JSON.stringify(item.reserved) + "         item resesrved");
                //for(let r of item.reserved.appointment) {
                //console.log(JSON.stringify(r));
                _this.times = item.reserved.appointment.slice(0);
                console.log('hit appointment');
                console.log(JSON.stringify(_this.times));
                /*for(let x of this.times) {
                  if(x.time == r) {
                    console.log('change selected');
                    x.selected = true;
                  }
                }*/
                //}
            }
        }); });
    };
    BookingPage.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2 != null) {
            this.subscription2.unsubscribe();
        }
        if (this.subscription3 != null) {
            this.subscription3.unsubscribe();
        }
        if (this.subscription4 != null) {
            this.subscription4.unsubscribe();
        }
    };
    BookingPage.prototype.reloadSource = function (startTime, endTime) {
        console.log(startTime + " : starttime           endtime: " + endTime);
    };
    BookingPage.prototype.onEventSelected = function ($event) { };
    BookingPage.prototype.onViewTitleChanged = function (title) {
        var array = title.split(" ");
        //array[1];
        this.viewTitle = array[0];
        this.titleYear = array[1];
    };
    BookingPage.prototype.onTimeSelected = function ($event) {
        var _this = this;
        console.log(JSON.stringify($event) + "      THI SIIS EVENT @(@(@(@(@(");
        this.selectedDate = new Date($event.selectedTime);
        console.log(this.selectedDate + " thi si the selected date ((())))))");
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        if ($event.dontRunCode) {
            //console.log($event);
            this.items3 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
            this.subscription3 = this.items3.subscribe(function (items) { return items.forEach(function (item) {
                //console.log(JSON.stringify(item));
                //console.log(item.date.day);
                console.log("dafirst    " + item.date.day);
                var da = new Date(item.date.day * 1000);
                _this.datesToSelect = [];
                var boool = false;
                for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                    var r = _a[_i];
                    if (r.selected == true) {
                        boool = true;
                    }
                }
                if (boool) {
                    _this.datesToSelect.push(da.getDate());
                }
                console.log(da + "da");
                console.log(da.getDate() + "dagetdate");
                console.log(_this.selectedDate.getDate());
                if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                    console.log("selected = item");
                    console.log(JSON.stringify(item.reserved) + "         item resesrved");
                    //for(let r of item.reserved.appointment) {
                    //console.log(JSON.stringify(r));
                    /*let bool = false;
                    for(let r in item.reserved.appointment) {
                      if(r['selected'] == "true") {
                        bool = true;
                      }
                    }*/
                    _this.times = item.reserved.appointment.slice(0);
                    console.log('hit appointment');
                    console.log(JSON.stringify(_this.times));
                    /*for(let x of this.times) {
                      if(x.time == r) {
                        console.log('change selected');
                        x.selected = true;
                      }
                    }*/
                    //}
                }
                //console.log($event.runCode + "     dont run code!!!!!!");
                //if($event.runCode == true) {
                for (var _b = 0, _c = _this.tds; _b < _c.length; _b++) {
                    var item_3 = _c[_b];
                    if (!item_3.classList.contains('text-muted')) {
                        console.log(typeof item_3.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                        if (_this.datesToSelect.indexOf(parseInt(item_3.innerText)) != -1) {
                            console.log("Inner text in      " + item_3.innerText);
                            _this.myrenderer.setElementClass(item_3, "greencircle", true);
                        }
                        else {
                            //this.myrenderer.setElementClass(item,"monthview-selected",false);
                        }
                    }
                }
                //}
            }); });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('slot'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], BookingPage.prototype, "slots", void 0);
    BookingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-booking',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/booking/booking.html"*/'<!--\n  Generated template for the BookingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content (swiperight)="swipeRight()" no-padding>\n	<div class=\'arrowleftholder\'>\n    	<ion-icon class=\'forward\' name="arrow-back"></ion-icon>\n    </div>\n    <div style="width: 100%; position: absolute; left: 50%; width: 35%; z-index: 1;">\n	    <div style="position: relative; left: -50%; width:100%;">\n	    	<div class="titleholder">\n		      <div class="monthclass">{{viewTitle}}</div><div class="yearclass">{{titleYear}}</div>\n		    </div>\n		  </div>\n	  </div>\n    <div class=\'arrowrightholder\' (tap)="selectArrowRight()">\n    	<ion-icon class=\'forward\' name="arrow-forward"></ion-icon>\n    </div>\n	<calendar class=\'cal\' \n	  [eventSource]="eventSource"\n	  [calendarMode]="calendar.mode"\n	  [currentDate]="calendar.currentDate"\n	  (onCurrentDateChanged)="onCurrentDateChanged($event)"\n	  (onRangeChanged)="reloadSource(startTime, endTime)"\n	  (onEventSelected)="onEventSelected($event)"\n	  (onTitleChanged)="onViewTitleChanged($event)"\n	  (onTimeSelected)="onTimeSelected($event)"\n	  step="30">\n	</calendar>\n	<!--<form>-->\n		<div class="slots">\n	     <div id="slot" *ngFor="let i of times ; let z = index" (press)=\'emergency(z)\' #slot>\n	      	<ion-label>{{i.time}}</ion-label>\n	     		<ion-checkbox name="time" [(ngModel)]="times[z].selected" [checked]="times[z].selected" (ionChange)="checkboxCheck(z)"></ion-checkbox>\n	     </div>\n	  </div>\n	  <div id="savebutton">\n	  	<div class="save" (tap)=\'logForm()\'>SAVE</div>\n	  </div>\n	<!--</form>-->\n</ion-content>\n'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/booking/booking.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_native_sms__["a" /* SMS */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database_deprecated__["a" /* AngularFireDatabase */]])
    ], BookingPage);
    return BookingPage;
}());

//# sourceMappingURL=booking.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_keyboard__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_cameraserviceprofile__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database_deprecated__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__stylistprofile_stylistprofile__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__feedstylist_feedstylist__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__feeduser_feeduser__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__signin_signin__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__userviewprofile_userviewprofile__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__formulas_formulas__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__map_map__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_facebook__ = __webpack_require__(252);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


















/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SettingsPage = (function () {
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__formulas_formulas__["a" /* FormulasPage */]);
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_15__map_map__["a" /* MapPage */]);
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
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__stylistprofile_stylistprofile__["a" /* StylistProfile */]);
                    }
                    else {
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__feedstylist_feedstylist__["a" /* FeedStylist */]);
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
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__stylistprofile_stylistprofile__["a" /* StylistProfile */]);
                    }
                    else {
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__feedstylist_feedstylist__["a" /* FeedStylist */]);
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
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__userviewprofile_userviewprofile__["a" /* UserViewProfile */]);
                    }
                    else {
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__feeduser_feeduser__["a" /* FeedUser */]);
                    }
                }
                else {
                    this.af.object('/profiles/users/' + this.oldUser).remove().then(function (_) { return console.log('item deleted!'); });
                    this.items.update(this.username, { 'username': this.username, 'password': this.password, 'email': this.email,
                        'bio': this.bio, 'picURL': this.picURL, 'phone': this.phone, 'facebookURL': this.facebookURL, 'instagramURL': "http://www.instagram.com/" + this.instagramURL,
                        'rating': { 'one': 0, 'two': 0, 'three': 0, 'four': 0, 'five': 0 } });
                    if (this.isTypeNull == null) {
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__userviewprofile_userviewprofile__["a" /* UserViewProfile */]);
                    }
                    else {
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__feeduser_feeduser__["a" /* FeedUser */]);
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__signin_signin__["a" /* SignInPage */]);
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
            var storageRef = __WEBPACK_IMPORTED_MODULE_7_firebase_app__["storage"]().ref().child('/settings/' + _this.username + '/profilepicture.png');
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
                                var storageRef = __WEBPACK_IMPORTED_MODULE_7_firebase_app__["storage"]().ref().child('/settings/' + _this.username + '/profilepicture.png');
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
                                var storageRef = __WEBPACK_IMPORTED_MODULE_7_firebase_app__["storage"]().ref().child('/settings/' + _this.username + '/profilepicture.png');
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('profsquare'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], SettingsPage.prototype, "profilepic", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('addressEl'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "addressEl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('priceEl'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "priceEl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('arrowback'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "arrowBackEl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('logoutbutton'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "logoutButton", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('locationToggle'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "locationToggle", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('merchantId'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "merchantId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('publicKey'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "publicKey", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('privateKey'),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "privateKey", void 0);
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/eamonwhite/ionicmane/myApp/src/pages/settings/settings.html"*/'<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <!---->\n	<div style="position: absolute; left: 50%; width:35%; z-index: 1">\n    <div style="position: relative; left: -50%; width:100%">\n      <img (tap)="presentActionSheet()" class="imagesquare" #profsquare src="assets/blankprof.png">\n    </div>\n  </div>\n  <ion-navbar>\n    <ion-icon (tap)="goToProfile()" class=\'backk\' name="arrow-back" #arrowback></ion-icon>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding>\n	<ion-item no-padding class="sect">\n		<ion-label>Username</ion-label>\n		<ion-input [disabled]="true" type="text" (keypress)="goButton($event.keyCode)" [(ngModel)]="username" name="username"></ion-input> <!--[(ngModel)]="user.username"-->\n	</ion-item>\n	<ion-item no-padding class="sect">\n	  <ion-label>Password</ion-label>\n	  <ion-input type="text" (keypress)="goButton($event.keyCode)" [(ngModel)]="password" name="password"></ion-input>\n	</ion-item>\n	<ion-item no-padding class="sect">\n  	<ion-label>Email</ion-label>\n  	<ion-input type="text" (keypress)="goButton($event.keyCode)" [(ngModel)]="email" name="email"></ion-input> <!--[(ngModel)]="user.username" name="password"-->\n  </ion-item>\n  <ion-item no-padding class="sect" #addressEl>\n  	<ion-label>Salon Address</ion-label>\n  	<ion-input type="text" (keypress)="goButton($event.keyCode)" placeholder="ex. 28 Jay St, Winston, NJ" [(ngModel)]="address" name="address"></ion-input> <!--[(ngModel)]="user.username" name="password"-->\n  </ion-item>\n  <ion-item no-padding class="sect" #addressEl>\n    <ion-label>Phone</ion-label>\n    <ion-input type="text" (keypress)="goButton($event.keyCode)" placeholder="ex. 1231231234" [(ngModel)]="phone" name="phone"></ion-input> <!--[(ngModel)]="user.username" name="password"-->\n  </ion-item>\n  <ion-item no-padding class="sect" #priceEl>\n\n    <ion-label>Price Range</ion-label>\n    <ion-select [(ngModel)]="price">\n      <ion-option *ngFor="let z of priceRanges ; let i = index" value="{{z}}" id="{{i}}">{{z}}</ion-option>\n    </ion-select>\n\n  </ion-item>\n  <ion-item no-padding class="sect">\n  	<ion-label>Bio</ion-label>\n  	<ion-textarea style="width: 65%" placeholder="Bio..." [(ngModel)]="bio" name="bio"></ion-textarea>\n  </ion-item>\n  <ion-item no-padding class="sect" #locationToggle>\n    <ion-label>Location</ion-label>\n    <ion-toggle [(ngModel)]="locationtoggle" (tap)="tappedToggle()"></ion-toggle>\n  </ion-item>\n  <ion-item no-padding class="sect" #addressEl>\n    <div class="fblabelcontainer">\n      <div class="inlineblock">Facebook</div>\n    \n      <button ion-button round color="tertiary" class="linkfbprof" (tap)="linkProfile()">{{linked}}</button>\n    </div>\n    <!--<ion-input type="text" (keypress)="goButton($event.keyCode)" placeholder="http://www.facebook.com/username" [(ngModel)]="facebookURL" name="facebook"></ion-input>--> <!--[(ngModel)]="user.username" name="password"-->\n  </ion-item>\n  <ion-item no-padding class="sect" #addressEl2>\n    <ion-label>Instagram Username</ion-label>\n    <ion-input type="text" (keypress)="goButton($event.keyCode)" placeholder="ex. username" [(ngModel)]="instagramURL" name="instagram"></ion-input> <!--[(ngModel)]="user.username" name="password"-->\n  </ion-item>\n  <ion-item no-padding class="sect" #merchantId>\n    <ion-label>Merchant ID</ion-label>\n    <ion-input type="text" (keypress)="goButton($event.keyCode)" placeholder="Get this from you Braintree account" [(ngModel)]="merchantid" name="merchantid"></ion-input> <!--[(ngModel)]="user.username" name="password"-->\n  </ion-item>\n  <ion-item no-padding class="sect" #publicKey>\n    <ion-label>Public Key</ion-label>\n    <ion-input type="text" (keypress)="goButton($event.keyCode)" placeholder="Get this from you Braintree account" [(ngModel)]="publickey" name="publickey"></ion-input> <!--[(ngModel)]="user.username" name="password"-->\n  </ion-item>\n  <ion-item no-padding class="sect" #privateKey>\n    <ion-label>Private Key</ion-label>\n    <ion-input type="text" (keypress)="goButton($event.keyCode)" placeholder="Get this from you Braintree account" [(ngModel)]="privatekey" name="privatekey"></ion-input> <!--[(ngModel)]="user.username" name="password"-->\n  </ion-item>\n  <div id="savebutton">\n    <button class="save" (tap)=\'logForm()\' ion-button round color="primary">Save</button>\n    <button class="save" (tap)=\'logout()\' ion-button round color="tertiary" #logoutbutton>Logout</button>\n    <button class="save" (tap)=\'formulas()\' ion-button round color="tertiary">Formulas</button> <!--map()-->\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/eamonwhite/ionicmane/myApp/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_16__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_8_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_3__services_cameraserviceprofile__["a" /* CameraServiceProfile */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_keyboard__["a" /* Keyboard */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ })

},[710]);
//# sourceMappingURL=main.js.map