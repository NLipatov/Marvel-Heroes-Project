import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../services/MarvelService';
import {useEffect, useState} from 'react';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const {getEightComics} = useMarvelService();
    
    useEffect(() => {
        onRequest();
    }, []);
    
    const onRequest = ()=> {
        comicsList.length === 0 ? setOffset(0) : setOffset(offset + 8);
        console.log(`Offset is: ${offset}`)
        getEightComics(offset)
        .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
        setComicsList([...comicsList, ...newComics]);
    }



    function renderItems(arr){
        const items = arr.map((item, i) =>{
            return(
                <li 
                    className="comics__item"
                    key={i}>
                    <a href="#">
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        });
        console.log('reterning renderitems')
        return(
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    return (
        
        <div className="comics__list">
            {items}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;