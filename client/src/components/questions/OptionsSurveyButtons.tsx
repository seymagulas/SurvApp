import React from 'react';
// import { Link } from 'react-router-dom';

interface IOptionsSurveyButtons {
  text: string;
  deleteQuestion: (text: string) => void;
}

const OptionsSurveyButtons: React.FC<IOptionsSurveyButtons> = ({
  text,
  deleteQuestion,
}) => {

  const handleDelete = () => {
    deleteQuestion(text);
  };

  return (
    <div>
      {/* // <Link to={`/survey/questions`}>
        //   <input type="button" value="Edit" />
        // </Link> */}
      <input type="button" value="Delete" onClick={handleDelete} />
    </div>
  );
};

export default OptionsSurveyButtons;
