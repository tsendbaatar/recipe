require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import List from "./model/List";
import Like from "./model/Like";
import * as listView from "./view/listView";
import * as likesView from "./view/likesView";
import {
  renderRecipe,
  clearRecipe,
  highlightSelectRecipe,
} from "./view/recipeView";

/**
 * web app tuluv
 *
 */

const state = {};
likesView.toggleLikeMenu(0);
const controlSearch = async () => {
  //web ees hailtiin tulhuur ugiig gargaj avna
  const query = searchView.getInput(); //searchView.getInput();

  if (query) {
    //shineer hailtiin obektiig uusgene
    state.search = new Search(query);
    //hailt hiihed zoriulj delgetsiig UI beldene
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    //hailtiig guitsetgene
    await state.search.doSearch();
    //hailtiin ur dung gargana
    clearLoader();
    if (state.search.result === undefined) searchView.renderRecipes();
    else {
      searchView.renderRecipes(state.search.result);
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

// Joriin controller

const controlRecipe = async () => {
  // url s id salgah
  const id = window.location.hash.replace("#", "");
  if (!state.like) state.like = new Like();
  if (id) {
    // joriin model uusgene

    state.recipe = new Recipe(id);

    //ui delgets
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highlightSelectRecipe(id);
    //joroo tataj avchirna
    await state.recipe.getRecipe();
    //joriig guitsetgeh hugatsaa bolon ortsiig tootsoolno
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniitoo();

    //joroo uzuulne
    renderRecipe(state.recipe, state.like.isLike(id));
  }
};

["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);

const controllerList = () => {
  // nairlagiin model
  state.list = new List();

  listView.clearItems();
  //ug modeliin joriig nairlagaruu nemne
  state.recipe.ingredients.forEach((n) => {
    const item = state.list.addItem(n);
    listView.renderItem(item);
  });
};

const controlLike = () => {
  //Daragdsan joriig avch modeld hiih
  if (!state.like) state.like = new Like();
  //odoo haragdaj bui joriin id
  const currentRecipeId = state.recipe.id;
  // like darsan esehiig shalgah
  if (state.like.isLike(currentRecipeId)) {
    state.like.deleteLike(currentRecipeId);

    likesView.deleteLike(currentRecipeId);

    likesView.toggleLikeBtn(false);
  } else {
    const newLike = state.like.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );

    likesView.renderLike(newLike);
    likesView.toggleLikeBtn(true);
  }
  //like darsan bol likelahgui bolgono esreg bol likelana
  likesView.toggleLikeMenu(state.like.getNumberOfLikes());
  //console.log(state.likes.getNumberOfLikes());
};

elements.recipeDiv.addEventListener("click", (e) => {
  if (e.target.matches(".recipe__btn, .recipe__btn *")) {
    controllerList();
  } else if (e.target.matches(".recipe__love, .recipe__love *"));
  {
    controlLike();
  }
});

elements.shoppingList.addEventListener("click", (e) => {
  const id = e.target.closest(".shopping__item").dataset.itemid;

  state.list.deleteItem(id);

  listView.deleteItem(id);
});
//let search = new Search("pasta");

//search.doSearch().then((r) => console.log(r));

// import axios from "axios";

// async function doSearch(search) {
//   try {
//     let result = await axios(
//       "https://forkify-api.herokuapp.com/api/search?q=" + search
//     );
//     const recipes = result.data.recipes;
//     console.log(recipes);

//     result = await axios(
//       "https://forkify-api.herokuapp.com/api/get?rId=" + recipes[1].recipe_id
//     );

//     console.log(result);
//   } catch (error) {
//     alert(error);
//   }
// }

// doSearch("pizza");
