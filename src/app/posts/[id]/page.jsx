'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  IoArrowBack,
  IoTimeOutline,
  IoPersonOutline,
  IoCalendarOutline,
  IoFlaskOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';

export default function SinglePostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      setError('Article identifier missing.');
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/posts?id=${encodeURIComponent(postId)}`);
        const data = await response.json();

        if (response.ok && data.posts && data.posts.length > 0) {
          setPost(data.posts[0]);
        } else {
          setError(data.error || 'Article not found.');
          setPost(null);
        }
      } catch (err) {
        console.error('Error fetching single post:', err);
        setError('An unexpected network error occurred.');
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-4 animate-pulse space-y-6">
          <div className="w-28 h-4 bg-slate-200 rounded" />
          <div className="w-full h-10 bg-slate-200 rounded" />
          <div className="h-80 bg-slate-200 rounded-3xl" />
          <div className="space-y-3">
            <div className="w-full h-4 bg-slate-200 rounded" />
            <div className="w-5/6 h-4 bg-slate-200 rounded" />
            <div className="w-4/6 h-4 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Article Not Found</h2>
          <p className="text-xs text-slate-500">{error || 'The requested article could not be located.'}</p>
          <div className="pt-2">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shadow-sm"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const backLinkHref = post.category === 'Blog' ? '/blogs' : '/newsevents';
  const backLinkText = post.category === 'Blog' ? 'All Whitepapers & Blogs' : 'All News & Events';

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href={backLinkHref}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-sky-700 hover:text-sky-900 transition-colors"
          >
            <IoArrowBack size={16} />
            <span>{backLinkText}</span>
          </Link>
        </div>

        {/* Article Container */}
        <article className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-12 shadow-xs space-y-8">
          {/* Header Metadata */}
          <div className="space-y-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-100 text-sky-800">
                {post.category || 'Article'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5">
                <IoPersonOutline size={14} className="text-slate-400" />
                <span className="text-slate-800 font-semibold">{post.author || 'Pharmavive'}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <IoCalendarOutline size={14} className="text-slate-400" />
                <span>{new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </span>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
            {post.content}
          </div>

          {/* Bottom Callout Banner */}
          <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-sky-400 text-xs font-mono">
                <IoFlaskOutline size={16} />
                <span>PHARMAVIVE CDMO</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold">Have a Chemical Question on this Topic?</h3>
              <p className="text-xs text-slate-300">
                Contact our Ph.D. synthetic chemistry team for technical consultation or impurity profiling.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs whitespace-nowrap shadow-sm transition-all"
            >
              Consult Our Chemists
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
