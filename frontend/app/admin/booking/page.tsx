'use client';

import { useEffect, useState } from 'react';
import { Booking } from '@/lib/types';
import { bookingsApi } from '@/lib/api';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function AdminBookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contactInfo: { phone: '', email: '', address: '' },
    instructions: [''],
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setShowForm(true);
    }
    fetchBookings();
  }, [searchParams]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingsApi.getAll();
      setBookings(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch booking information');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const data = {
        ...formData,
        instructions: formData.instructions.filter((i) => i.trim() !== ''),
      };
      if (editingBooking) {
        await bookingsApi.update(editingBooking._id, data);
      } else {
        await bookingsApi.create(data);
      }
      setShowForm(false);
      setEditingBooking(null);
      setFormData({
        title: '',
        description: '',
        contactInfo: { phone: '', email: '', address: '' },
        instructions: [''],
      });
      fetchBookings();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save booking information');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking information?')) return;
    try {
      await bookingsApi.delete(id);
      fetchBookings();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete booking information');
    }
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setFormData({
      title: booking.title,
      description: booking.description,
      contactInfo: booking.contactInfo || { phone: '', email: '', address: '' },
      instructions: booking.instructions && booking.instructions.length > 0 ? booking.instructions : [''],
    });
    setShowForm(true);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchBookings} />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Booking Information</h1>
        <button
          onClick={() => {
            setEditingBooking(null);
            setFormData({
              title: '',
              description: '',
              contactInfo: { phone: '', email: '', address: '' },
              instructions: [''],
            });
            setShowForm(true);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Booking Info
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingBooking ? 'Edit Booking Information' : 'Create New Booking Information'}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={formData.contactInfo.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, phone: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input
                type="email"
                value={formData.contactInfo.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, email: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Address</label>
              <input
                type="text"
                value={formData.contactInfo.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, address: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={instruction}
                    onChange={(e) => {
                      const newInstructions = [...formData.instructions];
                      newInstructions[index] = e.target.value;
                      setFormData({ ...formData, instructions: newInstructions });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder={`Instruction ${index + 1}`}
                  />
                  {formData.instructions.length > 1 && (
                    <button
                      onClick={() => {
                        const newInstructions = formData.instructions.filter((_, i) => i !== index);
                        setFormData({ ...formData, instructions: newInstructions });
                      }}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setFormData({ ...formData, instructions: [...formData.instructions, ''] })}
                className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Add Instruction
              </button>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingBooking(null);
                }}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{booking.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {booking.description.substring(0, 100)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(booking)}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="text-red-600 hover:text-red-800"
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
