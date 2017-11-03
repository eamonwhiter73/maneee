import { Component, OnDestroy } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { SignUpPage } from '../signup/signup';
import { FeedUser } from '../feeduser/feeduser';
import { FeedStylist } from '../feedstylist/feedstylist';
import { Keyboard } from '@ionic-native/keyboard';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { User1 } from '../../models/user';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';


@Component({
  selector: 'page-sign-in',
  templateUrl: 'signin.html'
})
export class SignInPage implements OnDestroy {
	stylist: boolean;
  users: boolean;
  user = {} as User1;
  stylistemail;
  email;
  password;
  type;
  data;
  list: FirebaseListObservable<any>
  //subscription: ISubscription

  constructor(public af: AngularFireDatabase, loadingCtrl: LoadingController, public storage: Storage, private afAuth: AngularFireAuth, public keyboard: Keyboard, public navCtrl: NavController) {

  }

  ionViewWillUnload() {
    //this.navCtrl.pop();
  }

  ngOnDestroy() {
    //if(this.subscription != null) {
      //this.subscription.unsubscribe();
    //}
  }

  ionViewDidLoad() {
    //let loading = this.loadingCtrl.create({content : "Loading..."});
    //loading.present();

    this.storage.get('email').then((val) => {
      this.email = val;
    });

    this.storage.get('password').then((val) => {
      this.password = val;
    })

    this.storage.get('type').then((val) => {
      this.type = val;
    })

    this.storage.get('loggedin').then((val) => {
      console.log(val + " logged innnnnnnn");
      if(val == true) {
        console.log(this.type + " logged typeeeeee");
        if(this.type == 'user/stylist/user' || this.type == 'user') {
          //loading.dismiss();
          this.navCtrl.setRoot(FeedUser);
        }
        else if(this.type == 'user/stylist/stylist' || this.type == 'stylist') {
          //loading.dismiss();
          this.navCtrl.setRoot(FeedStylist);
        }
      }
      else {
        console.log("Val == false......");
      }
    });
  }

  selectOneStylist() {
    console.log("in select one stylist");
    if(this.users) {
      this.users = false;
    }
  }

  selectOneUser() {
    if(this.stylist) {
      this.stylist = false;
    }
  }

  goButton(code) {
    console.log(code);
    if(code == 13) {
      this.keyboard.close();
    }
  }

  async login(userx: User1){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    /**/

    if(!userx.email || !userx.password) {
      alert("You need to enter an email and password");
    }
    else if(this.stylist && this.type == 'user') {
      alert("You do not have a stylist account, you can add one using the signup page");
    }
    else if(this.users && this.type == 'stylist') {
      alert("You do not have a user account, you can add one using the signup page");
    }
    else if(!this.users && !this.stylist) {
      alert('You need to select "Hair Stylist" or "User"');
    }
    else {
      this.afAuth.auth.signInWithEmailAndPassword(userx.email, userx.password).then((data) => {
        console.log(data);
        if(data.email && data.uid) {
          if(this.stylist) {
            console.log("chose stylist");
            this.storage.set('type', 'user/stylist/stylist');
            this.storage.set('loggedin', true);
            
             let database = firebase.database();
             let reff = firebase.database().ref('/profiles/stylists').orderByChild('email').equalTo(userx.email).on("value", (snapshot) => {
                snapshot.forEach(snapshot => {
                    // key
                    let key = snapshot.key;
                    console.log("key: " + key);
                    // value, could be object
                    let childData = snapshot.val();
                    console.log("data: " + JSON.stringify(childData));
                    // Do what you want with these key/values here

                    console.log(childData.address + "    childdata address");
                    
                    this.storage.set('address', childData.address);
                    this.storage.set('bio', childData.bio);
                    this.storage.set('email', userx.email);
                    this.storage.set('picURL', childData.picURL);
                    this.storage.set('price', childData.price);
                    this.storage.set('phone', childData.phone);
                    this.storage.set('instausername', childData.instagramURL);
                    this.storage.set('username', childData.username);

                    return true;
                });
            });
            
            this.navCtrl.setRoot(FeedStylist);
          }
          else {
            this.storage.set('type', 'user/stylist/user');
            this.storage.set('loggedin', true);

            let database = firebase.database();
             let reff = firebase.database().ref('/profiles/users').orderByChild('email').equalTo(userx.email).on("value", (snapshot) => {
                snapshot.forEach(snapshot => {
                    // key
                    let key = snapshot.key;
                    console.log("key: " + key);
                    // value, could be object
                    let childData = snapshot.val();
                    console.log("data: " + JSON.stringify(childData));
                    // Do what you want with these key/values here
                    
                    //this.storage.set('address', childData.address);
                    this.storage.set('bio', childData.bio);
                    this.storage.set('email', userx.email);
                    this.storage.set('picURL', childData.picURL);
                    this.storage.set('phone', childData.phone);
                    this.storage.set('instausername', childData.instagramURL);
                    this.storage.set('username', childData.username);

                    return true;
                });
            });

            this.navCtrl.setRoot(FeedUser); 
          }
        }
      }).catch((e) => {alert("The username or password is incorrect")});
    }
  }

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(SignUpPage);
  }


  logForm(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    
  }
}
