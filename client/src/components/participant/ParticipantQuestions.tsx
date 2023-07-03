import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getQuestionForParticipant,
  sendAnswer,
  IParticipantQuestion,
} from '../../services/participant.service';
import { toast } from 'react-toastify';
import './participant.css';

const ParticipantQuestions: React.FC = () => {
  const [participantQuestion, setParticipantQuestion] =
    useState<IParticipantQuestion>();
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showThankYou, setShowThankYou] = useState(false); // State variable to control the display of the thank you note
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getQuestionForParticipant({
      hash: location.state.hash,
    })
      .then((response) => {
        console.log(response);
        setParticipantQuestion(response);
      })
      .catch((error) => {
        toast.error('Failed to fetch question');
      });
  }, [location.state.hash]);

  const handleNextQuestion = async () => {
    try {
      await sendAnswer({
        hash: location.state.hash,
        data: {
          questionId: participantQuestion?.question._id,
          answerId: selectedAnswer,
          isFinished: false,
        },
      });
      setSelectedAnswer('');
      const response = await getQuestionForParticipant({
        hash: location.state.hash,
      });
      setParticipantQuestion(response);
    } catch (error) {
      toast.error('Failed to send answer');
    }
  };

  const handleFinishSurvey = async () => {
    try {
      await sendAnswer({
        hash: location.state.hash,
        data: {
          questionId: participantQuestion?.question._id,
          answerId: selectedAnswer,
          isFinished: true,
        },
      });
      setShowThankYou(true);
    } catch (error) {
      toast.error('Failed to send answer');
    }
  };

  const handleAnswerChange = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  if (!participantQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main">
      {showThankYou ? (
        <div className="thank-you-note">
          <img
            src="/assests/images/final.jpg"
            alt="thank you image for participation"
          />
          <p> Thank you for participating!</p>
        </div>
      ) : (
        <>
          <h3 className="participant-question">
            {participantQuestion.question.text}
          </h3>
          {participantQuestion.question.choiceType === 'range' ? (
            <div className="answer-inline">
              {participantQuestion.question.answerOptions &&
                participantQuestion.question.answerOptions.map((answer) => (
                  <div
                    className={`answer-options${
                      participantQuestion.question.choiceType === 'multi-choice'
                        ? ' hover-effect'
                        : ''
                    }`}
                    key={answer._id}
                  >
                    <input
                      type="radio"
                      id={answer._id}
                      name="answer"
                      value={answer._id}
                      checked={selectedAnswer === answer._id}
                      onChange={() => handleAnswerChange(answer._id!)}
                    />
                    <label htmlFor={answer._id}>{answer.text}</label>
                  </div>
                ))}
            </div>
          ) : (
            <div className="answer">
              {participantQuestion.question.answerOptions &&
                participantQuestion.question.answerOptions.map((answer) => (
                  <div
                    className={`answer-options${
                      participantQuestion.question.choiceType === 'multi-choice'
                        ? ' hover-effect'
                        : ''
                    }`}
                    key={answer._id}
                  >
                    <input
                      type="radio"
                      id={answer._id}
                      name="answer"
                      value={answer._id}
                      checked={selectedAnswer === answer._id}
                      onChange={() => handleAnswerChange(answer._id!)}
                    />
                    <label htmlFor={answer._id}>{answer.text}</label>
                  </div>
                ))}
            </div>
          )}
          <div className="buttons">
            {participantQuestion.isLastQuestion ? (
              <button disabled={!selectedAnswer} onClick={handleFinishSurvey}>
                Finish
              </button>
            ) : (
              <button disabled={!selectedAnswer} onClick={handleNextQuestion}>
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ParticipantQuestions;
