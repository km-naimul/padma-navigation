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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Launches</h1>
        <button
          onClick={() => {
            setEditingLaunch(null);
            setShowForm(true);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          Add Launch
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
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
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {launches.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 sm:px-6 py-8 text-center text-sm text-gray-500">
                        No launches found
                      </td>
                    </tr>
                  ) : (
                    launches.map((launch) => (
                      <tr key={launch._id} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {launch.name}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {launch.capacity}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
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
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {launch.contactNumber}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingLaunch(launch);
                                setShowForm(true);
                              }}
                              className="text-primary-600 hover:text-primary-900 p-1 touch-manipulation"
                              aria-label="Edit launch"
                            >
                              <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                            <label className="text-primary-600 hover:text-primary-900 cursor-pointer p-1 touch-manipulation">
                              <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
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
                              className="text-red-600 hover:text-red-900 p-1 touch-manipulation"
                              aria-label="Delete launch"
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
