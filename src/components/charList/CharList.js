import './charList.scss';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react/cjs/react.production.min';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';



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

    render(){
        const {characters, loading, error, newItemLoading, offset, charEnded} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View charEnded={charEnded} characters={characters} onCharSelected={this.props.onCharSelected} newItemLoading={newItemLoading} offset={offset} onRequest={this.onRequest}/> : null;



        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({characters, onCharSelected, offset, newItemLoading, onRequest, charEnded}) =>{
    return(
        <>
            <ul className="char__grid">
                {
                    characters.map((character)=>(
                        <li className="char__item" key={character.id}
                            onClick={()=> onCharSelected(character.id)}>
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

export default CharList;