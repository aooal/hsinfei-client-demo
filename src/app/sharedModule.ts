import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    FormsModule,
    InputTextModule,
    ToolbarModule,
    AvatarModule,
    DropdownModule,
  ],
  exports: [
    CommonModule,
    ButtonModule,
    TableModule,
    FormsModule,
    InputTextModule,
    ToolbarModule,
    AvatarModule,
    DropdownModule,
  ],
})
export class SharedModule {}
