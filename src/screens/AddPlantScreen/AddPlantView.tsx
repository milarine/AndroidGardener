import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import * as yup from 'yup';

import { FloatingActionButton as FAB, TextInput } from 'components/index';
import { ImageDto, createPlant } from 'db/index';
import { StackParamList } from 'navigation/index';

import ImageInput from './ImageInput';

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
          .array(yup.object())
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
                label="Name"
                placeholder="Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <HelperText
                type="error"
                visible={touched.name && errors.name !== undefined}>
                {errors.name}
              </HelperText>
              <ImageInput
                onChange={(images: ImageDto[]) => {
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
    flex: 1,
    padding: 10,
  },
});

export default AddPlantView;
