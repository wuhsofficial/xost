import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Fetch insight articles from the backend.
 * Returns an array of article objects, or empty array on failure.
 */
export async function getInsights() {
  try {
    const response = await apiClient.get('/insights');
    const data = response.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  } catch (error: any) {
    console.warn('[ApiService] getInsights failed:', error?.message || error);
    return [];
  }
}

/**
 * Fetch career/job listings from the backend.
 * Returns an array of job objects, or empty array on failure.
 */
export async function getCareers() {
  try {
    const response = await apiClient.get('/careers');
    const data = response.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  } catch (error: any) {
    console.warn('[ApiService] getCareers failed:', error?.message || error);
    return [];
  }
}

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Submit a contact form inquiry.
 * Returns true on success, false on failure.
 */
export async function submitContact({ name, email, phone, subject, message }: ContactData) {
  try {
    const response = await apiClient.post('/contact', {
      name,
      email,
      phone,
      subject,
      message,
    });
    return response.status === 200 || response.status === 201;
  } catch (error: any) {
    console.warn('[ApiService] submitContact failed:', error?.message || error);
    return false;
  }
}

export interface ApplicationData {
  fullName: string;
  email: string;
  phone?: string;
  position: string;
  portfolioUrl?: string;
  coverLetter?: string;
}

/**
 * Submit a job application.
 * Returns true on success, false on failure.
 */
export async function submitApplication({
  fullName,
  email,
  phone,
  position,
  portfolioUrl,
  coverLetter,
}: ApplicationData) {
  try {
    const response = await apiClient.post('/applications', {
      fullName,
      email,
      phone,
      position,
      portfolioUrl,
      coverLetter,
    });
    return response.status === 200 || response.status === 201;
  } catch (error: any) {
    console.warn('[ApiService] submitApplication failed:', error?.message || error);
    return false;
  }
}

export default { getInsights, getCareers, submitContact, submitApplication };

