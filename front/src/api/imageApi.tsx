import axios from 'axios';
import api from 'axios';
import { Alert } from 'react-native';

export const getImages = async () => {
  const response = await api.get('http://127.0.0.1:8000/api/images');
  return response.data;
};

export const getImage = async (id:number) => {
  const response = await api.get(`http://127.0.0.1:8000/api/images/${id}`);
  return response.data;
};

export const createImage = async (url:string) => {
  const response = await api.post('http://127.0.0.1:8000/api/images', { url });
  return response.data;
};

export const updateImage = async (id:number, url:string) => {
  const response = await api.put(`http://127.0.0.1:8000/api/images/${id}`, { url });
  return response.data;
};

export const deleteImage = async (id:number) => {
  const response = await api.delete(`http://127.0.0.1:8000/api/images/${id}`);
  return response.status === 204;
};

export const searchImages = async (query:string) => {
  const response = await api.get('http://127.0.0.1:8000/api/images/search', { params: { q: query } });
  return response.data;
};
