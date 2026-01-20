'use client';

import { useEffect, useState } from 'react';
import { Policy } from '@/lib/types';
import { policiesApi } from '@/lib/api';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function AdminPoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    order: 0,
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setShowForm(true);
    }
    fetchPolicies();
  }, [searchParams]);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await policiesApi.getAll();
      setPolicies(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch policies');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingPolicy) {
        await policiesApi.update(editingPolicy._id, formData);
      } else {
        await policiesApi.create(formData);
      }
      setShowForm(false);
      setEditingPolicy(null);
      setFormData({ title: '', content: '', category: 'General', order: 0 });
      fetchPolicies();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save policy');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this policy?')) return;
    try {
      await policiesApi.delete(id);
      fetchPolicies();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete policy');
    }
  };

  const handleEdit = (policy: Policy) => {
    setEditingPolicy(policy);
    setFormData({
      title: policy.title,
      content: policy.content,
      category: policy.category || 'General',
      order: policy.order || 0,
    });
    setShowForm(true);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchPolicies} />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Policies</h1>
        <button
          onClick={() => {
            setEditingPolicy(null);
            setFormData({ title: '', content: '', category: 'General', order: 0 });
            setShowForm(true);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          Add Policy
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            {editingPolicy ? 'Edit Policy' : 'Create New Policy'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={8}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleSave}
                className="bg-primary-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-primary-700 text-sm sm:text-base w-full sm:w-auto"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingPolicy(null);
                }}
                className="bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-300 text-sm sm:text-base w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {policies.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 sm:px-6 py-8 text-center text-sm text-gray-500">
                        No policies found
                      </td>
                    </tr>
                  ) : (
                    policies.map((policy) => (
                      <tr key={policy._id} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">{policy.title}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {policy.category || 'General'}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(policy)}
                              className="text-primary-600 hover:text-primary-800 p-1 touch-manipulation"
                              aria-label="Edit policy"
                            >
                              <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(policy._id)}
                              className="text-red-600 hover:text-red-800 p-1 touch-manipulation"
                              aria-label="Delete policy"
                            >
                              <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
