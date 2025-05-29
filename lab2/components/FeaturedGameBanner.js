import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const FeaturedGameBanner = ({ game }) => {
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
    <View style={[styles.container, { shadowColor: colors.text }]}>
      <ImageBackground
        source={{ uri: imageUri }}
        style={styles.backgroundImage}
        imageStyle={{ borderRadius: 15 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.platformsText}>{platforms}</Text>
          <View style={styles.priceInfoContainer}>
            {discountPercentage && (
              <View style={[styles.discountBadge, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.discountPercentageText}>{discountPercentage}%</Text>
              </View>
            )}
            {originalPrice && discountedPrice && (
              <Text style={styles.originalPriceText}>
                {currency}{originalPrice}
              </Text>
            )}
            <Text style={styles.discountedPriceText}>
              {currency}{discountedPrice || originalPrice}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 15,
    elevation: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  platformsText: {
    fontSize: 13,
    color: '#E0E0E0',
    marginBottom: 8,
  },
  priceInfoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  discountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginRight: 8,
  },
  discountPercentageText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  originalPriceText: {
    color: '#B0B0B0',
    textDecorationLine: 'line-through',
    fontSize: 16,
    marginRight: 8,
  },
  discountedPriceText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default FeaturedGameBanner;