'use client';

import { useEffect, useState } from 'react';
import { Launch } from '@/lib/types';
import { launchesApi } from '@/lib/api';
import LaunchForm from '@/components/Admin/LaunchForm';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLaunchesPage() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingLaunch, setEditingLaunch] = useState<Launch | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setShowForm(true);
    }
    fetchLaunches();
  }, [searchParams]);

  const fetchLaunches = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await launchesApi.getAll();
      setLaunches(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch launches');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this launch?')) return;

    try {
      await launchesApi.delete(id);
      fetchLaunches();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete launch');
    }
  };

  const handleImageUpload = async (id: string, file: File) => {
    try {
      await launchesApi.uploadImage(id, file);
      fetchLaunches();
      alert('Image uploaded successfully');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to upload image');
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchLaunches} />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Launches</h1>
        <button
          onClick={() => {
            setEditingLaunch(null);
            setShowForm(true);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Launch
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingLaunch ? 'Edit Launch' : 'Create New Launch'}
          </h2>
          <LaunchForm
            launch={editingLaunch || undefined}
            onSave={() => {
              setShowForm(false);
              setEditingLaunch(null);
              fetchLaunches();
            }}
            onCancel={() => {
              setShowForm(false);
              setEditingLaunch(null);
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
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {launches.map((launch) => (
                <tr key={launch._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {launch.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {launch.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        launch.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {launch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {launch.contactNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingLaunch(launch);
                          setShowForm(true);
                        }}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <label className="text-primary-600 hover:text-primary-900 cursor-pointer">
                        <Upload className="h-5 w-5" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(launch._id, file);
                          }}
                        />
                      </label>
                      <button
                        onClick={() => handleDelete(launch._id)}
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
