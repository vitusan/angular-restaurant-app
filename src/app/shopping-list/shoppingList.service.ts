import { EventEmitter } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';
export class ShoppingListService {

  ingredientAdded = new EventEmitter<Ingredient[]>();
  ingredientRemoved = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Tomatoe', 1),
    new Ingredient('Lettuce', 3)
  ]

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.emit(this.ingredients);
  }

  removeIngredient(ingredient: Ingredient) {
    const ingredientFound = this.ingredients.indexOf(ingredient);
    if (ingredientFound !== -1) {
      this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
      this.ingredientRemoved.emit(this.ingredients);
    }
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

}
