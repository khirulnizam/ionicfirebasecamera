import { Component, OnInit } from '@angular/core';
//import nav controller/ menu controller
import { NavController, MenuController} from '@ionic/angular';
import {FirebaseService} from '../service/firebase.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	email:any;
	password:any;

  constructor(
  	public nav:NavController,
  	public menu:MenuController,
  	public fb:FirebaseService
  	) { }

  ngOnInit() {
  	//this.fb.checkUser();
  }

  ionViewWillEnter(){
  	//disable menu for login page
  	this.menu.enable(false);
  	//check user
  	this.fb.checkUser()
  		.then (res=>{
  			if(res==null || res==undefined){
  				//nothing happen
  			}else{
  				this.nav.navigateForward('home');
  			}
  		})
  }

  login(){
  	this.fb.login(this.email, this.password)// hantar ke service.firebase
  		.then(res_success=>{
  			console.log(res_success);
  			this.nav.navigateForward("home");
  		}, err=>{
  			console.log(err);
  			alert(err.message);
  		})
  }

}
