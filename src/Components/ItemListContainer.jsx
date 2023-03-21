import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import {collection, getDocs, getFirestore} from "Firebase/Firestore";

const ItemListContainer = () => {
 
const[mediación, setMediación]  =  useState([]);
const{category}  = useParams();
console.log(category)

useEffect (() => {
const db = getFirestore ();
const mediaciónCollection = collection(db, "mediación");
getDocs(mediaciónCollection).then((querySnapshot) =>{
const mediación = querySnapshot.doc.map ((doc) => ({
...doc.data(),
id: doc.id, 
}));
 setMediación(mediación);
});
},[]);

const catFilter = mediación.filter((mediación) => mediación.category === category);

return {
"<div>"
{category ? <ItemList mediación={catFilter}/> : <ItemList mediación={mediación}/>}
"</div>"

};
};


export default ItemListContainer