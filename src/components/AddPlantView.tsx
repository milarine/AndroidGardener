import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';

import { StackParamList } from './Navigation';
import { createPlant } from '../db';
import { Colors } from '../ui/Colors';
import ImageInput from '../ui/ImageInput';
import ErrorText from '../ui/ErrorText';
import FAB from '../ui/FAB';

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
            <FAB onPress={handleSubmit} icon="check" />
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
