import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Formik } from 'formik';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import { StackParamList } from '../../App';
import { createPlant } from '../db';
import { Colors } from '../ui/Colors';

type AddPlantViewNavigationProp = StackNavigationProp<
  StackParamList,
  'AddPlantView'
>;

type Props = {
  navigation: AddPlantViewNavigationProp;
};

const AddPlantView = ({ navigation }: Props) => {
  const [image, setImage] = useState('');

  return (
    <Formik
      initialValues={{
        created: new Date(),
        lastWatered: new Date(),
        name: '',
        images: [],
      }}
      onSubmit={(values) => {
        const createdPlant = createPlant({ ...values, images: [image] });
        console.log('created new plant: ', createdPlant);
        navigation.navigate('PlantOverview');
      }}>
      {({ handleSubmit, handleBlur, handleChange, values }) => {
        return (
          <>
            <View style={styles.container}>
              <TextInput
                style={{ color: 'black' }}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <Button
                title="Add image"
                onPress={() => {
                  launchImageLibrary(
                    {
                      mediaType: 'photo',
                    },
                    ({ didCancel, uri, fileName, errorCode }) => {
                      if (errorCode) {
                        console.log(
                          'Could not launch image library. Error: ',
                          errorCode,
                        );
                      }
                      if (uri) {
                        setImage(uri);
                      }
                    },
                  );
                }}>
                Add image
              </Button>
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
    display: 'flex',
    padding: '2%',
  },
});

export default AddPlantView;
