import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {AddWatcherDrawerComponent} from './drawers/add-watcher.component';
import {AddScheduleDrawerComponent} from './drawers/add-schedule.component';
import {CreateProcessMonitorDrawerComponent} from './drawers/create-process-monitor.component';

export interface ProcessMonitor {
  id: string;
  name: string;
  status: 'running' | 'pending' | 'disabled';
  lastRun: string;
  successRate: string;
  resources: string;
  message?: string;
  scenarioAssigned?: string;
  projectLinked?: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    CommonModule, 
    RouterOutlet,
    AddWatcherDrawerComponent,
    AddScheduleDrawerComponent,
    CreateProcessMonitorDrawerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  activeDrawer = signal<'watcher' | 'schedule' | 'monitor' | null>(null);
  drawerMode = signal<'onboarding' | 'standalone'>('standalone');
  completedSteps = signal<string[]>([]);
  activeTab = signal<'dashboard' | 'process-monitor'>('dashboard');
  showNotifications = signal<boolean>(false);

  monitors = signal<ProcessMonitor[]>([]);

  toggleRunState(id: string) {
    this.monitors.update(monitors => monitors.map(m => {
      if (m.id === id) {
        if (m.status === 'running') return { ...m, status: 'pending', message: 'Manually stopped' };
        if (m.status === 'pending') return { ...m, status: 'running', message: 'Processing...' };
      }
      return m;
    }));
  }

  toggleEnableState(id: string) {
    this.monitors.update(monitors => monitors.map(m => {
      if (m.id === id) {
        if (m.status === 'disabled') return { ...m, status: 'pending', message: 'Enabled' };
        else return { ...m, status: 'disabled', message: 'Manually disabled' };
      }
      return m;
    }));
  }

  openDrawer(drawer: 'watcher' | 'schedule' | 'monitor', mode: 'onboarding' | 'standalone' = 'standalone') {
    this.drawerMode.set(mode);
    this.activeDrawer.set(drawer);
  }

  startOnboarding() {
    if (!this.completedSteps().includes('watcher')) {
      this.openDrawer('watcher', 'onboarding');
    } else if (!this.completedSteps().includes('schedule')) {
      this.openDrawer('schedule', 'onboarding');
    } else if (!this.completedSteps().includes('monitor')) {
      this.openDrawer('monitor', 'onboarding');
    }
  }

  toggleNotifications() {
    this.showNotifications.update(v => !v);
    if (!this.completedSteps().includes('notifications')) {
      this.completedSteps.update(steps => [...steps, 'notifications']);
    }
  }

  closeDrawer() {
    this.activeDrawer.set(null);
  }

  handleNextStep(currentStep: 'watcher' | 'schedule' | 'monitor') {
    if (this.drawerMode() === 'standalone') {
      this.closeDrawer();
      return;
    }

    const isFirstTime = !this.completedSteps().includes('monitor');

    this.completedSteps.update(steps => {
      if (!steps.includes(currentStep)) {
        return [...steps, currentStep];
      }
      return steps;
    });

    if (isFirstTime) {
      if (currentStep === 'watcher') {
        this.activeDrawer.set('schedule');
      } else if (currentStep === 'schedule') {
        this.activeDrawer.set('monitor');
      } else if (currentStep === 'monitor') {
        // Add the first monitor
        this.monitors.set([{
          id: '1',
          name: 'Process Notepad',
          status: 'running',
          lastRun: 'Just now',
          successRate: '100%',
          resources: '1 rWatcher',
          message: 'Processing items...',
          scenarioAssigned: 'Notepad Data Entry',
          projectLinked: 'My First Project'
        }]);
        this.activeDrawer.set(null);
        this.activeTab.set('dashboard'); // Keep them on dashboard to see the new KPIs
      }
    } else {
      if (currentStep === 'watcher' || currentStep === 'schedule') {
        this.activeDrawer.set('monitor');
      } else {
        this.activeDrawer.set(null);
      }
    }
  }
}
