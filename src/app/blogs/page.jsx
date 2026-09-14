'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoBookOutline, IoArrowForward, IoTimeOutline, IoPersonOutline } from 'react-icons/io5';

export default function BlogsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/posts?category=Blog');
        const data = await response.json();

        if (response.ok) {
          setPosts(data.posts || []);
        } else {
          setError(data.error || 'Failed to fetch blogs.');
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('An unexpected error occurred while fetching blogs.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-mono font-medium">
            <IoBookOutline size={14} />
            <span>SCIENTIFIC INSIGHTS & WHITEPAPERS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Chemical Knowledge Base & Whitepapers
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Articles and research updates on impurity isolation, stable isotope labeling techniques, chiral synthesis, and regulatory compliance.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-white border border-slate-200 animate-pulse p-6 flex flex-col justify-between"
              >
                <div className="h-48 bg-slate-100 rounded-2xl mb-4" />
                <div className="space-y-3">
                  <div className="w-1/3 h-4 bg-slate-200 rounded" />
                  <div className="w-full h-6 bg-slate-200 rounded" />
                  <div className="w-3/4 h-4 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-8 rounded-2xl bg-red-50 border border-red-200 text-center max-w-lg mx-auto space-y-3">
            <p className="text-sm font-bold text-red-800">Unable to load articles</p>
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 max-w-md mx-auto p-8 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
              <IoBookOutline size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-800">No blog posts available</h3>
            <p className="text-xs text-slate-500">
              Our scientific team will be publishing research whitepapers and technical updates soon.
            </p>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:border-sky-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Article Image Frame */}
                  <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-400 bg-slate-900">
                        <IoBookOutline size={40} className="text-sky-500" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-xs text-white border border-white/20">
                      Technical Article
                    </span>
                  </div>

                  {/* Article Metadata & Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                      <span className="flex items-center gap-1">
                        <IoPersonOutline size={13} />
                        <span>{post.author || 'Pharmavive'}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <IoTimeOutline size={13} />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2">
                      <Link href={`/posts/${post._id}`} title={post.title}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-2">
                  <Link
                    href={`/posts/${post._id}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 group-hover:text-sky-900 transition-colors"
                  >
                    <span>Read Full Paper</span>
                    <IoArrowForward size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
