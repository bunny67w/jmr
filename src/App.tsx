import React, { useState } from 'react';
import { Download, Instagram, AlertCircle, CheckCircle, Loader2, Image, Video, Play, Eye } from 'lucide-react';
import { downloadInstagramMedia } from './services/instagram';
import { MediaType, DownloadResult } from './types/instagram';

function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!url.trim()) {
      setError('Please enter a valid Instagram URL');
      return;
    }

    if (!isValidInstagramUrl(url)) {
      setError('Please enter a valid Instagram URL (post, reel, story, or IGTV)');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const downloadResult = await downloadInstagramMedia(url);
      setResult(downloadResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download media');
    } finally {
      setIsLoading(false);
    }
  };

  const isValidInstagramUrl = (url: string): boolean => {
    const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv|stories)\/[a-zA-Z0-9_-]+\/?/;
    return instagramRegex.test(url);
  };

  const getMediaTypeIcon = (type: MediaType) => {
    switch (type) {
      case 'image':
        return <Image className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'reel':
        return <Play className="w-5 h-5" />;
      case 'story':
        return <Eye className="w-5 h-5" />;
      default:
        return <Download className="w-5 h-5" />;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDownload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-instagram-gradient p-4 rounded-full shadow-2xl">
              <Instagram className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Instagram</span>
            <span className="text-white ml-3">Downloader</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Download Instagram posts, reels, stories, and IGTV videos instantly. 
            Just paste the URL and get your media in high quality.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 mb-8">
            {/* URL Input Section */}
            <div className="mb-8">
              <label htmlFor="url" className="block text-lg font-semibold text-white mb-4">
                Instagram URL
              </label>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="https://www.instagram.com/p/..."
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-instagram-pink focus:border-transparent backdrop-blur-sm text-lg"
                    disabled={isLoading}
                  />
                  {url && isValidInstagramUrl(url) && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-green-400" />
                  )}
                </div>
                <button
                  onClick={handleDownload}
                  disabled={isLoading || !url.trim()}
                  className="instagram-button disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 px-8"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Supported Formats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { type: 'Posts', icon: Image, desc: 'Photos & carousels' },
                { type: 'Reels', icon: Play, desc: 'Short videos' },
                { type: 'Stories', icon: Eye, desc: 'Temporary content' },
                { type: 'IGTV', icon: Video, desc: 'Long-form videos' }
              ].map((item, index) => (
                <div key={index} className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <item.icon className="w-8 h-8 text-instagram-pink mx-auto mb-2" />
                  <h3 className="text-white font-semibold">{item.type}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-200">{error}</p>
              </div>
            )}

            {/* Success Result */}
            {result && (
              <div className="mb-6 p-6 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Download Ready!</h3>
                </div>
                
                <div className="space-y-4">
                  {result.media.map((media, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getMediaTypeIcon(media.type)}
                        <div>
                          <p className="text-white font-medium">
                            {media.type.charAt(0).toUpperCase() + media.type.slice(1)}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {media.quality} • {media.size}
                          </p>
                        </div>
                      </div>
                      <a
                        href={media.downloadUrl}
                        download={media.filename}
                        className="bg-instagram-gradient hover:bg-instagram-gradient-hover text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: 'High Quality',
                description: 'Download media in original quality without compression',
                icon: '🎯'
              },
              {
                title: 'Fast & Secure',
                description: 'Quick downloads with secure processing and no data storage',
                icon: '⚡'
              },
              {
                title: 'All Formats',
                description: 'Support for posts, reels, stories, and IGTV content',
                icon: '📱'
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="glass-card p-6">
            <h3 className="text-2xl font-semibold text-white mb-4">How to Use</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: 'Copy URL',
                  description: 'Copy the Instagram post, reel, story, or IGTV URL from your browser or app'
                },
                {
                  step: '2',
                  title: 'Paste & Download',
                  description: 'Paste the URL in the input field above and click the download button'
                },
                {
                  step: '3',
                  title: 'Save Media',
                  description: 'Your media will be processed and ready for download in high quality'
                }
              ].map((instruction, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-instagram-gradient rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {instruction.step}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{instruction.title}</h4>
                  <p className="text-gray-300">{instruction.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p>© 2025 Instagram Downloader. This tool is not affiliated with Instagram.</p>
          <p className="mt-2">Please respect content creators' rights and use downloaded content responsibly.</p>
        </div>
      </div>
    </div>
  );
}

export default App;