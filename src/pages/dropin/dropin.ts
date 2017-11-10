import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import dropin from 'braintree-web-drop-in';
import { Http } from '@angular/http';
import { FormulaBuy } from '../../modals/formulabuy/formulabuy';
import { DepositPage } from '../../modals/depositpage/depositpage';




/**
 * Generated class for the DropinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dropin',
  templateUrl: 'dropin.html'
})
export class DropinPage {

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DropinPage');
    let square = this.navParams.get('square');
    let username = this.navParams.get('username');
    let comingFrom = this.navParams.get('page');

    var button = document.querySelector('#submit-button');

    this.http.request('http://192.168.1.131:8888/api/generatetoken.php')
      .subscribe(res => { 

        dropin.create({
          authorization: res.text(),
          container: '#dropin-container',
          paypal: {
          	flow: 'vault'
          }
        }, (createErr, instance) => {
          button.addEventListener('click', () => {
            instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
              console.log(JSON.stringify(payload) + "payload");
              // Submit payload.nonce to your server
              this.blurAll();
              if(comingFrom == 'userprofile') {
              	let profileModal = this.modalCtrl.create(DepositPage, { payload: payload, username: username });
	  			  profileModal.present().then(() => {
	  			  	this.navCtrl.pop();
	  			  });
              }
              else if(comingFrom == null) {
	              let profileModal = this.modalCtrl.create(FormulaBuy, { username: username, square: square, payload: payload});
	  			  profileModal.present();
	  			  this.navCtrl.pop();
	  		  }
	  		  else {
	  		  	//Add product code here
	  		  }
            });
          });
        });
      }, err => {
        console.log(err + "     this is errrrrrrrrrrrr");
      });
  }

  blurAll(){
	 var tmp = document.createElement("input");
	 document.body.appendChild(tmp);
	 tmp.focus();
	 document.body.removeChild(tmp);
  }

}
