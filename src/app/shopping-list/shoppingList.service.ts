import { Subject, Subscription } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';

export class ShoppingListService {

  ingredientAdded = new Subject<Ingredient[]>();
  ingredientRemoved = new Subject<Ingredient[]>();
  ingredientEditingStarted = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Tomatoe', 1),
    new Ingredient('Lettuce', 3)
  ]

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients);
  }

  removeIngredient(ingredient: Ingredient) {
    const ingredientFound = this.ingredients.indexOf(ingredient);
    if (ingredientFound !== -1) {
      this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
      this.ingredientRemoved.next(this.ingredients);
    }
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

}
