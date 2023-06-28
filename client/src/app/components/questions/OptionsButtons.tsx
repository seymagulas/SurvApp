import Link from "next/link";
import { ISurvey } from "../../../services/survey.service";
import { completeSurvey, deleteSurvey, getAllSurveys, getSurvey, publishSurvey } from "../../../services/survey.service";


const OptionsButtons = ({ setSurveys, survey }) => {

  const deleteThisSurvey = () => {
    deleteSurvey(survey._id)
      .then(() => getAllSurveys())
      .then((survey) =>
        setSurveys([...survey]))
  }

  const changeToPublish = async () => {
    publishSurvey(survey._id)
      .then(() => getSurvey(survey._id))
      .then((survey: ISurvey) =>
        setSurveys(survey))
    }
  const changeToComplete = async () => {
    completeSurvey(survey._id)
      .then(() => getSurvey(survey._id))
      .then((survey: ISurvey) =>
        setSurveys(survey))
  }
    

  return (
    <div>
      {survey.status !== 'publish' || survey.status !== 'complete' && (
        <Link href="/dashboard/survey">
          <input type='button' value='Edit' />
        </Link>
      )}
      {survey.status !== 'publish' && (
        <input type='button' value='Publish' onClick={() => changeToPublish()} />
      )}
      <Link href="/dashboard/createNewSurvey/sendByEmail">
        <input type='button' value='Share' />
      </Link>
      {survey.complete && (
        <Link href="/dashboard/statistic">
          <input type='button' value='Statistics' />
        </Link>
      )}
      {survey.status === 'publish' && survey.status !== 'complete' && (
        <input type='button' value='Complete' onClick={() => changeToComplete()} />
      )}
      <input type='button' value='Delete' onClick={() => deleteThisSurvey()} />
    </div>
    )
}

export default OptionsButtons;