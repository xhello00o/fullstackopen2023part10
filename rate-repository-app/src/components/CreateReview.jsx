import { View,Text, StyleSheet,Pressable } from "react-native"
import { FormikTextInput } from "./SignIn"
import { Formik } from "formik";
import * as yup from 'yup'
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { Navigate } from "react-router-native";



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


const CreateReviewForm = ({onSubmit}) => {



    return(
        <View style={styles.form}>
       <FormikTextInput name="repoOwnerName" placeholder="Repository Owner Name" />
      <FormikTextInput name="repoName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100"/>
      <FormikTextInput name="text" placeholder="Review" /> 
        <Pressable onPress={onSubmit} style={styles.submitButton}>
          <Text style={styles.submitText}>Create</Text>
        </Pressable>
      </View>

    )
}

const validationSchema = yup.object().shape({
    repoOwnerName: yup
    .string()
      .required('Username is required'),
      repoName: yup
    .string()
      .required('Password is required'),
      rating:yup
      .number()
      .moreThan(0)
      .lessThan(101)
      .integer()
      .required('Rating is required and from 0 to 100'),
      text:yup
      .string()
  });



const CreateReview = () => {
    const [create,{data,loading,error} ] = useMutation(CREATE_REVIEW,{errorPolicy:"all"})

    console.log("createREview",data,loading,error)
        

    const initialValues = {
        repoOwnerName: '',
        repoName: '',
        rating:'',
        text:''
      };

      const onSubmit = async (values) => {
        console.log("🚀 ~ file: CreateReview.jsx:127 ~ onSubmit ~ values:", values)
        const {repoOwnerName,repoName,rating,text} = values
        
        await create({variables:{
                review: {
                  ownerName: repoOwnerName,
                  repositoryName: repoName,
                  rating: parseFloat(rating),
                  text: text
                }
        }})

      }

      if (data && !loading && !error) {
        return(
            <Navigate to={`/${data.createReview.repositoryId}`}/>
        )
      }



      


    return(
        <View style={styles.container}>
            <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
        </View>
    )
}

export default CreateReview