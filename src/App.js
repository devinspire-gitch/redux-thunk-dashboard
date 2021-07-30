
import './App.css';
import React, {useState, useEffect, useDispatch, useSelector} from 'react';
import NavBar from './components/navBarComponent/NavBar';
import DataTable from './components/tableComponent/Table';
import Footer from './components/footerComponet/Footer';
import ReactLoading from 'react-loading';
import { userHeadCells, todoHeadCells } from './headerCategories/HeaderCategories';
import { connect } from 'react-redux';
import fetchUsers from './actions/FetchUserData';
import fetchTodos from './actions/FetchTodoData';

function createUserData(username, name, website, email, phone, address, company) {
  return { username, name, website, email, phone, address, company };
}

function createTodoData(Id, username, title, completed) {
  return { Id, username, title, completed };
}

function App({fetchUserData, fetchUsers, fetchTodoData, fetchTodos}) {
  const userData = [];
  const todoData = [];

  useEffect(() => {
    fetchUsers();
    fetchTodos();
  }, [])

  fetchUserData.users.forEach(user => {
    userData.push(createUserData(user.username, user.name, user.website, user.email, user.phone, user.address.street + ',' + user.address.suite + ',' + user.address.city, user.company.name));
  });

  if(fetchUserData.users.length !== 0){
    fetchTodoData.todos.forEach(todo => {
      todoData.push(createTodoData(todo.id,  fetchUserData.users[Number(todo.userId) - 1].username, todo.title, todo.completed));
    })
  }
  
  return (
    <div className="App">
      <NavBar />
      <div className="table-container">
      {fetchUserData.loading || fetchTodoData.loading ? 
          <ReactLoading type='bars' color='black' />
        : fetchUserData.error || fetchTodoData.error ? 
          <p>{ fetchUserData.error + fetchTodoData }</p>
        : <>
        <DataTable data={userData} headerData={userHeadCells} title='Usres'/>
        <DataTable data={todoData} headerData={todoHeadCells} title='To Do'/> </>}
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    fetchUserData: state.userReducer,
    fetchTodoData: state.todoReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchTodos: () => dispatch(fetchTodos())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
