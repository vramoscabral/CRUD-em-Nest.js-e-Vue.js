import axios from 'axios';

export interface Note {
  id?: number;
  title: string;
  note: string;
}

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const NoteService = {
  async getAll(): Promise<{ data: Note[] }> {
    try {
      const response = await api.get('/note');
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
      throw error;
    }
  },

  async create(note: Note): Promise<{ data: Note }> {
    try {
      const response = await api.post('/note', note);
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao criar nota:', error);
      throw error;
    }
  },

  async update(id: number, note: Note): Promise<{ data: Note }> {
    try {
      const response = await api.put(`/note/${id}`, note);
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
      throw error;
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/note/${id}`);
    } catch (error) {
      console.error('Erro ao deletar nota:', error);
      throw error;
    }
  },
};