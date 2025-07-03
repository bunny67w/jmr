import axios from 'axios';
import { DownloadResult, MediaType, InstagramPost } from '../types/instagram';

// Note: This is a simplified implementation for demonstration
// In a real-world scenario, you would need a backend service to handle Instagram API calls
// due to CORS restrictions and Instagram's anti-scraping measures

export const downloadInstagramMedia = async (url: string): Promise<DownloadResult> => {
  try {
    // Extract the media ID from the URL
    const mediaId = extractMediaId(url);
    if (!mediaId) {
      throw new Error('Invalid Instagram URL format');
    }

    // Determine media type from URL
    const mediaType = getMediaTypeFromUrl(url);
    
    // For demonstration purposes, we'll simulate the download process
    // In a real implementation, you would:
    // 1. Send the URL to your backend service
    // 2. Backend would use Instagram's API or web scraping (following their terms)
    // 3. Return the media URLs and metadata

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock successful response
    const mockResult: DownloadResult = {
      success: true,
      media: [
        {
          type: mediaType,
          downloadUrl: generateMockDownloadUrl(mediaType),
          filename: `instagram_${mediaId}.${mediaType === 'image' ? 'jpg' : 'mp4'}`,
          quality: mediaType === 'image' ? '1080x1080' : '1080p',
          size: mediaType === 'image' ? '2.3 MB' : '15.7 MB'
        }
      ],
      metadata: {
        username: 'example_user',
        caption: 'Sample Instagram post caption...',
        timestamp: new Date().toISOString()
      }
    };

    return mockResult;
  } catch (error) {
    throw new Error('Failed to download Instagram media. Please check the URL and try again.');
  }
};

const extractMediaId = (url: string): string | null => {
  const patterns = [
    /instagram\.com\/p\/([a-zA-Z0-9_-]+)/,
    /instagram\.com\/reel\/([a-zA-Z0-9_-]+)/,
    /instagram\.com\/tv\/([a-zA-Z0-9_-]+)/,
    /instagram\.com\/stories\/[^\/]+\/([0-9]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
};

const getMediaTypeFromUrl = (url: string): MediaType => {
  if (url.includes('/reel/')) return 'reel';
  if (url.includes('/tv/')) return 'video';
  if (url.includes('/stories/')) return 'story';
  return 'image';
};

const generateMockDownloadUrl = (type: MediaType): string => {
  // Generate mock download URLs for demonstration
  // In a real implementation, these would be actual media URLs from Instagram
  const baseUrl = 'https://example.com/mock-download/';
  const extension = type === 'image' ? 'jpg' : 'mp4';
  return `${baseUrl}${type}_${Date.now()}.${extension}`;
};

// Utility function to validate Instagram URLs
export const isValidInstagramUrl = (url: string): boolean => {
  const patterns = [
    /^https?:\/\/(www\.)?instagram\.com\/p\/[a-zA-Z0-9_-]+\/?/,
    /^https?:\/\/(www\.)?instagram\.com\/reel\/[a-zA-Z0-9_-]+\/?/,
    /^https?:\/\/(www\.)?instagram\.com\/tv\/[a-zA-Z0-9_-]+\/?/,
    /^https?:\/\/(www\.)?instagram\.com\/stories\/[^\/]+\/[0-9]+\/?/
  ];

  return patterns.some(pattern => pattern.test(url));
};