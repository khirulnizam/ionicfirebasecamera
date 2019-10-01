import { Injectable } from '@angular/core';
import { Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage:Storage) { 

  }

  //create database
  createstorage(key,data){
  	this.storage.set(key,data);
  }

  //read db
  readstorage(key){
  	return new Promise((resolve,reject)=>{
  		this.storage.get(key)
  			.then(res=>{
  				resolve(res);
  			}, err => {
  				reject(err);
  			
  			})
  		})

  }//end readstorage

  //to delete
  deletestorage(key){
  	this.storage.remove(key);
  }
}
