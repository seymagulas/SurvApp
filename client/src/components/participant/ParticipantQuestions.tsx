import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getQuestionForParticipant,
  sendAnswer,
  IParticipantQuestion,
} from '../../services/participant.service';
import { toast } from 'react-toastify';

const ParticipantQuestions: React.FC = () => {
  const [participantQuestion, setParticipantQuestion] =
    useState<IParticipantQuestion>();
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await getQuestionForParticipant({
          hash: location.state.hash,
        });
        setParticipantQuestion(response);
      } catch (error) {
        toast.error('Failed to fetch question');
      }
    };

    fetchQuestion();
  }, [location.state.hash]);

  const handleNextQuestion = async () => {
    try {
      await sendAnswer({
        hash: location.state.hash,
        data: {
          questionId: participantQuestion?._id,
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
          questionId: participantQuestion?._id,
          answerId: selectedAnswer,
          isFinished: true,
        },
      });
      navigate('/finish');
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
    <div>
      <h3>{participantQuestion.text}</h3>
      <div>
        {participantQuestion.answerOptions &&
          participantQuestion.answerOptions.map((answer) => (
            <div key={answer._id}>
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
      <div>
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
    </div>
  );
};

export default ParticipantQuestions;
