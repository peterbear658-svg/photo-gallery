import { TestBed } from '@angular/core/testing';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { afterEach, vi } from 'vitest';
import { PhotoService } from './photo.service';

vi.mock('@capacitor/filesystem', () => ({
  Directory: { Data: 'DATA' },
  Filesystem: { deleteFile: vi.fn().mockResolvedValue(undefined) },
}));

vi.mock('@capacitor/preferences', () => ({
  Preferences: { set: vi.fn().mockResolvedValue(undefined) },
}));

describe('PhotoService', () => {
  let service: PhotoService;

  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('removes a photo from the signal and persistent storage', async () => {
    const deletedPhoto = { filepath: 'deleted.jpeg', webviewPath: 'deleted-url' };
    const remainingPhoto = { filepath: 'remaining.jpeg', webviewPath: 'remaining-url' };
    service.photos.set([deletedPhoto, remainingPhoto]);

    await service.deletePhoto(deletedPhoto, 0);

    expect(service.photos()).toEqual([remainingPhoto]);
    expect(Preferences.set).toHaveBeenCalledWith({
      key: 'photos',
      value: JSON.stringify([remainingPhoto]),
    });
    expect(Filesystem.deleteFile).toHaveBeenCalledWith({
      path: deletedPhoto.filepath,
      directory: Directory.Data,
    });
  });
});
