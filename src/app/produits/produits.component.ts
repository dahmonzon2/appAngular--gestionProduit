import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/model.produit';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html'})
  
export class ProduitsComponent implements OnInit{
     produits!:Produit[];
    // categories!:Categorie[];
    constructor(private produitService:ProduitService) //injection de dependance 
    {
        //this.produits=produitService.listeProduit();
    }
    ngOnInit(): void
      {
          this.chargerProduit();
      }
      chargerProduit()
      {
        this.produitService.listeProduit().subscribe(prods => {
          console.log(prods);
          this.produits = prods;
        });
      }
    supprimerProduit(p:Produit)
    {
          let conf = confirm("Etes vous sûr?")
          if(conf)
          this.produitService.supprimerProduit(p.idProduit).subscribe(() =>{
          console.log("produit supprimer");
          this.chargerProduit();
        });
    }
    
}
   