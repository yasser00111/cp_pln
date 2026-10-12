export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface HeroSlider {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  cta_text: string;
  cta_url: string;
  order_priority: number;
  is_active: boolean;
}

export interface OperationalStatistic {
  id: string;
  metric_key: string;
  label: string;
  value: string;
  numeric_value: number;
  unit: string;
  subtext?: string;
}

export interface OperationalMetric {
  id: string;
  period_label: string;
  year: number;
  month: number;
  energy_production_gwh: number;
  availability_factor: number;
  reliability_index: number;
  heat_rate_kcal: number;
}

export interface CompanyProfile {
  id: string;
  key: string;
  title: string;
  content: string;
  image?: string;
}

export interface Management {
  id: string;
  name: string;
  position: string;
  birth_info?: string;
  education?: string[];
  career_journey?: string[];
  bio?: string;
  photo?: string;
  order_priority: number;
}

export interface Facility {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  technical_specs?: Record<string, string>;
  image?: string;
}

export interface SustainabilityProgram {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics?: Record<string, string>;
  image?: string;
}

export interface BiodiversitySpecies {
  id: string;
  name: string;
  latin_name?: string;
  category: string;
  conservation_status: string;
  location?: string;
  description: string;
  image?: string;
}

export interface BiodiversityProgram {
  id: string;
  title: string;
  species_count: number;
  area_monitored_ha: number;
  description: string;
  pdf_report?: string;
  image?: string;
}

export interface CsrProgram {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  impact?: string;
  image?: string;
}

export interface SafetyProgram {
  id: string;
  title: string;
  description: string;
  zero_accident_days: number;
  image?: string;
}

export interface Award {
  id: string;
  title: string;
  category: string;
  year: string;
  issuer: string;
  description?: string;
  image?: string;
  pdf_file?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  category?: Category;
  excerpt: string;
  content: string;
  image?: string;
  is_featured: boolean;
  published_at?: string;
}

export interface Gallery {
  id: string;
  title: string;
  category: string;
  image_url: string;
  caption?: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  duration: string;
  type: string;
}

export interface Document {
  id: string;
  title: string;
  category: string;
  year: string;
  file_path: string;
  file_size: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface PageProps {
  auth: {
    user: User | null;
  };
  flash: {
    success?: string;
    error?: string;
  };
  appName?: string;
  [key: string]: any;
}
