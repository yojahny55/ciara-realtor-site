/**
 * Property type definitions for the realtor site
 * Source: architecture.md - Property Interface
 */

export type PropertyType = 'single-family' | 'condo' | 'townhouse' | 'multi-family';

export type PropertySortOrder = 'price-asc' | 'price-desc' | 'newest';

export interface Property {
  id: string;
  mlsId: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: PropertyType;
  listDate: string; // ISO 8601
  updatedAt: string; // ISO 8601
  images: string[];
  description: string;
  features: string[];
  latitude?: number;
  longitude?: number;
}

export interface PropertySearchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  propertyType?: PropertyType;
  sort?: PropertySortOrder;
  page?: number;
}
