import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const GlobalContext = createContext(null);


export default function GlobalState({ children }) {

    const [searchParam, setSearchParam] = useState('');
    const [loading,setLoading] = useState(false);
    const [recipeList,setRecipeList] = useState([]);
    const [recipeDetailsData,setRecipeDetailsData] = useState(null);
    const [favList,setFavList] = useState([]);

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();
        setLoading(true);
        try{
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);
            const data = await res.json();

            // console.log(data);
            if(data?.data?.recipes){
                setLoading(false);
                setRecipeList(data?.data?.recipes);
                setSearchParam('');
                navigate('/');
            }


        }catch(e){
            console.log(e);
            setLoading(false);
            setSearchParam('');
        }
    }
    // console.log(loading,recipeList);

    function handleAddToFavorite(getCurrentItem){
        console.log(getCurrentItem);
        let cpyFavoritesList = [...favList];
        const index = cpyFavoritesList.findIndex(item => item.id === getCurrentItem.id);
        if(index === -1){
            cpyFavoritesList.push(getCurrentItem);
        }else{
            cpyFavoritesList.splice(index);
        }
        setFavList(cpyFavoritesList);
    }
    console.log(favList,'favList');

    return <GlobalContext.Provider value={{searchParam,favList,handleAddToFavorite,loading,recipeDetailsData,setRecipeDetailsData,recipeList, setSearchParam,handleSubmit}}>{children}</GlobalContext.Provider>
}