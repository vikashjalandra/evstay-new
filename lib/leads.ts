import fs from 'fs';
import path from 'path';
import { LeadData } from './types';

const LEADS_FILE_PATH = path.join(process.cwd(), 'data', 'leads.json');

function ensureLeadsFile(): void {
  const dir = path.dirname(LEADS_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE_PATH)) {
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify([], null, 2), 'utf8');
  }
}

export async function getAllLeads(): Promise<LeadData[]> {
  try {
    ensureLeadsFile();
    const data = fs.readFileSync(LEADS_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading leads file:', error);
    return [];
  }
}

export async function createLead(leadInfo: Omit<LeadData, 'id' | 'createdAt'>): Promise<LeadData> {
  const leads = await getAllLeads();
  const newLead: LeadData = {
    id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...leadInfo,
    createdAt: new Date().toISOString()
  };

  leads.unshift(newLead);

  try {
    ensureLeadsFile();
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(leads, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving lead:', error);
  }

  return newLead;
}

export async function deleteLead(id: string): Promise<boolean> {
  const leads = await getAllLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;

  try {
    ensureLeadsFile();
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(filtered, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error deleting lead:', error);
    return false;
  }
}

export async function deleteMultipleLeads(ids: string[]): Promise<number> {
  const leads = await getAllLeads();
  const filtered = leads.filter((l) => !ids.includes(l.id));
  const removedCount = leads.length - filtered.length;

  try {
    ensureLeadsFile();
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(filtered, null, 2), 'utf8');
    return removedCount;
  } catch (error) {
    console.error('Error deleting multiple leads:', error);
    return 0;
  }
}
