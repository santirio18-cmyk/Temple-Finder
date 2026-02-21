import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Card, Title, Paragraph, Button, Chip, Avatar, Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useLocation } from '../context/LocationContext';
import { theme, styles } from '../styles/theme';

const { width } = Dimensions.get('window');

const NearbyScreen = ({ navigation }) => {
  const {
    location,
    isLoading: locationLoading,
    permissionGranted,
    requestLocationPermission,
    getCurrentLocation,
    calculateDistance,
  } = useLocation();

  const [nearbyTemples, setNearbyTemples] = useState([]);
  const [filteredTemples, setFilteredTemples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [radius, setRadius] = useState(15);
  const [sortBy, setSortBy] = useState('distance'); // distance, rating, name

  useEffect(() => {
    if (permissionGranted) {
      loadNearbyTemples();
    }
  }, [permissionGranted, radius]);

  useEffect(() => {
    filterTemples();
  }, [nearbyTemples, searchQuery, sortBy]);

  const loadNearbyTemples = async () => {
    try {
      setIsLoading(true);
      
      if (!location) {
        const currentLocation = await getCurrentLocation();
        if (!currentLocation) {
          throw new Error('Unable to get current location');
        }
      }

      const response = await fetch(
        `http://localhost:3000/api/v1/temples/nearby?lat=${location.latitude}&lng=${location.longitude}&radius=${radius}&limit=50`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch nearby temples');
      }

      const data = await response.json();
      
      if (data.success) {
        setNearbyTemples(data.data.temples);
      } else {
        throw new Error(data.error || 'Failed to fetch nearby temples');
      }
    } catch (error) {
      console.error('Error loading nearby temples:', error);
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTemples = () => {
    let filtered = [...nearbyTemples];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(temple =>
        temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        temple.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        temple.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort temples
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredTemples(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNearbyTemples();
    setRefreshing(false);
  };

  const handleLocationPermission = async () => {
    const granted = await requestLocationPermission();
    if (granted) {
      await loadNearbyTemples();
    }
  };

  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const renderTempleCard = ({ item }) => (
    <TouchableOpacity
      style={nearbyStyles.templeCard}
      onPress={() => navigation.navigate('TempleDetails', { temple: item })}
    >
      <Card style={nearbyStyles.card}>
        <Card.Content style={nearbyStyles.cardContent}>
          <View style={nearbyStyles.cardHeader}>
            <Avatar.Text
              size={60}
              label={item.deity.charAt(0)}
              style={nearbyStyles.avatar}
            />
            <View style={nearbyStyles.cardInfo}>
              <Title style={nearbyStyles.templeName} numberOfLines={2}>
                {item.name}
              </Title>
              <Paragraph style={nearbyStyles.deity} numberOfLines={1}>
                {item.deity}
              </Paragraph>
              <View style={nearbyStyles.locationContainer}>
                <Ionicons name="location" size={14} color={theme.colors.textSecondary} />
                <Text style={nearbyStyles.location}>{item.location}</Text>
              </View>
            </View>
            <View style={nearbyStyles.distanceContainer}>
              <Text style={nearbyStyles.distance}>
                {item.distance ? `${item.distance.toFixed(1)} km` : 'N/A'}
              </Text>
            </View>
          </View>

          <View style={nearbyStyles.cardFooter}>
            <View style={nearbyStyles.ratingContainer}>
              <Ionicons name="star" size={16} color={theme.colors.templeGold} />
              <Text style={nearbyStyles.rating}>{item.rating}</Text>
              <Text style={nearbyStyles.reviewCount}>({item.reviewCount})</Text>
            </View>
            
            <View style={nearbyStyles.tagsContainer}>
              {item.category && (
                <Chip
                  mode="outlined"
                  compact
                  style={nearbyStyles.categoryChip}
                >
                  {item.category}
                </Chip>
              )}
              {item.featured && (
                <Chip
                  mode="flat"
                  compact
                  style={nearbyStyles.featuredChip}
                >
                  Featured
                </Chip>
              )}
            </View>
          </View>

          {item.facilities && (
            <View style={nearbyStyles.facilitiesContainer}>
              {item.facilities.parking && (
                <View style={nearbyStyles.facilityItem}>
                  <Ionicons name="car" size={14} color={theme.colors.textSecondary} />
                  <Text style={nearbyStyles.facilityText}>Parking</Text>
                </View>
              )}
              {item.facilities.restrooms && (
                <View style={nearbyStyles.facilityItem}>
                  <Ionicons name="restroom" size={14} color={theme.colors.textSecondary} />
                  <Text style={nearbyStyles.facilityText}>Restrooms</Text>
                </View>
              )}
              {item.facilities.foodCourt && (
                <View style={nearbyStyles.facilityItem}>
                  <Ionicons name="restaurant" size={14} color={theme.colors.textSecondary} />
                  <Text style={nearbyStyles.facilityText}>Food Court</Text>
                </View>
              )}
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={nearbyStyles.emptyContainer}>
      <Ionicons name="location-outline" size={80} color={theme.colors.textLight} />
      <Text style={nearbyStyles.emptyTitle}>No Location Access</Text>
      <Text style={nearbyStyles.emptyMessage}>
        Enable location access to find temples near you
      </Text>
      <Button
        mode="contained"
        onPress={handleLocationPermission}
        style={nearbyStyles.permissionButton}
      >
        Enable Location
      </Button>
    </View>
  );

  const renderLoadingState = () => (
    <View style={nearbyStyles.loadingContainer}>
      <Text style={nearbyStyles.loadingText}>Finding nearby temples...</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={nearbyStyles.header}>
      <Searchbar
        placeholder="Search nearby temples..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={nearbyStyles.searchBar}
      />
      
      <View style={nearbyStyles.filtersContainer}>
        <View style={nearbyStyles.radiusContainer}>
          <Text style={nearbyStyles.filterLabel}>Radius:</Text>
          {[5, 10, 15, 25, 50].map((r) => (
            <TouchableOpacity
              key={r}
              style={[
                nearbyStyles.radiusButton,
                radius === r && nearbyStyles.radiusButtonActive
              ]}
              onPress={() => handleRadiusChange(r)}
            >
              <Text style={[
                nearbyStyles.radiusButtonText,
                radius === r && nearbyStyles.radiusButtonTextActive
              ]}>
                {r}km
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={nearbyStyles.sortContainer}>
          <Text style={nearbyStyles.filterLabel}>Sort by:</Text>
          {[
            { key: 'distance', label: 'Distance' },
            { key: 'rating', label: 'Rating' },
            { key: 'name', label: 'Name' }
          ].map((sort) => (
            <TouchableOpacity
              key={sort.key}
              style={[
                nearbyStyles.sortButton,
                sortBy === sort.key && nearbyStyles.sortButtonActive
              ]}
              onPress={() => handleSortChange(sort.key)}
            >
              <Text style={[
                nearbyStyles.sortButtonText,
                sortBy === sort.key && nearbyStyles.sortButtonTextActive
              ]}>
                {sort.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={nearbyStyles.resultsInfo}>
        <Text style={nearbyStyles.resultsCount}>
          {filteredTemples.length} temples found within {radius}km
        </Text>
        {location && (
          <Text style={nearbyStyles.locationInfo}>
            📍 Your location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </Text>
        )}
      </View>
    </View>
  );

  if (!permissionGranted) {
    return renderEmptyState();
  }

  if (isLoading && nearbyTemples.length === 0) {
    return renderLoadingState();
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTemples}
        renderItem={renderTempleCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={nearbyStyles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const nearbyStyles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  searchBar: {
    marginBottom: 15,
    elevation: 2,
  },
  filtersContainer: {
    marginBottom: 15,
  },
  radiusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginRight: 10,
    minWidth: 60,
  },
  radiusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: 'white',
  },
  radiusButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  radiusButtonText: {
    fontSize: 12,
    color: theme.colors.text,
  },
  radiusButtonTextActive: {
    color: 'white',
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: 'white',
  },
  sortButtonActive: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  sortButtonText: {
    fontSize: 12,
    color: theme.colors.text,
  },
  sortButtonTextActive: {
    color: 'white',
  },
  resultsInfo: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  resultsCount: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 5,
  },
  locationInfo: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  templeCard: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  card: {
    elevation: 3,
    borderRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 15,
  },
  templeName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  deity: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  distanceContainer: {
    alignItems: 'center',
  },
  distance: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  categoryChip: {
    height: 25,
    marginRight: 8,
  },
  featuredChip: {
    height: 25,
    backgroundColor: theme.colors.templeGold,
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  facilityText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  permissionButton: {
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});

export default NearbyScreen;




