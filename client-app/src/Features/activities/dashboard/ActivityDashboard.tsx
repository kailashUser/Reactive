
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/Models/Activtiy';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props{
    activities : Activity[];
    selectedActivity : Activity | undefined;
    selectActivity : (id:String) => void;
    cancelSelectActivity : () => void;
    editMode : boolean;
    openForm : (id: string) => void;
    closeForm : () => void;
    createOrEdit : (activity : Activity) => void;
    deleteActivity : (id:string) => void;
    submitting : boolean;
}


export default function ActivityDashboard({activities,selectActivity,
    selectedActivity,cancelSelectActivity,editMode,closeForm,openForm,
    createOrEdit,deleteActivity,submitting}: Props){
    return (
        <Grid>
            <Grid.Column width={'10'}>
                 <ActivityList activities={activities} 
                 SelectActivity={selectActivity} 
                 deleteActivity={deleteActivity}
                 submitting ={submitting}
                 />
            </Grid.Column> 
            <Grid.Column width={'6'}>
                {
                    selectedActivity && !editMode &&
                    <ActivityDetails activity={selectedActivity}  
                    cancelSelectActivity = {cancelSelectActivity}
                    openForm = {openForm}
                />}
                {editMode && 
                
               <ActivityForm closeForm = {closeForm} activity={selectedActivity}
                createOrEdit = {createOrEdit} 
                submitting ={submitting}
                />
                }
            </Grid.Column>
        </Grid> 
    )
}