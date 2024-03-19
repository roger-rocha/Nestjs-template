export interface FileServiceInterface {
  move(oldPath: string, newPath: string): Promise<boolean>;
}
