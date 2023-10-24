
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../model/model.produit';
import { Categorie } from '../model/model.categorie';
//import { Produit } from '../model/produit.model';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css']
})
export class UpdateProduitComponent implements OnInit {
    currentProduit = new Produit();
    categories!:Categorie[];
    updatedCatId!:number;
    constructor(private activatedRoute: ActivatedRoute,
                private router :Router,
                private produitService: ProduitService) { }
    ngOnInit()
    {
              this.produitService.listerCategorie().subscribe(cats => {
                this.categories = cats;
                console.log(cats);
            });
          // console.log(this.route.snapshot.params.id);
          this.produitService.consulterProduit(this.activatedRoute.snapshot. params['id']).subscribe(prod =>{
                  this.currentProduit = prod; 
                  this.updatedCatId = this.currentProduit.categorie.idCat;

                });
          // console.log(this.currentProduit);
         
    }
    updateProduit()
    { 
        //console.log(this.currentProduit);
        /*   this.produitService.updateProduit(this.currentProduit);
        this.produitService.updateProduit(this.currentProduit); */
        this.currentProduit.categorie = this.categories. find(cat => cat.idCat == this.updatedCatId)!;
        this.produitService.updateProduit(this.currentProduit).subscribe(() => {
                this.router.navigate(['produits']);
        });
    } 
}