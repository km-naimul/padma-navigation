'use client';

import { useState, useEffect } from 'react';
import { Route, Schedule } from '@/lib/types';
import { routesApi, launchesApi, ghatsApi } from '@/lib/api';
import { Launch, Ghat } from '@/lib/types';

interface RouteFormProps {
  route?: Route;
  onSave: () => void;
  onCancel: () => void;
}

const RouteForm = ({ route, onSave, onCancel }: RouteFormProps) => {
  const [formData, setFormData] = useState({
    name: route?.name || '',
    launchIds: route?.launchIds || [],
    schedules: route?.schedules || [],
    distance: route?.distance || '',
    estimatedDuration: route?.estimatedDuration || '',
  });
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [ghats, setGhats] = useState<Ghat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const [launchesRes, ghatsRes] = await Promise.all([
        launchesApi.getAll(),
        ghatsApi.getAll(),
      ]);
      setLaunches(launchesRes.data.data || []);
      setGhats(ghatsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (route) {
        await routesApi.update(route._id, formData);
      } else {
        await routesApi.create(formData);
      }
      onSave();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save route');
    } finally {
      setLoading(false);
    }
  };

  const addSchedule = () => {
    setFormData({
      ...formData,
      schedules: [
        ...formData.schedules,
        {
          launchId: '',
          departureTime: '',
          arrivalTime: '',
          daysOfWeek: [],
          ghatIds: [],
        },
      ],
    });
  };

  const updateSchedule = (index: number, field: keyof Schedule, value: any) => {
    const updatedSchedules = [...formData.schedules];
    updatedSchedules[index] = { ...updatedSchedules[index], [field]: value };
    setFormData({ ...formData, schedules: updatedSchedules });
  };

  const removeSchedule = (index: number) => {
    setFormData({
      ...formData,
      schedules: formData.schedules.filter((_, i) => i !== index),
    });
  };

  const toggleDay = (scheduleIndex: number, day: string) => {
    const schedule = formData.schedules[scheduleIndex];
    const days = schedule.daysOfWeek || [];
    const updatedDays = days.includes(day)
      ? days.filter((d) => d !== day)
      : [...days, day];
    updateSchedule(scheduleIndex, 'daysOfWeek', updatedDays);
  };

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Route Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distance
          </label>
          <input
            type="text"
            value={formData.distance}
            onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Duration
          </label>
          <input
            type="text"
            value={formData.estimatedDuration}
            onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Launches
        </label>
        <select
          multiple
          value={formData.launchIds}
          onChange={(e) =>
            setFormData({
              ...formData,
              launchIds: Array.from(e.target.selectedOptions, (option) => option.value),
            })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {launches.map((launch) => (
            <option key={launch._id} value={launch._id}>
              {launch.name}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">Schedules</label>
          <button
            type="button"
            onClick={addSchedule}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-sm"
          >
            Add Schedule
          </button>
        </div>

        {formData.schedules.map((schedule, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Schedule {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeSchedule(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Launch *
                </label>
                <select
                  required
                  value={schedule.launchId}
                  onChange={(e) => updateSchedule(index, 'launchId', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select Launch</option>
                  {launches.map((launch) => (
                    <option key={launch._id} value={launch._id}>
                      {launch.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Time *
                </label>
                <input
                  type="time"
                  required
                  value={schedule.departureTime}
                  onChange={(e) => updateSchedule(index, 'departureTime', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arrival Time
                </label>
                <input
                  type="time"
                  value={schedule.arrivalTime || ''}
                  onChange={(e) => updateSchedule(index, 'arrivalTime', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghats (Stops)
                </label>
                <select
                  multiple
                  value={schedule.ghatIds || []}
                  onChange={(e) =>
                    updateSchedule(
                      index,
                      'ghatIds',
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {ghats.map((ghat) => (
                    <option key={ghat._id} value={ghat._id}>
                      {ghat.name} - {ghat.location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Days of Week *
              </label>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(index, day)}
                    className={`px-3 py-1 rounded text-sm ${
                      schedule.daysOfWeek?.includes(day)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {day.substring(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : route ? 'Update Route' : 'Create Route'}
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

export default RouteForm;
