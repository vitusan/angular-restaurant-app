import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private router: ActivatedRoute) {
    // soh funciona uma vez assim que a página eh carregada. Se qualquer mudança futura ocorrer nesse componente
    // os detalhes não serão atualizados.
    // this.recipe = this.recipeService.getRecipeById(this.router.snapshot.params['id']);
    // nessa forma, o componente será atualizado sempre que a rota for alterada pelo click da receita.
    this.router.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);
    });
  }

  ngOnInit(): void {
  }

  onAddToSL() {
    this.recipeService.updateShoppingList(this.recipe);
  }

}
