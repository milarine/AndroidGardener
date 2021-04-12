import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import * as yup from 'yup';

import { StackParamList } from './Navigation';
import { createPlant } from '../db';
import { Colors } from '../ui/Colors';
import ImageInput from '../ui/ImageInput';
import ErrorText from '../ui/ErrorText';

type AddPlantViewNavigationProp = StackNavigationProp<
  StackParamList,
  'AddPlantView'
>;

type Props = {
  navigation: AddPlantViewNavigationProp;
};

const AddPlantView = ({ navigation }: Props) => {
  return (
    <Formik
      initialValues={{
        name: '',
        created: new Date(),
        lastWatered: new Date(),
        images: [],
      }}
      validationSchema={yup.object().shape({
        name: yup.string().required('You have to enter a name.'),
        created: yup.date().default(() => new Date()),
        lastWatered: yup.date().default(() => new Date()),
        images: yup
          .array(yup.string())
          .min(1, 'You have to add at least one image.'),
      })}
      onSubmit={(values) => {
        createPlant(values);
        navigation.navigate('PlantOverview');
      }}>
      {({
        handleSubmit,
        handleBlur,
        handleChange,
        setFieldTouched,
        errors,
        touched,
        setFieldValue,
        values,
      }) => {
        return (
          <>
            <View style={styles.container}>
              <TextInput
                style={{ backgroundColor: Colors.white }}
                label="Name"
                placeholder="Name"
                placeholderTextColor={Colors.black}
                mode="outlined"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {touched.name && errors.name && <ErrorText msg={errors.name} />}
              <ImageInput
                onChange={(images: string[]) => {
                  setFieldValue('images', images);
                  setFieldTouched('images');
                }}
                errors={touched.images && errors.images}
                images={values.images}
              />
            </View>
            <ActionButton
              buttonColor={Colors.highlight}
              onPress={handleSubmit}
              renderIcon={() => <Icon size={18} name="check" />}
            />
          </>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '2%',
    flex: 1,
  },
});

export default AddPlantView;
