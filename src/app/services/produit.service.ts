import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  apiURL: string = 'http://localhost:8080/produits/api/produit';


  constructor(private http: HttpClient) {
  }
  listeProduits(): Observable<Produit[]> {
    const url = `${this.apiURL}/all`;
    return this.http.get<Produit[]>(url);
  }
  ajouterProduit(prod: Produit): Observable<Produit> {
    const url = `${this.apiURL}/save`;
    return this.http.post<Produit>(url, prod, httpOptions);
  }
  supprimerProduit(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }
  consulterProduit(id: number): Observable<Produit> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Produit>(url);
  }
  updateProduit(prod: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.apiURL, prod, httpOptions);
  }
  listeCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiURL + "/cat");
  }
}
