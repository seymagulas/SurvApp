'use client';
​
import { Link } from 'react-router-dom';
import { ISurvey, SurveyStatus } from '../../../services/survey.service';
import {
  completeSurvey,
  deleteSurvey,
  publishSurvey,
} from '../../../services/survey.service';
​
interface OptionButtonsProps {
  handleGetAllSurveys: () => void;
  survey: ISurvey;
}
​
const OptionsButtons: React.FC<OptionButtonsProps> = ({
  handleGetAllSurveys,
  survey,
}: OptionButtonsProps) => {
  const deleteThisSurvey = () => {
    deleteSurvey({ surveyId: survey._id }).then(() => handleGetAllSurveys());
  };
​
  const changeToPublish = async () => {
    publishSurvey({ surveyId: survey._id }).then(() => handleGetAllSurveys());
  };
​
  const changeToComplete = async () => {
    completeSurvey({ surveyId: survey._id }).then(() => handleGetAllSurveys());
  };
​
  return (
    <div>
      {survey.status === SurveyStatus.new && (
        <Link to={`/survey/${survey._id}/edit`}>
          <input type="button" value="Edit" />
        </Link>
      )}
      {survey.status === SurveyStatus.new && (
        <input
          type="button"
          value="Publish"
          onClick={() => changeToPublish()}
        />
      )}
      {survey.status === SurveyStatus.published && (
        <Link to={`/survey/${survey._id}/send-by-email"`}>
          <input type="button" value="Share" />
        </Link>
      )}
      {survey.status !== SurveyStatus.new && (
        <Link to="/statistic">
          <input type="button" value="Statistics" />
        </Link>
      )}
      {survey.status === SurveyStatus.published && (
        <input
          type="button"
          value="Complete"
          onClick={() => changeToComplete()}
        />
      )}
      <input type="button" value="Delete" onClick={() => deleteThisSurvey()} />
    </div>
  );
};
​
export default OptionsButtons;
