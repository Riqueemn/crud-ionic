import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FirebaseApp } from 'angularfire2';
import { ViewController, ModalController, Platform, AlertController } from 'ionic-angular';
import firebase from 'firebase';

import {HomePage} from '../home/home';
import {listaDePessoas} from '../../models/listapessoas/listapessoas';




@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})


export class ListPage {

  public direcionar: any;
  public arquivo: any;
  public arquivourl: any;

  listaDePessoas = {} as listaDePessoas;
  bancoPessoas: FirebaseListObservable<listaDePessoas[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController, private banco: AngularFireDatabase,
  public alertCtrl: AlertController){
    
    this.bancoPessoas = this.banco.list('lista-pessoas');
    
    this.direcionar = firebase.storage().ref();      
    
  }

  //Baixar arquivos  
  baixarArquivo(nome: string){
    let caminho = this.direcionar.child('dir/'+nome);
    caminho.getDownloadURL().then(url => {
       console.log(url); // AQUI VOCÊ JÁ TEM O ARQUIVO
    });
   }


   //Upload de arquivos
  upload(event){
   this.arquivo = event.srcElement.files[0];
  }

   enviarArquivo(dir, arquivo){

    // if (arquivo == null){

    //   let alert_1 = this.alertCtrl.create({
    //     title: 'Aviso',
    //     subTitle: 'Envie um arquivo',
    //     buttons: ['OK']
    //   });
    //   alert_1.present();

    // }else{

      let caminho = this.direcionar.child('dir/'+this.arquivo.name);
      let tarefa = caminho.put(this.arquivo);
      tarefa.on('state_changed', (snapshot)=>{
        // Acompanha os estados do upload (progresso, pausado,...)
      }, error => {
        // Tratar possíveis erros
      }, () => {
        // Função de retorno quando o upload estiver completo  
        console.log(tarefa.snapshot.downloadURL);
      });
  // }
 }


  //Importar dados
  adicionarPessoas(listaDePessoas:listaDePessoas){

    //Importar Dados


    if(listaDePessoas.nome == null || listaDePessoas.idade == null){ 
      
      let alert_2 = this.alertCtrl.create({
        title: 'Aviso',
        subTitle: 'Envie os dados',
        buttons: ['OK']
      });
      alert_2.present();
  
    }else{

      this.bancoPessoas.push({
        
        nome: listaDePessoas.nome,
        idade: Number(listaDePessoas.idade)
              
      });


       //Redirecionar para página HomePage
    this.viewCtrl.dismiss();

      }

    }

  // voltar para home
  dismiss(){
    this.viewCtrl.dismiss();
  }



  }
