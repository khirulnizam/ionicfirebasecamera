import { Component, OnInit } from '@angular/core';
import { MenuController, NavController} from '@ionic/angular';
import {FirebaseService} from '../service/firebase.service';

@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.page.html',
  styleUrls: ['./createnote.page.scss'],
})
export class CreatenotePage implements OnInit {
	data:any={};//object variable

  constructor(
  	public fb:FirebaseService,
  	public nav:NavController) { }

  ngOnInit() {//load sekali sahaja
  }

  ionViewWIllEnter(){
  	if(this.fb.updateFlag==true){
  		this.data=this.fb.selectedData.val;
  	}
  }

  createNote(){
  	//timestamp
  	let t=new Date();
  	this.data.zztimestamp=t.getTime();//time zone UTC time

  	//if updateFlag false than createdata
  	if(this.fb.updateFlag==false){//create
	  	this.fb.createEntry(this.data, this.fb.uid)
	  		.then(_=>{
	  			this.nav.navigateBack("home");
	  		}, err=>{
	  			console.log("ERROR", err);
	  		})
  	}
  	//update
  	else if(this.fb.updateFlag==true){
  		this.fb.updateEntry(this.fb.selectedData.key, this.fb.uid,this.data)
	  		.then(_=>{
	  			this.nav.navigateBack("home");
	  		}, err=>{
	  			console.log("ERROR", err);
	  		})
  	}//end if update
  }//end createnote

}
