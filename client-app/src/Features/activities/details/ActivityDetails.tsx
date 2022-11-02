import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import {  Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/Layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailInfo from './ActivityDeatilInfo';
import ActivityDetailChat from './ActivityDetailChat';
import ActivityDetailedSideBar from './ActivityDetailedSideBar';
import ActivityDetailHeader from './ActivityDetailHeader';


export default observer(function ActivityDetails(){
  const {activityStore} = useStore();
  const {selectedActivity : activity,loadActivity,loadingInitial} = activityStore;

  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if (id) loadActivity(id);
}, [id, loadActivity]);

  if (loadingInitial || !activity) return <LoadingComponent />;
  
    return(
        <Grid>
            <Grid.Column width={10}>
              <ActivityDetailHeader activity={activity} />
              <ActivityDetailInfo activity={activity} />
              <ActivityDetailChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSideBar />
            </Grid.Column>
        </Grid>
    )
})