import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.component';
import { ArticlePage } from './pages/article/article.component';

export const routes: Routes = [
	{
		path: 'home',
		component: HomePage
	},
	{
		path: "article",
		redirectTo: 'home',
	},
	{
		path: "article/:articleId",
		component: ArticlePage,
	},
	{
		path: '**',
		redirectTo: 'home',
	},
];
