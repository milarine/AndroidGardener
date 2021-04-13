import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Plant } from '../db/schema';
import { formatDate } from '../utils/dates';
import WaterPlantDialog from './WaterPlantDialog';

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
        <WaterPlantDialog plant={item} />
        <Paragraph>{`last watered on ${formatDate(
          item.lastWatered,
        )}`}</Paragraph>
      </Card.Content>
      {item.images && item.images.length > 0 && (
        <Card.Cover source={{ uri: item.images[0].uri }} />
      )}
      {/* <Card.Actions>
        <Button>Ok</Button>
      </Card.Actions> */}
    </Card>
  );
};

export default createPlantView;
