import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout
import { UserLayout } from "./component/UserLayout";

// Header-only Pages
import { Home } from "./component/Home";
import { Login } from "./component/Login";
import UserRegister from "./component/Registor/UserRegister";
import UserFetchAll from "./component/Registor/UserFetchAll";

// Category
import { FetchAllCategory } from "./component/category/FetchAllCategory";
import { CreateCategory } from "./component/category/CreateCategory";
import { UpdateCategory } from "./component/category/UpdateCategory";

// Content
import { FetchAllContent } from "./component/content/FecthAllContent";
import { CreateContent } from "./component/content/CreateContent";
import { UpdateContent } from "./component/content/UpdateContent";

// Quiz
import { QuizPage } from "./component/QuizPage";
import { FetchAllUserHistory } from "./component/userQuizHistory/FetchAllUserHistory";

// Rewards
import { FetchAllreward } from "./component/rewards/FetchAllreward";
import { Createreward } from "./component/rewards/Createreward";
import { UpdateReward } from "./component/rewards/UpdateReward";

// Gift Assign
import { CreateGift } from "./component/giftassig/CreateGift";
import { FetchAllGift } from "./component/giftassig/FetchAllGift";
import { HomeCustomerAdmin } from "./component/HomeCustormerAdmin";
import { CusterHeader } from "./component/CusterHeader";
import { CustomerUserLayout } from "./component/CustomerUseLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All pages using layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
        
          <Route path="registerFetchAll" element={<UserFetchAll />} />
          <Route path="login" element={<Login />} />

          {/* Category */}
          <Route path="fetchAllCategory" element={<FetchAllCategory />} />
          <Route path="createCategory" element={<CreateCategory />} />
          <Route path="updateCategory/:categoryId" element={<UpdateCategory />} />

          {/* Content */}
          <Route path="fetchAllContent" element={<FetchAllContent />} />
          <Route path="createConetnt" element={<CreateContent />} />
          <Route path="updateContent/:contentId" element={<UpdateContent />} />

          {/* Quiz */}
          <Route path="quizType/:categoryId/:createdAt" element={<QuizPage />} />
          <Route path="fetchAllUserHistory" element={<FetchAllUserHistory />} />

          {/* Rewards */}
          <Route path="fetchAllReward" element={<FetchAllreward />} />
          <Route path="createReward" element={<Createreward />} />
          <Route path="updateReward/:rewardId" element={<UpdateReward />} />

          {/* Gift Assigned */}
          <Route path="createAssigned" element={<CreateGift />} />
          <Route path="fetchAllAssigned" element={<FetchAllGift />} />
          </Route>
            </Routes>

            <Routes>
              <Route path="/customer" element={<CustomerUserLayout/>}>
            <Route path="/customer" element={<HomeCustomerAdmin/>}/>
              <Route path="register" element={<UserRegister/>} />
         
          </Route>
        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
