'use client';

import { useState } from 'react';
import { Ghat } from '@/lib/types';
import { ghatsApi } from '@/lib/api';

interface GhatFormProps {
  ghat?: Ghat;
  onSave: () => void;
  onCancel: () => void;
}

const GhatForm = ({ ghat, onSave, onCancel }: GhatFormProps) => {
  const [formData, setFormData] = useState({
    name: ghat?.name || '',
    location: ghat?.location || '',
    address: ghat?.address || '',
    coordinates: ghat?.coordinates || { lat: 0, lng: 0 },
    facilities: ghat?.facilities || [],
    contactNumber: ghat?.contactNumber || '',
  });
  const [facilityInput, setFacilityInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (ghat) {
        await ghatsApi.update(ghat._id, formData);
      } else {
        await ghatsApi.create(formData);
      }
      onSave();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save ghat');
    } finally {
      setLoading(false);
    }
  };

  const addFacility = () => {
    if (facilityInput.trim() && !formData.facilities.includes(facilityInput.trim())) {
      setFormData({
        ...formData,
        facilities: [...formData.facilities, facilityInput.trim()],
      });
      setFacilityInput('');
    }
  };

  const removeFacility = (facility: string) => {
    setFormData({
      ...formData,
      facilities: formData.facilities.filter((f) => f !== facility),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ghat Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location *
        </label>
        <input
          type="text"
          required
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            value={formData.coordinates?.lat || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                coordinates: {
                  ...formData.coordinates!,
                  lat: parseFloat(e.target.value) || 0,
                },
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            value={formData.coordinates?.lng || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                coordinates: {
                  ...formData.coordinates!,
                  lng: parseFloat(e.target.value) || 0,
                },
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contact Number
        </label>
        <input
          type="tel"
          value={formData.contactNumber}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Facilities
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={facilityInput}
            onChange={(e) => setFacilityInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFacility())}
            placeholder="Add facility (e.g., Parking, Waiting Area)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addFacility}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.facilities.map((facility, index) => (
            <span
              key={index}
              className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {facility}
              <button
                type="button"
                onClick={() => removeFacility(facility)}
                className="text-primary-600 hover:text-primary-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : ghat ? 'Update Ghat' : 'Create Ghat'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default GhatForm;
