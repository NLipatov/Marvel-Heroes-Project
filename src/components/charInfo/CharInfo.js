import {useState, useEffect} from 'react';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';


const CharInfo = (props) => {

    const [charId, setCharId] = useState(props.charId);
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [objectFit, setObjectFit] = useState('');

    const marvelService = new MarvelService();


    useEffect(() => {
        updateChar(props.charId);
    }, [props])


    const updateChar = (id)=>{

        if(id == null){
            return;
        }

        onCharLoading();

        marvelService
        .getCharacter(id)
        .then(onCharLoaded)
        .catch(onError);
    }


    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }
    const onCharLoading = () => {
        setLoading(true);
    }
    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>; 

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics, objectFit} = char;
    const comicsComponent = (comics.length > 0) ? <Comics comics={comics}/> : null;

    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={{objectFit: `${objectFit}`}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            {comicsComponent}
        </>
    )
    
}

const Comics = ({comics}) => {
    return(
        <>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.slice(0, 10).map((item, i) => {
                        return(
                            <li className="char__comics-item" key={i}>
                                {item.name}  
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;