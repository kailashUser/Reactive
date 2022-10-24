import React, {  useEffect } from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';





function App() {

  const {activityStore} = useStore();
  // const [activities,SetActivities] = useState<Activity[]>([]);
  // const [selectedActivity,setselectedActivity] = useState<Activity | undefined>(undefined);
  // const [editMode, setEditMode] = useState(false);
  // const [submitting,setSubmiting] = useState(false);
//  const { activityStore } = useStore();
 // const [activityStore] = useState(() => new ActivityStore());


   useEffect(() => {
     activityStore.loadActivities();
   }, [activityStore]);


  

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
if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
      
  {/* <NavBar openForm = {handleFormOpen} />                                                 */}
  <NavBar  />                                                
         <Container style={{marginTop: '7em'}}>         
          {/* <ActivityDashboard 
          activities ={activityStore.activities}
           selectedActivity = {selectedActivity}
           selectActivity = {handleSelectactivity}
           cancelSelectActivity = {handleCancelSelectActivity}
           editMode = {editMode}
          openForm = {handleFormOpen}
          closeForm = {handleFormClose}    
          deleteActivity={handleDeleteActivity}
          submitting = {submitting}
          /> */}
          <ActivityDashboard/>
          
        </Container>

  
  
    </>
  );
}

export default observer(App);
 