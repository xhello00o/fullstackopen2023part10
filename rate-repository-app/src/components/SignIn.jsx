import { Text, TextInput, View, Pressable } from "react-native";
import { StyleSheet } from 'react-native';
import { Formik, useField } from 'formik';
import * as yup from 'yup'


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"flex-start",
        alignItems:"stretch",
        padding:20
    },
    form:{
        flexDirection:'column',
        flexGrow:1,  
    },
    fieldContainer:{
        flexGrow:0,
        backgroundColor:'white',
        borderColor:'blue',
        borderWidth:1,
        height:50,
        paddingHorizontal:10,
        flexDirection:"column",
        justifyContent:"center",
        borderRadius:3
    },
    errorFieldContainer:{
        flexGrow:0,
        backgroundColor:'white',
        borderColor:'#d73a4a',
        borderWidth:1,
        height:50,
        paddingHorizontal:10,
        flexDirection:"column",
        justifyContent:"center",
        borderRadius:3
    },
    fieldInput:{
        flexGrow:1,
        flexDirection:'column',
        fontSize:20,
        
    },
    fieldErrorBox:{
        flexGrow:0,
        height: 25,
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
    },
    submitButton:{
        backgroundColor:'#3B961D',
        borderRadius:30,
        height:50,
        flexGrow:0,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    submitText:{
        fontSize:20,
        color:'white'
    },

  errorText: {
    color:'#d73a4a'
  },
});



const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;



  console.log(meta.touched,"touching")
  console.log(meta.error,"metaError")
  console.log(showError,"errorsss")


  return (
    <View>
    <View style={ showError?styles.errorFieldContainer : styles.fieldContainer}>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onFocus={()=>helpers.setTouched(true)}
        onBlur={() => helpers.setTouched(false)}
        value={field.value}
        error={showError}
        style={styles.fieldInput}
        {...props}
      />
    </View>
    <View style={styles.fieldErrorBox} >
        {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
    </View>
  );
};

const BodyMassIndexForm = ({ onSubmit }) => {
    return (
      <View style={styles.form}>
       <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry  />
        <Pressable onPress={onSubmit} style={styles.submitButton}>
          <Text style={styles.submitText}>Sign in</Text>
        </Pressable>
      </View>
    );
  };

  
  const validationSchema = yup.object().shape({
    username: yup
    .string()
      .required('Username is required'),
    password: yup
    .string()
      .required('Password is required'),
  });
 

const SignIn = () => {

    const initialValues = {
        username: '',
        password: '',
      };

      const onSubmit = values => {
    
          console.log(values);
        
      };
  return (
    <View style={styles.container}> 
        <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
      {({ handleSubmit }) => <BodyMassIndexForm onSubmit={handleSubmit} />}
    </Formik>
    
    
        
    </View>
    
  
  )
};


export default SignIn;