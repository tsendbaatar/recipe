require("@babel/polyfill");
import Search from "./model/Search";

let search = new Search("pasta");

search.doSearch().then((r) => console.log(r));

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
