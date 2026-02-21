import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import { Card, Title, Paragraph, Button, Chip, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { useLocation } from '../context/LocationContext';
import { theme, styles } from '../styles/theme';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { location, getCurrentLocation, permissionGranted, requestLocationPermission } = useLocation();
  const [featuredTemples, setFeaturedTemples] = useState([]);
  const [nearbyTemples, setNearbyTemples] = useState([]);
  const [recentTemples, setRecentTemples] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        loadFeaturedTemples(),
        loadNearbyTemples(),
        loadRecentTemples(),
      ]);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadFeaturedTemples = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/temples?featured=true&limit=5');
      const data = await response.json();
      if (data.success) {
        setFeaturedTemples(data.data.temples);
      }
    } catch (error) {
      console.error('Error loading featured temples:', error);
    }
  };

  const loadNearbyTemples = async () => {
    try {
      if (!location && permissionGranted) {
        await getCurrentLocation();
      }
      
      if (location) {
        const response = await fetch(
          `http://localhost:3000/api/v1/temples/nearby?lat=${location.latitude}&lng=${location.longitude}&limit=5`
        );
        const data = await response.json();
        if (data.success) {
          setNearbyTemples(data.data.temples);
        }
      }
    } catch (error) {
      console.error('Error loading nearby temples:', error);
    }
  };

  const loadRecentTemples = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/temples?limit=5&sortBy=createdAt&sortOrder=DESC');
      const data = await response.json();
      if (data.success) {
        setRecentTemples(data.data.temples);
      }
    } catch (error) {
      console.error('Error loading recent temples:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHomeData();
    setRefreshing(false);
  };

  const handleLocationPermission = async () => {
    const granted = await requestLocationPermission();
    if (granted) {
      await loadNearbyTemples();
    }
  };

  const renderTempleCard = ({ item }) => (
    <TouchableOpacity
      style={homeStyles.templeCard}
      onPress={() => navigation.navigate('TempleDetails', { temple: item })}
    >
      <Card style={homeStyles.card}>
        <View style={homeStyles.cardContent}>
          <Avatar.Text
            size={50}
            label={item.deity.charAt(0)}
            style={homeStyles.avatar}
          />
          <View style={homeStyles.cardText}>
            <Title style={homeStyles.cardTitle} numberOfLines={1}>
              {item.name}
            </Title>
            <Paragraph style={homeStyles.cardSubtitle} numberOfLines={1}>
              {item.deity}
            </Paragraph>
            <View style={homeStyles.cardFooter}>
              <Chip
                icon="map-marker"
                mode="outlined"
                compact
                style={homeStyles.locationChip}
              >
                {item.city}
              </Chip>
              <View style={homeStyles.ratingContainer}>
                <Ionicons name="star" size={14} color={theme.colors.templeGold} />
                <Text style={homeStyles.rating}>{item.rating}</Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderSection = (title, data, onPress, emptyMessage) => (
    <View style={homeStyles.section}>
      <View style={homeStyles.sectionHeader}>
        <Text style={homeStyles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={homeStyles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderTempleCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={homeStyles.horizontalList}
        />
      ) : (
        <View style={homeStyles.emptyContainer}>
          <Text style={homeStyles.emptyText}>{emptyMessage}</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={homeStyles.header}
      >
        <View style={homeStyles.headerContent}>
          <View>
            <Text style={homeStyles.headerTitle}>Welcome to</Text>
            <Text style={homeStyles.headerSubtitle}>Temple Finder</Text>
          </View>
          <TouchableOpacity
            style={homeStyles.locationButton}
            onPress={handleLocationPermission}
          >
            <Ionicons name="location" size={20} color="white" />
            <Text style={homeStyles.locationText}>
              {location ? 'Location On' : 'Enable Location'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={homeStyles.quickActions}>
        <TouchableOpacity
          style={homeStyles.quickAction}
          onPress={() => navigation.navigate('Nearby')}
        >
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.secondary]}
            style={homeStyles.quickActionGradient}
          >
            <Ionicons name="location" size={24} color="white" />
            <Text style={homeStyles.quickActionText}>Nearby</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={homeStyles.quickAction}
          onPress={() => navigation.navigate('Search')}
        >
          <LinearGradient
            colors={[theme.colors.accent, theme.colors.success]}
            style={homeStyles.quickActionGradient}
          >
            <Ionicons name="search" size={24} color="white" />
            <Text style={homeStyles.quickActionText}>Search</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={homeStyles.quickAction}
          onPress={() => navigation.navigate('Favorites')}
        >
          <LinearGradient
            colors={[theme.colors.templeRed, theme.colors.templePurple]}
            style={homeStyles.quickActionGradient}
          >
            <Ionicons name="heart" size={24} color="white" />
            <Text style={homeStyles.quickActionText}>Favorites</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Featured Temples */}
      {renderSection(
        'Featured Temples',
        featuredTemples,
        () => navigation.navigate('Search', { featured: true }),
        'No featured temples available'
      )}

      {/* Nearby Temples */}
      {permissionGranted && renderSection(
        'Nearby Temples',
        nearbyTemples,
        () => navigation.navigate('Nearby'),
        'No nearby temples found'
      )}

      {/* Recent Temples */}
      {renderSection(
        'Recently Added',
        recentTemples,
        () => navigation.navigate('Search', { recent: true }),
        'No recent temples available'
      )}

      {/* Stats */}
      <View style={homeStyles.statsContainer}>
        <Card style={homeStyles.statsCard}>
          <Card.Content>
            <View style={homeStyles.statsRow}>
              <View style={homeStyles.statItem}>
                <Text style={homeStyles.statNumber}>1000+</Text>
                <Text style={homeStyles.statLabel}>Temples</Text>
              </View>
              <View style={homeStyles.statItem}>
                <Text style={homeStyles.statNumber}>50+</Text>
                <Text style={homeStyles.statLabel}>Cities</Text>
              </View>
              <View style={homeStyles.statItem}>
                <Text style={homeStyles.statNumber}>10000+</Text>
                <Text style={homeStyles.statLabel}>Users</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const homeStyles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: '300',
  },
  headerSubtitle: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  locationText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  quickAction: {
    flex: 1,
    marginHorizontal: 5,
  },
  quickActionGradient: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  section: {
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  templeCard: {
    width: width * 0.7,
    marginRight: 15,
  },
  card: {
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  cardText: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  cardSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  locationChip: {
    height: 25,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 2,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  statsCard: {
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 5,
  },
});

export default HomeScreen;




