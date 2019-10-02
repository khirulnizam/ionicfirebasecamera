import { Component } from '@angular/core';
//to utilize camera
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';//use camera
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
  	public camera:Camera, //to utilize camera
  	) 
  {}

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
}
