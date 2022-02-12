import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('test', 'tes desc', 'https://www.teclasap.com.br/wp-content/uploads/2012/03/poop.jpg'),
    new Recipe('test', 'tes desc', 'https://www.teclasap.com.br/wp-content/uploads/2012/03/poop.jpg')
  ];

  @Output() selectedARecipe = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.selectedARecipe.emit(recipe);
  }

}
