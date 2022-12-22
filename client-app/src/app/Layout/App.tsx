import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../Features/Home/HomePage';
import ActivityForm from '../../Features/activities/form/ActivityForm';
import ActivityDetails from '../../Features/activities/details/ActivityDetails';
import TestErrors from '../../Features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../Features/errors/NotFound';
import ServerError from '../../Features/errors/ServerError';
import LoginForm from '../../Features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../api/common/modals/ModalContainer';

function App() {
  const location = useLocation();
  const {commonStore,userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }else{
      commonStore.setAppLoaded();
    }
  },[commonStore,userStore])

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app....'/>

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar />  
    <ModalContainer />
     <Route exact path='/' component={HomePage} />
    <Route
      path={'/(.+)'}
      render={() => (
        <>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Switch>
                <Route exact path='/activities' component={ActivityDashboard} />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                <Route path='/errors' component={TestErrors}/>
                <Route path='/server-error' component={ServerError}/>
                <Route path='/login' component={LoginForm}/>
                <Route component={NotFound}/>
            </Switch>

          </Container>
        </>
      )}
    />
  </>
  );
}

export default observer(App);
 