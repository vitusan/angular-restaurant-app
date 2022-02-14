import { ShoppingListService } from './../shopping-list/shoppingList.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) { }

  private recipes: Recipe[] = [
    new Recipe(
      'arroz com carne',
      'para o dia-a-dia de um BR',
      'https://s2.glbimg.com/mPCoKviGDJxsOe-xsmDCRS7vilc=/620x455/e.glbimg.com/og/ed/f/original/2020/09/10/arroz-de-carne-de-panela.jpg',
      [
        new Ingredient('Carne', 1),
        new Ingredient('Arroz', 1)
      ]),
    new Recipe(
      'agua',
      'bora nao desidratar',
      'https://www.correio24horas.com.br/fileadmin/_processed_/c/3/csm_24102018_baz_sommelier_de_aguas_cred_divulgacao_shutterstock_1_aff62af31d.jpg',
      [
        new Ingredient('agua', 1)
      ])
  ]

  getRecipes() {
    return this.recipes.slice();
  }

  updateShoppingList(recipe: Recipe) {
    this.shoppingListService.addIngredients(recipe.ingredients);
  }

}
