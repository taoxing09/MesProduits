import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Router } from '@angular/router';
import { Produit } from '../model/produit.model';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrl: './update-produit.component.css'
})
export class UpdateProduitComponent implements OnInit {
  currentProduit = new Produit();
  activatedRoute: any;

  ngOnInit() {
    this.produitService.listeCategories().
      subscribe(cats => {
        this.categories = cats;
        console.log(cats);

      });
    this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']).
      subscribe(prod => {
        this.currentProduit = prod;
        this.updatedCatId =
          this.currentProduit.categorie.idCat;
      });
  }

  constructor(private produitService: ProduitService, private router: Router) { }

  updateProduit() {
    this.currentProduit.categorie = this.categories.

      find(cat => cat.idCat == this.updatedCatId)!;

    this.produitService.updateProduit(this.currentProduit).subscribe(prod => {
      this.router.navigate(['produits']);
    }
    );
  }
}
