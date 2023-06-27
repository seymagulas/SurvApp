import Link from "next/link";
import { deleteSurvey, surveysFromDataBase, updateSurvey } from "../../apiServices";
import { ButtonProps } from "../../interfaces";


const OptionsButtons = ({ setSurveys, survey }: ButtonProps) => {
  const deleteThisSurvey = () => {
    deleteSurvey(survey._id)
      .then(() => surveysFromDataBase(survey.userId))
      .then((survey) =>
        setSurveys([...survey]))
  }

  const changeSurvey = (value: string) => {
    updateSurvey(survey._id, value, 'true')
      .then(() => surveysFromDataBase(survey.userId))
      .then((surveys) =>
        setSurveys([...surveys]))
    }

  return (
    <div>
      {!survey.publish && (
        <Link href="/dashboard/survey">
          <input type='button' value='Edit' />
        </Link>
      )}
      {!survey.publish && (
        <input type='button' value='Publish' onClick={() => changeSurvey('publish')} />
      )}
      <Link href="/dashboard/createNewSurvey/sendByEmail">
        <input type='button' value='Share' />
      </Link>
      {survey.complete && (
        <Link href="/dashboard/statistic">
          <input type='button' value='Statistics' />
        </Link>
      )}
      {!survey.complete && (
        <input type='button' value='Complete' onClick={() => changeSurvey('complete')} />
      )}
      <input type='button' value='Delete' onClick={() => deleteThisSurvey()} />
    </div>
    )
}

export default OptionsButtons;