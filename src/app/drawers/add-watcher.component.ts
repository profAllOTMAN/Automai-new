import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-watcher-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-end z-50">
      <div class="w-full max-w-[600px] bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        
        <!-- Full Width Stepper (Onboarding Mode) -->
        @if (mode === 'onboarding') {
          <div class="w-full bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">In progress (1/3)</span>
            <div class="flex items-center gap-2 text-xs font-semibold tracking-wider">
              <span class="text-primary flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">radio_button_checked</span> Step 1</span>
              <span class="text-slate-300 material-symbols-outlined text-[14px]">chevron_right</span>
              <span class="text-slate-400 flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">radio_button_unchecked</span> Step 2</span>
              <span class="text-slate-300 material-symbols-outlined text-[14px]">chevron_right</span>
              <span class="text-slate-400 flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">radio_button_unchecked</span> Step 3</span>
            </div>
          </div>
        }

        <!-- Header Section -->
        <header class="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-white">
          <div class="flex items-center gap-3 text-slate-900">
            <div class="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
              <span class="material-symbols-outlined text-2xl">desktop_windows</span>
            </div>
            <div class="flex flex-col">
              <h2 class="text-lg font-medium text-primary leading-tight">Add new rWatcher</h2>
              <p class="text-xs text-slate-500">rWatcher user and RDP details</p>
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

        <!-- Content Area -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50/50">
          <div class="space-y-6">
            
            <!-- Select BotManager -->
            <div class="flex flex-col gap-1.5">
              <label for="botManager" class="text-sm font-medium text-slate-700">Select BotManager to add new rWatcher</label>
              <div class="relative">
                <select id="botManager" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                  <option>BotManager - 1</option>
                  <option>BotManager - 2</option>
                </select>
                <div class="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                  <span class="material-symbols-outlined text-slate-500 text-sm">arrow_drop_down</span>
                </div>
              </div>
            </div>

            <!-- Credentials Grid -->
            <div class="grid grid-cols-3 gap-4 items-start mt-4">
              <div class="flex flex-col gap-1.5">
                <label for="username" class="text-sm font-medium text-slate-700">New rWatcher username</label>
                <input type="text" id="username" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="password" class="text-sm font-medium text-slate-700">rWatcher password*</label>
                <div class="relative">
                  <input type="password" id="password" class="block px-3 py-2.5 pr-10 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  <button class="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" title="Toggle password visibility">
                    <span class="material-symbols-outlined text-lg">visibility</span>
                  </button>
                </div>
                <span class="text-[10px] text-slate-500 text-right">min 6 characters</span>
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="domain" class="text-sm font-medium text-slate-700">rWatcher domain</label>
                <input type="text" id="domain" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>

            <!-- Alias -->
            <div class="flex flex-col gap-1.5 mt-2">
              <label for="alias" class="text-sm font-medium text-slate-700">New rWatcher alias*</label>
              <input type="text" id="alias" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>

            <!-- Description -->
            <div class="flex flex-col gap-1.5 mt-4">
              <label for="description" class="text-sm font-medium text-slate-700">Description</label>
              <textarea id="description" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y min-h-[80px]"></textarea>
            </div>

            <!-- RDP Parameters -->
            <div class="pt-4 border-t border-slate-200">
              <div class="flex items-center gap-2 mb-4">
                <h3 class="text-slate-600 font-bold text-sm">RDP parameters</h3>
                <span class="material-symbols-outlined text-slate-500 text-sm bg-slate-200 rounded-full size-4 flex items-center justify-center">info</span>
              </div>

              <div class="grid grid-cols-2 gap-4 mb-4 mt-2">
                <div class="flex flex-col gap-1.5">
                  <label for="rdpResolution" class="text-sm font-medium text-slate-700">RDP resolution</label>
                  <div class="relative">
                    <select id="rdpResolution" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                      <option>1280x1024</option>
                      <option>1920x1080</option>
                    </select>
                    <div class="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                      <span class="material-symbols-outlined text-slate-500 text-sm">arrow_drop_down</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label for="rdpColorDepth" class="text-sm font-medium text-slate-700">RDP color depth</label>
                  <div class="relative">
                    <select id="rdpColorDepth" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                      <option>32-bit</option>
                      <option>16-bit</option>
                    </select>
                    <div class="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                      <span class="material-symbols-outlined text-slate-500 text-sm">arrow_drop_down</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label for="botManagerIp" class="text-sm font-medium text-slate-700">BotManager IP to be used when downloading RDP</label>
                  <input type="text" id="botManagerIp" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" value="ec2amaz-ts88pb7" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label for="rdpTimeout" class="text-sm font-medium text-slate-700">RDP timeout</label>
                  <input type="text" id="rdpTimeout" class="block px-3 py-2.5 w-full text-sm text-slate-900 bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" value="30" />
                  <span class="text-[10px] text-slate-700 text-right mt-1">in seconds</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Footer Actions -->
        <footer class="p-6 bg-white flex justify-end">
          <div class="relative inline-block">
            <button (click)="nextStep.emit()" class="px-8 py-2 rounded-full bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/20 relative z-10">
              {{ mode === 'onboarding' ? 'Next Step' : 'Submit' }}
            </button>
            
            @if (mode === 'onboarding') {
              <!-- Guided Tour Tooltip -->
              <div class="absolute bottom-full mb-4 right-0 bg-slate-800 text-white text-sm font-medium px-4 py-3 rounded-lg shadow-xl w-max max-w-[280px] text-center animate-bounce z-20 whitespace-normal leading-relaxed">
                🤖 An rWatcher is the machine that runs your tasks. Click Next when you're ready!
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
export class AddWatcherDrawerComponent {
  @Input() mode: 'onboarding' | 'standalone' = 'standalone';
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();
}
