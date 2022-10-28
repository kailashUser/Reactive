import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../Features/Home/HomePage';
import ActivityForm from '../../Features/activities/form/ActivityForm';
import ActivityDetails from '../../Features/activities/details/ActivityDetails';

function App() {

  const location = useLocation();

  // const {activityStore} = useStore();
  // const [activities,SetActivities] = useState<Activity[]>([]);
  // const [selectedActivity,setselectedActivity] = useState<Activity | undefined>(undefined);
  // const [editMode, setEditMode] = useState(false);
  // const [submitting,setSubmiting] = useState(false);
//  const { activityStore } = useStore();
 // const [activityStore] = useState(() => new ActivityStore());


  //  useEffect(() => {
  //    activityStore.loadActivities();
  //  }, [activityStore]);


  

//  useEffect(() =>{
//    axios.get<Activity[]>('http://localhost:5000/api/Activities').then(Response =>{
//    console.log(Response);
//    SetActivities(Response.data);
//    })
//  },[])



// function handleSelectactivity(id: String){
//    setselectedActivity(activities.find(x => x.id === id));
// }

// function handleCancelSelectActivity(){
//   setselectedActivity(undefined);
// }

// function handleFormOpen(id?: string){
//   id? handleSelectactivity(id) : handleCancelSelectActivity();
//   setEditMode(true);
//   }


//  function handleFormClose(){
//   setEditMode(false);
//  } 

//  function handleCreateOrEditActivity(activity: Activity) {
//   activity.id 
//     ? SetActivities([...activities.filter(x => x.id !== activity.id), activity])
//     : SetActivities([...activities, {...activity, id: uuid()}]);
//   setEditMode(false);
//   setselectedActivity(activity);
//   setSubmiting(true);
//   if (activity.id) {
//     agent.Activities.update(activity).then(() => {
//       SetActivities([...activities.filter(x => x.id !== activity.id), activity])
//       setselectedActivity(activity);
//       setEditMode(false);
//       setSubmiting(false);
//     })
//   } else {
//     activity.id = uuid();
//     agent.Activities.create(activity).then(() => {
//       SetActivities([...activities, activity])
//       setselectedActivity(activity);
//       setEditMode(false);
//       setSubmiting(false);
//     })
//   }
// }

// function handleDeleteActivity(id : string){
//   setSubmiting(true);
//   agent.Activities.delete(id).then(() => {
//     SetActivities([...activities.filter(x => x.id !== id)]);
//     setSubmiting(false);
//   })

  
  
//  }

//if(loading) return <LoadingComponent content='Loading app'/>
// if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
    <NavBar />
    {/* <Container style={{marginTop: '7em'}}>
      <ActivityDashboard />
    </Container> */}

    <Route exact path='/' component={HomePage} />
    <Route
      path={'/(.+)'}
      render={() => (
        <>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Route exact path='/activities' component={ActivityDashboard} />
            <Route path='/activities/:id' component={ActivityDetails} />
            <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
          </Container>
        </>
      )}
    />
  </>
  );
}

export default observer(App);
 