import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { ISubscription } from "rxjs/Subscription";



/**
 * Generated class for the FormulaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formula',
  templateUrl: 'formula.html'
})
export class FormulaPage implements OnDestroy {
  username;
  color;
  list: FirebaseObjectObservable<any>;
  list2: FirebaseObjectObservable<any>;
  subscription: ISubscription;
  subscription2: ISubscription;
  items = [];

  constructor(public af: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormulaPage');

    this.username = this.navParams.get('username');
    this.color = this.navParams.get('color');

    this.list = this.af.object('/formulasowned/' + this.username);
    this.subscription = this.list.subscribe(item => {
    	console.log(JSON.stringify(item) + "     objh objjo   obono oonnono ");
    	for(let z in item) {
    		console.log(z + " zzzzzzzzzzzzzzzzz");
    		this.list2 = this.af.object('/formulasowned/' + this.username + '/' + z);
    		this.subscription2 = this.list2.subscribe(item => {
    			for(let r in item) {
    				console.log(JSON.stringify(item[r]) + "     rrrrrrrrrrrrr");
    				if(item[r].color != this.color) {
    					this.items.unshift(item[r]);
    				}
    			}
    		})
    	}
    })
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
