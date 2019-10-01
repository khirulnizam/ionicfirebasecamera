import { Component } from '@angular/core';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

//declarations
	nama:any;
  constructor(
  	//service to save
  	public simpan:StorageService
  	) 
  {}

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
