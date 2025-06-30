import axios from 'axios';

// Register
const Api_createUser='http://localhost:2003/project/createUser'
const Api_fetchALl='http://localhost:2003/project/userFetchAll'

//Login
const Api_Login='http://localhost:2003/project/loginCreate'
//category
const Api_fetchAll='http://localhost:2003/project/fetchAllCategory'
const Api_create='http://localhost:2003/project/createCategory'
const Api_get='http://localhost:2003/project/fetchByIdCategory'
const Api_update='http://localhost:2003/project/updateCategory'
const Api_delete='http://localhost:2003/project/deleteCategory'
//content
const Api_create_content='http://localhost:2003/project/createContent'
const Api_fetchAll_content='http://localhost:2003/project/fetchAllContent'
const Api_get_content='http://localhost:2003/project/fetchByIdContent'
const Api_update_content='http://localhost:2003/project/updateByIdContent'
const Api_delete_content='http://localhost:2003/project/deleteContent'
const Api_Quiz_content = "http://localhost:2003/project/getByQuiz"
//UserHistory
const Api_create_userHistory="http://localhost:2003/project/createUserHistrory"
const Api_fetchAll_UserHistory="http://localhost:2003/project/fetchAllUserHistory"
//quizentire
const Api_create_Quizentire="http://localhost:2003/project/qiuzChickEntity"
//User History
const Api_Fetch_All_userHistory="http://localhost:2003/project/fetchAllUserHistory"
//reward
const Api_Create_reward="http://localhost:2003/project/createReward"
const Api_fetchAll_reward="http://localhost:2003/project/fetchAllReward"
const Api_fetchById_reward="http://localhost:2003/project/fetchByIdReward"
const Api_updateById_reward="http://localhost:2003/project/updateByIdReward"
const Api_delete_reward="http://localhost:2003/project/deleteReward"
//RewardAssigned
const Api_assigned_Reward="http://localhost:2003/project/createUserGiftAssigned"
const Api_fetcAll_reward="http://localhost:2003/project/fetchAlluserGift"
//UserAssinged
const Api_assing_userAssingedtop="http://localhost:2003/project/fetchAllUserHistoryTop10"


//register
const registorCreate=(user)=>{
    return axios.post(Api_createUser,user);
}
const registerFetchAll=()=>{
    return axios.get(Api_fetchALl);
}
//login
const logInCreate=(loginDto)=>{
  return axios.post(Api_Login,loginDto)
}
//category
const fetchAllCategory=()=>{
  return axios.get(Api_fetchAll);
}
const createCategory=(category)=>{
  return axios.post(Api_create,category);
}
const getByIdCategory=(categoryId)=>{
 return axios.get(`${Api_get}/${categoryId}`)
}
const updateCategory = (categoryId, category) => {
  return axios.put(`${Api_update}/${categoryId}`, category); 
};
const deleteCategory=(categoryId)=>{
  return axios.delete(`${Api_delete}/${categoryId}`)
}
//content
const createContent=(content)=>{
  return axios.post(Api_create_content,content);
}
const fetchAllContent=()=>{
return axios.get(Api_fetchAll_content)
}
const fetchByIdConetnt=(contentId)=>{
  return axios.get(`${Api_get_content}/${contentId}`);
}
const updatedByIdConetnt=(contentId,content)=>{
  return axios.put(`${Api_update_content}/${contentId}`,content);
}
const deleteContent=(contentId)=>{
  return axios.delete(`${Api_delete_content}/${contentId}`)
}
//Qiuz
const quizType=(categoryId,createdAt)=>{
   return  axios.get(`${Api_Quiz_content}/${categoryId}/${createdAt}`)
}

//userHistory
const createQuizAttempt=(userHistory)=>{
  return axios.post(Api_create_userHistory,userHistory);
}
const fetchAllUserHistory=()=>{
  return axios.get(Api_fetchAll_UserHistory);
}

//Quizentire
const quizEntire=(QuizCheckEntireDto)=>{
  return axios.post(Api_create_Quizentire,QuizCheckEntireDto);
}
//userHistory
const fetchAlluserHistory=()=>{
  return axios.get(Api_Fetch_All_userHistory);

}

//rewars
const createreward=(rewards)=>{
  return axios.post(Api_Create_reward,rewards);
}
const fetchallReward=()=>{
  return axios.get(Api_fetchAll_reward);
}
const getByIdReward=(rewardId)=>{
 return axios.get(`${Api_fetchById_reward}/${rewardId}`);
}
const updateByIdReward = (rewardId, rewardsDto) => {
  return axios.put(`${Api_updateById_reward}/${rewardId}`, rewardsDto);
};

const deleteByIdReward = (rewardId) => {
   return axios.delete(`${Api_delete_reward}/${rewardId}`);
};
//ReqardAssigned
const createAssigned=(UserGiftAssignedDto)=>{
  return axios.post(Api_assigned_Reward,UserGiftAssignedDto)
}

const fetchAllAssigned=()=>{
  return axios.get(Api_fetcAll_reward)
}
//UserGiftHistory
const UserGiftHistorytop10=()=>{
  return axios.get(Api_assing_userAssingedtop);
}

export const CmpService = {
  //register
  registorCreate,
  registerFetchAll,
  //login
  logInCreate,
  //category
  fetchAllCategory,
  createCategory,
  getByIdCategory,
  updateCategory,
  deleteCategory,
  //content
  createContent,
  fetchAllContent,
   fetchByIdConetnt,
  updatedByIdConetnt,
  deleteContent,
quizType,
//userHistory
createQuizAttempt,
fetchAllUserHistory, 
//quizentire
quizEntire,
//userHistory
fetchAlluserHistory,
//rewards
createreward,
fetchallReward,
getByIdReward,
updateByIdReward,
deleteByIdReward,
// UserGiftAssigned
createAssigned,
fetchAllAssigned,
UserGiftHistorytop10


};
