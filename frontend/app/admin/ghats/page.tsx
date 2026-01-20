'use client';

import { useEffect, useState } from 'react';
import { Ghat } from '@/lib/types';
import { ghatsApi } from '@/lib/api';
import GhatForm from '@/components/Admin/GhatForm';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function AdminGhatsPage() {
  const [ghats, setGhats] = useState<Ghat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingGhat, setEditingGhat] = useState<Ghat | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setShowForm(true);
    }
    fetchGhats();
  }, [searchParams]);

  const fetchGhats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ghatsApi.getAll();
      setGhats(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch ghats');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ghat?')) return;

    try {
      await ghatsApi.delete(id);
      fetchGhats();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete ghat');
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchGhats} />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Ghats</h1>
        <button
          onClick={() => {
            setEditingGhat(null);
            setShowForm(true);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Ghat
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingGhat ? 'Edit Ghat' : 'Create New Ghat'}
          </h2>
          <GhatForm
            ghat={editingGhat || undefined}
            onSave={() => {
              setShowForm(false);
              setEditingGhat(null);
              fetchGhats();
            }}
            onCancel={() => {
              setShowForm(false);
              setEditingGhat(null);
            }}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Facilities
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ghats.map((ghat) => (
                <tr key={ghat._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ghat.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ghat.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {ghat.facilities?.length || 0} facilities
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingGhat(ghat);
                          setShowForm(true);
                        }}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(ghat._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
