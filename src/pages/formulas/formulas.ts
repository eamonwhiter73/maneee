import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Storage } from "@ionic/storage";
import { ISubscription } from "rxjs/Subscription";



/**
 * Generated class for the FormulasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formulas',
  templateUrl: 'formulas.html',
})
export class FormulasPage implements OnDestroy {
  items = [{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},
  {'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},
  {'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'},{'url': 'assets/lock.png'}];
  list: FirebaseListObservable<any>;
  subscription: ISubscription;
  constructor(public storage: Storage, public af: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormulasPage');
    let x = 0;

    this.storage.get('username').then((val) => {
    	this.list = this.af.list('/formulasowned/' + val);
	    this.subscription = this.list.subscribe(items => {
	      
	      	
	    	items.forEach(item => {
	    		this.items.unshift(item);
	    	})

	    	
	    })
    })
    
    

  }

  ngOnDestroy() {
  	if(this.subscription != null) {
  		this.subscription.unsubscribe();
  	}
  }

}
