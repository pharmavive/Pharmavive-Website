// src/app/admin/dashboard/page.jsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import '../../globals.css';
import './dashboard.css';
import { capitalizeWords } from '@/utils/stringUtils';

import {
  IoCubeOutline,
  IoFlaskOutline,
  IoCloudUploadOutline,
  IoDocumentTextOutline,
  IoLayersOutline,
  IoGitNetworkOutline,
  IoSearchOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoOpenOutline,
  IoLogOutOutline,
  IoCheckmarkCircle,
  IoAlertCircleOutline,
  IoCloseOutline,
  IoDownloadOutline,
  IoImageOutline,
  IoAddCircleOutline,
  IoInformationCircleOutline,
  IoRefreshOutline,
  IoShieldCheckmarkOutline,
  IoPersonOutline
} from 'react-icons/io5';

const POST_CATEGORIES = ['Blog', 'News & Events'];
const MIN_SEARCH_LENGTH = 4;

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState('productUpload');

  // --- Product Upload/Edit States ---
  const [editingProductId, setEditingProductId] = useState(null);
  const [productName, setProductName] = useState('');
  const [productChemicalName, setProductChemicalName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState(null);
  const [existingProductImageUrl, setExistingProductImageUrl] = useState('');
  const [catNumber, setCatNumber] = useState('');
  const [casNumber, setCasNumber] = useState('');
  const [molecularFormula, setMolecularFormula] = useState('');
  const [molecularWeight, setMolecularWeight] = useState('');
  const [purity, setPurity] = useState('');
  const [productSubCategoryId, setProductSubCategoryId] = useState('');
  const [productStock, setProductStock] = useState('Instock');

  // --- Post Creation/Edit States ---
  const [editingPostId, setEditingPostId] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [postImagePreview, setPostImagePreview] = useState(null);
  const [existingPostImageUrl, setExistingPostImageUrl] = useState('');
  const [postCategory, setPostCategory] = useState(POST_CATEGORIES[0]);
  const [postAuthor, setPostAuthor] = useState('Admin');

  // --- Bulk Upload States ---
  const [uploadFile, setUploadFile] = useState(null);
  const uploadFileInputRef = useRef(null);
  const [bulkUploadResults, setBulkUploadResults] = useState(null);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // --- General Form States ---
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // --- Lists & Search States ---
  const [postsList, setPostsList] = useState([]);
  const [postsListLoading, setPostsListLoading] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [productsListLoading, setProductsListLoading] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState(searchParams.get('q') || '');
  const [totalProducts, setTotalProducts] = useState(0);

  // --- Main Category Management States ---
  const [mainCategories, setMainCategories] = useState([]);
  const [mainCategoryName, setMainCategoryName] = useState('');
  const [mainCategoryLoading, setMainCategoryLoading] = useState(false);

  // --- Subcategory Management States ---
  const [subCategories, setSubCategories] = useState([]);
  const [editingSubCategoryId, setEditingSubCategoryId] = useState(null);
  const [subCategoryName, setSubCategoryName] = useState('');
  const [subCategoryDescription, setSubCategoryDescription] = useState('');
  const [selectedMainCategoryForSub, setSelectedMainCategoryForSub] = useState('');
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/signin');
    }
  }, [status, router]);

  // Fetch functions
  const fetchPostsList = async () => {
    setPostsListLoading(true);
    try {
      const response = await fetch('/api/admin/posts');
      const data = await response.json();
      if (response.ok) {
        setPostsList(data.posts || []);
      } else {
        console.error('Failed to fetch posts list:', data.error);
        setMessage(`Error fetching posts list: ${data.error}`);
        setMessageType('error');
      }
    } catch (err) {
      console.error('Network error fetching posts list:', err);
      setMessage('Network error fetching posts list.');
      setMessageType('error');
    } finally {
      setPostsListLoading(false);
    }
  };

  const fetchProductsList = async () => {
    if (productSearchQuery.length < MIN_SEARCH_LENGTH && productSearchQuery.length > 0) {
      setProductsList([]);
      setTotalProducts(0);
      setProductsListLoading(false);
      return;
    }
    
    if (!productSearchQuery) {
      setProductsList([]);
      setTotalProducts(0);
      setProductsListLoading(false);
      return;
    }

    setProductsListLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.set('search', productSearchQuery);
      queryParams.set('limit', '10000');
      const response = await fetch(`/api/admin/products?${queryParams.toString()}`);
      const data = await response.json();
      if (response.ok) {
        setProductsList(data.products || []);
        setTotalProducts(data.totalCount || 0);
      } else {
        console.error('Failed to fetch products list:', data.error);
        setMessage(`Error fetching products list: ${data.error}`);
        setMessageType('error');
      }
    } catch (err) {
      console.error('Network error fetching products list:', err);
      setMessage('Network error fetching products list.');
      setMessageType('error');
    } finally {
      setProductsListLoading(false);
    }
  };

  const fetchMainCategories = async () => {
    setMainCategoryLoading(true);
    try {
      const response = await fetch('/api/admin/main-categories');
      const data = await response.json();
      if (response.ok) {
        setMainCategories((data.mainCategories || []).sort((a, b) => a.name.localeCompare(b.name)));
      } else {
        console.error('Failed to fetch main categories:', data.error);
        setMessage(`Error fetching main categories: ${data.error}`);
        setMessageType('error');
      }
    } catch (err) {
      console.error('Network error fetching main categories:', err);
      setMessage('Network error fetching main categories.');
      setMessageType('error');
    } finally {
      setMainCategoryLoading(false);
    }
  };

  const fetchSubCategories = async (mainCategoryId = null) => {
    setSubCategoryLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (mainCategoryId) {
        queryParams.set('mainCategoryId', mainCategoryId);
      }
      const response = await fetch(`/api/admin/sub-categories?${queryParams.toString()}`);
      const data = await response.json();
      if (response.ok) {
        setSubCategories((data.subCategories || []).sort((a, b) => a.name.localeCompare(b.name)));
      } else {
        console.error('Failed to fetch subcategories:', data.error);
        setMessage(`Error fetching subcategories: ${data.error}`);
        setMessageType('error');
      }
    } catch (err) {
      console.error('Network error fetching subcategories:', err);
      setMessage('Network error fetching subcategories.');
      setMessageType('error');
    } finally {
      setSubCategoryLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPostsList();
      fetchMainCategories();
      fetchSubCategories();
      if (productSearchQuery.length >= MIN_SEARCH_LENGTH) {
        fetchProductsList();
      }
    }
  }, [status]);

  // Debounce product search query and trigger fetch
  useEffect(() => {
    const handler = setTimeout(() => {
      if (productSearchQuery.length === 0 || productSearchQuery.length >= MIN_SEARCH_LENGTH) {
        fetchProductsList();
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [productSearchQuery]);

  // Image handling
  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Product image size exceeds 5MB limit. Please choose a smaller image.');
        setMessageType('error');
        setProductImage(null);
        setProductImagePreview(null);
        return;
      }
      setMessage('');
      setProductImage(file);
      setProductImagePreview(URL.createObjectURL(file));
      setExistingProductImageUrl('');
    } else {
      setProductImage(null);
      setProductImagePreview(null);
    }
  };

  const handleRemoveProductImage = () => {
    setProductImage(null);
    setProductImagePreview(null);
    setExistingProductImageUrl('');
  };

  const handlePostImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Post image size exceeds 5MB limit. Please choose a smaller image.');
        setMessageType('error');
        setPostImage(null);
        setPostImagePreview(null);
        return;
      }
      setMessage('');
      setPostImage(file);
      setPostImagePreview(URL.createObjectURL(file));
      setExistingPostImageUrl('');
    } else {
      setPostImage(null);
      setPostImagePreview(null);
    }
  };

  // Product Submit Handler
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!productName.trim()) {
      setMessage('Product Name is required.');
      setMessageType('error');
      setLoading(false);
      return;
    }
    if (!catNumber.trim()) {
      setMessage('Catalog Number is required.');
      setMessageType('error');
      setLoading(false);
      return;
    }
    if (!productSubCategoryId) {
      setMessage('Product Subcategory is required.');
      setMessageType('error');
      setLoading(false);
      return;
    }
    if (!productStock) {
      setMessage('Product Stock status is required.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', productName.trim());
    formData.append('catNumber', catNumber.trim());
    formData.append('subCategory', productSubCategoryId);
    formData.append('chemicalName', productChemicalName.trim());
    formData.append('casNumber', casNumber.trim());
    formData.append('molecularFormula', molecularFormula.trim());
    formData.append('molecularWeight', molecularWeight.trim());
    formData.append('purity', purity.trim());
    formData.append('stock', productStock);

    let method = 'POST';
    let apiUrl = '/api/admin/products';

    if (editingProductId) {
      method = 'PUT';
      formData.append('id', editingProductId);
      formData.append('existingImage', existingProductImageUrl);
      if (productImage) {
        formData.append('image', productImage);
      }
    } else {
      if (productImage) {
        formData.append('image', productImage);
      }
    }

    try {
      const response = await fetch(apiUrl, {
        method: method,
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Product ${editingProductId ? 'updated' : 'created'} successfully!`);
        setMessageType('success');
        resetProductForm();
        if (productSearchQuery.length >= MIN_SEARCH_LENGTH) {
          fetchProductsList();
        } else {
          setProductsList([]);
          setTotalProducts(0);
        }
      } else {
        setMessage(`Product ${editingProductId ? 'Update' : 'Creation'} Failed: ${data.error || 'An unknown error occurred.'}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error(`Error during product ${editingProductId ? 'update' : 'creation'} fetch:`, error);
      setMessage('An unexpected network error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const resetProductForm = () => {
    setEditingProductId(null);
    setProductName('');
    setCatNumber('');
    setProductChemicalName('');
    setCasNumber('');
    setMolecularFormula('');
    setMolecularWeight('');
    setPurity('');
    setProductSubCategoryId('');
    setProductImage(null);
    setProductImagePreview(null);
    setExistingProductImageUrl('');
    setProductStock('Instock');
  };

  const handleEditProduct = (product) => {
    setActiveTab('productUpload');
    setEditingProductId(product._id);
    setProductName(product.name);
    setCatNumber(product.catNumber);
    setProductChemicalName(product.chemicalName || '');
    setCasNumber(product.casNumber || '');
    setMolecularFormula(product.molecularFormula || '');
    setMolecularWeight(product.molecularWeight || '');
    setPurity(product.purity || '');
    setProductSubCategoryId(product.subCategory ? product.subCategory._id : '');
    setExistingProductImageUrl(product.image || '');
    setProductImage(null);
    setProductImagePreview(null);
    setProductStock(product.stock || 'Instock');
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = async (productId, productName) => {
    if (!window.confirm(`Are you sure you want to delete the product "${productName}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/products?id=${productId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Product deleted successfully!');
        setMessageType('success');
        if (productSearchQuery.length >= MIN_SEARCH_LENGTH) {
          fetchProductsList();
        } else {
          setProductsList([]);
          setTotalProducts(0);
        }
        if (editingProductId === productId) {
          resetProductForm();
        }
      } else {
        setMessage(`Deletion Failed: ${data.error || 'An unknown error occurred.'}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error during product deletion fetch:', error);
      setMessage('An unexpected network error occurred during product deletion. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Post related handlers
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!postTitle.trim() || !postContent.trim() || (!postImage && !existingPostImageUrl) || !postCategory.trim()) {
      setMessage('Please fill in all required post fields (Title, Content, Image, Category).');
      setMessageType('error');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', postTitle.trim());
    formData.append('content', postContent.trim());
    formData.append('category', postCategory.trim());
    formData.append('author', postAuthor.trim());

    let method = 'POST';
    let apiUrl = '/api/admin/posts';

    if (editingPostId) {
      method = 'PUT';
      formData.append('id', editingPostId);
      formData.append('existingImage', existingPostImageUrl);
      if (postImage) {
        formData.append('image', postImage);
      }
    } else {
      if (!postImage) {
        setMessage('Please select an image for the new post.');
        setMessageType('error');
        setLoading(false);
        return;
      }
      formData.append('image', postImage);
    }

    try {
      const response = await fetch(apiUrl, {
        method: method,
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Post ${editingPostId ? 'updated' : 'created'} successfully!`);
        setMessageType('success');
        resetPostForm();
        fetchPostsList();
      } else {
        setMessage(`Post ${editingPostId ? 'Update' : 'Creation'} Failed: ${data.error || 'An unknown error occurred.'}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error(`Error during post ${editingPostId ? 'update' : 'creation'} fetch:`, error);
      setMessage('An unexpected network error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const resetPostForm = () => {
    setEditingPostId(null);
    setPostTitle('');
    setPostContent('');
    setPostImage(null);
    setPostImagePreview(null);
    setExistingPostImageUrl('');
    setPostCategory(POST_CATEGORIES[0]);
    setPostAuthor('Admin');
  };

  const handleEditPost = (post) => {
    setActiveTab('post');
    setEditingPostId(post._id);
    setPostTitle(post.title);
    setPostContent(post.content);
    setExistingPostImageUrl(post.image);
    setPostImage(null);
    setPostImagePreview(null);
    setPostCategory(post.category);
    setPostAuthor(post.author);
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePost = async (postId, postTitle) => {
    if (!window.confirm(`Are you sure you want to delete the post "${postTitle}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/posts?id=${postId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Post deleted successfully!');
        setMessageType('success');
        fetchPostsList();
        if (editingPostId === postId) {
          resetPostForm();
        }
      } else {
        setMessage(`Deletion Failed: ${data.error || 'An unknown error occurred.'}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error during post deletion fetch:', error);
      setMessage('An unexpected network error occurred during post deletion. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Bulk Upload Handlers
  const handleUploadFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith('.csv') || fileName.endsWith('.xlsx')) {
        setUploadFile(file);
        setBulkUploadResults(null);
        setMessage('');
      } else {
        setUploadFile(null);
        setBulkUploadResults(null);
        setMessage('Please select a valid CSV or XLSX file.');
        setMessageType('error');
        if (uploadFileInputRef.current) {
          uploadFileInputRef.current.value = '';
        }
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith('.csv') || fileName.endsWith('.xlsx')) {
        setUploadFile(file);
        setBulkUploadResults(null);
        setMessage('');
      } else {
        setMessage('Please drop a valid CSV or XLSX spreadsheet.');
        setMessageType('error');
      }
    }
  };

  const handleBulkUploadSubmit = async (e) => {
    e.preventDefault();
    setBulkLoading(true);
    setMessage('');
    setBulkUploadResults(null);

    if (!uploadFile) {
      setMessage('Please select a CSV or XLSX file to upload.');
      setMessageType('error');
      setBulkLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', uploadFile);

    try {
      const response = await fetch('/api/admin/products/bulk-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok || response.status === 207) {
        setBulkUploadResults(data);
        if (data.failed && data.failed.length > 0) {
          setMessage(`Bulk upload processed: ${data.successful?.length || 0} succeeded, ${data.failed.length} failed.`);
          setMessageType('error');
        } else {
          setMessage(`Bulk upload successful! ${data.successful?.length || 0} products imported.`);
          setMessageType('success');
        }
        if (productSearchQuery.length >= MIN_SEARCH_LENGTH) {
          fetchProductsList();
        } else {
          setProductsList([]);
          setTotalProducts(0);
        }
      } else {
        setMessage(`Bulk Upload Failed: ${data.error || 'An unknown error occurred.'}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error during bulk upload fetch:', error);
      setMessage('An unexpected network error occurred during bulk upload. Please try again.');
      setMessageType('error');
    } finally {
      setBulkLoading(false);
      if (uploadFileInputRef.current) {
        uploadFileInputRef.current.value = '';
      }
      setUploadFile(null);
    }
  };

  // Main Category Management Handlers
  const handleAddMainCategory = async (e) => {
    e.preventDefault();
    setMainCategoryLoading(true);
    setMessage('');

    if (!mainCategoryName.trim()) {
      setMessage('Main category name cannot be empty.');
      setMessageType('error');
      setMainCategoryLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/main-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: mainCategoryName.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Main category "${data.mainCategory?.name}" created successfully!`);
        setMessageType('success');
        setMainCategoryName('');
        fetchMainCategories();
      } else {
        setMessage(`Failed to add main category: ${data.error || 'An unknown error occurred.'}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error adding main category:', error);
      setMessage('Network error while adding main category.');
      setMessageType('error');
    } finally {
      setMainCategoryLoading(false);
    }
  };

  const handleDeleteMainCategory = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete main category "${name}"? This will also delete all associated subcategories and require products linked to those subcategories to be reassigned/deleted.`)) {
      return;
    }

    setMainCategoryLoading(true);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/main-categories?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Main category "${name}" deleted successfully.`);
        setMessageType('success');
        fetchMainCategories();
        fetchSubCategories();
        if (productSearchQuery.length >= MIN_SEARCH_LENGTH) {
          fetchProductsList();
        } else {
          setProductsList([]);
          setTotalProducts(0);
        }
      } else {
        setMessage(`Failed to delete main category: ${data.error || 'An unknown error occurred.'}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error deleting main category:', error);
      setMessage('Network error while deleting main category.');
      setMessageType('error');
    } finally {
      setMainCategoryLoading(false);
    }
  };

  // Subcategory Management Handlers
  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    setSubCategoryLoading(true);
    setMessage('');

    if (!subCategoryName.trim() || !selectedMainCategoryForSub) {
      setMessage('Subcategory name and associated Main Category are required.');
      setMessageType('error');
      setSubCategoryLoading(false);
      return;
    }

    const apiUrl = '/api/admin/sub-categories';
    const method = editingSubCategoryId ? 'PUT' : 'POST';
    const body = editingSubCategoryId
      ? JSON.stringify({ id: editingSubCategoryId, name: subCategoryName.trim(), description: subCategoryDescription.trim(), mainCategory: selectedMainCategoryForSub })
      : JSON.stringify({ name: subCategoryName.trim(), description: subCategoryDescription.trim(), mainCategory: selectedMainCategoryForSub });

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Subcategory ${editingSubCategoryId ? 'updated' : 'created'} successfully!`);
        setMessageType('success');
        resetSubCategoryForm();
        fetchSubCategories();
      } else {
        setMessage(`Subcategory ${editingSubCategoryId ? 'Update' : 'Creation'} Failed: ${data.error || 'An unknown error occurred.'}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error(`Error during subcategory ${editingSubCategoryId ? 'update' : 'creation'} fetch:`, error);
      setMessage('An unexpected network error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setSubCategoryLoading(false);
    }
  };

  const resetSubCategoryForm = () => {
    setEditingSubCategoryId(null);
    setSubCategoryName('');
    setSubCategoryDescription('');
    setSelectedMainCategoryForSub('');
  };

  const handleEditSubCategory = (subCat) => {
    setActiveTab('subCategories');
    setEditingSubCategoryId(subCat._id);
    setSubCategoryName(subCat.name);
    setSubCategoryDescription(subCat.description || '');
    setSelectedMainCategoryForSub(subCat.mainCategory?._id || '');
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSubCategory = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete subcategory "${name}"? This will prevent products from being linked to it. Products previously linked will become unlinked.`)) {
      return;
    }

    setSubCategoryLoading(true);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/sub-categories?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Subcategory "${name}" deleted successfully.`);
        setMessageType('success');
        fetchSubCategories();
        if (productSearchQuery.length >= MIN_SEARCH_LENGTH) {
          fetchProductsList();
        } else {
          setProductsList([]);
          setTotalProducts(0);
        }
      } else {
        setMessage(`Failed to delete subcategory: ${data.error || 'An unknown error occurred.'}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      setMessage('Network error while deleting subcategory.');
      setMessageType('error');
    } finally {
      setSubCategoryLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F2FBF8] via-[#F8FCFB] to-white">
        <div className="w-12 h-12 border-4 border-[#00A389]/20 border-t-[#00A389] rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-semibold text-[#0E2358] tracking-wide">Authenticating Admin Session...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  // Navigation tab configuration
  const tabs = [
    { id: 'productUpload', label: 'Manage Products', icon: IoCubeOutline, count: totalProducts > 0 ? totalProducts : null },
    { id: 'bulkUpload', label: 'Bulk Upload', icon: IoCloudUploadOutline },
    { id: 'post', label: 'Manage Posts', icon: IoDocumentTextOutline, count: postsList.length || null },
    { id: 'mainCategories', label: 'Main Categories', icon: IoLayersOutline, count: mainCategories.length || null },
    { id: 'subCategories', label: 'Subcategories', icon: IoGitNetworkOutline, count: subCategories.length || null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FBF8] via-[#F8FCFB] to-white text-slate-800 pb-24 relative overflow-hidden font-sans">
      {/* Ambient background glow orbs */}
      <div className="absolute top-[-5%] right-[-5%] w-[550px] h-[550px] rounded-full bg-emerald-200/30 blur-[130px] pointer-events-none" />
      <div className="absolute top-[25%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-100/30 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[10%] w-[450px] h-[450px] rounded-full bg-cyan-100/25 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10 space-y-8">
        
        {/* Executive Header Section */}
        <header className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E2F7F4] text-[#00A389] border border-[#00A389]/20 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#00A389] animate-status-pulse"></span>
                Active Session
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                <IoShieldCheckmarkOutline className="w-3.5 h-3.5 text-[#00A389]" />
                SSL Verified Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0E2358] tracking-tight">
              Admin Operations Center
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              Comprehensive catalog control, chemical specifications, bulk spreadsheet ingestion, blog publications, and category taxonomy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-3 bg-white/80 border border-slate-200/80 px-4 py-2 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0E2358] to-[#0B3B3C] text-white flex items-center justify-center font-bold text-base shadow-sm">
                <IoPersonOutline className="w-5 h-5 text-[#00A389]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Signed in as</p>
                <p className="text-sm font-bold text-[#0E2358] truncate max-w-[160px]">
                  {session?.user?.name || session?.user?.email || 'Administrator'}
                </p>
              </div>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: '/admin/signin' })}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 border border-rose-200/70 transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
            >
              <IoLogOutOutline className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </header>

        {/* Operational KPI Metric Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/60 text-[#00A389] flex items-center justify-center text-xl shrink-0">
              <IoCubeOutline className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Catalog Query</p>
              <p className="text-xl sm:text-2xl font-black text-[#0E2358]">
                {totalProducts > 0 ? totalProducts.toLocaleString() : (productsList.length > 0 ? productsList.length : '—')}
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200/60 text-[#0B3B3C] flex items-center justify-center text-xl shrink-0">
              <IoLayersOutline className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Main Categories</p>
              <p className="text-xl sm:text-2xl font-black text-[#0E2358]">{mainCategories.length}</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200/60 text-cyan-700 flex items-center justify-center text-xl shrink-0">
              <IoGitNetworkOutline className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Subcategories / APIs</p>
              <p className="text-xl sm:text-2xl font-black text-[#0E2358]">{subCategories.length}</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200/60 text-indigo-700 flex items-center justify-center text-xl shrink-0">
              <IoDocumentTextOutline className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">News & Blog Posts</p>
              <p className="text-xl sm:text-2xl font-black text-[#0E2358]">{postsList.length}</p>
            </div>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {message && (
          <div
            className={`rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs border transition-all duration-300 ${
              messageType === 'success'
                ? 'bg-emerald-50 border-emerald-200/80 text-emerald-900'
                : 'bg-rose-50 border-rose-200/80 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-3">
              {messageType === 'success' ? (
                <IoCheckmarkCircle className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : (
                <IoAlertCircleOutline className="w-6 h-6 text-rose-600 shrink-0" />
              )}
              <span className="text-sm font-medium">{message}</span>
            </div>
            <button
              onClick={() => setMessage('')}
              className="p-1.5 rounded-lg hover:bg-black/5 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <IoCloseOutline className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Segmented Tab Navigation */}
        <div className="glass-card p-1.5 rounded-2xl flex flex-wrap gap-1.5 shadow-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                data-tab={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'productUpload') resetProductForm();
                  if (tab.id === 'bulkUpload') {
                    setUploadFile(null);
                    setBulkUploadResults(null);
                    setMessage('');
                  }
                  if (tab.id === 'post') resetPostForm();
                  if (tab.id === 'mainCategories') {
                    setMainCategoryName('');
                    setMessage('');
                    fetchMainCategories();
                  }
                  if (tab.id === 'subCategories') {
                    resetSubCategoryForm();
                    fetchSubCategories();
                  }
                }}
                className={`flex-1 min-w-[140px] sm:min-w-[170px] inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0E2358] to-[#0B3B3C] text-white shadow-md shadow-[#0E2358]/20'
                    : 'text-slate-600 hover:text-[#0E2358] hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00A389]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== null && tab.count > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: MANAGE PRODUCTS (Add/Edit Form + Live Catalog Search)              */}
        {/* ========================================================================= */}
        {activeTab === 'productUpload' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Product Editor Form */}
            <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00A389] flex items-center justify-center">
                    <IoFlaskOutline className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0E2358]">
                      {editingProductId ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {editingProductId ? 'Modifying existing catalog standard' : 'Create precision reference molecule'}
                    </p>
                  </div>
                </div>

                {editingProductId && (
                  <button
                    type="button"
                    onClick={resetProductForm}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <IoRefreshOutline className="w-3.5 h-3.5" />
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-5">
                {/* Product Name */}
                <div className="space-y-1.5">
                  <label htmlFor="productName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Product Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Abacavir Related Compound A"
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all"
                  />
                </div>

                {/* Catalog Number & Stock Status Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="catNumber" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Catalog Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="catNumber"
                      value={catNumber}
                      onChange={(e) => setCatNumber(e.target.value)}
                      placeholder="e.g. PV-ABA-001"
                      required
                      disabled={loading}
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="productStock" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Stock Status <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="productStock"
                      value={productStock}
                      onChange={(e) => setProductStock(e.target.value)}
                      required
                      disabled={loading}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all cursor-pointer font-medium"
                    >
                      <option value="Instock">Instock</option>
                      <option value="Out of stock">Out of stock</option>
                    </select>
                  </div>
                </div>

                {/* Subcategory */}
                <div className="space-y-1.5">
                  <label htmlFor="productSubCategoryId" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Product Subcategory <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="productSubCategoryId"
                    value={productSubCategoryId}
                    onChange={(e) => setProductSubCategoryId(e.target.value)}
                    required
                    disabled={loading || subCategoryLoading}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all cursor-pointer font-medium"
                  >
                    <option value="">-- Select Target Subcategory --</option>
                    {subCategories.map((subCat) => (
                      <option key={subCat._id} value={subCat._id}>
                        {capitalizeWords(subCat.name)} {subCat.mainCategory ? `(${capitalizeWords(subCat.mainCategory.name)})` : ''}
                      </option>
                    ))}
                  </select>
                  {subCategories.length === 0 && !subCategoryLoading && (
                    <p className="text-xs text-rose-500 mt-1">
                      No subcategories available. Please add them in the &quot;Subcategories&quot; tab first.
                    </p>
                  )}
                </div>

                {/* Chemical Specifications Group */}
                <div className="pt-2 border-t border-slate-100 space-y-4">
                  <p className="text-xs font-bold text-[#0E2358] uppercase tracking-wider flex items-center gap-1.5">
                    <IoInformationCircleOutline className="w-4 h-4 text-[#00A389]" />
                    Chemical Specifications (Optional)
                  </p>

                  <div className="space-y-1.5">
                    <label htmlFor="productChemicalName" className="block text-xs font-semibold text-slate-600">
                      IUPAC / Chemical Name
                    </label>
                    <input
                      type="text"
                      id="productChemicalName"
                      value={productChemicalName}
                      onChange={(e) => setProductChemicalName(e.target.value)}
                      placeholder="e.g. (1S,4R)-4-(2-amino-6-(cyclopropylamino)..."
                      disabled={loading}
                      className="w-full px-4 py-2 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label htmlFor="casNumber" className="block text-xs font-semibold text-slate-600">
                        CAS Number
                      </label>
                      <input
                        type="text"
                        id="casNumber"
                        value={casNumber}
                        onChange={(e) => setCasNumber(e.target.value)}
                        placeholder="e.g. 136470-78-5"
                        disabled={loading}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 font-mono placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="purity" className="block text-xs font-semibold text-slate-600">
                        Purity
                      </label>
                      <input
                        type="text"
                        id="purity"
                        value={purity}
                        onChange={(e) => setPurity(e.target.value)}
                        placeholder="e.g. >98.5% (HPLC)"
                        disabled={loading}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="molecularFormula" className="block text-xs font-semibold text-slate-600">
                        Molecular Formula
                      </label>
                      <input
                        type="text"
                        id="molecularFormula"
                        value={molecularFormula}
                        onChange={(e) => setMolecularFormula(e.target.value)}
                        placeholder="e.g. C14H18N6O"
                        disabled={loading}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 font-mono placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="molecularWeight" className="block text-xs font-semibold text-slate-600">
                        Molecular Weight
                      </label>
                      <input
                        type="text"
                        id="molecularWeight"
                        value={molecularWeight}
                        onChange={(e) => setMolecularWeight(e.target.value)}
                        placeholder="e.g. 286.33"
                        disabled={loading}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Structure Image Dropzone */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <label htmlFor="productImage" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Chemical Structure Image
                  </label>

                  <div className="border border-dashed border-slate-300 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <input
                      type="file"
                      id="productImage"
                      accept="image/*"
                      onChange={handleProductImageChange}
                      disabled={loading}
                      className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#E2F7F4] file:text-[#00A389] hover:file:bg-[#00A389] hover:file:text-white file:transition-all cursor-pointer"
                    />

                    {(productImagePreview || existingProductImageUrl) && (
                      <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-16 h-16 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex items-center justify-center shrink-0">
                            <Image
                              src={productImagePreview || existingProductImageUrl}
                              alt="Product Preview"
                              fill
                              sizes="64px"
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#0E2358]">
                              {productImagePreview ? 'New Image Ready' : 'Current Active Image'}
                            </p>
                            <p className="text-[11px] text-slate-400">Chemical structure file</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveProductImage}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Remove image"
                        >
                          <IoTrashOutline className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">Supported formats: PNG, JPG, WEBP, SVG (Max 5MB)</p>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading || subCategories.length === 0}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-[#0E2358] to-[#0B3B3C] hover:from-[#0B3B3C] hover:to-[#00A389] transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing Product...</span>
                    </>
                  ) : (
                    <>
                      <IoAddCircleOutline className="w-5 h-5 text-[#00A389]" />
                      <span>{editingProductId ? 'Save Product Changes' : 'Publish Product to Catalog'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Existing Products & Live Search Table */}
            <div className="lg:col-span-7 space-y-6">
              <div className="glass-card rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0E2358]">Existing Catalog Products</h2>
                    <p className="text-xs text-slate-400">Search and manage chemical reference items in live database</p>
                  </div>
                  {totalProducts > 0 && (
                    <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold bg-[#E2F7F4] text-[#00A389] border border-[#00A389]/20">
                      {totalProducts} Found
                    </span>
                  )}
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    placeholder={`Search by product name, catalog no, CAS no... (min ${MIN_SEARCH_LENGTH} chars)`}
                    disabled={productsListLoading}
                    className="w-full pl-11 pr-10 py-3 rounded-2xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all shadow-xs"
                  />
                  {productSearchQuery && (
                    <button
                      onClick={() => setProductSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
                    >
                      <IoCloseOutline className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Product Search Results / Feedback States */}
              {!productSearchQuery && !productsListLoading ? (
                <div className="glass-card rounded-3xl p-12 text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E2F7F4] text-[#00A389] flex items-center justify-center">
                    <IoSearchOutline className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-[#0E2358]">Search Live Database</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Type at least <span className="font-semibold text-slate-600">{MIN_SEARCH_LENGTH} characters</span> in the search bar above to query by Product Name, Catalog Number, or CAS Number.
                  </p>
                </div>
              ) : productsListLoading ? (
                <div className="glass-card rounded-3xl p-12 text-center space-y-3">
                  <div className="w-10 h-10 mx-auto border-3 border-[#00A389]/20 border-t-[#00A389] rounded-full animate-spin"></div>
                  <p className="text-sm font-semibold text-[#0E2358]">Searching chemical standards database...</p>
                </div>
              ) : productsList.length === 0 ? (
                <div className="glass-card rounded-3xl p-12 text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <IoAlertCircleOutline className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-[#0E2358]">No Matching Products Found</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    No records match &quot;{productSearchQuery}&quot;. Please verify the spelling or add a new product using the form.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {productsList.map((product) => {
                    const productLinkValid = product.subCategory?.slug && product.slug;
                    const productHref = productLinkValid
                      ? `/products/${encodeURIComponent(product.subCategory.slug.toLowerCase())}/${encodeURIComponent(product.slug)}`
                      : '#';

                    const isInstock = product.stock === 'Instock';

                    return (
                      <div
                        key={product._id}
                        className="glass-card rounded-2xl p-4 sm:p-5 hover:border-[#00A389]/40 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          {/* Structure thumbnail / placeholder */}
                          <div className="relative w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="56px"
                                className="object-contain p-1"
                              />
                            ) : (
                              <IoFlaskOutline className="w-6 h-6 text-slate-400" />
                            )}
                          </div>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-sm font-bold text-[#0E2358]">{product.name}</h4>
                              <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                {product.catNumber}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  isInstock
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}
                              >
                                {product.stock || 'Instock'}
                              </span>
                            </div>

                            {product.chemicalName && (
                              <p className="text-xs text-slate-500 line-clamp-1">
                                {product.chemicalName}
                              </p>
                            )}

                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 pt-0.5">
                              {product.casNumber && (
                                <span className="font-mono text-slate-600">
                                  CAS: {product.casNumber}
                                </span>
                              )}
                              {product.subCategory ? (
                                <span className="text-slate-500">
                                  • {capitalizeWords(product.subCategory.name)}
                                  {product.subCategory.mainCategory && ` (${capitalizeWords(product.subCategory.mainCategory.name)})`}
                                </span>
                              ) : (
                                <span className="text-rose-500">• Unassigned Category</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => handleEditProduct(product)}
                            disabled={loading}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0E2358] bg-slate-100 hover:bg-[#E2F7F4] hover:text-[#00A389] transition-all cursor-pointer"
                            title="Edit Product"
                          >
                            <IoPencilOutline className="w-3.5 h-3.5" />
                            Edit
                          </button>

                          <Link
                            href={productHref}
                            target="_blank"
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-all ${
                              !productLinkValid ? 'opacity-50 pointer-events-none' : ''
                            }`}
                            title="View Public Product Page"
                          >
                            <IoOpenOutline className="w-3.5 h-3.5" />
                            View
                          </Link>

                          <button
                            onClick={() => handleDeleteProduct(product._id, product.name)}
                            disabled={loading}
                            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-all cursor-pointer"
                            title="Delete Product"
                          >
                            <IoTrashOutline className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: BULK UPLOAD PRODUCTS (Spreadsheet Ingestion)                       */}
        {/* ========================================================================= */}
        {activeTab === 'bulkUpload' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#0E2358]">Bulk Upload Products</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Upload standard catalog items from XLSX or CSV spreadsheets. Automatically provisions missing categories and APIs.
                </p>
              </div>

              {/* Download Template Banner */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[#0E2358]">Need the official format?</h3>
                  <p className="text-xs text-slate-600">
                    Headers: <code className="font-mono text-[11px] bg-white/80 px-1.5 py-0.5 rounded border border-teal-200">Product, Cat No, Chemical Name, Cas No, Molecular Formula, Molecular Weight, Purity, Main Category Name, API Name, Stock</code>
                  </p>
                </div>
                <a
                  href="/product_bulk_upload_template.xlsx"
                  download="product_bulk_upload_template.xlsx"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0E2358] to-[#0B3B3C] hover:from-[#0B3B3C] hover:to-[#00A389] transition-all shrink-0 shadow-xs cursor-pointer"
                >
                  <IoDownloadOutline className="w-4 h-4 text-[#00A389]" />
                  Download XLSX Template
                </a>
              </div>

              {/* Drag and Drop Zone */}
              <form onSubmit={handleBulkUploadSubmit} className="space-y-5">
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-200 ${
                    dragActive
                      ? 'border-[#00A389] bg-[#E2F7F4]/40 scale-[1.01]'
                      : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="file"
                    id="uploadFile"
                    name="csvFile"
                    accept=".csv, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={handleUploadFileChange}
                    ref={uploadFileInputRef}
                    disabled={bulkLoading}
                    className="hidden"
                  />

                  <div className="w-16 h-16 mx-auto rounded-2xl bg-white text-[#00A389] border border-slate-200 flex items-center justify-center shadow-xs">
                    <IoCloudUploadOutline className="w-8 h-8" />
                  </div>

                  <h3 className="text-base font-bold text-[#0E2358] mt-4">
                    {uploadFile ? uploadFile.name : 'Select or drag your spreadsheet file here'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports Microsoft Excel (.xlsx) and Comma-Separated Values (.csv) up to 25MB
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <label
                      htmlFor="uploadFile"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E2358] hover:bg-[#0B3B3C] transition-all cursor-pointer shadow-xs"
                    >
                      {uploadFile ? 'Change File' : 'Browse Computer'}
                    </label>

                    {uploadFile && (
                      <button
                        type="button"
                        onClick={() => {
                          setUploadFile(null);
                          if (uploadFileInputRef.current) uploadFileInputRef.current.value = '';
                        }}
                        className="px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {/* Upload Action Button */}
                <button
                  type="submit"
                  disabled={bulkLoading || !uploadFile}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-[#0E2358] to-[#0B3B3C] hover:from-[#0B3B3C] hover:to-[#00A389] transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {bulkLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing Spreadsheet & Ingesting Catalog...</span>
                    </>
                  ) : (
                    <>
                      <IoCloudUploadOutline className="w-5 h-5 text-[#00A389]" />
                      <span>Start Bulk Product Import</span>
                    </>
                  )}
                </button>
              </form>

              {/* Bulk Upload Results Display */}
              {bulkUploadResults && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-[#0E2358]">Import Summary Log</h3>

                  {bulkUploadResults.successful?.length > 0 && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                        <IoCheckmarkCircle className="w-5 h-5 text-emerald-600" />
                        <span>Successfully Imported ({bulkUploadResults.successful.length} products)</span>
                      </div>
                      <div className="max-h-48 overflow-y-auto space-y-1.5 custom-scrollbar pr-2">
                        {bulkUploadResults.successful.map((item, idx) => (
                          <div key={idx} className="text-xs text-emerald-900 flex items-center justify-between bg-white/70 px-3 py-1.5 rounded-lg">
                            <span className="font-medium">Row {item.rowNumber}: {item.product?.name}</span>
                            <span className="font-mono text-emerald-700 font-bold">{item.product?.catNumber}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {bulkUploadResults.failed?.length > 0 && (
                    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                        <IoAlertCircleOutline className="w-5 h-5 text-rose-600" />
                        <span>Failed Rows ({bulkUploadResults.failed.length} errors)</span>
                      </div>
                      <div className="max-h-48 overflow-y-auto space-y-1.5 custom-scrollbar pr-2">
                        {bulkUploadResults.failed.map((item, idx) => (
                          <div key={idx} className="text-xs text-rose-900 bg-white/70 px-3 py-2 rounded-lg space-y-0.5">
                            <p className="font-bold">
                              Row {item.rowNumber}: {item.data?.['product'] || item.data?.['cat no'] || 'Unnamed Row'}
                            </p>
                            <p className="text-[11px] text-rose-700">{item.errors?.join('; ')}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: MANAGE POSTS (Blog / News & Events)                               */}
        {/* ========================================================================= */}
        {activeTab === 'post' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Post Editor */}
            <div className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                    <IoDocumentTextOutline className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0E2358]">
                      {editingPostId ? 'Edit Article' : 'Compose New Article'}
                    </h2>
                    <p className="text-xs text-slate-400">Publish to Blog or News & Events</p>
                  </div>
                </div>

                {editingPostId && (
                  <button
                    type="button"
                    onClick={resetPostForm}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <IoRefreshOutline className="w-3.5 h-3.5" />
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handlePostSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="postTitle" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Article Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="postTitle"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="e.g. Advances in Stable Isotope Synthesis for Metabolic Studies"
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="postCategory" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="postCategory"
                      value={postCategory}
                      onChange={(e) => setPostCategory(e.target.value)}
                      required
                      disabled={loading}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all cursor-pointer font-medium"
                    >
                      {POST_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="postAuthor" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Author Byline
                    </label>
                    <input
                      type="text"
                      id="postAuthor"
                      value={postAuthor}
                      onChange={(e) => setPostAuthor(e.target.value)}
                      placeholder="e.g. Pharmavive Science Team"
                      disabled={loading}
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="postContent" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Article Body Content <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="postContent"
                    rows="8"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Write scientific article content or news dossier here..."
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-2xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all leading-relaxed custom-scrollbar"
                  ></textarea>
                </div>

                {/* Post Featured Image */}
                <div className="space-y-2">
                  <label htmlFor="postImage" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Featured Image <span className="text-rose-500">*</span>
                  </label>

                  <div className="border border-dashed border-slate-300 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <input
                      type="file"
                      id="postImage"
                      accept="image/*"
                      onChange={handlePostImageChange}
                      disabled={loading}
                      className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#E2F7F4] file:text-[#00A389] hover:file:bg-[#00A389] hover:file:text-white file:transition-all cursor-pointer"
                    />

                    {(postImagePreview || existingPostImageUrl) && (
                      <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-20 h-14 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex items-center justify-center shrink-0">
                            <Image
                              src={postImagePreview || existingPostImageUrl}
                              alt="Post Preview"
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#0E2358]">
                              {postImagePreview ? 'New Featured Image' : 'Existing Image'}
                            </p>
                            <p className="text-[11px] text-slate-400">Card thumbnail</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-[#0E2358] to-[#0B3B3C] hover:from-[#0B3B3C] hover:to-[#00A389] transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Saving Article...</span>
                    </>
                  ) : (
                    <>
                      <IoDocumentTextOutline className="w-5 h-5 text-[#00A389]" />
                      <span>{editingPostId ? 'Update Published Post' : 'Publish Article'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Existing Posts List */}
            <div className="lg:col-span-6 space-y-4">
              <div className="glass-card rounded-3xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0E2358]">Published Articles</h2>
                    <p className="text-xs text-slate-400">Total {postsList.length} articles active</p>
                  </div>
                </div>

                {postsListLoading ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-8 h-8 mx-auto border-3 border-[#00A389]/20 border-t-[#00A389] rounded-full animate-spin"></div>
                    <p className="text-xs font-semibold text-slate-500">Loading articles...</p>
                  </div>
                ) : postsList.length === 0 ? (
                  <div className="py-12 text-center space-y-2">
                    <IoDocumentTextOutline className="w-10 h-10 mx-auto text-slate-300" />
                    <p className="text-sm font-bold text-[#0E2358]">No Published Articles Yet</p>
                    <p className="text-xs text-slate-400">Create your first blog post using the editor.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 pt-2 space-y-3">
                    {postsList.map((post) => (
                      <div key={post._id} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {post.image ? (
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                              <Image src={post.image} alt={post.title} fill sizes="56px" className="object-cover" />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                              <IoImageOutline className="w-6 h-6" />
                            </div>
                          )}
                          <div className="space-y-0.5">
                            <h4 className="text-sm font-bold text-[#0E2358] line-clamp-1">{post.title}</h4>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E2F7F4] text-[#00A389]">
                                {post.category}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                By {post.author || 'Admin'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleEditPost(post)}
                            disabled={loading}
                            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                            title="Edit Post"
                          >
                            <IoPencilOutline className="w-4 h-4 text-[#0E2358]" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post._id, post.title)}
                            disabled={loading}
                            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                            title="Delete Post"
                          >
                            <IoTrashOutline className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: MANAGE MAIN CATEGORIES                                             */}
        {/* ========================================================================= */}
        {activeTab === 'mainCategories' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#0E2358]">Manage Main Categories</h2>
                <p className="text-sm text-slate-500 mt-1">
                  High-level taxonomic groups (e.g. API Impurities, Reagents, Building Blocks).
                </p>
              </div>

              {/* Add Main Category Form */}
              <form onSubmit={handleAddMainCategory} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={mainCategoryName}
                  onChange={(e) => setMainCategoryName(e.target.value)}
                  placeholder="New category name (e.g. API Impurity Standards)"
                  required
                  disabled={mainCategoryLoading}
                  className="flex-1 px-4 py-3 rounded-2xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all shadow-xs"
                />
                <button
                  type="submit"
                  disabled={mainCategoryLoading || !mainCategoryName.trim()}
                  className="px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-[#0E2358] to-[#0B3B3C] hover:from-[#0B3B3C] hover:to-[#00A389] transition-all shadow-md shrink-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {mainCategoryLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <IoAddCircleOutline className="w-5 h-5 text-[#00A389]" />
                      <span>Add Category</span>
                    </>
                  )}
                </button>
              </form>

              {/* Main Categories List */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-sm font-bold text-[#0E2358]">Existing Main Categories ({mainCategories.length})</h3>

                {mainCategoryLoading && mainCategories.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="w-8 h-8 mx-auto border-3 border-[#00A389]/20 border-t-[#00A389] rounded-full animate-spin"></div>
                  </div>
                ) : mainCategories.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No main categories created yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mainCategories.map((mainCat) => (
                      <div
                        key={mainCat._id}
                        className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 hover:border-[#00A389]/30 transition-all"
                      >
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-[#0E2358]">{capitalizeWords(mainCat.name)}</h4>
                          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 text-slate-600">
                            /{mainCat.slug}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteMainCategory(mainCat._id, mainCat.name)}
                          disabled={mainCategoryLoading}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Delete Category"
                        >
                          <IoTrashOutline className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: MANAGE SUBCATEGORIES                                               */}
        {/* ========================================================================= */}
        {activeTab === 'subCategories' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-extrabold text-[#0E2358]">
                    {editingSubCategoryId ? 'Edit Subcategory' : 'Add New Subcategory'}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    API molecule families (e.g. Abacavir, Remdesivir, Apixaban).
                  </p>
                </div>

                {editingSubCategoryId && (
                  <button
                    type="button"
                    onClick={resetSubCategoryForm}
                    disabled={subCategoryLoading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <IoRefreshOutline className="w-3.5 h-3.5" />
                    Cancel Edit
                  </button>
                )}
              </div>

              {/* Add/Edit Subcategory Form */}
              <form onSubmit={handleAddSubCategory} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="subCategoryName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Subcategory Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subCategoryName"
                      value={subCategoryName}
                      onChange={(e) => setSubCategoryName(e.target.value)}
                      placeholder="e.g. Abacavir"
                      required
                      disabled={subCategoryLoading}
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="selectedMainCategoryForSub" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Parent Main Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="selectedMainCategoryForSub"
                      value={selectedMainCategoryForSub}
                      onChange={(e) => setSelectedMainCategoryForSub(e.target.value)}
                      required
                      disabled={subCategoryLoading || mainCategories.length === 0}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all cursor-pointer font-medium"
                    >
                      <option value="">-- Associate with Main Category --</option>
                      {mainCategories.map((mainCat) => (
                        <option key={mainCat._id} value={mainCat._id}>
                          {capitalizeWords(mainCat.name)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subCategoryDescription" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Description (Optional)
                  </label>
                  <textarea
                    id="subCategoryDescription"
                    rows="3"
                    value={subCategoryDescription}
                    onChange={(e) => setSubCategoryDescription(e.target.value)}
                    placeholder="Brief pharmacological description or synthesis scope..."
                    disabled={subCategoryLoading}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50/70 border border-slate-200/90 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] focus:bg-white transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={subCategoryLoading || mainCategories.length === 0 || !subCategoryName.trim() || !selectedMainCategoryForSub}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-[#0E2358] to-[#0B3B3C] hover:from-[#0B3B3C] hover:to-[#00A389] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {subCategoryLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <IoAddCircleOutline className="w-5 h-5 text-[#00A389]" />
                      <span>{editingSubCategoryId ? 'Update Subcategory' : 'Save Subcategory'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Subcategories List */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-sm font-bold text-[#0E2358]">Existing Subcategories ({subCategories.length})</h3>

                {subCategoryLoading && subCategories.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="w-8 h-8 mx-auto border-3 border-[#00A389]/20 border-t-[#00A389] rounded-full animate-spin"></div>
                  </div>
                ) : subCategories.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No subcategories registered yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {subCategories.map((subCat) => (
                      <div
                        key={subCat._id}
                        className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 hover:border-[#00A389]/30 transition-all"
                      >
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-[#0E2358]">{capitalizeWords(subCat.name)}</h4>
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                            <span className="text-teal-700 font-medium bg-teal-50 px-2 py-0.5 rounded-md">
                              {subCat.mainCategory ? capitalizeWords(subCat.mainCategory.name) : 'No Parent Category'}
                            </span>
                            <span className="font-mono text-slate-400">/{subCat.slug}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleEditSubCategory(subCat)}
                            disabled={subCategoryLoading}
                            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                            title="Edit Subcategory"
                          >
                            <IoPencilOutline className="w-4 h-4 text-[#0E2358]" />
                          </button>
                          <button
                            onClick={() => handleDeleteSubCategory(subCat._id, subCat.name)}
                            disabled={subCategoryLoading}
                            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                            title="Delete Subcategory"
                          >
                            <IoTrashOutline className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
