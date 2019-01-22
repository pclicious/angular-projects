import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Expense } from './expense'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Article } from './article';

@Injectable()
export class ArticleService {
    //URL for CRUD operations
	articleUrl = "https://10.102.8.141:3004/cust";
	//Create constructor to get Http instance
	constructor(private http:Http) { 
	}
	//Fetch all articles
    getAllArticles(): Observable<Expense[]> {
        return this.http.get(this.articleUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);

    }
	//Create article
    createArticle(article: Article):Observable<Number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.articleUrl, article, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch article by id
    getArticleById(articleId: string): Observable<Expense> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		console.log(this.articleUrl +"/"+ articleId);
		return this.http.get(this.articleUrl +"/"+ articleId)
			   .map(this.extractData)
			   .catch(this.handleError);
    }	
	//Update article
    updateArticle(expense: Expense):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.articleUrl +"/"+ expense.SSN, expense, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete article	
    deleteArticleById(articleId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		return this.http.delete(this.articleUrl +"/"+ articleId)
			   .map(success => success.status)
			   .catch(this.handleError);
    }	
	private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}