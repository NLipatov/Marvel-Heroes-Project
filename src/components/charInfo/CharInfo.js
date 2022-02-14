import {useState, useEffect} from 'react';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError, process, setProcess} = useMarvelService();


    useEffect(() => {
        updateChar(props.charId);
    }, [props.charId])


    const updateChar = (id)=>{

        if(id == null){
            return;
        }

        clearError();
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }


    const onCharLoaded = (char) => {
        setChar(char);
    }

    const setContent = (process, char) => {
        switch (process) {
            case 'waiting':
                return <Skeleton/>;
                break;
            case 'loading': 
                return <Spinner/>;
                break;
            case 'confirmed':
                return <View char={char}/>;
                break;
            case 'error':
                return <ErrorMessage/>;
                break;
            default:
                throw new Error('Unexpected process state');
        }
    }

    return (
        <div className="char__info">
            {setContent(process, char)}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics, objectFit, id} = char;
    const comicsComponent = (comics.length > 0) ? <Comics comics={comics}/> : null;


    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={{objectFit: `${objectFit}`}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <Link to={`/character/${id}`} className="button button__main">
                            <div className="inner">Character Page</div>
                        </Link>
                        <Link to={wiki} className="button button__secondary">
                            <div className="inner">Marvel Wiki</div>
                        </Link>
                        <Link to={homepage} className="button button__secondary">
                            <div className="inner">Marvel Page</div>
                        </Link>
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
                                <Link to={`/comics/${((comics[0].resourceURI).split("/")).pop()}`}>
                                    {item.name} 
                                </Link>
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