import { Injectable } from '@angular/core';
import { Produit } from '../model/model.produit';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categorie } from '../model/model.categorie';
const httpOptions = {headers : new HttpHeaders( {'Content-Type':'application/json'})};// retour des donness type json

@Injectable({
  providedIn: 'root'
})


//Classe ProduitService
export class ProduitService {
    //produit! : Produit;
    produits !: Produit[]; // tableau de Produit
    //methode pour remplir le tableau produits
    categories!:Categorie[];
    apiUrl: string = 'http://localhost:7070/produits/api'; //adresse de API REST 
  
    
    constructor( private http : HttpClient )
    { 
        /* this.categories=[{idCat:1, nomCat:"Pc"},
                      {idCat:2, nomCat:"Imprimante"},
                      {idCat:3, nomCat:"Tablette"}] 
          */
      
                    
        // this.produits = [
        // { idProduit : 1, nomProduit : "PC Asus", prixProduit : 3000.600, dateCreation: new Date("01/14/2011")/*,categorie:{idCat:1, nomCat:"Pc"}*/},
        //  { idProduit : 2, nomProduit : "Imprimante Epson", prixProduit : 450, dateCreation : new Date("12/17/2010")/*, categorie:{idCat:2, nomCat:"Imprimante"}*/},
        // { idProduit : 3, nomProduit :"Tablette Samsung", prixProduit : 900.123, dateCreation : new Date("02/20/2020")/*,  categorie:{idCat:3, nomCat:"Tablette"}*/}
        //  ]; 
        
    }


    /* //methode qui ajoute un nouveau produit dans le tableau produits
    ajouterProduit(produit:Produit)
    {
          this.produits.push(produit);   
    } */
    //methode qui appelle API REST qui ajoute un produit dans la BDD
    ajouterProduit(produit:Produit):Observable<Produit>
    {
        return  this.http.post<Produit>(this.apiUrl,  produit, httpOptions);  //httpOption: sous format JSON 
    }

    //methode qui appelle API REST qui retourne  tous les produits 
    listeProduit():Observable<Produit[]>
      {
          return this.http.get<Produit[]>(this.apiUrl);
      }
   /*  //methode pour supprimer un produit
    supprimerProduit(prod:Produit){
      const index = this.produits.indexOf(prod,0);
      if(index > -1){this.produits.splice(index,1)}
    } */
     //methode qui appelle API REST qui supprimer un produit
     supprimerProduit(id: number)
     {
        const url = `${this.apiUrl}/${id}`;// concatenation valeur apiUrl + id
        return this.http.delete(url, httpOptions);
     }
      
    //methode pour recuperer un element du tableau en fonction ID
     /*  consulterProduit(id:number){
      return this.produits.find(p => p.idProduit == id)!;
    } */
    //methode qui appelle API REST qui retoune un produit
     consulterProduit(id:number):Observable<Produit>
      {
            const url = `${this.apiUrl}/${id}`;
            return this.http.get<Produit>(url, httpOptions);
      } 
     

    /*  updateProduit(p:Produit){
      this.supprimerProduit(p);
      this.ajouterProduit(p);
    } */
    //Methode qui appelle API REST qui modifie un produit 
    updateProduit(prod:Produit): Observable<Produit>
    {
       return this.http.put<Produit>(this.apiUrl, prod,  httpOptions);
    } 
    trierProduit(){
      this.produits = this.produits.sort((n1,n2)=>{
        if(n1.idProduit > n2.idProduit){
            return 1;
        }
        if(n1.idProduit < n2.idProduit){
            return -1;
        }
        return 0
        
    });
    }
    //methode pour afficher le tableau categorie
    /*  listerCategorie():Categorie[]{
        return this.categories;
      } */
    //methode pour afficher un element du tab cat
    /* consulterCategorie(id:number){
    return this.categories.find(cat => cat.idCat == id)!
    } */

    listerCategorie():Observable<Categorie[]>
    {
       return  this.http.get<Categorie[]>(this.apiUrl + "/cat");
    } 
}
