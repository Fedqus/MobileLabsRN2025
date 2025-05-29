import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const GameItem = ({ game }) => {
  const { colors } = useTheme();

  const {
    title,
    platforms,
    imageUri,
    originalPrice,
    discountedPrice,
    discountPercentage,
    currency = '$',
  } = game;

  return (
    <View style={[styles.container, { backgroundColor: colors.card, shadowColor: colors.text }]}>
      <Image source={{ uri: imageUri }} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <Text style={[styles.titleText, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.platformsText, { color: colors.secondaryText }]}>{platforms}</Text>
      </View>
      <View style={styles.priceContainer}>
        {discountedPrice && originalPrice && (
          <Text style={[styles.originalPriceText, { color: colors.secondaryText }]}>
            {currency}{originalPrice}
          </Text>
        )}
        <Text style={[styles.priceText, { color: colors.text }]}>
          {currency}{discountedPrice || originalPrice}
        </Text>
        {discountPercentage && (
          <View style={[styles.discountBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.discountPercentageText}>{discountPercentage}%</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  thumbnail: {
    width: 70,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  platformsText: {
    fontSize: 12,
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    minWidth: 60,
  },
  originalPriceText: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  discountBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  discountPercentageText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default GameItem;