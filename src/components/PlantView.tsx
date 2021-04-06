import React from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Plant } from '../db/schema';
import { formatDate } from '../utils/dates';
import { savePlant } from '../db';

interface Props {
  item: Plant;
}

// const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const createPlantView: (
  onPressItem: (plant: Plant) => void,
) => ({ item }: Props) => JSX.Element = (onPressItem) => ({ item }: Props) => {
  return (
    <Card onPress={() => onPressItem(item)}>
      {/* <Card.Title
        title={item.name}
        // subtitle="Card Subtitle"
        // left={LeftContent}
      /> */}
      <Card.Content>
        <Title>{item.name}</Title>
        <Button
          onPress={() => {
            const { id, name, created, images } = item;
            const plantToSave: Plant = {
              id,
              name,
              created,
              images,
              lastWatered: new Date(),
            };
            savePlant(plantToSave);
          }}>
          Water
        </Button>
        <Paragraph>{`last watered on ${formatDate(
          item.lastWatered,
        )}`}</Paragraph>
      </Card.Content>
      {item.images && item.images.length > 0 && (
        <Card.Cover source={{ uri: item.images[0] }} />
      )}
      {/* <Card.Actions>
        <Button>Ok</Button>
      </Card.Actions> */}
    </Card>
  );
};

export default createPlantView;
