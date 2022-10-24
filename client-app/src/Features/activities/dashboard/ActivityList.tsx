import { observer } from 'mobx-react-lite';
import  { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


// interface Props{
//     activities : Activity[];
//      SelectActivity : (id:String) => void;
//     deleteActivity : (id:string) => void;
//     submitting : boolean;
// }

// export default function  ActivityList({activities,SelectActivity,deleteActivity,submitting} : Props){
export default observer(function  ActivityList(){
    const {activityStore} = useStore();
    const {deleteActivity, activitiesByDate,loading} = activityStore;

    const [target,setTarget] =useState('');

    function handleActivityDelete(e : SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

  
    return ( 
            <Segment>
                <Item.Group divided>
                            {activitiesByDate.map(activity =>(
                                <Item key={activity.id}>
                                        <Item.Content>
                                            <Item.Header as='a'>{activity.title}</Item.Header>
                                            <Item.Meta>{activity.date}</Item.Meta>
                                            <Item.Description>
                                                <div>{activity.description}</div>
                                                <div>{activity.city},{activity.venue}</div>
                                                </Item.Description>
                                        <Item.Extra>
                                            <Button 
                                            name={activity.id}
                                            onClick={() => activityStore.selectActivity(activity.id)} 
                                            floated='right' 
                                            content='View' 
                                            color='blue'/>
                                            <Button loading={loading && target === activity.id} 
                                                onClick={(e) => handleActivityDelete(e,activity.id)} 
                                                floated='right' 
                                                content='delete' 
                                                color='red'/>
                                            <Label basic content={activity.category} />
                                        </Item.Extra>
                                        </Item.Content>
                                </Item>
                            ))}
                </Item.Group>
            </Segment>
       )
})