import { Component } from '@angular/core';
import { StorageService } from '../service/storage.service';
//to utilize camera
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';//use camera
//for vibrate
import { Vibration } from '@ionic-native/vibration/ngx';

import { MenuController, NavController} from '@ionic/angular';
import {FirebaseService} from '../service/firebase.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

//declarations
	nama:any;
	gambar:any;

  constructor(
  	//service to save
  	public simpan:StorageService,
  	public camera:Camera, //to utilize camera
    public menu:MenuController,
  	public vibration:Vibration, //for vibration
    public fb:FirebaseService,
    public nav:NavController
  	) 
  {}

  ionViewWillEnter(){
    //disable menu for login page
    this.menu.enable(true);
    this.fb.checkuser()
    .then(res=>{
      if(res==null || res==undefined)
      {
        //nothing happens
        // this.load=false
        this.nav.navigateBack('login');
      }
    })

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
