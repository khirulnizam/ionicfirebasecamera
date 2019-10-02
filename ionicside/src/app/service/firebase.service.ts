import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
	uid:any;
	updateFlag=false;
	selectedData:any={};//to update data

  constructor() { }

  checkUser()
  {
    return new Promise((resolve,reject)=>{
      firebase.auth().onAuthStateChanged(res=>{
      	console.log(res.uid);
      	this.uid=res.uid;
        resolve(res);
      },err=>{
        reject(err);
      })
    })

  }

  logout()
  {
    firebase.auth().signOut();
  }

  login(email,password)
  {
    return new Promise((resolve,reject)=>{

      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(res_success=>{
        resolve(res_success);
      },err=>{
        reject(err);
      })

    })
  }

  createEntry(entry,uid)
  {
    return new Promise((resolve,reject)=>{

      let post_key=firebase.database().ref().child('abcabc').push().key;
      //_pfaiadslahahbsd

      firebase.database().ref('notes/'+uid+'/'+post_key+'/')
      .set(entry)
      .then(resp=>{
        resolve("OK");
      },err=>{
        reject(err);
      })

    })
  }

  readEntry(uid)
  {
    return new Promise((resolve,reject)=>{

      firebase.database().ref('notes/'+uid)
      .once('value')
      .then(res=>{

        let return_array=[];

        res.forEach(data=>{
          return_array.push({
            key:data.key,
            val:data.val()
          })
        })

        resolve(return_array);

      },err=>{
        reject(err);
      })
    })

  }

  updateEntry(key,uid,data)
  {
    return new Promise((resolve,reject)=>{

      firebase.database().ref('notes/'+uid+"/"+key)
      .update(data)
      .then(res=>{
        resolve(res);
      },err=>{
        reject(err);
      })

    })
  }

  deleteEntry(key,uid)
  {
    return new Promise((resolve,reject)=>{

      firebase.database().ref('notes/'+uid+'/'+key)
      .remove()
      .then(res=>{
        resolve(res);
      },err=>{
        reject(err);
      })
    })
  }


}
