import requests
import re
import os

def download_instagram_media(url):
    # Send a GET request to the Instagram URL
    response = requests.get(url)
    
    # Extract the media URL using regex
    media_url = None
    if 'instagram.com' in url:
        # Check if it's a reel, story, post, or IG TV
        if 'reel' in url:
            # Reel URL pattern
            reel_pattern = r'https://www.instagram.com/reel/[a-zA-Z0-9_-]+/?'
            match = re.search(reel_pattern, url)
            if match:
                reel_id = match.group(0).split('/')[-2]
                media_url = f'https://www.instagram.com/reel/{reel_id}/?__a=1'
        elif 'story' in url:
            # Story URL pattern
            story_pattern = r'https://www.instagram.com/stories/[a-zA-Z0-9_-]+/[0-9]+/?'
            match = re.search(story_pattern, url)
            if match:
                story_id = match.group(0).split('/')[-2]
                media_url = f'https://www.instagram.com/stories/{story_id}/?__a=1'
        elif 'tv' in url:
            # IG TV URL pattern
            tv_pattern = r'https://www.instagram.com/tv/[a-zA-Z0-9_-]+/?'
            match = re.search(tv_pattern, url)
            if match:
                tv_id = match.group(0).split('/')[-2]
                media_url = f'https://www.instagram.com/tv/{tv_id}/?__a=1'
        elif 'p/' in url:
            # Post URL pattern
            post_pattern = r'https://www.instagram.com/p/[a-zA-Z0-9_-]+/?'
            match = re.search(post_pattern, url)
            if match:
                post_id = match.group(0).split('/')[-2]
                media_url = f'https://www.instagram.com/p/{post_id}/?__a=1'
    
    # Download the media if URL is found
    if media_url:
        try:
            # Send a GET request to the media URL
            media_response = requests.get(media_url)
            
            # Extract the media data
            media_data = media_response.json()
            
            # Download the media file
            if 'graphql' in media_data:
                if 'shortcode_media' in media_data['graphql']:
                    shortcode_media = media_data['graphql']['shortcode_media']
                    if 'display_url' in shortcode_media:
                        display_url = shortcode_media['display_url']
                        # Download the media file
                        media_content = requests.get(display_url).content
                        
                        # Save the media file
                        filename = f"{shortcode_media['shortcode']}.jpg"
                        with open(filename, 'wb') as file:
                            file.write(media_content)
                        print(f"Downloaded: {filename}")
                    elif 'video_url' in shortcode_media:
                        video_url = shortcode_media['video_url']
                        # Download the video file
                        video_content = requests.get(video_url).content
                        
                        # Save the video file
                        filename = f"{shortcode_media['shortcode']}.mp4"
                        with open(filename, 'wb') as file:
                            file.write(video_content)
                        print(f"Downloaded: {filename}")
        except Exception as e:
            print(f"Error downloading media: {e}")
    else:
        print("Invalid Instagram URL")

# Example usage
url = input("Enter Instagram URL: ")
download_instagram_media(url)