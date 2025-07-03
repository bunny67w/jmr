export type MediaType = 'image' | 'video' | 'reel' | 'story';

export interface MediaItem {
  type: MediaType;
  downloadUrl: string;
  filename: string;
  quality: string;
  size: string;
}

export interface DownloadResult {
  success: boolean;
  media: MediaItem[];
  metadata?: {
    username?: string;
    caption?: string;
    timestamp?: string;
  };
}

export interface InstagramPost {
  shortcode: string;
  display_url?: string;
  video_url?: string;
  is_video: boolean;
  edge_media_to_caption?: {
    edges: Array<{
      node: {
        text: string;
      };
    }>;
  };
  owner?: {
    username: string;
  };
  taken_at_timestamp?: number;
}