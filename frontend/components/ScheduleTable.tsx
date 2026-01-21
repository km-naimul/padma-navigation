import { Route, Schedule, Launch } from '@/lib/types';
import { formatTime } from '@/lib/utils';
import { Clock, MapPin, CalendarDays } from 'lucide-react';

interface ScheduleTableProps {
  route: Route;
  launches?: Launch[];
}

const ScheduleTable = ({ route, launches = [] }: ScheduleTableProps) => {
  const getLaunchName = (launchId: string | { _id: string; name?: string }): string => {
    // Handle populated object from backend
    if (typeof launchId === 'object' && launchId !== null) {
      return launchId.name || launchId._id || 'Unknown Launch';
    }
    // Handle string ID
    const launch = launches.find((l) => l._id === launchId);
    return launch ? launch.name : launchId;
  };

  // Function to get clean day abbreviation
  const getDayAbbreviation = (day: string): string => {
    const dayMap: { [key: string]: string } = {
      'Monday': 'Mon',
      'Tuesday': 'Tue',
      'Wednesday': 'Wed',
      'Thursday': 'Thu',
      'Friday': 'Fri',
      'Saturday': 'Sat',
      'Sunday': 'Sun',
      // Handle case-insensitive and variations
      'monday': 'Mon',
      'tuesday': 'Tue',
      'wednesday': 'Wed',
      'thursday': 'Thu',
      'friday': 'Fri',
      'saturday': 'Sat',
      'sunday': 'Sun',
    };
    
    // Try exact match first
    if (dayMap[day]) {
      return dayMap[day];
    }
    
    // Try case-insensitive match
    const lowerDay = day.toLowerCase();
    for (const [key, value] of Object.entries(dayMap)) {
      if (key.toLowerCase() === lowerDay) {
        return value;
      }
    }
    
    // Fallback to first 3 characters, capitalized
    return day.substring(0, 3).charAt(0).toUpperCase() + day.substring(1, 3).toLowerCase();
  };

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Launch
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departure Date
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departure Time
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Arrival Time
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stops
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {route.schedules && route.schedules.length > 0 ? (
                route.schedules.map((schedule: Schedule, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      <span className="text-[#d4af37] font-bold tracking-wide">
                        {typeof schedule.launchId === 'object' && schedule.launchId !== null
                          ? schedule.launchId.name || schedule.launchId._id
                          : getLaunchName(schedule.launchId)}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {schedule.departureDate ? (
                        <div className="flex items-center">
                          <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                          {(() => {
                            try {
                              const date = new Date(schedule.departureDate);
                              if (isNaN(date.getTime())) {
                                return schedule.departureDate; // Return as-is if invalid
                              }
                              return date.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              });
                            } catch {
                              return schedule.departureDate; // Return as-is on error
                            }
                          })()}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {schedule.departureTime ? (
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                          {formatTime(schedule.departureTime)}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {schedule.arrivalTime ? (
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                          {formatTime(schedule.arrivalTime)}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-500">
                      {schedule.daysOfWeek && schedule.daysOfWeek.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {schedule.daysOfWeek.map((day, dayIndex) => (
                            <span
                              key={dayIndex}
                              className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 text-xs rounded"
                            >
                              {getDayAbbreviation(day)}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-500">
                      {schedule.ghatIds && schedule.ghatIds.length > 0 ? (
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                          {schedule.ghatIds.length} stop{schedule.ghatIds.length !== 1 ? 's' : ''}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 sm:px-6 py-4 text-center text-xs sm:text-sm text-gray-500">
                    No schedules available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
