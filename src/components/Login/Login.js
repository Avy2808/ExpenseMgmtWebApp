import React, { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { data } from "../../App";
import "./Login.css";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Login=()=>{

    const {loggedin, setloggedin, setuser}=useContext(data);

    const [username, setusername]=useState('');
    const [pwd, setpwd]=useState('');
    const [users, setusers]=useState([]);

    useEffect(()=>{
        const q=query(collection(db, 'UserMaster'));
        onSnapshot(q, (querySnapshot)=>{
            const arr=[];
            querySnapshot.forEach((doc)=>{
                arr.push({...doc.data(), id:doc.id});
            });
            setusers(arr);
        })
    }, [])

    const login=(e)=>{
        if(username==='' || pwd===''){
            alert('Enter both username and password');
            return;
        }
        var i=0;
        var flag=false;
        while(i<users.length){
            if(users[i].usr_name===username && users[i].usr_pwd===pwd){
                flag=true;
                break;
            }
            i++;
        }
        if(flag){
            setloggedin(!loggedin);
            setusername('');
            setpwd('');
            setuser(users[i]);
            console.log(users[i]);
            window.localStorage.setItem('isLoggedIn', true);
            window.localStorage.setItem('User', JSON.stringify(users[i]));
        }
        else{
            alert('Enter a valid username and password');
        }
    }

    return (
        <div className="page">
            <div className="cover">
                <h1>Login</h1>
                <input type="text" placeholder="Username" className="inp"  onChange={(e)=>setusername(e.target.value)} value={username}/>
                <input type="text" placeholder="Password" className="inp" onChange={(e)=>setpwd(e.target.value)} value={pwd}/>
                <div className="login-btn" onClick={(e)=>login(e)}><Link to='/profile' className="log">Login</Link></div>
            </div>
        </div>
    );
}

export default Login;