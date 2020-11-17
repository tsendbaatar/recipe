require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
/**
 * web app tuluv
 *
 */

const state = {};

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
