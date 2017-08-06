import { AfterViewInit, NgZone, Component, trigger, state, style, transition, animate, keyframes, ViewChild, ElementRef, Renderer, HostListener } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LoadingController, Content } from 'ionic-angular';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { FeedStylist } from '../feedstylist/feedstylist';

import { BookingPage } from '../booking/booking';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { PopUp } from '../../modals/popup/popup';
import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";


@Component({
  selector: 'page-feed-user',
  templateUrl: 'feeduser.html',
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
        top: 307 + "px",
      })),
      state('up', style({
        top: 145 + "px",
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),
    trigger('toolSlide', [
      state('down', style({
        top: '250px'
      })),
      state('up', style({
        top: '88px'
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),
    trigger('show', [
      state('down', style({
        display: 'block',
      })),
      state('up', style({
        display: 'none',
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),
    trigger('showHeight', [
      state('down', style({
        display: 'block',
      })),
      state('up', style({
        display: 'none',
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),
  ]
})
export class FeedUser implements OnDestroy {
  @ViewChild('changeText') changeText: ElementRef;
  @ViewChild('availability') availability: ElementRef;
  @ViewChild('contentone') contentOne: ElementRef;
  @ViewChild('ratings') ratingbox: ElementRef;
  @ViewChild('weeklydeals') weekly: ElementRef;
  @ViewChild('promos') promos: ElementRef;
  @ViewChild('weekly') weeklyyellow: ElementRef;
  @ViewChild(Content  ) content: Content;

  downState: String = 'notDown';
  moveState: String = 'up';
  toolbarState: String = 'up';
  showDropDown: String = 'up';
  showDropDownHeight: String = 'up';
  appointments: FirebaseListObservable<any>;
  appointmentsMonth: FirebaseListObservable<any>;
  appointmentsItem: FirebaseListObservable<any>;
  show = true;
  lastScrollTop: number = 0;
  direction: string = "";

  private subscription: ISubscription;
  private subscription2: ISubscription;
  private subscription3: ISubscription;
  private subscription4: ISubscription;

  toolbarClicks = 0;

  list: FirebaseListObservable<any>;
  availabilities = [];
  items = [];
  rating = [];
  weeklydeal = [];

  totalCount = 0;
  lastNumRows = 0;
  el;
  startAtKey;

  constructor(public zone: NgZone, public modalCtrl: ModalController, public af: AngularFireDatabase, public storage: Storage, private afAuth: AngularFireAuth, public renderer: Renderer, public loadingController: LoadingController, public navCtrl: NavController) {
     
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
  } 

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    //this.navCtrl.push(SignUpPage);
  }

  ionViewWillLoad() {
    this.subscription = this.afAuth.authState.subscribe(data => {
      /*if(data.email && data.uid) {
        console.log("logged in");
      }*/
    })


  }



  scrollHandler(event) {
   //console.log(JSON.stringify(event));
   this.zone.run(()=>{
     if(event.directionY == 'up') {
       this.show = false;
     }
     else {
       this.show = true;
     }
     // since scrollAmount is data-binded,
     // the update needs to happen in zone
     //this.scrollAmount++
   })
  }

  ionViewDidLoad() {
    
    this.renderer.setElementStyle(this.promos.nativeElement, 'color', '#e6c926');
    this.getInitialImages();


  }

  presentProfileModal(salon, time) {
    let profileModal = this.modalCtrl.create(PopUp, { salon: salon, time: time});
    profileModal.present();
  }

  toProfile() {
    this.navCtrl.push(StylistProfile,{
      param1: 'user'
    },{animate:true,animation:'transition',duration:500,direction:'forward'});
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
          if(this.showDropDown == 'down' || this.showDropDownHeight == 'down') {
            this.showDropDown = (this.showDropDown == 'up') ? 'down' : 'up';
            this.showDropDownHeight = (this.showDropDownHeight == 'up') ? 'down' : 'up';
          }
          this.toolbarClicks = 0;
        }
        else {
          this.toolbarClicks = 0;
        }
      }, 300)
    }
  }

  switchView() {
    this.navCtrl.push(FeedStylist);
  }

  closeMenu() {
    if(this.showDropDown == 'down' || this.showDropDownHeight == 'down') {
      this.showDropDown = 'up';
      this.showDropDownHeight = 'up';
    }
    else {
      //
    }
    this.renderer.setElementStyle(this.changeText.nativeElement, 'color', 'gray');
    this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', '#e6c926');
    this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');

    //this.changeText.nativeElement.style = "color:gray";
    this.renderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
    //this.contentOne.nativeElement.style = "display: block";
    this.renderer.setElementStyle(this.availability.nativeElement, 'display', 'none');
    //this.availability.nativeElement.style = "display: none";
    this.renderer.setElementStyle(this.ratingbox.nativeElement, 'display', 'none');
    //this.ratingbox.nativeElement.style= "display: none";
    this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'block');
    //this.weekly.nativeElement.style= "display: none"
  }

  closeMenuP() {
    if(this.showDropDown == 'down' || this.showDropDownHeight == 'down') {
      this.showDropDown = 'up';
      this.showDropDownHeight = 'up';
    }
    else {
      //
    }
    this.renderer.setElementStyle(this.changeText.nativeElement, 'color', 'gray');
    //this.changeText.nativeElement.style = "color:gray";
    this.renderer.setElementStyle(this.contentOne.nativeElement, 'display', 'block');
    //this.contentOne.nativeElement.style = "display: block";
    this.renderer.setElementStyle(this.availability.nativeElement, 'display', 'none');
    //this.availability.nativeElement.style = "display: none";
    this.renderer.setElementStyle(this.ratingbox.nativeElement, 'display', 'none');
    //this.ratingbox.nativeElement.style= "display: none";
    this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'none');
    this.renderer.setElementStyle(this.promos.nativeElement, 'color', '#e6c926');
    this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');

    //this.weekly.nativeElement.style= "display: none"
  }

  dropDown() {
    //this.changeText.nativeElement.style = "color:gray";
    //this.contentOne.nativeElement.style = "display: block";
    //this.availability.nativeElement.style = "display: none";
    //this.ratingbox.nativeElement.style= "display: none";
    this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');
    this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
    
    if(this.downState == 'down') {
      this.showDropDownHeight = (this.showDropDownHeight == 'up') ? 'down' : 'up';
    }
    else {
      this.showDropDown = (this.showDropDown == 'up') ? 'down' : 'up';
    }
  }

  dropDownD() {
    this.renderer.setElementStyle(this.changeText.nativeElement, 'color', '#e6c926');
    this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
    this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');

    this.changeText.nativeElement.innerHTML = "Distance";
    //this.changeText.nativeElement.style = "color:#e6c926";
    this.dropDown();
  }

  dropDownA() {
    this.changeText.nativeElement.innerHTML = "Availability";
    this.renderer.setElementStyle(this.changeText.nativeElement, 'color', '#e6c926');
    //this.changeText.nativeElement.style = "color:gray";
    this.renderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
    //this.contentOne.nativeElement.style = "display: block";
    this.renderer.setElementStyle(this.availability.nativeElement, 'display', 'block');
    //this.availability.nativeElement.style = "display: none";
    this.renderer.setElementStyle(this.ratingbox.nativeElement, 'display', 'none');
    //this.ratingbox.nativeElement.style= "display: none";
    this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'none');
    this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
    this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');

    /*this.changeText.nativeElement.style = "color:#e6c926";
    this.availability.nativeElement.style = "display: block";
    this.contentOne.nativeElement.style = "display: none";
    this.ratingbox.nativeElement.style = "display: none";
    this.weekly.nativeElement.style = "display: none";*/
    this.dropDown();
  }

  dropDownP() {
    this.changeText.nativeElement.innerHTML = "Price";
    this.renderer.setElementStyle(this.changeText.nativeElement, 'color', '#e6c926');
    this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
    this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');

    this.dropDown();
  }

  dropDownR() {
    this.changeText.nativeElement.innerHTML = "Rating";
    this.renderer.setElementStyle(this.changeText.nativeElement, 'color', '#e6c926');
    this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
    this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');
    
    //this.changeText.nativeElement.style = "color:gray";
    this.renderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
    //this.contentOne.nativeElement.style = "display: block";
    this.renderer.setElementStyle(this.availability.nativeElement, 'display', 'none');
    //this.availability.nativeElement.style = "display: none";
    this.renderer.setElementStyle(this.ratingbox.nativeElement, 'display', 'block');
    //this.ratingbox.nativeElement.style= "display: none";
    this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'none');
    this.dropDown();
  }

  gotoProfile() {
    this.navCtrl.push(StylistProfile);
  }

  onScroll(event) {
    console.log(event);
  }

  loadAvailabilities(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.appointments = this.af.list('/appointments');
      this.subscription2 = this.appointments.subscribe(items => items.forEach(item => {
        console.log(item);
        let userName = item.$key;
        this.availabilities = [];
        for(let x in item) {
          let month = x;
          console.log(x + "      month");
          this.appointmentsMonth = this.af.list('/appointments/' + userName + '/' + month);
          this.subscription3 = this.appointmentsMonth.subscribe(items => items.forEach(item => {
            //console.log(JSON.stringify(item) + "           item");
            let date = new Date(item.date.day * 1000);
            let today = new Date();
            console.log(date.getMonth() + "==" + today.getMonth()  + "&&" + date.getDate() + "==" + today.getDate());
            if(date.getMonth() == today.getMonth() && date.getDate() == today.getDate()) {
              console.log("            inside the if that checks if its today");
              console.log(item.reserved.appointment + "                *************appointment");
              item.reserved.appointment.forEach((r, index) => {
                if(r.selected == true) {

                  


                  let obj = {'pic':'img/hair5.jpeg', 'salon': userName, 'time': r.time};
                  this.availabilities.push(obj);
                  
                  if(index == 23) {
                    resolve();
                  }
                  //console.log(JSON.stringify(obj) + "            object");
                }
              })
              /*for(let r of item.reserved.appointment) {
                //console.log(r.selected)
                

              }*/
              
            }
          }));

          
        }

        
      }));
    })
    

    /*setTimeout(() => {
      
      this.availabilities.sort(function(a,b) {
          return a.time - b.time;
      });

      console.log('*****previous******');
      console.log(JSON.stringify(this.availabilities));
      console.log('*****sorted********');
      
      for(let i of this.availabilities) {
        console.log(i.time + "          this is itime");
        let date = new Date(i.time);
        console.log(date + "          this is date in idate");
        let str = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
        console.log(str);
        i.time = str;
      }

    }, 1500);*/
  }

  

  setDateTime(time) {
    let date = new Date();
    let index = time.indexOf(":"); // replace with ":" for differently displayed time.
    let index2 = time.indexOf(" ");

    let hours = time.substring(0, index);
    let minutes = time.substring(index + 1, index2);

    var mer = time.substring(index2 + 1, time.length);

    console.log(mer + "        *******AMPM");

    if (mer == "PM") {
        console.log(hours + "        ())()()(()hours before(()()(");
        let number = parseInt(hours) + 12;
        hours = number.toString();
        console.log(hours + "      **********hours after*******");
    }


    date.setHours(hours);
    date.setMinutes(minutes);
    //date.setSeconds(00);

    return date;
  }

  getInitialImages() {
    let loading = this.loadingController.create({content : "Loading..."});
    loading.present();

    /*let storageRef = firebase.storage().ref().child('/profile/' + this.username + '/profile_' + this.username + '_' + this.square + '.png');**/
    //let loading = this.loadingController.create({content : "Loading..."});
    //loading.present();
    this.list = this.af.list('/promos', {
    query: {
      limitToFirst: 15
    }});

    this.subscription4 = this.list.subscribe(items => { 
      items.forEach(item => {
        console.log(JSON.stringify(item.customMetadata));
        this.startAtKey = item.$key;
        this.items.push(item.customMetadata);

      });               
    }) /*['img/hair1.jpg', 'img/hair2.jpg', 'img/hair3.jpeg', 'img/hair4.jpeg',
                  'img/hair5.jpeg', 'img/hair6.jpg', 'img/hair7.jpg', 'img/hair8.jpg', 
                  'img/hair9.jpeg', 'img/hair10.jpg'];*/

    

    /*this.availabilities = [
                            
                            {'pic': 'img/hair5.jpeg', 'salon':'Salon 5', 'time':'12:30PM'},
                            {'pic': 'img/hair6.jpg', 'salon':'Salon 6', 'time':'1:00PM'},
                            {'pic': 'img/hair7.jpg', 'salon':'Salon 7', 'time':'1:30PM'},
                            {'pic': 'img/hair8.jpg', 'salon':'Salon 8', 'time':'2:00PM'},
                            {'pic': 'img/hair9.jpeg', 'salon':'Salon 9', 'time':'2:30PM'},
                            {'pic': 'img/hair10.jpg', 'salon':'Salon 10', 'time':'3:00PM'},
                            {'pic': 'img/hair7.jpg', 'salon':'Salon 1', 'time':'10:30AM'},
                            {'pic': 'img/hair2.jpg', 'salon':'Salon 2', 'time':'11:00AM'},
                            {'pic': 'img/hair3.jpeg', 'salon':'Salon 3', 'time':'11:30AM'},
                            {'pic': 'img/hair4.jpeg', 'salon':'Salon 4', 'time':'12:00PM'},
                            {'pic': 'img/hair5.jpeg', 'salon':'Salon 5', 'time':'12:30PM'},
                            {'pic': 'img/hair6.jpg', 'salon':'Salon 6', 'time':'1:00PM'},
                            {'pic': 'img/hair7.jpg', 'salon':'Salon 7', 'time':'1:30PM'},
                            {'pic': 'img/hair8.jpg', 'salon':'Salon 8', 'time':'2:00PM'},
                            {'pic': 'img/hair9.jpeg', 'salon':'Salon 9', 'time':'2:30PM'},
                            {'pic': 'img/hair10.jpg', 'salon':'Salon 10', 'time':'3:00PM'},
                            {'pic': 'img/hair7.jpg', 'salon':'Salon 1', 'time':'10:30AM'},
                            {'pic': 'img/hair2.jpg', 'salon':'Salon 2', 'time':'11:00AM'},
                            {'pic': 'img/hair3.jpeg', 'salon':'Salon 3', 'time':'11:30AM'},
                            {'pic': 'img/hair4.jpeg', 'salon':'Salon 4', 'time':'12:00PM'}

                          ];*/

    


    this.rating = [
                    {'pic': 'img/hair5.jpeg', 'salon':'Salon 5', 'time':'\u2605\u2605\u2605'},
                    {'pic': 'img/hair6.jpg', 'salon':'Salon 6', 'time':'\u2605\u2605'},
                    {'pic': 'img/hair7.jpg', 'salon':'Salon 7', 'time':'\u2605\u2605\u2605\u2605'},
                    {'pic': 'img/hair8.jpg', 'salon':'Salon 8', 'time':'\u2605\u2605\u2605\u2605\u2605'},
                    {'pic': 'img/hair9.jpeg', 'salon':'Salon 9', 'time':'\u2605\u2605'},
                    {'pic': 'img/hair10.jpg', 'salon':'Salon 10', 'time':'\u2605\u2605\u2605\u2605'},
                    {'pic': 'img/hair7.jpg', 'salon':'Salon 1', 'time':'\u2605\u2605'},
                    {'pic': 'img/hair2.jpg', 'salon':'Salon 2', 'time':'\u2605\u2605\u2605'},
                    {'pic': 'img/hair3.jpeg', 'salon':'Salon 3', 'time':'\u2605\u2605\u2605\u2605'},
                    {'pic': 'img/hair4.jpeg', 'salon':'Salon 4', 'time':'\u2605\u2605'},
                    {'pic': 'img/hair5.jpeg', 'salon':'Salon 5', 'time':'\u2605\u2605\u2605\u2605'},
                    {'pic': 'img/hair6.jpg', 'salon':'Salon 6', 'time':'\u2605\u2605\u2605\u2605\u2605'},
                    {'pic': 'img/hair7.jpg', 'salon':'Salon 7', 'time':'\u2605\u2605\u2605'},
                    {'pic': 'img/hair8.jpg', 'salon':'Salon 8', 'time':'\u2605\u2605\u2605'},
                    {'pic': 'img/hair9.jpeg', 'salon':'Salon 9', 'time':'\u2605\u2605'},
                    {'pic': 'img/hair10.jpg', 'salon':'Salon 10', 'time':'\u2605\u2605\u2605\u2605'},
                    {'pic': 'img/hair7.jpg', 'salon':'Salon 1', 'time':'\u2605\u2605\u2605\u2605'},
                    {'pic': 'img/hair2.jpg', 'salon':'Salon 2', 'time':'\u2605\u2605'},
                    {'pic': 'img/hair3.jpeg', 'salon':'Salon 3', 'time':'\u2605\u2605\u2605'},
                    {'pic': 'img/hair4.jpeg', 'salon':'Salon 4', 'time':'\u2605\u2605\u2605\u2605'}
                  ];
    
    this.weeklydeal = [
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 5', 'time':'$20 off coloring'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 6', 'time':'50% off ombre'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 7', 'time':'$10 off on first session'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 8', 'time':'$10 off on first session'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 9', 'time':'$10 off on first session'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 10', 'time':'$10 off bleaching'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 1', 'time':'$10 off bleaching'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 2', 'time':'$10 off bleaching'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 3', 'time':'50% off ombre'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 4', 'time':'$10 off on first session'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 5', 'time':'$10 off on first session'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 6', 'time':'$10 off on first session'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 7', 'time':'$10 off bleaching'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 8', 'time':'$10 off bleaching'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 9', 'time':'$10 off bleaching'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 10', 'time':'50% off ombre'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 1', 'time':'50% off ombre'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 2', 'time':'50% off ombre'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 3', 'time':'$20 off coloring'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 4', 'time':'$20 off coloring'}
                  ];

    this.loadAvailabilities().then(() => {
      this.availabilities.sort(function(a,b) {
          return a.time - b.time;
      });

      console.log('*****previous******');
      console.log(JSON.stringify(this.availabilities));
      console.log('*****sorted********');
      
      for(let i of this.availabilities) {
        console.log(i.time + "          this is itime");
        let date = new Date(i.time);
        console.log(date + "          this is date in idate");
        let str = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
        console.log(str);
        i.time = str;
      }
    });                

    loading.dismiss();
    /*let data = new URLSearchParams();
    data.append('page', this.totalCount.toString());
    console.log("constructed");
     this.http
      .post('http://192.168.1.131:8888/maneappback/more-items.php', data)
        .subscribe(res => {
          for(let i=0; i<res.json().length - 1; i++) {
            this.totalCount+=1;
            this.items.push(res.json()[i]);
            console.log('this.items is pushed.....');
          };

          this.lastNumRows = res.json()[res.json().length - 1];
          console.log(this.lastNumRows)
          loading.dismiss();
        }, error => {
          console.log(JSON.stringify(error));
        });*/
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    console.log(this.content.directionY + "        upupupupupupu********");
    if(this.content.directionY == 'up') {
      this.show = false
    }
    else {
      this.show = true;
    }

    //return new Promise((resolve, reject) => {
    setTimeout(() => {
      this.list = this.af.list('/promos', {
      query: {
        orderByKey: true,
        startAt: this.startAtKey,
      }});

      this.list.subscribe(items => { 
        items.forEach(item => {
          console.log(JSON.stringify(item.customMetadata));
          console.log(this.startAtKey + "            " + item.$key);
          if(this.startAtKey == item.$key) {
            //
          }
          else {
            this.startAtKey = item.$key;
            this.items.push(item.customMetadata);
          }

        });

                     
      })

      infiniteScroll.complete(); 
        /*let data = new URLSearchParams();
        data.append('page', this.totalCount.toString());*/
        
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
      }, 500);
    //})
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