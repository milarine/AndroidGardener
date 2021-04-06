import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import { StackParamList } from './Navigation';
import { createPlant } from '../db';
import { Colors } from '../ui/Colors';
import ImageInput from '../ui/ImageInput';

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
        created: new Date(),
        lastWatered: new Date(),
        name: '',
        images: [],
      }}
      onSubmit={(values) => {
        const createdPlant = createPlant(values);
        console.log('created new plant: ', createdPlant);
        navigation.navigate('PlantOverview');
      }}>
      {({ handleSubmit, handleBlur, handleChange, setFieldValue, values }) => {
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
              <ImageInput
                onChange={(images: string[]) => {
                  setFieldValue('images', images);
                }}
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
  },
});

export default AddPlantView;
