import { StaticActivities } from '../interface/StaticActivities'

export interface StaticSubjects {
  name: string;
  metaTitle: string;
  icon: string;
  metaDescription: string;
  orderId: number;
  activities: StaticActivities[];
}