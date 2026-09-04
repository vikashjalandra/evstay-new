import fs from 'fs';
import path from 'path';
import { PropertyDetailData } from './types';

const CHARGERS_FILE_PATH = path.join(process.cwd(), 'data', 'chargers.json');

function ensureDataFile(): void {
  const dir = path.dirname(CHARGERS_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(CHARGERS_FILE_PATH)) {
    fs.writeFileSync(CHARGERS_FILE_PATH, JSON.stringify([], null, 2), 'utf8');
  }
}

export async function getAllChargers(): Promise<PropertyDetailData[]> {
  try {
    ensureDataFile();
    const data = fs.readFileSync(CHARGERS_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading chargers file:', error);
    return [];
  }
}

export async function getChargerById(id: string): Promise<PropertyDetailData | null> {
  const chargers = await getAllChargers();
  return chargers.find((c) => c.id === id) || null;
}

export async function saveChargers(chargers: PropertyDetailData[]): Promise<boolean> {
  try {
    ensureDataFile();
    fs.writeFileSync(CHARGERS_FILE_PATH, JSON.stringify(chargers, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving chargers file:', error);
    return false;
  }
}

export async function createCharger(charger: PropertyDetailData): Promise<PropertyDetailData> {
  const chargers = await getAllChargers();
  // Ensure unique ID
  const newId = charger.id || `station-${Date.now()}`;
  const newCharger: PropertyDetailData = {
    ...charger,
    id: newId
  };
  chargers.unshift(newCharger);
  await saveChargers(chargers);
  return newCharger;
}

export async function updateCharger(id: string, updatedData: Partial<PropertyDetailData>): Promise<PropertyDetailData | null> {
  const chargers = await getAllChargers();
  const index = chargers.findIndex((c) => c.id === id);
  if (index === -1) return null;

  chargers[index] = {
    ...chargers[index],
    ...updatedData,
    id // keep original ID
  };

  await saveChargers(chargers);
  return chargers[index];
}

export async function deleteCharger(id: string): Promise<boolean> {
  const chargers = await getAllChargers();
  const filtered = chargers.filter((c) => c.id !== id);
  if (filtered.length === chargers.length) return false;
  await saveChargers(filtered);
  return true;
}
