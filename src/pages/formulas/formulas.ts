import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Storage } from "@ionic/storage";
import { ISubscription } from "rxjs/Subscription";
import { FormulaPage } from '../formula/formula';
import { FeedStylist } from '../feedstylist/feedstylist';




/**
 * Generated class for the FormulasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formulas',
  templateUrl: 'formulas.html'
})
export class FormulasPage implements OnDestroy {
  items = [{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},
  {'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},
  {'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'}];
  list: FirebaseObjectObservable<any>;
  list2: FirebaseObjectObservable<any>;
  subscription: ISubscription;
  subscription2: ISubscription;
  username;
  constructor(public app: App, public storage: Storage, public af: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormulasPage');

    this.storage.get('username').then((val) => {
    	this.username = val;
    	this.list = this.af.object('/formulasowned/' + val);
	    this.subscription = this.list.subscribe(item => {
	    	console.log(JSON.stringify(item) + "     objh objjo   obono oonnono ");
	    	for(let z in item) {
	    		console.log(z + " zzzzzzzzzzzzzzzzz");
	    		this.list2 = this.af.object('/formulasowned/' + val + '/' + z);
	    		this.subscription2 = this.list2.subscribe(item => {
	    			let c = 0;
	    			for(let r in item) {
	    				console.log(JSON.stringify(item[r]) + "     rrrrrrrrrrrrr");
	    				if(c > 0) {
	    					break;
	    				}

	    				this.items.unshift(item[r]);
	    				
	    				c++;
	    			}
	    		})
	    	}
	    })
    })
    
    

  }

  loadFolder(color) {
  	console.log("load folder");
  	console.log(color);
  	this.navCtrl.push(FormulaPage, {
      color: color,
      username: this.username
    });
  }

  ngOnDestroy() {
  	if(this.subscription != null) {
  		this.subscription.unsubscribe();
  	}
  	if(this.subscription2 != null) {
  		this.subscription2.unsubscribe();
  	}
  }

}
