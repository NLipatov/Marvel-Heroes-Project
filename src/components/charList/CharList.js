import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Transition} from 'react-transition-group';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';
import { FormControl, InputGroup } from 'react-bootstrap';


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [showItems, setShowItems] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [loadMoreButton, setLoadMoreButton] = useState(false);


    
    const {loading, error, getAllCharacters, clearError, getCharacterListByName} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        clearError();
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }


    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
        setLoadMoreButton(true);
    }

    const searchForCharacters = async() => {
        if (searchInput.length === 0){
            setCharList([]);
            setOffset(0);
            onRequest(offset, true);
            return;
        }
        setLoadMoreButton(false);
        setCharList(await getCharacterListByName(searchInput))
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        console.log(itemRefs.current)
        itemRefs.current.forEach(item =>{
            if(item != null){
                item.classList.remove('char__item_selected')
            }
        }) 
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const renderItems = (arr, show) => {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        e.preventDefault();
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });

        const duration = 300;

        const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
        }
    
        const transitionStyles = {
        entering: { opacity: 1 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
        };

        return (
            <Transition in={show} timeout={duration}>
                {state => (
                    <>
                    <div style={
                            {
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }
                        }>
                            <div style={{padding: '25px', marginBottom: '25px', boxShadow: '5px 5px 20px rgb(0 0 0 / 25%)', display: 'flex', flexDirection: 'column'}}>
                                <h2 style={{marginLeft: 'auto', marginRight: 'auto', width: 'fit-content'}}>Search for characters</h2>
                                <div style={{alignItems: 'center', display: 'flex'}}>
                                    <input style={{ marginRight: '10px', width: '-webkit-fill-available', height: '30px', fontSize: '18pt', fontWeight: 'bold'}}
                                    onChange={(e)=>{setSearchInput(e.target.value)}}
                                    value={searchInput}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter'){
                                            searchForCharacters();
                                        }
                                    }}/>
                                    <button 
                                    className="button button__main"
                                    onClick={searchForCharacters}>
                                        <div className="inner">Search</div>
                                    </button>
                                </div>
                            </div>
                            <ul className="char__grid">
                                {items}
                            </ul>
                    </div>

                    </>

                )}
            </Transition>
        )
    }
    
    const items = renderItems(charList, (charList.length > 0));

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            
            {errorMessage}
            {spinner}
            {items}
            {loadMoreButton ? 
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
                :
                null}
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;