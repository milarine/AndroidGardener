import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { Headline, IconButton } from 'react-native-paper';

import { TextInput } from 'components/index';

interface Props {
  textColor?: string;
  iconColorEdit?: string;
  iconColorSave?: string;
  initialValue: string;
  label: string;
  onSave: (value: string) => void;
}

const EditableHeadline: React.FC<Props> = ({
  textColor,
  iconColorEdit,
  iconColorSave,
  initialValue,
  label,
  onSave,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [value, setValue] = useState(initialValue);

  const icon = isEditingTitle ? 'check' : 'pencil';

  return (
    <View style={styles.container}>
      {isEditingTitle ? (
        <TextInput
          style={[styles.input]}
          label={label}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
      ) : (
        <Headline style={{ color: textColor }}>{value}</Headline>
      )}
      <IconButton
        icon={icon}
        color={isEditingTitle ? iconColorSave : iconColorEdit}
        onPress={() => {
          if (isEditingTitle) {
            onSave(value);
          }
          setIsEditingTitle(!isEditingTitle);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 70,
  },
  input: {
    width: '80%',
  },
});

export default EditableHeadline;
