import axios from "axios";
import { AppButton } from 'components/AppButton';
import { AppText } from 'components/AppText';
import { ThemeContext } from "context/ThemeContext";
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator, View
} from 'react-native';
import { Input } from 'react-native-elements';
import { Snackbar } from 'react-native-paper';
import * as Yup from "yup";

type Question = {
    "id": number,
    "answer": string
    "question": string
    "value": number,
    "airdate": string
    "created_at": string
    "updated_at":string
    "category_id": number,
    "game_id": null,
    "invalid_count": null,
    "category": {
      "id": number,
      "title": string
      "created_at": string
      "updated_at": string
      "clues_count": number
    }
  }
  export const specialCharacterValidator = (val = '') => {
    if (val) {
        //FIXME: change to ASCII Range
        if (!/^[|@₹#$%^&+*!=() ?0-9]*$/.test(val)) {
            return true;
        } else return false;
    } else return true;
  };
  
  const AnswerValidation = Yup.object().shape({
    answer: Yup.string().required("Please enter your answer").min(3, "Answer should be atleast 3 letters")
    .test(
      'special character test',
      'This field cannot contain only special characters or numbers',
      specialCharacterValidator,
  )
  })
  export const Home = () => {
    const {theme} = useContext(ThemeContext);
    const [loading, setLoading] = useState(true);
    const [ques, setQues] = useState<Question | null>()
    const [btnLoading,setBtnLoading] = useState(false)
    const [visible, setVisible] = React.useState(false);
    const [answerResp,setResp] = useState<{resp:string,type:"success"|"error"}>({resp:"",type:"success"})
    const onToggleSnackBar = (state:boolean) => setVisible(state);
  
    const onDismissSnackBar = () => {
      setBtnLoading(false)
      setVisible(false);
      form.resetForm();
      fetchQuestion()
    }
  
    useEffect(() => {
      fetchQuestion()
    },[])
    const fetchQuestion = () => {
      setLoading(true)
      axios.get("https://jservice.io/api/random")
        .then(res => {
          setQues(res.data[0])
          setLoading(false)
        })
        .catch(error => {
        console.log("error",error)
      })
    }
    const form = useFormik({
      initialValues: { answer: "" },
      onSubmit: values => checkAnswer(values.answer),
      validationSchema:AnswerValidation
    })
    const checkAnswer = (answer: string) => {
      setBtnLoading(true)
      if (answer.toLowerCase() === ques?.answer.toLowerCase()) {
        onToggleSnackBar(true)
        setResp({resp:"Correct answer!",type:"success"})
      } else {
        onToggleSnackBar(true)
        setResp({resp:"Incorrect answer!",type:"error"})
      }
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
        }}>
        {loading ? (
          <View style={{flex:1,justifyContent:"center"}}>
            <ActivityIndicator color={theme.blue} />
            <AppText type={['center','bold']}>Fetching next question</AppText>
            </View>
        ) : (
            <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 30 }}>
              <AppText type={['center','bold']}>Question: {ques?.question} ?</AppText>
              <Input
                onChangeText={form.handleChange("answer")}
                errorMessage={form.errors.answer}
                errorStyle={{color:"red",fontSize:12}}
                value={form.values.answer}
                inputStyle={{ paddingHorizontal: 10, }}
                inputContainerStyle={{ borderWidth: 0.8, borderRadius: 10 }}
                containerStyle={{marginTop:10,paddingHorizontal:0}}
                placeholder="Enter your answer" />
              <AppButton loading={btnLoading} onPress={form.handleSubmit} title="Submit" />
          </View>
        )}
        <Snackbar
          visible={visible}
          children={<AppText type={['white']}> {answerResp.resp}</AppText>}
          duration={1500}
          style={{backgroundColor:answerResp.type==="success" ? "green":"red",}}
          onDismiss={onDismissSnackBar} />
      </View>
    );
  };
  