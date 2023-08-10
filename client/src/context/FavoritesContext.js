import { createContext, useReducer } from "react";

export const FavoritesContext = createContext("");


//add wines here to test
const initialState = [
    {
        "name": "Picrochole MAG",
        "price": "180",
        "year": "2020",
        "region": "Loire",
        "category": "Light red",
        "_id": 424,
        "imageSrc": "./assets/picro.jpeg",
        "producer": "Domaine de Montrieux",
        "producerId": 825,
        "grapes": "Pineau D'aunis",
        "notes": "Red fruits, pepper, light.", 
        "method": "Young vines of pineau daunis, 17 and 30 years old respectively, from the top of the parcel. Just over two months of maceration with some remontage, all done in tank."
    }
];

const reducer = (state, action) => {
    switch (action.type){
        case 'add-to-favorites':
            return [...state, action.payload];
        // case 'update-item-quantity':
        //     state.map((item) => {
        //         if (item._id === action.payload._id){
        //             item.quantity = action.payload.quantity
        //         };
        //     });
        //     return [...state];
        case 'delete-from-favorites':
            return state.filter((wine) => wine._id !== action.payload._id); 
        case 'empty-favorites':
            return [];
    }
};

export const FavoritesContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Call this function to add an item to favorites
    const addToFavorites = (data) => {
        dispatch({
            type: 'add-to-favorites',
            payload: {...data, quantity: 1}
        });
    };

    // // Call this function to update the quantity of an ite
    // const updateItemQuantity = (data) => {
    //     dispatch({
    //         type: 'update-item-quantity',
    //         payload: {...data}
    //     })
    // }

    // Call this function to remove an item from favorites
    const deleteFromFavorites = (data) => {
        dispatch({
            type: 'delete-from-favorites',
            payload: {...data}
        })
    };

    // Call this function to empty faves completely
    const clearFavorites = () => {
        dispatch({
            type: 'clear-favorites'
        })
    };

    return (
        <FavoritesContext.Provider value={{state, addToFavorites, deleteFromFavorites, clearFavorites}}>
            {children}
        </FavoritesContext.Provider>
    )
};