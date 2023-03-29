import './App.css';
import Layout from "./Components/Layout/Layout";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import OrderList from "./Components/Order/OrderList";
import SignIn from "./Pages/Login/Login";
import CustomerList from "./Components/Customers/CustomerList";
import React, {useEffect, useState} from "react";
import axios from "./service/axios";
import {setUserLogin} from "./redux/features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import Home from "./Pages/Shop/Home";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            axios.get('/user-login').then(response => {
                console.log(response.data)
                if (response.data.status == 'success') {
                    dispatch(setUserLogin(response.data))
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }, [navigate]);

  return (
    <>
      <Routes>
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/" element={<Home/>}/>
              <Route path="/admin"  element={ auth.isLogined ? <Layout/> : <Navigate to="/login" />}>
                  <Route path="" element={<Navigate to="/admin/dashboard" />}/>
                  <Route path="dashboard" element={<Dashboard/>}/>
                  <Route path="orders" element={<OrderList/>}/>
                  <Route path="customers" element={<CustomerList/>}/>
              </Route>
      </Routes>
    </>
  );
}

export default App;
