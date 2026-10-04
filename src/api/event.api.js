import apiClient from './client';

export const eventApi = {
  getEvents: async ({ limit = 6, skip = 0, sortBy = '', category = '' } = {}) => {
    const params = { limit, skip };
    if (sortBy) params.sortBy = sortBy;
    if (category) params.category = category;

    const response = await apiClient.get('/getEvent', { params });
    // Support both modern (data.events) and legacy (data.getEvents) structures
    const data = response.data;
    const events = data.events || data.getEvents || [];
    const totalEvents = data.totalEvents !== undefined ? data.totalEvents : (data.allEvents || 0);

    return {
      events,
      totalEvents,
      page: data.page || Math.floor(skip / limit) + 1,
      totalPages: data.totalPages || Math.ceil(totalEvents / limit),
      raw: data,
    };
  },

  searchEvents: async ({ category = '', query = '' } = {}) => {
    const params = {};
    if (category) params.category = category;
    if (query) params.query = query;

    const response = await apiClient.get('/searchedEvents', { params });
    return response.data || [];
  },

  getMyEvents: async () => {
    const response = await apiClient.get('/getEachEvent');
    return response.data || [];
  },

  createEvent: async (eventData) => {
    const response = await apiClient.post('/createEvent', eventData);
    return response.data;
  },

  deleteEvent: async (eventId) => {
    const response = await apiClient.delete(`/events/${eventId}`);
    return response.data;
  },
};
