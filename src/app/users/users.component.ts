import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL, Avatar_Default_URL } from '../app.config';
import { User } from './user.model';
import { SharedModule } from '../sharedModule';
import { Table } from 'primeng/table';
import { Roles } from './roles.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild('dt1') dt1: Table | undefined;
  users: User[] = [];
  roles: Roles[] = [];
  statuses!: any[];
  loading: boolean = true;
  searchValue: string | undefined;
  selectedRole: number | null = null;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
    this.getRolesDropDown();
    this.statuses = [
      { label: '啟用中', value: true },
      { label: '已停用', value: false },
    ];
  }
  getStatusLabel(value: boolean): string {
    const status = this.statuses.find((status) => status.value === value);
    return status ? status.label : 'Unknown';
  }
  getStatusClass(value: boolean): string {
    return value ? 'status-active' : 'status-inactive';
  }
  getRolesDropDown(): void {
    const endpoint = `${API_BASE_URL}/User/GetRolesDropDown`;
    this.http.get<Roles[]>(endpoint).subscribe({
      next: (data) => {
        this.roles = [{ name: '所有角色', value: null }, ...data];
        this.selectedRole = null; 
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  getUsers(): void {
    const endpoint = `${API_BASE_URL}/User/GetUserList`;
    this.http.get<User[]>(endpoint).subscribe({
      next: (data) => {
        this.users = data;
        this.users = this.users.map((user) => ({
          ...user,
          avatarFileUrl: user.avatarFileUrl || Avatar_Default_URL,
        }));
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
      complete: () => {
        this.loading = false;
        console.log('User fetch complete');
      },
    });
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
    this.selectedRole = null; 
    this.getUsers();
  }

  filterGlobal(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (input) {
      console.log('Global filter value:', input.value);
      this.dt1?.filterGlobal(input.value, 'contains');
    }
  }
  filterByRole(event: any): void {
    const selectedValue = event.value;
    console.log(selectedValue);
    if (selectedValue === null) {
      console.log('first')
      this.dt1?.filter(selectedValue, 'role', 'contains');
    } else {
      this.dt1?.filter(selectedValue, 'role', 'equals');
    }
  }
}
