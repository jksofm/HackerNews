import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, actions) => {
  switch (actions.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_STORIES:
      console.log(actions.payload.hits);
      return { ...state,isLoading: false, hits: actions.payload.hits,nbPages: actions.payload.nbPages};
    case REMOVE_STORY:
      const newHits =state.hits.filter((hit)=>{
        return hit.objectID !== actions.payload
      })
      return {...state, hits: newHits}
    case HANDLE_SEARCH:
      return {...state, query: actions.payload,page:0}
    case HANDLE_PAGE:
      if(actions.payload === "inc"){
          let nextPage = state.page+1;
          if(nextPage>state.nbPages - 1){
            nextPage = 0;
          }
          return {...state, page: nextPage}
      }else{
        let prevPage = state.page - 1;
        if(prevPage<0){
          prevPage = state.nbPages - 1;
        }
        return {...state, page: prevPage}
      }
    

    default:
      throw new Error(`Invalid action`);
  }
};
export default reducer;
