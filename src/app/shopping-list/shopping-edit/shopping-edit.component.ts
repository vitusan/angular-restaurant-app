import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputHtmlRef: ElementRef;
  // @ViewChild('amountInput') amountInputHtmlRef: ElementRef;

  ingredientForm: FormGroup;
  subscriptionToItemEditing: Subscription;
  editMode: boolean = false;
  itemToEdit: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnDestroy(): void {
    this.subscriptionToItemEditing.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredientForm = new FormGroup({
      'nameInput': new FormControl(null, Validators.required),
      'amountInput': new FormControl(1, [Validators.required, Validators.min(1)])
    });
    this.subscriptionToItemEditing = this.shoppingListService.ingredientEditingStarted.subscribe(
      itemId => {
        this.editMode = true;
        this.itemToEdit = this.shoppingListService.getIngredient(itemId);
        this.ingredientForm.setValue({
          nameInput: this.itemToEdit.name,
          amountInput: this.itemToEdit.amount,
        });
      }
    );
  }

  onAddItem() {
    this.shoppingListService.addIngredient(new Ingredient(this.ingredientForm.get('nameInput').value, this.ingredientForm.get('amountInput').value));
  }

  onRemoveItem() {
    const ingredientRef = this.shoppingListService.getIngredients()
      .find(el => el.name == this.ingredientForm.get('nameInput').value && el.amount == this.ingredientForm.get('amountInput').value);
    this.shoppingListService.removeIngredient(ingredientRef);
  }

  resetForm() {
    this.controls.nameInput.reset();
    this.controls.amountInput.reset(1);
  }

  get controls() {
    return this.ingredientForm.controls;
  }

  // onAddItem() {
  //   this.shoppingListService.addIngredient(new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value));
  // }

  // onRemoveItem() {
  //   const ingredientRef = this.shoppingListService.getIngredients().find(el => el.name == this.nameInputRef.nativeElement.value && el.amount == this.amountInputRef.nativeElement.value);
  //   this.shoppingListService.removeIngredient(ingredientRef);
  // }

}
