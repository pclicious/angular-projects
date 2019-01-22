import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from './article.service';
import { Article } from './article';
import { Expense } from './expense'

@Component({
   selector: 'app-article',
   templateUrl: './article.component.html',
   styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit { 
   //Component properties
   term;
   allArticles: Article[];
   allExpenses: Expense[];
   statusCode: Number;
   requestProcessing = false;
   articleIdToUpdate = null;
   SSNToUpdate =null;
   processValidation = false;
   expenseCreate = true;
   //Create form
   articleForm = new FormGroup({
       SSN: new FormControl('', Validators.required),
	   Rent: new FormControl('', Validators.required),
	   Maid:new FormControl('', Validators.required),
	   Travelling:new FormControl('', Validators.required),
	   Grocery:new FormControl('', Validators.required),
	   Investment:new FormControl('', Validators.required),
	   PersonalExpense:new FormControl('', Validators.required)
   });
   //Create constructor to get service instance
   constructor(private articleService: ArticleService) {
   }
   //Create ngOnInit() and and load articles
   ngOnInit(): void {
	   this.getAllArticles();
   }   
   //Fetch all articles
   getAllArticles() {
        this.articleService.getAllArticles()
		  .subscribe(
                data => this.allExpenses = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update article
   onArticleFormSubmit() {
	  this.processValidation = true;   
	  if (this.articleForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
      this.preProcessConfigurations();
	let expense = this.articleForm.value;
	  if (this.articleIdToUpdate === null) {  
        this.articleService.getAllArticles()
	     .subscribe(expenses => {
		   //Create article
     	   this.articleService.createArticle(expense)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllArticles();	
					this.backToCreateArticle();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	  } else {  
   	    //Handle update article
        expense.SSN = this.articleIdToUpdate; 		
	    this.articleService.updateArticle(expense)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllArticles();	
					this.backToCreateArticle();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load article by id to edit
   loadArticleToEdit(articleId: string) {
      this.preProcessConfigurations();
      this.articleService.getArticleById(articleId)
	      .subscribe(expense => {
		            this.articleIdToUpdate = expense.SSN;   
		            this.articleForm.setValue({ Rent: expense.Rent, Maid: expense.Maid, Travelling: expense.Travelling, Grocery: expense.Grocery, Investment: expense.Investment, PersonalExpense: expense.PersonalExpense, SSN: expense.SSN });
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
   //Delete article
   deleteArticle(articleId: string) {
      this.preProcessConfigurations();
      this.articleService.deleteArticleById(articleId)
	      .subscribe(successCode => {
					this.statusCode = 204;
				    this.getAllArticles();	
				    this.backToCreateArticle();
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateArticle() {
      this.articleIdToUpdate = null;
      this.articleForm.reset();	  
	  this.processValidation = false;
   }

   //create new expense record

   createExpense(){
	this.processValidation = true;   
	if (this.articleForm.invalid) {
		 return; //Validation failed, exit from method.
	}   
	this.preProcessConfigurations();
	let expense = this.articleForm.value;
	this.articleService.getAllArticles()
	.subscribe(expenses => {
	  //Create article
	   this.articleService.createArticle(expense)
		 .subscribe(successCode => {
			   this.statusCode = successCode;
			   this.getAllArticles();	
			   this.backToCreateArticle();
			   console.log(this.statusCode);
			   if (this.statusCode = 200){
				   this.expenseCreate = true;
				   console.log(this.expenseCreate);
			   }
			},
			errorCode => this.statusCode = errorCode
		  );
		  
	});		
   }

   //update expense record based on particular SSN
   updateExpense(){
	this.processValidation = true;   
	if (this.articleForm.invalid) {
		 return; //Validation failed, exit from method.
	}   
	this.preProcessConfigurations();
	let expense = this.articleForm.value;
	expense.SSN = this.articleIdToUpdate; 		
	this.articleService.updateArticle(expense)
	  .subscribe(successCode => {
				this.statusCode = successCode;
				this.getAllArticles();	
				this.backToCreateArticle();
				console.log(this.statusCode);
				if (this.statusCode = 200){
					this.expenseCreate = false;
					console.log(this.expenseCreate);
				}
			},
			errorCode => this.statusCode = errorCode);	  
			
   }
}
    