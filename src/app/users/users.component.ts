import { Component, OnInit, ViewChild } from '@angular/core';
import { UserApiService } from './user.apiService'; 
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

  constructor(private userApiService: UserApiService) {} 

  ngOnInit(): void {
    this.loadData();
    this.statuses = [
      { label: '啟用中', value: true },
      { label: '已停用', value: false },
    ];
  }

  private async loadData(): Promise<void> {
    try {
      this.loading = true;
      const [roles, users] = await Promise.all([
        this.userApiService.getRolesDropDown(),
        this.userApiService.getUsers(),
      ]);

      this.roles = [{ name: '所有角色', value: null }, ...roles];
      this.users = users;
      console.log(this.users);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.loading = false;
      console.log('Data load complete');
    }
  }

  getStatusLabel(value: boolean): string {
    const status = this.statuses.find((status) => status.value === value);
    return status ? status.label : 'Unknown';
  }

  getStatusClass(value: boolean): string {
    return value ? 'status-active' : 'status-inactive';
  }

  // Reload data.
  clear(table: Table): void {
    table.clear();
    this.searchValue = '';
    this.selectedRole = null;
    this.loadData(); 
  }

  filterGlobal(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (input) {
      this.dt1?.filterGlobal(input.value, 'contains');
    }
  }

  filterByRole(event: any): void {
    const selectedValue = event.value;
    console.log(selectedValue);
    if (selectedValue === null) {
      this.dt1?.filter(selectedValue, 'role', 'contains');
    } else {
      this.dt1?.filter(selectedValue, 'role', 'equals');
    }
  }
}
