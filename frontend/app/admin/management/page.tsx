'use client';

import { useEffect, useState } from 'react';
import { Management } from '@/lib/types';
import { managementApi } from '@/lib/api';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function AdminManagementPage() {
  const [management, setManagement] = useState<Management[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Management | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    description: '',
    order: 0,
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setShowForm(true);
    }
    fetchManagement();
  }, [searchParams]);

  const fetchManagement = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await managementApi.getAll();
      setManagement(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch management members');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingMember) {
        await managementApi.update(editingMember._id, formData);
      } else {
        await managementApi.create(formData);
      }
      setShowForm(false);
      setEditingMember(null);
      setFormData({ name: '', position: '', description: '', order: 0 });
      fetchManagement();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save management member');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this management member?')) return;
    try {
      await managementApi.delete(id);
      fetchManagement();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete management member');
    }
  };

  const handleEdit = (member: Management) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      description: member.description,
      order: member.order || 0,
    });
    setShowForm(true);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchManagement} />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Management Team</h1>
        <button
          onClick={() => {
            setEditingMember(null);
            setFormData({ name: '', position: '', description: '', order: 0 });
            setShowForm(true);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          Add Member
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            {editingMember ? 'Edit Management Member' : 'Create New Management Member'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={4}
                required
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
                  setEditingMember(null);
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
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {management.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 sm:px-6 py-8 text-center text-sm text-gray-500">
                        No management members found
                      </td>
                    </tr>
                  ) : (
                    management.map((member) => (
                      <tr key={member._id} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">{member.name}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.position}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(member)}
                              className="text-primary-600 hover:text-primary-800 p-1 touch-manipulation"
                              aria-label="Edit member"
                            >
                              <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(member._id)}
                              className="text-red-600 hover:text-red-800 p-1 touch-manipulation"
                              aria-label="Delete member"
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
