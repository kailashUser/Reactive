import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/Layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';

// interface Props{
//     activities : Activity[];
//     selectedActivity : Activity | undefined;
//     selectActivity : (id:String) => void;
//     cancelSelectActivity : () => void;
//     editMode : boolean;
//     openForm : (id: string) => void;
//     closeForm : () => void;
//     createOrEdit : (activity : Activity) => void;
//     deleteActivity : (id:string) => void;
//     submitting : boolean;
// }


// export default function ActivityDashboard({activities,selectActivity,
//     selectedActivity,cancelSelectActivity,editMode,closeForm,openForm,
//     createOrEdit,deleteActivity,submitting}: Props){
export default  observer( function ActivityDashboard(){

        const {activityStore} = useStore();
        const {loadActivities,activityRegistry} =activityStore;
        
        useEffect(() => {
            if(activityRegistry.size <= 0) loadActivities();
        }, [activityRegistry.size,loadActivities]);

        if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
            <Grid.Column width={'10'}>
                 {/* <ActivityList activities={activities} 
                  SelectActivity={selectActivity} 
                 deleteActivity={deleteActivity}
                 submitting ={submitting}
                 /> */}
                 <ActivityList />
            </Grid.Column> 
            <Grid.Column width={'6'}>
                {/* {
                    selectedActivity && !editMode &&
                    // <ActivityDetails activity={selectedActivity}  
                    <ActivityDetails   
                    // cancelSelectActivity = {cancelSelectActivity}
                    // openForm = {openForm}
                />}


                {editMode && 
                
               <ActivityForm 
            //    closeForm = {closeForm} 
            //    activity={selectedActivity}
                // createOrEdit = {createOrEdit} 
                // submitting ={submitting}
                />
                } */}

                <h2>Activity Filter</h2>
            </Grid.Column>
        </Grid> 
    )
})