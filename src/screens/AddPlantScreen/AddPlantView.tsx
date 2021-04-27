import React from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import * as yup from 'yup';

import { FloatingActionButton as FAB, TextInput } from 'components';
import { ImageDto, createPlant } from 'db';
import { StackParamList } from 'navigation';

import ImageInput from './ImageInput';

type Props = StackScreenProps<StackParamList, 'AddPlantView'>;

const AddPlantView: React.FC<Props> = ({
  navigation,
  route: {
    params: { gardenId },
  },
}) => {
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
        createPlant({ ...values, gardenId });
        navigation.navigate('GardenView', { gardenId });
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
