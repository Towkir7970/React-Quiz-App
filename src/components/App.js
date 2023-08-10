import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from "../contexts/AuthContext";
import '../styles/App.css';
import Layout from './Layout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route exact path='/' Component={Home} />
            
            <Route exact path='/signup' element={<PublicRoute />}>
              <Route exact path='/signup' Component={Signup} />
            </Route>
            
            <Route exact path='/login' element={<PublicRoute />}>
              <Route exact path='/login' Component={Login} />
            </Route>
            
            <Route exact path='/quiz/:id' element={<PrivateRoute />}> 
              <Route exact path='/quiz/:id' element={<Quiz/>}/>
            </Route>

            <Route exact path='/result/:id' element={<PrivateRoute />}> 
              <Route exact path='/result/:id' element={<Result />}/>
            </Route> 
      
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
