import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-schedule-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-end z-50">
      <div class="w-full max-w-[600px] bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        
        <!-- Full Width Stepper (Onboarding Mode) -->
        @if (mode === 'onboarding') {
          <div class="w-full bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">In progress (2/3)</span>
            <div class="flex items-center gap-2 text-xs font-semibold tracking-wider">
              <span class="text-emerald-500 flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">check_circle</span> Step 1</span>
              <span class="text-slate-300 material-symbols-outlined text-[14px]">chevron_right</span>
              <span class="text-primary flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">radio_button_checked</span> Step 2</span>
              <span class="text-slate-300 material-symbols-outlined text-[14px]">chevron_right</span>
              <span class="text-slate-400 flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">radio_button_unchecked</span> Step 3</span>
            </div>
          </div>
        }

        <!-- Header -->
        <header class="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-white">
          <div class="flex items-center gap-3 text-slate-900">
            <div class="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
              <span class="material-symbols-outlined text-2xl">schedule</span>
            </div>
            <div class="flex flex-col">
              <h2 class="text-lg font-medium text-primary leading-tight">New schedule</h2>
              <p class="text-xs text-slate-500">Schedule jobs to run automatically</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <button (click)="closeDrawer.emit()" class="flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full h-8 w-8 transition-colors">
              <span class="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </header>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-6 bg-white space-y-8">
          
          <!-- BASIC INFORMATION -->
          <div class="space-y-4">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">BASIC INFORMATION</h3>
            <div class="flex flex-col gap-1.5">
              <label for="scheduleName" class="text-sm font-medium text-slate-700">Schedule Name*</label>
              <input type="text" id="scheduleName" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <div class="flex flex-col gap-1.5 mt-4">
              <label for="description" class="text-sm font-medium text-slate-700">Description</label>
              <textarea id="description" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y min-h-[80px]"></textarea>
            </div>
          </div>

          <!-- TIMEZONE CONFIGURATION -->
          <div class="space-y-4">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">TIMEZONE CONFIGURATION</h3>
            <div class="flex flex-col gap-1.5">
              <label for="timezone" class="text-sm font-medium text-slate-700">Schedule Timezone</label>
              <div class="relative">
                <select id="timezone" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                  <option>UTC</option>
                  <option>Pacific Time</option>
                  <option>Eastern Time</option>
                </select>
                <div class="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                  <span class="material-symbols-outlined text-slate-500 text-sm">arrow_drop_down</span>
                </div>
              </div>
            </div>
          </div>

          <!-- SCHEDULE TYPE -->
          <div class="space-y-4">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">SCHEDULE TYPE</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="border-2 border-primary bg-primary/5 rounded p-4 cursor-pointer">
                <div class="font-medium text-slate-800 text-sm mb-1">Interval</div>
                <div class="text-xs text-slate-500">Run repeatedly every X minutes/hours</div>
              </div>
              <div class="border border-slate-200 rounded p-4 cursor-pointer hover:border-primary/50 transition-colors">
                <div class="font-medium text-slate-800 text-sm mb-1">Fixed Times</div>
                <div class="text-xs text-slate-500">Run at specific times each day</div>
              </div>
            </div>
          </div>

          <!-- INTERVAL CONFIGURATION -->
          <div class="space-y-4 pt-4 border-t border-slate-200">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">INTERVAL CONFIGURATION</h3>
            <div class="grid grid-cols-3 gap-4">
              <div class="flex flex-col gap-1.5">
                <label for="intervalValue" class="text-sm font-medium text-slate-700">Interval Value</label>
                <div class="relative">
                  <select id="intervalValue" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                    <option>10</option>
                    <option>15</option>
                    <option>30</option>
                  </select>
                  <div class="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                    <span class="material-symbols-outlined text-slate-500 text-sm">arrow_drop_down</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="intervalUnit" class="text-sm font-medium text-slate-700">Interval Unit</label>
                <div class="relative">
                  <select id="intervalUnit" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                    <option>Minutes</option>
                    <option>Hours</option>
                  </select>
                  <div class="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                    <span class="material-symbols-outlined text-slate-500 text-sm">arrow_drop_down</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="offsetMinutes" class="text-sm font-medium text-slate-700">Offset Minutes</label>
                <input type="text" id="offsetMinutes" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" value="0" />
              </div>
            </div>
          </div>

          <!-- ACTIVE DAYS -->
          <div class="space-y-4 pt-4 border-t border-slate-200">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">ACTIVE DAYS</h3>
            <div class="text-slate-600 text-sm mb-2">Run on these days</div>
            <div class="flex border border-slate-300 rounded overflow-hidden">
              <label class="flex-1 flex items-center justify-center gap-1 py-2 border-r border-slate-300 bg-slate-100 cursor-pointer hover:bg-slate-200 transition-colors">
                <input type="checkbox" checked class="accent-primary"/>
                <span class="text-xs font-medium text-slate-700">Mon</span>
              </label>
              <label class="flex-1 flex items-center justify-center gap-1 py-2 border-r border-slate-300 bg-slate-100 cursor-pointer hover:bg-slate-200 transition-colors">
                <input type="checkbox" checked class="accent-primary"/>
                <span class="text-xs font-medium text-slate-700">Tue</span>
              </label>
              <label class="flex-1 flex items-center justify-center gap-1 py-2 border-r border-slate-300 bg-slate-100 cursor-pointer hover:bg-slate-200 transition-colors">
                <input type="checkbox" checked class="accent-primary"/>
                <span class="text-xs font-medium text-slate-700">Wed</span>
              </label>
              <label class="flex-1 flex items-center justify-center gap-1 py-2 border-r border-slate-300 bg-slate-100 cursor-pointer hover:bg-slate-200 transition-colors">
                <input type="checkbox" checked class="accent-primary"/>
                <span class="text-xs font-medium text-slate-700">Thu</span>
              </label>
              <label class="flex-1 flex items-center justify-center gap-1 py-2 border-r border-slate-300 bg-slate-100 cursor-pointer hover:bg-slate-200 transition-colors">
                <input type="checkbox" checked class="accent-primary"/>
                <span class="text-xs font-medium text-slate-700">Fri</span>
              </label>
              <label class="flex-1 flex items-center justify-center gap-1 py-2 border-r border-slate-300 bg-slate-100 cursor-pointer hover:bg-slate-200 transition-colors">
                <input type="checkbox" checked class="accent-primary"/>
                <span class="text-xs font-medium text-slate-700">Sat</span>
              </label>
              <label class="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-100 cursor-pointer hover:bg-slate-200 transition-colors">
                <input type="checkbox" checked class="accent-primary"/>
                <span class="text-xs font-medium text-slate-700">Sun</span>
              </label>
            </div>
          </div>

        </div>

        <!-- Footer Actions -->
        <footer class="p-6 bg-white flex justify-end border-t border-slate-200">
          <div class="relative inline-block">
            <button (click)="nextStep.emit()" class="px-8 py-2 rounded-full bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/20 relative z-10">
              {{ mode === 'onboarding' ? 'Next Step' : 'Submit' }}
            </button>
            
            @if (mode === 'onboarding') {
              <!-- Guided Tour Tooltip -->
              <div class="absolute bottom-full mb-4 right-0 bg-slate-800 text-white text-sm font-medium px-4 py-3 rounded-lg shadow-xl w-max max-w-[280px] text-center animate-bounce z-20 whitespace-normal leading-relaxed">
                ⏱️ Choose when your tasks should run automatically. Click Next to continue!
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
export class AddScheduleDrawerComponent {
  @Input() mode: 'onboarding' | 'standalone' = 'standalone';
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();
}
