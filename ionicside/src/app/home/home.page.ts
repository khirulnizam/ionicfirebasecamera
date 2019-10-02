import { Component } from '@angular/core';
import { StorageService } from '../service/storage.service';
//to utilize camera
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';//use camera
//for vibrate
import { Vibration } from '@ionic-native/vibration/ngx';

import { MenuController, NavController} from '@ionic/angular';
import {FirebaseService} from '../service/firebase.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

//declarations
	nama:any;
	gambar:any;//variable declaration

  the_list:any=[];//declaring array

  constructor(
  	//service to save
  	public simpan:StorageService,
  	public camera:Camera, //to utilize camera
    public menu:MenuController,
  	public vibration:Vibration, //for vibration
    public fb:FirebaseService,
    public nav:NavController,
    public alertController:AlertController
  	) 
  {}

  ionViewWillEnter(){//will execute auto when page loaded
    //disable menu for login page
    this.menu.enable(true);
    this.fb.checkUser()
    .then(res=>{
      if(res==null || res==undefined)//user takwujud
      {
        //nothing happens
        // this.load=false
        this.nav.navigateBack('login');
      }
      else{//user wujud
          this.loadData();
      }//user wujud
    })

  }

  loadData(){
    this.fb.readEntry(this.fb.uid)
        .then(res_list=>{
          console.log("This is list", res_list);
          this.the_list=res_list;
        }, err=>{
            console.log(err);
        }
      )
  }//end load

  deleteData(key){
    this.fb.deleteEntry(key,this.fb.uid)
        .then(_=>{
          console.log("Delete:", "succesfull");
          //this.the_list=res_list;
          alert(this.fb.uid+"Deleted");
          this.loadData();
        }, err=>{
            console.log("ERROR:",err);
            this.loadData();
        }
      )
  }//delete

  updateData(key,data){
    this.fb.updateFlag=true;
    this.fb.selectedData=data;
    this.nav.navigateForward("createnote");
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  vibrate(){
  	this.vibration.vibrate(1000);
  }

  ambilgambar(){
  	//code to shoot image camera
  	//copy from 
  	// https://ionicframework.com/docs/native/camera
  	const options: CameraOptions = {
	  quality: 100,
	  destinationType: this.camera.DestinationType.DATA_URL,
	  encodingType: this.camera.EncodingType.JPEG,
	  mediaType: this.camera.MediaType.PICTURE,
	  correctOrientation:true,
	  saveToPhotoAlbum:true
	}

	this.camera.getPicture(options).then((imageData) => {
	 // imageData is either a base64 encoded string or a file URI
	 // If it's base64 (DATA_URL):
	 this.gambar = 'data:image/jpeg;base64,' + imageData;
	}, (err) => {
	 // Handle error
	});
  }

  simpannama(){
  	this.simpan.createstorage('namakey', this.nama);
  	alert("nama disimpan");
  }

  ambilnama(){
  	this.simpan.readstorage('namakey')
  		.then(resp=>{
  			this.nama=resp;//positif ada data
  		}, err=>{
  			alert(err);//negatif
  		})
  }

  buangnama(){
  	this.simpan.deletestorage('namakey');
  	alert("nama dah padam");
  }

}
