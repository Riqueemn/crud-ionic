import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ModalController, AlertController } from 'ionic-angular';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';

import {ListPage} from '../list/list';
import { listaDePessoas } from "../../models/listapessoas/listapessoas";
import { EditlistPage } from "../editlist/editlist";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bancoPessoas: FirebaseListObservable<listaDePessoas[]>;

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,
  private banco: AngularFireDatabase, private actionSheetCtrl: ActionSheetController,
  private alertCtrl: AlertController) {

    this.bancoPessoas = this.banco.list('lista-pessoas');

  }


  remover(listaDePessoas){
    this.bancoPessoas.remove(listaDePessoas.$key)
  }

  edit(listaDePessoas){
    this.navCtrl.push(EditlistPage, {listaDePessoasId: listaDePessoas.$key});
  }

  listmodal(){
    let modal = this.modalCtrl.create(ListPage);
    modal.present();
  }

}
