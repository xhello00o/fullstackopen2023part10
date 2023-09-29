import { View, Text, StyleSheet, Pressable } from "react-native"
import { FormikTextInput } from "./SignIn"
import { Formik } from "formik";
import * as yup from 'yup'
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW, CREATE_USER } from "../graphql/mutations";
import { Navigate } from "react-router-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 20
  },
  form: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  fieldContainer: {
    flexGrow: 0,
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 10,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 3
  },
  errorFieldContainer: {
    flexGrow: 0,
    backgroundColor: 'white',
    borderColor: '#d73a4a',
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 10,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 3
  },
  fieldInput: {
    flexGrow: 1,
    flexDirection: 'column',
    fontSize: 20,

  },
  fieldErrorBox: {
    flexGrow: 0,
    height: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#3B961D',
    borderRadius: 30,
    height: 50,
    flexGrow: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitText: {
    fontSize: 20,
    color: 'white'
  },

  errorText: {
    color: '#d73a4a'
  },
});


const CreateUserForm = ({ onSubmit }) => {



  return (
    <View style={styles.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password"  secureTextEntry/>
      <FormikTextInput name="confirmPassword" placeholder="Password Confirmation" secureTextEntry/>
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Sign Up</Text>
      </Pressable>
    </View>

  )
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5)
    .max(30)
    .required('Username is required'),
  password: yup
  .string()
    .min(5)
    .max(30)
    .required('Password is required'),
  confirmPassword: yup
  .mixed()
    .oneOf([yup.ref('password')], 'Your passwords do not match.')
    .required('PAssword Confirmation is required'),
});



const CreateUser = () => {
  const [create, { data, loading, error }] = useMutation(CREATE_USER, { errorPolicy: "all" })

  console.log("createUser", data, loading, error)


  const initialValues = {
    username: '',
    password: '',
    confirmPassword: ''
  };

  const onSubmit = async (values) => {
    console.log("🚀 ~ file: CreateReview.jsx:127 ~ onSubmit ~ values:", values)
    const {  username , password} = values

    await create({
      variables: {
        user: {
          username: username,
          password: password,
        }
      }
    })

  }

  if (data && !loading && !error) {
    return (
      <Navigate to={`/`} />
    )
  }






  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({ handleSubmit }) => <CreateUserForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  )
}

export default CreateUser