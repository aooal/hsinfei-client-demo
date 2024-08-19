import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { API_BASE_URL, Avatar_Default_URL } from '../app.config';
import { User } from './user.model';
import { Roles } from './roles.model';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly client = axios.create({
    baseURL: API_BASE_URL,
  });

  constructor() {}

  async getRolesDropDown(): Promise<Roles[]> {
    const endpoint = '/User/GetRolesDropDown';
    try {
      const response = await this.client.get<Roles[]>(endpoint);
      return response.data;
    } catch (error: any) {
      this.handleError(error, 'Error fetching roles');
      return [];
    }
  }

  async getUsers(): Promise<User[]> {
    const endpoint = '/User/GetUserList';
    try {
      const response = await this.client.get<User[]>(endpoint);
      return this.processUserAvatars(response.data);
    } catch (error: any) {
      this.handleError(error, 'Error fetching users');
      return [];
    }
  }

  processUserAvatars(users: User[]): User[] {
    return users.map((user) => ({
      ...user,
      avatarFileUrl: user.avatarFileUrl || Avatar_Default_URL,
    }));
  }
  async updateUserStatus(id: string, status: boolean): Promise<string> {
    const endpoint = '/User/UpdateUserStatus';
    try {
      const response = await this.client.post<string>(endpoint, { id, status });
      return response.data;
    } catch (error: unknown) {
      this.handleError(error, 'Error updating user status');
      throw error;
    }
  }

  private handleError(error: unknown, message: string) {
    if (axios.isAxiosError(error)) {
      console.error(message, {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    } else if (error instanceof Error) {
      console.error(message, error.message);
    } else {
      console.error(message, error);
    }
  }
}
