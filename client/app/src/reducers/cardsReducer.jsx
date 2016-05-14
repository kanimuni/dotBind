const cardsReducer = (state = [], action) => {
  switch(action.type) {

    case 'ADD_CARD':
      console.log('addcardreduecer is triggered!');
      console.log('ADDCARD NEW STATE: ', action.payload.data.data);
      return [...state, action.payload.data.data];

    case 'FETCH_CARDS':
      return [...state, ...action.payload.data.data];

    case 'FILTER_CARDS':
      const filteredCards = state.slice().filter((card) => {
        for (var i = 0; i < card.cardTags.length; i++) {
          if (card.cardTags[i].tag.name === action.tag) { return true; }
        };
        return false;
      });
      console.log('filteredCards', filteredCards);
      return [...filteredCards];

    case 'SEARCH_CARDS':
      // console.log('PAYLOAD: ', action.payload.data.data);
      const returnedIDs = [];
      action.payload.data.data.forEach(function(obj) {
        returnedIDs.push(obj._source.id);
      })
      // console.log('returnedIDs: ', returnedIDs);
      const searchedCards = state.slice().filter((card) => {
        if (returnedIDs.indexOf(card.id) > -1) { return true; }
      });
      // console.log('searchedCards: ', searchedCards);
      return [...searchedCards];

    case 'UPDATE_CARD':
      console.log('Current state => ', state);
      console.log('New info => ', action.payload.data.data);
      var data = action.payload.data.data[0];
      var newCardId = data.id;
      var newCardState = state.slice(0);
      newCardState.forEach( (card) => {
        if ( card.id === newCardId ) {
          card.code = data.code;
          card.note = data.note;
        }
      })
      return newCardState;

    case 'REMOVE_TAG':
      let removedId = action.payload.data.data[0].id;
      let newState = state.slice(0);
      newState.forEach( (card) => {
        for ( let j = 0; j < card.cardTags.length; j++ ) {
          if ( card.cardTags[j].id === removedId ) {
            card.cardTags.splice(j,1);
          }
        }
      });
      return newState;

    case 'ADD_CARD_TAG':
      let cardId = JSON.parse(action.payload.config.data).card_id;
      let newTagData = action.payload.data.data[0];
      let cardTagId = newTagData.cardTagId;
      let newTag = {
        id: newTagData.id,
        name: newTagData.name,
      };
      let updatedState = [...state];
      updatedState.forEach( (card) => {
        if ( card.id === cardId ) {
          card.cardTags.push({
            id: cardTagId,
            tag: newTag,
          });
        }
      });
      return updatedState;

    default:
      return state;
  };
};

export default cardsReducer;


// case 'REMOVE_CARD':
//   return
//     [...state.slice(0, index),
//      ...state.slice(index+1)];
