import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/model.produit';
import { ProduitService } from '../services/produit.service';
import { Router } from '@angular/router';
import { Categorie } from '../model/model.categorie';
//import { Categorie } from '../model/categorie.produit';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit{
    newProduit= new Produit();//objet newProduit de classe Produit
  //message!:string;
    categories!:Categorie[];
    newCategorie!:Categorie;
    newIdCat!:number;

  constructor(private produitService: ProduitService,
              private router:Router){

   }//injection dependance: instance de service de ProduitService
  
  ngOnInit(): void 
  {
        // this.categories=this.produitService.listerCategorie();
        this.produitService.listerCategorie().subscribe(cats => {
              this.categories = cats;
              console.log(cats);
          });
  }


  
  //Methode qui ajoute un nouveau produit
  /* addProduit()
  {
      //this.newCategorie=this.produitService.consulterCategorie(this.newIdCat);
      //this.newProduit.categorie=this.newCategorie;
      this.produitService.ajouterProduit(this.newProduit);
      this.router.navigate(['produits'])
      
  } */

  addProduit()
  {
      this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
      this.produitService.ajouterProduit(this.newProduit).subscribe(prod => 
        {
            console.log(prod);
            this.router.navigate(['produits']);
        }  
      );
  }  
  
}
