import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Users from './pages/Users';
import UsersSubscription from './pages/UsersSubscription';
import CoursesPage from './pages/CoursesPage';
import CreateCoursePage from './pages/CreateCoursePage';
import CourseSearchPage from './pages/CourseSearchPage';
import { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import User from './pages/User';
import UserForm from './pages/UserForm';
import UserFormEdit from './pages/UserFormEdit';
import { NotFound } from 'http-errors';


function App() {
  const [token, setToken] = useState(() => !!localStorage.getItem('token'))
  //const [user] = useState(JSON.parse(localStorage.getItem('authUser')));
  const client = useApolloClient()


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  return (

    <div>
      <nav>
      {token ? 'Estas logueado' : 'No estas logueado'}
        {token ? <button onClick={logout}>Cerrar session</button> : ''}


        <Link to="/">home</Link> | 
        <Link to="/login">login</Link> |
        <Link to="/users">users</Link> |
        <Link to="/users-subscription">users subscript</Link> |
        <Link to="/user/624c5c898d750587fd0ca792">Mi perfil admin</Link> |
        <Link to="/user/624c5c996728fbb0ec80cf3e">Mi perfil usuario</Link> |
        <Link to="/users-create">Registro</Link> |
        <Link to="/users-edit/624c5c996728fbb0ec80cf3e">Edicion registro</Link> |
        <Link to="/coursesPage">Lista cursos</Link> |
        <Link to="/createCoursesPage">Create curse</Link> |
        <Link to="/createCoursesPage/625de02dcda7d61be8f2c9bf">Edit curse 625de..</Link> |
        <Link to="/searchCoursePage">Search curse</Link> |
        <Link to="/top">page course top</Link> |
        <Link to="/new/1">page course 1</Link> |
      </nav>
        <Routes>
          <Route path="/" element={<LoginForm setToken={setToken} />} />
          <Route path="/login" element={<LoginForm setToken={setToken} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users-subscription" element={<UsersSubscription />} />
          <Route path="/users-edit/:uid" component={UserFormEdit} />
          <Route path="/users-create" element={<UserForm />} />
          <Route path="/user/:uid" element={<User />} />
          <Route path="/coursesPage" element={<CoursesPage />} />
          <Route path="/createCoursesPage/:idCourse" element={<CreateCoursePage />} />
          <Route path="/createCoursesPage" element={<CreateCoursePage />} />
          <Route path="/searchCoursePage" element={<CourseSearchPage />} />

          <Route path="/top" element={<CoursesPage />} />
          <Route path="/new/:page" element={<CoursesPage />} />

          <Route path="*" element={
            <NotFound />
          } />
        </Routes>
    </div>

  );
}


export default App;
