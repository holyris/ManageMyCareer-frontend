export interface Folder {
  id: string;
  name: string;
  childFolders?: Folder[];
}