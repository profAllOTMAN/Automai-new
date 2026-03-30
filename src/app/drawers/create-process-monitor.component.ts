import { Component, EventEmitter, Output, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-process-monitor-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end">
      <div class="w-full max-w-[800px] bg-slate-50 h-full shadow-2xl flex flex-col overflow-hidden animate-slide-in">
        
        <!-- Full Width Stepper (Onboarding Mode) -->
        @if (mode === 'onboarding') {
          <div class="w-full bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">In progress (3/3)</span>
            <div class="flex items-center gap-2 text-xs font-semibold tracking-wider">
              <span class="text-emerald-500 flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">check_circle</span> Step 1</span>
              <span class="text-slate-300 material-symbols-outlined text-[14px]">chevron_right</span>
              <span class="text-emerald-500 flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">check_circle</span> Step 2</span>
              <span class="text-slate-300 material-symbols-outlined text-[14px]">chevron_right</span>
              <span class="text-primary flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">radio_button_checked</span> Step 3</span>
            </div>
          </div>
        }

        <!-- Header -->
        <header class="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-white">
          <div class="flex items-center gap-3 text-slate-900">
            <div class="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
              <span class="material-symbols-outlined text-2xl">monitoring</span>
            </div>
            <div class="flex flex-col">
              <h2 class="text-lg font-medium text-primary leading-tight">{{ isEditing ? 'Edit Process Monitor' : 'Create Process Monitor' }}</h2>
              <p class="text-xs text-slate-500">{{ monitorName || 'pm2 AW-5241' }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <button class="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-full transition-colors">
              <span class="material-symbols-outlined text-[16px]">play_circle</span>
              Watch Tutorial
            </button>
            <button (click)="closeDrawer.emit()" class="flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full h-8 w-8 transition-colors">
              <span class="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </header>

        <!-- Scrollable Content Area -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-slate-50">
          
          <!-- 1. Process monitor information -->
          <section class="bg-white border border-slate-200 rounded-lg p-6">
            <div class="mb-4">
              <h3 class="text-slate-700 text-lg font-medium">1. Process monitor information</h3>
              <p class="text-slate-500 text-sm">Select a project, process and schedule to run this Process monitor</p>
            </div>
            
            <div class="grid grid-cols-3 gap-4 mb-4">
              <div class="flex flex-col gap-1.5">
                <label for="monitorName" class="text-sm font-medium text-slate-700">Process monitor name*</label>
                <input type="text" id="monitorName" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" [value]="monitorName || 'pm2'" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="project" class="text-sm font-medium text-slate-700">Project*</label>
                <div class="relative">
                  <select id="project" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                    <option>myproject</option>
                  </select>
                  <div class="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                    <span class="material-symbols-outlined text-slate-500 text-sm">arrow_drop_down</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="process" class="text-sm font-medium text-slate-700">Process*</label>
                <div class="relative">
                  <select id="process" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                    <option>scenario2</option>
                  </select>
                  <div class="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                    <span class="material-symbols-outlined text-slate-500 text-sm">arrow_drop_down</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 mb-4">
              <div class="flex flex-col gap-1.5">
                <label for="schedule" class="text-sm font-medium text-slate-700">Select an execution schedule*</label>
                <div class="flex gap-2 items-center">
                  <div class="relative flex-1">
                    <select id="schedule" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                      <option>Every 5 minutes</option>
                      <option>Every 15 minutes</option>
                      <option>Hourly</option>
                      <option>Daily at 00:00</option>
                      <option>Weekly on Sunday</option>
                    </select>
                    <div class="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                      <span class="material-symbols-outlined text-slate-500 text-sm">arrow_drop_down</span>
                    </div>
                  </div>
                  <button type="button" (click)="openAddSchedule.emit()" class="flex items-center justify-center w-[42px] h-[42px] border border-slate-300 rounded-md hover:bg-slate-50 text-slate-500 transition-colors bg-white shadow-sm" title="Create New Schedule">
                    <span class="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="maintenance" class="text-sm font-medium text-slate-700">Select a maintenance calendar</label>
                <div class="relative">
                  <select id="maintenance" class="block px-3 py-2.5 pr-16 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                    <option></option>
                  </select>
                  <div class="absolute right-8 top-0 bottom-0 w-8 flex items-center justify-center">
                    <span class="material-symbols-outlined text-slate-400 hover:text-slate-600 cursor-pointer text-sm">close</span>
                  </div>
                  <div class="absolute right-0 top-0 bottom-0 w-8 flex items-center justify-center pointer-events-none border-l border-slate-200">
                    <span class="material-symbols-outlined text-slate-500 text-sm">arrow_drop_down</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="description" class="text-sm font-medium text-slate-700">Description</label>
                <textarea id="description" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y min-h-[42px]"></textarea>
              </div>
            </div>

            <label class="flex items-center gap-2 cursor-pointer mt-4">
              <input type="checkbox" class="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"/>
              <span class="text-slate-700 text-sm">Do not show error message on failure images</span>
            </label>
          </section>

          <!-- 2. rWatcher Distribution and Locations -->
          <section class="bg-white border border-slate-200 rounded-lg p-6">
            <div class="mb-4">
              <h3 class="text-slate-700 text-lg font-medium">2. rWatcher Distribution and Locations</h3>
              <p class="text-slate-500 text-sm">Select locations/rWatchers or rWatcher groups to run this process monitor</p>
            </div>

            <div class="w-1/2 flex flex-col gap-1.5 mb-4">
              <label for="distributionType" class="text-sm font-medium text-slate-700">Select distribution type to be used in this test</label>
              <div class="relative">
                <select id="distributionType" (change)="distributionType.set($any($event.target).value)" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                  <option value="individual">Individual rWatchers</option>
                  <option value="group">rWatcher Groups</option>
                </select>
                <div class="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                  <span class="material-symbols-outlined text-slate-500 text-sm">arrow_drop_down</span>
                </div>
              </div>
            </div>

            <div class="border border-slate-300 rounded-md p-4">
              <div class="flex flex-col gap-1.5">
                <div class="flex items-center justify-between">
                  <label class="text-slate-700 text-sm font-medium block">
                    {{ distributionType() === 'group' ? 'Select Group' : 'Select rWatcher' }}
                  </label>
                  <button type="button" (click)="openAddWatcher.emit()" class="flex items-center gap-1 text-sm text-primary hover:underline font-medium">
                    <span class="material-symbols-outlined text-[16px]">add</span> New Watcher
                  </button>
                </div>
                <div class="relative">
                  <select class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                    @if (distributionType() === 'group') {
                      <option>All Windows Servers</option>
                      <option>Finance Department</option>
                      <option>European Region</option>
                    } @else {
                      <option>rWatcher001 (192.168.1.105)</option>
                      <option>rWatcher002 (192.168.1.106)</option>
                      <option>rWatcher003 (10.0.0.5)</option>
                    }
                  </select>
                  <div class="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                    <span class="material-symbols-outlined text-slate-500 text-sm">arrow_drop_down</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 3. Process monitor events -->
          <section class="bg-white border border-slate-200 rounded-lg p-6">
            <div class="mb-4">
              <h3 class="text-slate-700 text-lg font-medium">3. Process monitor events</h3>
              <p class="text-slate-500 text-sm">Manage process monitor events for selected process or its sub-process/transactions</p>
            </div>

            <div class="border-t border-slate-200 pt-4">
              <div class="grid grid-cols-4 gap-4 text-sm font-medium text-slate-600 mb-4">
                <div class="flex items-center gap-2">
                  Process monitor item
                  <button class="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-colors">
                    <span class="material-symbols-outlined text-[14px]">add</span> New event
                  </button>
                </div>
                <div>Raise</div>
                <div>When</div>
                <div>Do</div>
              </div>
              <div class="text-center py-8 text-slate-400 text-sm border-t border-slate-100">
                No events configured yet.
              </div>
            </div>
          </section>

        </div>

        <!-- Footer Actions -->
        <footer class="border-t border-slate-200 p-6 bg-white flex justify-end">
          <div class="relative inline-block">
            <button (click)="nextStep.emit()" class="px-8 py-2 rounded-full bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-md shadow-primary/20 relative z-10">
              {{ isEditing ? 'Save Changes' : 'Publish' }}
            </button>
            
            @if (mode === 'onboarding') {
              <!-- Guided Tour Tooltip -->
              <div class="absolute bottom-full mb-4 right-0 bg-slate-800 text-white text-sm font-medium px-4 py-3 rounded-lg shadow-xl w-max max-w-[280px] text-center animate-bounce z-20 whitespace-normal leading-relaxed">
                🎉 Finally, link them together! Click Publish to activate your monitor.
                <div class="absolute -bottom-1.5 right-8 w-3 h-3 bg-slate-800 rotate-45"></div>
              </div>
              
              <!-- Pulsing ring -->
              <div class="absolute inset-0 rounded-full bg-primary/40 animate-ping z-0"></div>
            }
          </div>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    .animate-slide-in {
      animation: slideIn 0.3s ease-out forwards;
    }
  `]
})
export class CreateProcessMonitorDrawerComponent {
  @Input() mode: 'onboarding' | 'standalone' = 'standalone';
  @Input() isEditing = false;
  @Input() monitorName = '';
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();
  @Output() openAddWatcher = new EventEmitter<void>();
  @Output() openAddSchedule = new EventEmitter<void>();

  distributionType = signal<'individual' | 'group'>('individual');
}
