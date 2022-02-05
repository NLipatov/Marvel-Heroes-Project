import './charList.scss';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react/cjs/react.production.min';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import PropTypes from 'prop-types';



class CharList extends Component {

    state = {
        characters: [],
        loading: true,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.updateCharacterList)
    }

    onCharListLoading = ()=> {
        this.setState({
            newItemLoading: true
        })
    }

    updateCharacterList = (newCharacters) => {
        let ended = false;
        if(newCharacters.length < 9){
            ended = true;
        }


        this.setState(({characters, offset}) => (
            {
                characters: [...characters, ...newCharacters], 
                loading: false, 
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
            }
            ));
    }

    itemsRefs = [];

    setRef = (ref) => {
        this.itemsRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemsRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemsRefs[id].classList.add('char__item_selected');
        this.itemsRefs[id].focus();
    }



    render(){
        const {characters, loading, error, newItemLoading, offset, charEnded} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View 
                                                    charEnded={charEnded} characters={characters} 
                                                    onCharSelected={this.props.onCharSelected} 
                                                    newItemLoading={newItemLoading} 
                                                    offset={offset} 
                                                    onRequest={this.onRequest} 
                                                    setRef={this.setRef}
                                                    focusOnItem={this.focusOnItem}
                                                    refTest={this.refTest}/> : null;



        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({characters, onCharSelected, offset, newItemLoading, onRequest, charEnded, setRef, focusOnItem}) =>{
    return(
        <>
            <ul className="char__grid">
                {
                    characters.map((character, i)=>(
                        <li ref={setRef}
                            tabIndex={0}
                            className="char__item" key={character.id}
                            onClick={()=> {
                                onCharSelected(character.id);
                                focusOnItem(i);
                                }}
                            onKeyPress={(e)=> {
                                e.preventDefault();
                                if(e.key === ' ' || e.key === 'Enter'){
                                    onCharSelected(character.id);
                                    focusOnItem(i);
                                }
                            }}>
                            <img src={character.thumbnail} alt={character.name} style={{objectFit: `${character.objectFit}`}}/>
                            <div className="char__name">{character.name}</div>
                        </li>  
                    ))
                }
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={()=> onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;