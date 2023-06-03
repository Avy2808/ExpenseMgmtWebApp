import "./App.css";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import CompanyMaster from "./components/CompanyMaster/CompanyMaster";
import SiteMaster from "./components/SiteMaster/SiteMaster";
import UserMaster from "./components/UserMaster/UserMaster";
import ExpenseHead from "./components/ExpenseHead/ExpenseHead";
import SiteAllocation from "./components/SiteAllocation/SiteAllocation";
import ExpenseApproval from "./components/ExpenseApproval/ExpenseApproval";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import { createContext, useState } from "react";
import Details from "./components/ExpenseApproval/details";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";
import Report from "./components/Report/Report";
export const data=createContext();

function App() {

  const [loggedin, setloggedin]=useState(false);
  const [user, setuser]=useState(null);
  const [list, setlist]=useState([]);
  const [lists, setlists]=useState(list);
  const usr=JSON.parse(window.localStorage.getItem('User'));

  const isLoggedIn=window.localStorage.getItem('isLoggedIn');

  const alllist=async()=>{
    var a='';
    if(usr.usr_level==='0' || usr.usr_level==='2'){
      a=query(collection(db, 'SiteExpense'));
    }
    else{
      a=query(collection(db, 'SiteExpense'), where('exp_date2', '!=', null));
    }
    const q=a;
    const unsubscribe=onSnapshot(q, (querySnapshot)=>{
      const arr=[];
      querySnapshot.forEach((doc)=>{
        arr.push({...doc.data(), id:doc.id});
      });
      setlist(arr);
    })
    return ()=>unsubscribe()
  }
  

  return (
    <>
    <data.Provider value={{loggedin:loggedin, setloggedin:setloggedin, user:usr, usr:user, setuser:setuser, list:list, setlist:setlist, alllist:alllist, lists:lists, setlists:setlists}}>
      <Router>
        {isLoggedIn?
        <>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Profile/>} />
          <Route exact path="/compm" element={<CompanyMaster/>} />
          <Route exact path="/sitem" element={<SiteMaster/>} />
          <Route exact path="/userm" element={<UserMaster/>} />
          <Route exact path="/exph" element={<ExpenseHead/>} />
          <Route exact path="/siteall" element={<SiteAllocation/>} />
          <Route exact path="/expapp" element={<ExpenseApproval/>} />
          <Route exact path="/details" element={<Details/>} />
          <Route exact path="/report" element={<Report/>} />
        </Routes></>
        :isLoggedIn?<Profile/>:<Login/>
        }
      </Router>
    </data.Provider>
    </>
    
  );
}

export default App;
