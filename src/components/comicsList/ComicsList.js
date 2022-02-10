import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const {getEightComics} = useMarvelService();
    
    useEffect(() => {
        onRequest(0);
    }, []);
    
    const onRequest =  (offset)=> {
        setNewItemLoading(true);
        getEightComics(offset)
        .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
        setComicsList([...comicsList, ...newComics]);
        setOffset(offset + 8);
        setNewItemLoading(false);
    }


    function renderItems(arr){
        const items = arr.map(item =>{
            return(
                <li 
                    className="comics__item"
                    key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">${item.price}</div>
                    </Link>
                </li>
            )
        });
        return(
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    return (
        <div 
            className="comics__list"
            onClick={() => onRequest(offset)}>
            {items}
            <button 
                className="button button__main button__long"
                style={{display: (offset === 0) ? "none" : "block"}}>
                <div 
                    className="inner"
                    >{newItemLoading ? "Loading..." : "Load more"}</div>
            </button>
        </div>
    )
}

export default ComicsList;