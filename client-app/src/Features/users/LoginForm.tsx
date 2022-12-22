
import { ErrorMessage, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Form, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/api/common/form/MyTextInput';
import { useStore } from "../../app/stores/store";



export default observer(function LoginForm(){
    const { userStore } = useStore();
    return(
        <Formik 
            initialValues={{email:'',password:'',error :''}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
                setErrors({error : 'Invalid Email or Password'}))}
        >
            {({handleSubmit,isSubmitting,errors}) => (
               <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center'  />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage 
                        name='error' render={() =>
                            <Label style={{marginBottom :10}} basis color='red' content={errors.error}/>
                        }
                    />
                    <Button loading={isSubmitting} postive content='Login' type ='submit' fluid  />

               </Form> 
            )}
        </Formik>
    )   
})