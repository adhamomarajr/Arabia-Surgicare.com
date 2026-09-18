export type Language = 'ar' | 'en';

export interface LocalizedString {
  ar: string;
  en: string;
}

export interface LocalizedStringArray {
  ar: string[];
  en: string[];
}

export interface DoctorCvDocument {
  title: LocalizedString;
  degrees: LocalizedStringArray;
  positions: LocalizedStringArray;
  fullBiography: LocalizedString;
  areasOfInterest: LocalizedStringArray;
  memberships: LocalizedStringArray;
}

export interface Doctor {
  id: string;
  specialtyId: string;
  name: LocalizedString;
  title: LocalizedString;
  image?: string;
  experienceYears?: number;
  available: boolean;
  whatsapp?: string;
  timing: LocalizedString;
  education: LocalizedString;
  bio: LocalizedString;
  achievements: LocalizedStringArray;
  specializations?: LocalizedStringArray;
  cvDocument?: DoctorCvDocument;
}

export interface Specialty {
  id: string;
  icon: string;
  name: LocalizedString;
  description: LocalizedString;
}

export interface Department {
  id: string;
  specialtyId: string;
  title: LocalizedString;
  desc: LocalizedString;
  icon: string;
  features: LocalizedStringArray;
}
