import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useQuestions from '../../hooks/useQuestions';
import Answers from '../Answers';
import MiniPlayer from '../MiniPlayer';
import ProgressBar from '../ProgressBar';

const initialState = null;

const reducer = (state, action) =>{
    switch(action.type){
        case "questions":
            action.value.forEach(question => {
                question.options.forEach(option => {
                    option.checked = false;
                })
            });
            return action.value;
        case "answer":
            const questions = _.cloneDeep(state);
            questions[action.questionID].options[action.optionIndex].checked = action.value;
            return questions;
        default:
            return state;
    }
}

const Quiz = () => {
    const {id} = useParams();
    const {loading, error, questions} = useQuestions(id);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [qna, dispatch] = useReducer(reducer, initialState);
    const {currentUser} = useAuth();

    const location = useLocation();
    const {videoTitle} = location.state;

    const navigate = useNavigate();
    
    useEffect(()=>{
        dispatch({
            type: "questions",
            value: questions
        })
    }, [questions]);

    function handleAnswerChange(e, index){
        dispatch({
            type: "answer",
            questionID: currentQuestion,
            optionIndex: index,
            value: e.target.checked,
        })
    }

    // handle when user clicks the buttons to get the questions
    function nextQuestion(){
        if(currentQuestion+1 < questions.length){
            setCurrentQuestion(prevCurrent => prevCurrent+1);
        }
    }

    function prevQuestion(){
        if(currentQuestion >= 1 && currentQuestion <= questions.length){
            setCurrentQuestion(prevCurrent => prevCurrent-1);
        }
    }

    // submit quiz
    async function submit(){
        const {uid} = currentUser;

        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        await set(resultRef, {
            [id]: qna
        });
        navigate(`/result/${id}`, {
            state: qna,
        });

    }

    const percentage = questions.length > 0 ? ((currentQuestion+1)/questions.length)*100 : 0;
    //console.log('percentage', percentage);
    return (
        <>
        {loading && <div>Loading...</div>}
        {error && <div>There was an error</div>}
        {!loading && !error && qna && qna.length>0 && (
            <>
                <h1>{qna[currentQuestion].title}</h1>
                <h4>Question can have multiple answers</h4>
                <Answers input={true} options={qna[currentQuestion].options} handleChange={handleAnswerChange} />
                <ProgressBar next={nextQuestion} prev={prevQuestion} progress={percentage} submit={submit} />
                <MiniPlayer id={id} title={videoTitle} />
            </>)}
        </>
    );
}

export default Quiz;