import { Component, trigger, state, style, transition, animate, ViewChild, ViewChildren, QueryList, Renderer, ElementRef } from '@angular/core';
import { NavController, App, Platform, Slides, Slide, Content } from 'ionic-angular';
import { LoadingController, ActionSheetController, ModalController } from 'ionic-angular';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { PostpagePage } from '../postpage/postpage';
import { FeedUser } from '../feeduser/feeduser';
import { UserProfile } from '../userprofile/userprofile';
import { DropinPage } from '../dropin/dropin';
import { BuyAd } from '../../modals/buyad/buyad';
import { FollowersPage } from '../followers/followers';
import { Storage } from '@ionic/storage';
import { BookingPage } from '../booking/booking';
import { CameraServicePost } from '../../services/cameraservicepost';
import { Camera } from '@ionic-native/camera';
import { OnDestroy } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { ISubscription } from "rxjs/Subscription";
import firebase from 'firebase';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { CacheService } from "ionic-cache";
import { Observable } from 'rxjs/Observable';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-feed-stylist',
  templateUrl: 'feedstylist.html',
  animations: [
 
    trigger('slideDown', [
      state('down', style({
        height: '250px',
      })),
      state('notDown', style({
        height:'88px',
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
})
export class FeedStylist implements OnDestroy {
  @ViewChildren('feedstyle') components:QueryList<any>;
  @ViewChildren('flex') flexComponents:QueryList<any>;
  @ViewChildren('feedtop') feedComponents:QueryList<any>;
  @ViewChildren('imagepost') imageComponents:QueryList<any>;
  @ViewChildren('caption') captionComponents:QueryList<any>;
  @ViewChildren('allF') allFeed:QueryList<any>;
  @ViewChildren('productsFeed') productsF:QueryList<any>;
  @ViewChildren('classesFeed') classesF:QueryList<any>;
  @ViewChildren('formulasFeed') formulasF:QueryList<any>;
  @ViewChild('contentone') contentOne:ElementRef;
  @ViewChild('classeslist') classeslist:ElementRef;
  @ViewChild('formulaslist') formulaslist:ElementRef;
  @ViewChild('swiper') swiperEl;
  @ViewChild('productslist') productslist:ElementRef;
  @ViewChildren('adimage') adImage:QueryList<any>;
  @ViewChild('slides') slidess:Slides;
  @ViewChild('slides2') slidess2:Slides;
  @ViewChildren('feedtoptwo') feedTopTwoComponents:QueryList<any>;


  @ViewChildren('feedstyle2') components2:QueryList<any>;
  @ViewChildren('flex2') flexComponents2:QueryList<any>;
  @ViewChildren('feedtop2') feedComponents2:QueryList<any>;
  @ViewChildren('feedtop2two') feedTop22Components:QueryList<any>;
  @ViewChildren('imagepost2') imageComponents2:QueryList<any>;
  @ViewChildren('caption2') captionComponents2:QueryList<any>;

  @ViewChildren('feedstyle3') components3:QueryList<any>;
  @ViewChildren('flex3') flexComponents3:QueryList<any>;
  @ViewChildren('feedtop3') feedComponents3:QueryList<any>;
  @ViewChildren('feedtop3two') feedTop32Components:QueryList<any>;
  @ViewChildren('imagepost3') imageComponents3:QueryList<any>;
  @ViewChildren('caption3') captionComponents3:QueryList<any>;

  @ViewChildren('feedstyle4') components4:QueryList<any>;
  @ViewChildren('flex4') flexComponents4:QueryList<any>;
  @ViewChildren('feedtop4') feedComponents4:QueryList<any>;
  @ViewChildren('feedtop4two') feedTop42Components:QueryList<any>;
  @ViewChildren('imagepost4') imageComponents4:QueryList<any>;
  @ViewChildren('caption4') captionComponents4:QueryList<any>;



  downState: String = 'notDown';
  moveState: String = 'up';
  toolbarState: String = 'up';
  toolbarClicks = 0;

  items = [];
  items2 = [];
  totalCount = 0;
  lastNumRows = 0;
  el;
  classesListArray = [];
  productListArray = [];
  formulaListArray = [];

  list: FirebaseListObservable<any>;
  list1: FirebaseListObservable<any>;
  list2: FirebaseListObservable<any>;
  list3: FirebaseListObservable<any>;
  objj: FirebaseObjectObservable<any>;
  month: FirebaseObjectObservable<any>;
  formulas: FirebaseListObservable<any>;
  follow: FirebaseListObservable<any>;
  subscription: ISubscription;
  subscription3: ISubscription;
  subscription4: ISubscription;
  subscription5: ISubscription;
  subscription6: ISubscription;
  subscription7: ISubscription;
  subscription8: ISubscription;
  subscription11: ISubscription;
  subscription12: ISubscription;
  ads = [];
  swiperIndex;
  config: SwiperConfigInterface;
  swiperEvent;
  totalAdCount;
  swiperSize = 'begin';
  dateofme;
  saveButton;
  username;
  startAtKey;
  startAtKey1;
  startAtKey2;
  lastKey1;
  lastKey;
  lastKey2;
  show;
  @ViewChild(Content  ) content: Content;


  

  private swipeCoord?: [number, number];
  private swipeTime?: number;
  private nav:NavController;

  constructor(public modalCtrl: ModalController, public sms: SMS, private cache: CacheService, public storage: Storage, public platform: Platform, public af: AngularFireDatabase, public element: ElementRef, public camera: Camera, private app:App, public cameraServicePost: CameraServicePost, public actionSheetCtrl: ActionSheetController, public myrenderer: Renderer, public loadingController: LoadingController, public navCtrl: NavController) {
    this.nav = this.app.getActiveNav();
  }

  public optionsGetMedia: any = {
        allowEdit: false,
        quality: 2,
        targetWidth: 600,
        targetHeight: 600,
        encodingType: this.camera.EncodingType.PNG,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        mediaType: this.camera.MediaType.PICTURE,
        destinationType: this.camera.DestinationType.FILE_URI
  }

  public optionsGetCamera: any = {
        quality: 2,
        targetWidth: 600,
        targetHeight: 600,
        encodingType: this.camera.EncodingType.PNG,
        sourceType: this.camera.PictureSourceType.CAMERA,
        mediaType: this.camera.MediaType.PICTURE,
        destinationType: this.camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true
  }

  beginPurchase(identity) {
    this.navCtrl.push(DropinPage, { username: this.username, key: identity.$key });
  }

  buyAd() {
    let profileModal = this.modalCtrl.create(BuyAd);
    profileModal.present();
  }

  InfiniteAll(infiniteScroll) {
    setTimeout(() => {
      this.items = [];
      this.listAll();
      infiniteScroll.complete();
    }, 500)
  }

  doInfiniteProduct(infiniteScroll) {
    setTimeout(() => {
      console.log('Begin async operation');
      /*console.log(this.content.directionY + "        upupupupupupu********");
      if(this.content.directionY == 'up') {
        this.show = false
      }
      else {
        this.show = true;
      }*/

      console.log(this.startAtKey1 + "     before %%^&^&^% start at");
      this.list2 = this.af.list('/products', {
      query: {
        orderByKey: true,
        endAt: this.startAtKey1,
        limitToLast: 11
      }});

      this.subscription11 = this.list2.subscribe(items => { 
          let x = 0;
          this.lastKey1 = this.startAtKey1;
          items.forEach(item => {


            let storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                       
            storageRef.getDownloadURL().then(url => {
              console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
              item.customMetadata.picURL = url;
            }).catch((e) => {
              console.log("in caught url !!!!!!!$$$$$$$!!");
              item.customMetadata.picURL = 'assets/blankprof.png';
            });
            
            if(this.startAtKey1 !== item.$key && this.lastKey1 !== item.$key) {
              console.log(this.startAtKey1 + "   :startAtKey1 before 4444444        item key:     " + item.$key);
              this.productListArray.push(item.customMetadata); //unshift?**************
            }

            if(x == 0) {
              this.startAtKey1 = item.$key;
            }

            x++;
          });          
          
      })

      infiniteScroll.complete(); 
        
    }, 500);
  }

  doInfiniteFormula(infiniteScroll) {
    setTimeout(() => {
      console.log('Begin async operation');
      /*console.log(this.content.directionY + "        upupupupupupu********");
      if(this.content.directionY == 'up') {
        this.show = false
      }
      else {
        this.show = true;
      }*/

      console.log(this.startAtKey2 + "     before %%^&^&^% start at");
      this.list3 = this.af.list('/formulas', {
      query: {
        orderByKey: true,
        endAt: this.startAtKey2,
        limitToLast: 11
      }});

      this.subscription12 = this.list3.subscribe(items => { 
          let x = 0;
          this.lastKey2 = this.startAtKey2;
          items.forEach(item => {


            let storageRef = firebase.storage().ref().child('/settings/' + item.username + '/profilepicture.png');
                       
            storageRef.getDownloadURL().then(url => {
              console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
              item.picURL = url;
            }).catch((e) => {
              console.log("in caught url !!!!!!!$$$$$$$!!");
              item.picURL = 'assets/blankprof.png';
            });
            
            if(this.startAtKey2 !== item.$key && this.lastKey2 !== item.$key) {
              console.log(this.startAtKey2 + "   :startAtKey1 before 4444444        item key:     " + item.$key);
              this.formulaListArray.push(item); //unshift?**************
            }

            if(x == 0) {
              this.startAtKey2 = item.$key;
            }

            x++;
          });          
          
      })

      infiniteScroll.complete(); 
        
    }, 500);
  }

  doInfiniteClass(infiniteScroll) {
    setTimeout(() => {
      console.log('Begin async operation');
      /*console.log(this.content.directionY + "        upupupupupupu********");
      if(this.content.directionY == 'up') {
        this.show = false
      }
      else {
        this.show = true;
      }*/

      console.log(this.startAtKey + "     before %%^&^&^% start at");
      this.list = this.af.list('/classes', {
      query: {
        orderByKey: true,
        endAt: this.startAtKey,
        limitToLast: 11
      }});

      this.subscription3 = this.list.subscribe(items => { 
          let x = 0;
          this.lastKey = this.startAtKey;
          items.forEach(item => {


            let storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                       
            storageRef.getDownloadURL().then(url => {
              console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
              item.customMetadata.picURL = url;
            }).catch((e) => {
              console.log("in caught url !!!!!!!$$$$$$$!!");
              item.customMetadata.picURL = 'assets/blankprof.png';
            });
            
            if(this.startAtKey !== item.$key && this.lastKey !== item.$key) {
              console.log(this.startAtKey + "   :startatkey before 4444444        item key:     " + item.$key);
              this.classesListArray.push(item.customMetadata); //unshift?**************
            }

            if(x == 0) {
              this.startAtKey = item.$key;
            }

            x++;
          });          
          
      })

      infiniteScroll.complete(); 
        
    }, 500);

  }

  ionViewWillUnload() {
    //this.navCtrl.pop();
  }

  getID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  modelChanged(newObj) {
    console.log(typeof newObj + "  nnnnnneeeeeewwww     jo boboobbooooooob");
    let date = new Date(newObj);
    console.log(date.getDate() + "     :     " + date.getDay());

    this.month = this.af.object('/appointments/'+this.username+'/'+date.getMonth());

    let x = 0;
    this.subscription7 = this.month.subscribe(item => {
       console.log(JSON.stringify(item) + "    got the month");
       if(item != null) {
         let bo = false;
         let time;
         let boool = false;
         let skip = false;

         for(let objj in item) {
           if(objj == "$value") {
             console.log(objj);

             let forHold;
             let minUnder = "";
             let ampm;
             //console.log(<number>date.getUTCHours() + "<number>date.getUTCHours()");
             if(<number>date.getUTCHours() > 12) {
               forHold = <number>date.getUTCHours() - 12;
               ampm = "PM";
             }
             else {
               forHold = <number>date.getUTCHours();
               ampm = "AM";
             }

             if(<number>date.getMinutes() < 10) {
               minUnder = "0" + date.getMinutes();
             }
             else {
               minUnder = date.getMinutes().toString();
             }

             time = forHold+":"+minUnder+" "+ampm;

             let array = [{"selected":false,"time":"8:00AM"},{"selected":true,"time":"8:30 AM"},{"selected":true,"time":"9:00 AM"},{"selected":false,"time":"9:30 AM"},{"selected":true,"time":"10:00 AM"},{"selected":true,"time":"10:30 AM"},{"selected":false,"time":"11:00 AM"},{"selected":true,"time":"11:30 AM"},{"selected":true,"time":"12:00 PM"},{"selected":false,"time":"12:30 PM"},{"selected":true,"time":"1:00 PM"},{"selected":true,"time":"1:30 PM"},{"selected":false,"time":"2:00 PM"},{"selected":true,"time":"2:30 PM"},{"selected":true,"time":"3:00 PM"},{"selected":false,"time":"3:30 PM"},{"selected":true,"time":"4:00 PM"},{"selected":true,"time":"4:30 PM"},{"selected":false,"time":"5:00 PM"},{"selected":true,"time":"5:30 PM"},{"selected":true,"time":"6:00 PM"},{"selected":false,"time":"6:30 PM"},{"selected":true,"time":"7:00 PM"},{"selected":true,"time":"7:30 PM"}];
             
             for(let z of array) {
               if(z.time == time) {
                 z.selected = true;
                 boool = true;
                 skip = true;
               }
             }
             let u = this.getID();

             console.log("looping here above");
             this.month.update({[u]:{'date':{'day':date.getTime() / 1000}, 'reserved':{'appointment':array}}});
           }
           else {
             console.log(JSON.stringify(objj));
             let holderDate = new Date(item[objj].date.day * 1000);
             //console.log(date.getMinutes() + "   date : getmin   " + holderDate.getMinutes());
             //console.log(date.getUTCHours() + "   date : gethours    " + holderDate.getUTCHours());
             //console.log(date.getDate() + "   date : getdate    " + holderDate.getDate());
             //console.log(date.getMonth() + "   date : getmonth    " + holderDate.getMonth());
             //console.log(date.getFullYear() + "   date : getyear    " + holderDate.getFullYear());

             
             

             if(date.getDate() == holderDate.getDate() && date.getMonth() == holderDate.getMonth() &&  date.getFullYear() == holderDate.getFullYear()) {
               
               
               for( let x of item[objj].reserved.appointment) {

                 let forHold;
                 let minUnder = "";
                 let ampm;
                 //console.log(<number>date.getUTCHours() + "<number>date.getUTCHours()");
                 if(<number>date.getUTCHours() > 12) {
                   forHold = <number>date.getUTCHours() - 12;
                   ampm = "PM";
                 }
                 else {
                   forHold = <number>date.getUTCHours();
                   ampm = "AM";
                 }

                 if(<number>date.getMinutes() < 10) {
                   minUnder = "0" + date.getMinutes();
                 }
                 else {
                   minUnder = date.getMinutes().toString();
                 }

                 time = forHold+":"+minUnder+" "+ampm;
                 console.log(x.selected + " selected    " + " xtime:"  + x.time + "  time  :" + time);
                 if(x.time == time && x.selected == false) {
                   x.selected = true;
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
               let forHold;
               let minUnder = "";
               let ampm;
               //console.log(<number>date.getUTCHours() + "<number>date.getUTCHours()");
               if(<number>date.getUTCHours() > 12) {
                 forHold = <number>date.getUTCHours() - 12;
                 ampm = "PM";
               }
               else {
                 forHold = <number>date.getUTCHours();
                 ampm = "AM";
               }

               if(<number>date.getMinutes() < 10) {
                 minUnder = "0" + date.getMinutes();
               }
               else {
                 minUnder = date.getMinutes().toString();
               }

               time = forHold+":"+minUnder+" "+ampm;

               let array = [{"selected":false,"time":"8:00AM"},{"selected":true,"time":"8:30 AM"},{"selected":true,"time":"9:00 AM"},{"selected":false,"time":"9:30 AM"},{"selected":true,"time":"10:00 AM"},{"selected":true,"time":"10:30 AM"},{"selected":false,"time":"11:00 AM"},{"selected":true,"time":"11:30 AM"},{"selected":true,"time":"12:00 PM"},{"selected":false,"time":"12:30 PM"},{"selected":true,"time":"1:00 PM"},{"selected":true,"time":"1:30 PM"},{"selected":false,"time":"2:00 PM"},{"selected":true,"time":"2:30 PM"},{"selected":true,"time":"3:00 PM"},{"selected":false,"time":"3:30 PM"},{"selected":true,"time":"4:00 PM"},{"selected":true,"time":"4:30 PM"},{"selected":false,"time":"5:00 PM"},{"selected":true,"time":"5:30 PM"},{"selected":true,"time":"6:00 PM"},{"selected":false,"time":"6:30 PM"},{"selected":true,"time":"7:00 PM"},{"selected":true,"time":"7:30 PM"}];
               
               for(let z of array) {
                 if(z.time == time) {
                   z.selected = true;
                   boool = true;
                   skip = true;
                 }
               }

               let u = this.getID();

               console.log("looping here below");
               this.month.update({[u]:{'date':{'day':date.getTime() / 1000}, 'reserved':{'appointment':array}}});
             }


             if(boool == true) {
               let r = item[objj];
               if(!skip) {
                 this.month.update({[objj]:{'date':{'day':item[objj].date.day}, 'reserved':{'appointment':item[objj].reserved.appointment}}});
               }
               let string1 = '';
               let promises_array = [];
                this.storage.get('username').then((val) => {
                  console.log('in storage');
                  this.follow = this.af.list('/profiles/stylists/' + val + "/followers");
                  this.subscription = this.follow.subscribe(items => {
                    let mapped = items.map((item) => {
                      return new Promise((resolve, reject) => {
                        console.log(JSON.stringify(item) + " item item item");
                        let arr = Object.keys(item);
                        console.log(typeof item[arr[0]] + "    type followers");
                        string1 += (item[arr[0]]) + ", ";
                        console.log(string1 + " this is string 1");
                        resolve();
                      })
                    })
                    
                    Promise.all(mapped).then(() => {
                      let month1 = date.getUTCMonth() + 1;
                      let date1 = date.getUTCDate();


                        console.log(string1 + " this is string 1 2");
                        this.sms.send(string1, val + " just opened up a spot at " + time + " on " + month1 + "/" + date1 + "!")
                          .catch(e => { console.log(JSON.stringify(e))});

                    })
                  });
               })
            }
           }  
        }
        if(bo) {
          alert("This spot is already available, or it is in the past.");
        }
        x++;
      }
    });


  }




  sendIt() {
    console.log("sent sent sent setn");
  }

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    //this.navCtrl.push(SignUpPage);
  }

  getAds() {
    let promises_array:Array<any> = [];
    let cacheKey = 'ads';

    
      this.cache.getItem(cacheKey).catch(() => {
        let store = [];
        console.log("in get addddssss ******");
        this.objj = this.af.object('/adcounter/count');

        this.subscription6 = this.objj.subscribe(item => { 
          console.log(JSON.stringify(item) + "in adddd subscribe()()()()()()");
          console.log(typeof item);
          this.totalAdCount = item.$value;
          
            for(let x = 1; x < item.$value + 1; x++) {
              console.log("in promise gafdfsfads");
              promises_array.push(new Promise((resolve,reject) => {

                let storageRef = firebase.storage().ref().child('/ads/ad' + x + '.png');
                storageRef.getDownloadURL().then(url => {
                  console.log(url);
                  store.push(url);
                  console.log("reigh before resolve");
                  resolve();
                  
                }).catch(e => {
                  resolve();
                });

              }));
            }

          let results = Promise.all(promises_array);
          results.then((value) => {
            this.ads = store;

            console.log(JSON.stringify(this.ads) + " value value vlaue");

            console.log("in list all");
            
            return this.cache.saveItem(cacheKey, this.ads);
          })
      })

        
    }).then((data) => {
        console.log("Saved data: ", data);
        this.ads = data;
    });

  }

  goSeeProfile(item) {
    this.navCtrl.push(UserProfile, {username:item.username}, {animate:true, animation:'ios-transition', duration:100});
  }

  tappedPost() {
    this.navCtrl.push(PostpagePage);
  }

  indexChange() {
    console.log(this.swiperIndex);
    if(this.swiperSize == 'small' || 'begin') {
      if(this.totalAdCount - 4 == this.swiperIndex) {
        this.navCtrl.push(StylistProfile,{},{animate:true,animation:'transition',duration:100,direction:'forward'});
      }
      else if(this.swiperIndex == 0) {
        this.navCtrl.push(FollowersPage,{},{animate:true,animation:'transition',duration:100,direction:'back'});
      }
    }
    else {
      if(this.totalAdCount - 1 == this.swiperIndex) {
        this.navCtrl.push(StylistProfile,{},{animate:true,animation:'transition',duration:100,direction:'forward'});
      }
      else if(this.swiperIndex == 0) {
        this.navCtrl.push(FollowersPage,{},{animate:true,animation:'transition',duration:100,direction:'back'});
      }
    }
  }

  swipeLeft() {
    this.toProfile();
  }

  swipeRight() {
    this.navCtrl.push(FollowersPage,{},{animate:true,animation:'ios-transition',duration:100,direction:'back'});
  }

  switchView() {
    this.navCtrl.push(FeedUser);
  }

  toProfile() {
    this.navCtrl.push(StylistProfile,{},{animate:true,animation:'ios-transition',duration:100,direction:'forward'});
  }

  loadPost() {
    this.presentActionSheet();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose source',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            //let itemArrayTwo = this.profComponents.toArray();
            this.cameraServicePost.getMedia(this.optionsGetCamera).then((data) => {
                this.navCtrl.push(PostpagePage, { path: data });
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
        },{
          text: 'Photo Library',
          handler: () => {
            //let itemArrayTwo = this.profComponents.toArray();

            this.cameraServicePost.getMedia(this.optionsGetMedia).then((data) => {
              console.log(data + "dadadaddkdkktatatat");
              if(data) {
                this.navCtrl.push(PostpagePage, { path: data });
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
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  all() {
    this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
    this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.formulasF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'block');
    this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.formulaslist.nativeElement, 'display', 'none');

  }

  products() {
    this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
    this.myrenderer.setElementStyle(this.formulasF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'block');
    this.myrenderer.setElementStyle(this.formulaslist.nativeElement, 'display', 'none');

  }

  classes() {
    console.log("classeslist      " + this.classeslist.nativeElement);
    this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', 'gray');  
    this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
    this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.formulasF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'block');
    this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.formulaslist.nativeElement, 'display', 'none');
    
  }

  formulasList() {
    console.log("classeslist      " + this.classeslist.nativeElement);
    this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', 'gray');  
    this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.formulasF.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
    this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.formulaslist.nativeElement, 'display', 'block');

    
  }

  whatIsIndex1() {
    console.log(this.slidess2.realIndex + "    big version");
    console.log(this.slidess.realIndex + "    small version");
  }

  whatIsIndex2() {
    console.log(this.slidess2.realIndex + "    big version");
    console.log(this.slidess.realIndex + "    small version");
  }

  toolClicked(event) {
    this.toolbarClicks++;
    console.log('tapped');

    
    if(this.toolbarClicks == 1) {
      setTimeout(() => {
        if(this.toolbarClicks == 2) {
          console.log('running application');
          this.downState = (this.downState == 'notDown') ? 'down' : 'notDown';
          this.moveState = (this.moveState == 'up') ? 'down' : 'up';
          this.toolbarState = (this.toolbarState == 'up') ? 'down' : 'up';
          if(this.toolbarState == 'up') {
            this.config = {
              direction: 'horizontal',
              slidesPerView: '4',
              keyboardControl: false
            };

            this.swiperSize = 'small';
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
            this.config = {
              direction: 'horizontal',
              slidesPerView: '1',
              keyboardControl: false
            };


            //el2.style['min-height'] = '250px';
            //el2.style['max-width'] = '77%';

            this.swiperSize = 'big';
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
          this.toolbarClicks = 0;
        }
        else {
          this.toolbarClicks = 0;
        }
      }, 300)
    }
  }

  ionViewDidLoad() {

    

    this.listProducts().then(() => {
      this.listFormulas().then(() => {
        this.listClasses().then(() => {
          console.log(this.productListArray + "    proddy proddy product")
          console.log(this.classesListArray + "    proddy proddy classes")
          console.log(this.formulaListArray + "    proddy proddy formula")
          this.listAll();
        });
      });
    });

    this.getAds();

    this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'block');
    this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');
    
    
    this.storage.get('username').then((val) => {
      this.username = val;
    })

  }

  ionViewWillLeave() {
    //this.myrenderer.setElementStyle(this.ionHeader.nativeElement, 'display', 'none');
  }

  ionViewWillEnter() {
    //this.myrenderer.setElementStyle(this.ionHeader.nativeElement, 'display', 'block');
  }

  contractItem(item) {
    console.log("in contract item 8*****");
    let flexArray = this.flexComponents.toArray();
    let feedArray = this.feedComponents.toArray();
    let feedArray2 = this.feedTopTwoComponents.toArray();
    let itemArray = this.components.toArray();
    let imageComps = this.imageComponents.toArray();
    let captionComps = this.captionComponents.toArray();


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
  }

  contractItem2(item) {
    let flexArray = this.flexComponents2.toArray();
    let feedArray = this.feedComponents2.toArray();
    let feedArray2 = this.feedTop22Components.toArray();
    let itemArray = this.components2.toArray();
    let imageComps = this.imageComponents2.toArray();
    let captionComps = this.captionComponents2.toArray();


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
  }

  contractItem3(item) {
    let flexArray = this.flexComponents3.toArray();
    let feedArray = this.feedComponents3.toArray();
    let feedArray2 = this.feedTop32Components.toArray();
    let itemArray = this.components3.toArray();
    let imageComps = this.imageComponents3.toArray();
    let captionComps = this.captionComponents3.toArray();


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
  }

  contractItem4(item) {
    let flexArray = this.flexComponents4.toArray();
    let feedArray = this.feedComponents4.toArray();
    let feedArray2 = this.feedTop42Components.toArray();
    let itemArray = this.components4.toArray();
    let imageComps = this.imageComponents4.toArray();
    let captionComps = this.captionComponents4.toArray();


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
  }

  expandItem(item) {
    let flexArray = this.flexComponents.toArray();
    let feedArray = this.feedComponents.toArray();
    let feedArray2 = this.feedTopTwoComponents.toArray();
    let itemArray = this.components.toArray();
    let imageComps = this.imageComponents.toArray();
    let captionComps = this.captionComponents.toArray();


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
  }

  expandItem2(item) {
    let flexArray = this.flexComponents2.toArray();
    let feedArray = this.feedComponents2.toArray();
    let feedArray2 = this.feedTop22Components.toArray();
    let itemArray = this.components2.toArray();
    let imageComps = this.imageComponents2.toArray();
    let captionComps = this.captionComponents2.toArray();

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
  }

  expandItem3(item) {
    let flexArray = this.flexComponents3.toArray();
    let feedArray = this.feedComponents3.toArray();
    let feedArray2 = this.feedTop32Components.toArray();
    let itemArray = this.components3.toArray();
    let imageComps = this.imageComponents3.toArray();
    let captionComps = this.captionComponents3.toArray();

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
  }
  expandItem4(item) {
    let flexArray = this.flexComponents4.toArray();
    let feedArray = this.feedComponents4.toArray();
    let feedArray2 = this.feedTop42Components.toArray();
    let itemArray = this.components4.toArray();
    let imageComps = this.imageComponents4.toArray();
    let captionComps = this.captionComponents4.toArray();

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
  }

  listClasses(): Promise<any> {
    let cacheKey = 'classes';
    let promises_array:Array<any> = [];
    //this.cache.removeItem(cacheKey);

    return new Promise((resolve, reject) => {
      let mapped;

      //this.cache.getItem(cacheKey).catch(() => {
        let store = [];

        this.list = this.af.list('/classes', { query: {
          limitToLast: 10
        }});

        this.subscription4 = this.list.subscribe(items => { 
          mapped = items.map((item) => {
            return new Promise((resolve,reject) => {
              console.log(JSON.stringify(item.customMetadata) + ":   this is the customdata (((()()()()()");

              let storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
              
              storageRef.getDownloadURL().then(url => {
                console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                item.customMetadata.profilepic = url;
                console.log(JSON.stringify(item.customMetadata) + "     listclasses item undefined");
                store.push(item.customMetadata);
                resolve();
              }).catch((e) => {
                console.log("in caught url !!!!!!!$$$$$$$!!");
                item.customMetadata.profilepic = 'assets/blankprof.png';
                console.log(JSON.stringify(item.customMetadata) + "     listclasses item undefined profilepic not found");
                store.push(item.customMetadata);
                resolve();
              });
              //this.startAtKey = item.$key;
              
            });

          })

          this.startAtKey = items[0].$key;
          this.lastKey = this.startAtKey;

          let results = Promise.all(mapped);
          results.then(() => {
          //setTimeout(() => {
            console.log(JSON.stringify(this.classesListArray) + " value value vlaue classsses");

            this.classesListArray = store.reverse();
            //this.classesListArray.reverse();   
            console.log(JSON.stringify(this.classesListArray) + " value value vlaue classsses");
            //return this.cache.saveItem(cacheKey, this.classesListArray);
          //}, 3000);
            resolve();        
          })
        })

        
      /*}).then(data => {
        console.log("Saved data: ", data);
        this.classesListArray = data;
        resolve();
      })*/
    })
  }

  listProducts(): Promise<any> {
    let cacheKey = 'products';
    let promises_array:Array<any> = [];

    return new Promise((resolve, reject) => {
      let mapped;

      //this.cache.getItem(cacheKey).catch(() => {
        let store = [];

        this.list1 = this.af.list('/products', { query: {
          limitToLast: 10
        }});
        this.subscription5 = this.list1.subscribe(items => {
          mapped = items.map((item) => {
            return new Promise((resolve,reject) => {
              console.log(JSON.stringify(item.customMetadata) + ":   this is the customdata (((()()()()()");

              let storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
              
              storageRef.getDownloadURL().then(url => {
                console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                item.customMetadata.profilepic = url;
                store.push(item.customMetadata);
                resolve();
              }).catch((e) => {
                console.log("in caught url !!!!!!!$$$$$$$!!");
                item.customMetadata.profilepic = 'assets/blankprof.png';
                store.push(item.customMetadata);
                resolve();
              });
              //this.startAtKey = item.$key;
            });

          })

          this.startAtKey1 = items[0].$key;
          this.lastKey1 = this.startAtKey1;

          let results = Promise.all(mapped);
          results.then(() => {
          //setTimeout(() => {
            console.log(JSON.stringify(this.productListArray) + " value value vlaue productlistarray");
            this.productListArray = store.reverse();   
            resolve();
            //return this.cache.saveItem(cacheKey, this.productListArray);
          //}, 3000);
        
          })
        })

        
      /*}).then(data => {
        console.log("Saved data: ", data);
        this.productListArray = data;
        resolve();
      })*/
    })
  }

  listFormulas(): Promise<any> {
    let cacheKey = 'formulas';
    let promises_array:Array<any> = [];

    return new Promise((resolve, reject) => {
      let mapped;

      //this.cache.getItem(cacheKey).catch(() => {
        let store = [];

        this.formulas = this.af.list('/formulas', { query: {
          limitToLast: 10
        }});
        this.subscription8 = this.formulas.subscribe(items => {
          mapped = items.map((item) => {
            console.log(JSON.stringify(item) + "       item being mapped");
            return new Promise((resolve,reject) => {

              let storageRef = firebase.storage().ref().child('/settings/' + item.username + '/profilepicture.png');
              console.log("postdate *** post : " + item.postdate);
              storageRef.getDownloadURL().then(url => {
                console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                item.profilepic = url;
                store.push(item);
                resolve();
              }).catch((e) => {
                console.log("in caught url !!!!!!!$$$$$$$!!");
                item.profilepic = 'assets/blankprof.png';
                store.push(item);
                resolve();
              });
              //this.startAtKey = item.$key;
              
            });

          })

          this.startAtKey2 = items[0].$key;
          this.lastKey2 = this.startAtKey2;

          Promise.all(mapped).then(() => {
          //setTimeout(() => {
            this.formulaListArray = store.reverse();  
            console.log(JSON.stringify(this.formulaListArray) + " value value vlaue productlistarray"); 
            //return this.cache.saveItem(cacheKey, this.formulaListArray);
            resolve();
          //}, 3000);
        
          })
        })

        
      /*}).then(data => {
        console.log("Saved data: ", data);
        this.formulaListArray = data;
        resolve();
      })*/
    })
  }

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

  listAll() {
    console.log("in listall");
    this.items.push.apply(this.items, this.formulaListArray);
    this.items.push.apply(this.items, this.productListArray);
    this.items.push.apply(this.items, this.classesListArray);

    this.items.sort(function(a,b) {
        return b.postdate - a.postdate;
    });

    console.log(JSON.stringify(this.items) + " this.items.sort after 999999");
  }

  ngOnDestroy() {
    if(this.subscription3 != null) {
      this.subscription3.unsubscribe();
    }
    if(this.subscription4 != null) {
      this.subscription4.unsubscribe();
    }
    if(this.subscription5 != null) {
      this.subscription5.unsubscribe();
    }
    if(this.subscription6 != null) {
      this.subscription6.unsubscribe();
    }
    if(this.subscription7 != null) {
      this.subscription7.unsubscribe();
    }
    if(this.subscription8 != null) {
      this.subscription8.unsubscribe();
    }
    if(this.subscription11 != null) {
      this.subscription11.unsubscribe();
    }
  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');

    return new Promise((resolve) => {

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

    })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    

    setTimeout(() => {

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
    
  }
}