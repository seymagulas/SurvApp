const baseURL = 'http://localhost:3001/'

export const surveysFromDataBase = async (userId: number) => {
   return [{_id: 4545,
    userId: 45456,
    name: 'Dogs in Scotland',
    complete: false,
    publish: false}]
}

export const deleteSurvey = async (id: number) => {


}

export const updateSurvey = async (id: number, updatedValue: string, value: string) => {
    return [{_id: 4545,
        userId: 45456,
        name: 'Dogs in Scotland',
        complete: false,
        publish: false}]
}

export const sendEmail = async (userId: number, emails: string[], id: string) => {
  try{
    const emailsList = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({userId: userId, emails: emails})
    }
    await fetch(baseURL + `/${id}/share`,  emailsList);
  }catch(e){
    console.log({message: "Server error", error: e})
  }
}