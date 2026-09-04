export interface SampleReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
}

export interface LiveCharger {
  id: string;
  name: string;
  power: string;
  tariff?: string;
  status: 'Available' | 'In Use' | 'Maintenance' | string;
}

export interface PlatformRatings {
  google: {
    rating: number;
    reviewCount: number;
    url?: string;
  };
  apple: {
    rating: number;
    reviewCount: number;
  };
  evstay: {
    rating: number;
    reviewCount: number;
    verifiedBookings?: number;
  };
  plugshare?: {
    score: string | number;
    reviewCount: number;
  };
}

export interface StationPricing {
  tariff: string;
  billingUnit: string;
  note?: string;
}

export interface PropertyDetailData {
  id: string;
  name: string;
  category: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  phone?: string;
  rating: number;
  reviewCount: number;
  evBadgeText: string;
  heroImage: string;
  photos: string[];
  chargingAmenities: {
    chargersCount: string;
    powerOutput: string;
    parkingSpaces: string;
    bayType: string;
  };
  reviewsSummary: {
    overallRating: number;
    reviewCount: number;
    categories: {
      chargingExperience: number;
      staffAssistance: number;
      propertyExperience: number;
    };
    sampleReviews: SampleReview[];
  };
  liveChargers: LiveCharger[];
  keyInfo: {
    parkingSpaces: string;
    chargingLocation: string;
    access: string;
    operatingHours: string;
  };
  operatingHours: string;
  platformRatings?: PlatformRatings;
  pricing?: StationPricing;
  avgStayPrice?: string;
  amenities?: string[];
  uptime?: string;
  avgWaitTime?: string;
}

export interface LeadData {
  id: string;
  stationId: string;
  stationName: string;
  category?: string;
  address?: string;
  phone?: string;
  ipAddress: string;
  userAgent?: string;
  action: string;
  createdAt: string;
}
