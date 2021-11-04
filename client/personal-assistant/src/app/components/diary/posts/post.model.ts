export interface Post {
  id: string;
  title: string;
  content: string;
  date?: Date;
  labels?: Array<string>;
  mood: Mood;
  isEdited: boolean;
  isOpened?: boolean;
  image?: File;
  imagePath?: string;
};

export enum Mood {
  happy = 'happy',
  good = 'good',
  normal = 'normal',
  sad = 'sad',
};

export const moodsIcons = {
  sad: '🙁',
  normal: '😐',
  good: '😊',
  happy: '😍',
};
