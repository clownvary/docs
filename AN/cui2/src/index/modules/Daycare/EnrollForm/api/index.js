import { HttpMethod, createAPI } from 'react-base-ui/lib/common/restClient';

const path = `${window.__siteBaseName}/rest`;
const apiSet = {};

apiSet.getEnrollFormEntry = createAPI(HttpMethod.GET, `${path}/program/userentry?reno={{reno}}&program_id={{programId}}`);
apiSet.getParticipants = createAPI(HttpMethod.GET, `${path}/program/{{programId}}/participants`);
apiSet.setParticipant = createAPI(HttpMethod.POST, `${path}/program/{{programId}}/participant/{{participantId}}?reno={{reno}}`);
apiSet.getSessions = createAPI(HttpMethod.GET, `${path}/program/{{programId}}/customersessions?customer_id={{customerId}}`);
apiSet.setSessions = createAPI(HttpMethod.POST, `${path}/program/sessiondates/pendingregistrations`);
apiSet.getFeeSummary = createAPI(HttpMethod.GET, `${path}/program/feeSummary?reno={{reno}}`);
apiSet.getPickups = createAPI(HttpMethod.GET, `${path}/program/{{programId}}/pickups/{{participantId}}`);
apiSet.getQuestions = createAPI(HttpMethod.GET, `${path}/program/questions?reno={{reno}}`);
apiSet.setQuestionAnswer = createAPI(HttpMethod.POST, `${path}/program/questionanswer`);
apiSet.addtocart = createAPI(HttpMethod.POST, `${path}/program/addtocart`);
apiSet.getExceptionExtraDates = createAPI(HttpMethod.GET, `${path}/program/{{programId}}/exceptionandextradates?reno={{reno}}`);

// istanbul ignore else
if (__STATIC__) {
  const testPath = '/test/json/Daycare/EnrollForm';
  apiSet.getEnrollFormEntry = apiSet.getEnrollFormEntry.mock(`${testPath}/enroll_form_entry.json`);
  apiSet.getParticipants = apiSet.getParticipants.mock(`${testPath}/get_participants.json`);
  apiSet.setParticipant = apiSet.setParticipant.mock(`${testPath}/set_participant.json`);
  apiSet.getSessions = apiSet.getSessions.mock(`${testPath}/get_sessions.json`);
  apiSet.setSessions = apiSet.setSessions.mock(`${testPath}/set_sessions.json`);
  apiSet.getFeeSummary = apiSet.getFeeSummary.mock(`${testPath}/get_fee_summary.json`);
  apiSet.getPickups = apiSet.getPickups.mock(`${testPath}/get_pickups.json`);
  apiSet.getQuestions = apiSet.getQuestions.mock(`${testPath}/get_questions.json`);
  apiSet.setQuestionAnswer = apiSet.setQuestionAnswer.mock(`${testPath}/set_question_answer.json`);
  apiSet.addtocart = apiSet.addtocart.mock(`${testPath}/add_to_cart.json`);
  apiSet.getExceptionExtraDates = apiSet.getExceptionExtraDates.mock(`${testPath}/get_exception_extra_dates.json`);
}

export default apiSet;
