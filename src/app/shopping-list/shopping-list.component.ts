import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  ingredientAddSubs: Subscription;
  ingredientRemovSubs: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientAddSubs = this.shoppingListService.ingredientAdded.subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
    this.ingredientRemovSubs = this.shoppingListService.ingredientRemoved.subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
  }

  ngOnDestroy(): void {
      this.ingredientAddSubs.unsubscribe();
      this.ingredientRemovSubs.unsubscribe();
  }

  onEditItem(itemId: number) {
    this.shoppingListService.ingredientEditingStarted.next(itemId);
  }

}
