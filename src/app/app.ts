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

export interface RWatcher {
  id: string;
  alias: string;
  description: string;
  status: 'online' | 'offline' | 'busy';
  ipAddress: string;
  lastPing: string;
  botManager: string;
  resolution: string;
  colorDepth: string;
  username: string;
  domain: string;
  assignedMonitors: number;
  uptime: string;
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
  activeTab = signal<'dashboard' | 'process-monitor' | 'rwatchers'>('dashboard');
  showNotifications = signal<boolean>(false);
  tourSkipped = signal<boolean>(false);
  editingMonitorId = signal<string | null>(null);
  monitorToDelete = signal<string | null>(null);

  monitors = signal<ProcessMonitor[]>([]);

  rwatchers = signal<RWatcher[]>([
    {
      id: '1',
      alias: 'rWatcher001',
      description: 'Primary watcher for NYC office automation tasks',
      status: 'online',
      ipAddress: '192.168.1.105',
      lastPing: 'Just now',
      botManager: 'BotManager-1',
      resolution: '1920x1080',
      colorDepth: '32-bit',
      username: 'CORP\\auto_user1',
      domain: 'CORP',
      assignedMonitors: 2,
      uptime: '14d 6h 32m'
    },
    {
      id: '2',
      alias: 'rWatcher002',
      description: 'Backup watcher for SFDC auth flows',
      status: 'offline',
      ipAddress: '192.168.1.106',
      lastPing: '2 hours ago',
      botManager: 'BotManager-1',
      resolution: '1280x1024',
      colorDepth: '32-bit',
      username: 'CORP\\auto_user2',
      domain: 'CORP',
      assignedMonitors: 1,
      uptime: '--'
    },
    {
      id: '3',
      alias: 'rWatcher003',
      description: 'Dedicated watcher for legacy data sync processes',
      status: 'busy',
      ipAddress: '192.168.1.107',
      lastPing: 'Just now',
      botManager: 'BotManager-2',
      resolution: '1920x1080',
      colorDepth: '16-bit',
      username: 'CORP\\auto_user3',
      domain: 'CORP',
      assignedMonitors: 3,
      uptime: '7d 12h 15m'
    }
  ]);

  rwatcherToDelete = signal<string | null>(null);
  expandedRWatcher = signal<string | null>(null);
  rwatcherSearch = signal<string>('');

  toggleRWatcherExpand(id: string) {
    this.expandedRWatcher.update(current => current === id ? null : id);
  }

  confirmDeleteRWatcher(id: string) {
    this.rwatcherToDelete.set(id);
  }

  executeDeleteRWatcher() {
    const id = this.rwatcherToDelete();
    if (id) {
      this.rwatchers.update(watchers => watchers.filter(w => w.id !== id));
    }
    this.rwatcherToDelete.set(null);
  }

  cancelDeleteRWatcher() {
    this.rwatcherToDelete.set(null);
  }

  filteredRWatchers() {
    const search = this.rwatcherSearch().toLowerCase();
    if (!search) return this.rwatchers();
    return this.rwatchers().filter(w =>
      w.alias.toLowerCase().includes(search) ||
      w.ipAddress.includes(search) ||
      w.botManager.toLowerCase().includes(search)
    );
  }

  onlineRWatcherCount() {
    return this.rwatchers().filter(w => w.status === 'online').length;
  }

  busyRWatcherCount() {
    return this.rwatchers().filter(w => w.status === 'busy').length;
  }

  offlineRWatcherCount() {
    return this.rwatchers().filter(w => w.status === 'offline').length;
  }

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

  editMonitor(id: string) {
    this.editingMonitorId.set(id);
    this.openDrawer('monitor', 'standalone');
  }

  confirmDelete(id: string) {
    this.monitorToDelete.set(id);
  }

  executeDelete() {
    const id = this.monitorToDelete();
    if (id) {
      this.monitors.update(monitors => monitors.filter(m => m.id !== id));
    }
    this.monitorToDelete.set(null);
  }

  cancelDelete() {
    this.monitorToDelete.set(null);
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

  skipTour() {
    this.tourSkipped.set(true);
  }

  toggleNotifications() {
    this.showNotifications.update(v => !v);
    if (!this.completedSteps().includes('notifications')) {
      this.completedSteps.update(steps => [...steps, 'notifications']);
    }
  }

  closeDrawer() {
    this.activeDrawer.set(null);
    this.editingMonitorId.set(null);
  }

  handleNextStep(currentStep: 'watcher' | 'schedule' | 'monitor') {
    if (this.drawerMode() === 'standalone') {
      if (currentStep === 'monitor') {
        const editId = this.editingMonitorId();
        if (editId) {
          // Update existing monitor
          this.monitors.update(m => m.map(monitor => 
            monitor.id === editId 
              ? { ...monitor, name: monitor.name + ' (Edited)' } 
              : monitor
          ));
          this.editingMonitorId.set(null);
        } else {
          // Create new monitor
          const newId = (this.monitors().length + 1).toString();
          this.monitors.update(m => [...m, {
            id: newId,
            name: `Process Monitor ${newId}`,
            status: 'pending',
            lastRun: 'Never',
            successRate: '--',
            resources: '1 rWatcher',
            message: 'Waiting for schedule',
            scenarioAssigned: 'Custom Scenario',
            projectLinked: 'My First Project'
          }]);
        }
        this.activeTab.set('process-monitor');
      }
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
