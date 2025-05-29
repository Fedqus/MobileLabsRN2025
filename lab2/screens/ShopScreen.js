import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

import FeaturedGameBanner from '../components/FeaturedGameBanner';
import GameItem from '../components/GameItem';

const allGamesData = [
  {
    id: '1',
    title: 'S.T.A.L.K.E.R. 2: Серце Чорнобиля',
    platforms: 'Windows, Xbox Series X/S',
    imageUri: 'https://upload.wikimedia.org/wikipedia/uk/e/ec/S.T.A.L.K.E.R._2_Heart_of_Chornobyl.jpg',
    originalPrice: 59,
    discountedPrice: 29,
    discountPercentage: -51,
  },
  {
    id: '2',
    title: 'DOOM: The Dark Ages',
    platforms: 'Windows, PS5, Xbox Series X/S',
    imageUri: 'https://image.api.playstation.com/vulcan/ap/rnd/202501/1405/272a1d71888f2dbe175ecb436967c71e7e670e21fe783396.jpg',
    originalPrice: 20,
  },
  {
    id: '3',
    title: 'Dead Island 2',
    platforms: 'Windows, PS4, PS5, Xbox One, Xbox Series X/S',
    imageUri: 'https://upload.wikimedia.org/wikipedia/ru/f/f1/Dead_Island_2_logo.jpeg',
    originalPrice: 29,
  }
];

const filters = ['Всі', 'Нові', 'Популярні', 'Знижки'];

const ShopScreen = () => {
  const { colors } = useTheme();

  const [activeFilter, setActiveFilter] = useState('Всі');
  const [displayedGames, setDisplayedGames] = useState(allGamesData);

  useEffect(() => {
    if (activeFilter === 'Всі') {
      setDisplayedGames(allGamesData);
    } else if (activeFilter === 'Знижки') {
      setDisplayedGames(allGamesData.filter(game => game.discountedPrice));
    } else {
      setDisplayedGames(allGamesData);
    }
  }, [activeFilter]);


  const renderGameItem = ({ item }) => <GameItem game={item} />;

  const ListHeader = () => (
    <>
      <FeaturedGameBanner game={allGamesData[0]} />
      <View style={styles.filterContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              { backgroundColor: activeFilter === filter ? colors.primary : colors.card,
                borderColor: activeFilter === filter ? colors.primary : colors.border,
              }
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[
              styles.filterButtonText,
              { color: activeFilter === filter ? (colors.card === '#FFFFFF' ? '#FFFFFF' : colors.text) : colors.secondaryText }
            ]}>
              {filter} 
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      data={displayedGames}
      renderItem={renderGameItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={ListHeader}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ShopScreen;