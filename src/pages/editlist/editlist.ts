import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseObjectObservable, AngularFireDatabase} from 'angularfire2/database';
import { listaDePessoas } from "../../models/listapessoas/listapessoas";



@Component({
  selector: 'page-editlist',
  templateUrl: 'editlist.html',
})
export class EditlistPage {

  listaDePessoas = {} as listaDePessoas;
  bancoPessoa: FirebaseObjectObservable<listaDePessoas>;



  constructor(public navCtrl: NavController, public navParams: NavParams,
  private banco: AngularFireDatabase) {

    //Cria uma variável gerando o valor do ID igual o $key de cada tabela da página HomePage
    const listaDePessoasId = this.navParams.get('listaDePessoasId');

    console.log(listaDePessoasId);

    //Pega o valor do $key de cada tabela para ser editado
    this.bancoPessoa = this.banco.object(`lista-pessoas/${listaDePessoasId}`);

    //Pega as informações do ID de cada tabela e subscreve na tag desejada
    this.bancoPessoa.subscribe(listaDePessoas => this.listaDePessoas = listaDePessoas);
  }

  
  //Função de atualiza as informações do banco. O ID já está ativo clicando no item do HomePage
  editar(listaDePessoas){
    this.bancoPessoa.update(listaDePessoas);

    this.navCtrl.pop();
  }
  

}
