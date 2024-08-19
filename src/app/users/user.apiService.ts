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
      return []; // Return an empty array on error
    }
  }

  async getUsers(): Promise<User[]> {
    const endpoint = '/User/GetUserList';
    try {
      const response = await this.client.get<User[]>(endpoint);
      return this.processUserAvatars(response.data);
    } catch (error: any) {
      this.handleError(error, 'Error fetching users');
      return []; // Return an empty array on error
    }
  }

  processUserAvatars(users: User[]): User[] {
    return users.map((user) => ({
      ...user,
      avatarFileUrl: user.avatarFileUrl || Avatar_Default_URL,
    }));
  }

  private handleError(error: AxiosError, message: string) {
    console.error(message, error);
  }
}
