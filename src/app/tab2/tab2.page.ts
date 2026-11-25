import { Component, inject } from '@angular/core';
// CHANGE: Import the Ionic standalone components used on this page
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
  IonIcon,
  ActionSheetController,
} from '@ionic/angular';
// CHANGE: Register the camera icon used by the FAB
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';

// CHANGE: Import the PhotoService
import { PhotoService } from '../services/photo.service';
import type { UserPhoto } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  // CHANGE: Add the standalone component imports
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon],
})
export class Tab2Page {
  // CHANGE: Inject the PhotoService
  public photoService = inject(PhotoService);
  private actionSheetController = inject(ActionSheetController);

  constructor() {
    // CHANGE: Register the icons this page uses
    addIcons({ camera });
  }

  // CHANGE: Add `addPhotoToGallery()` method
  addPhotoToGallery(): void {
    this.photoService.addNewToGallery();
  }

  async showActionSheet(photo: UserPhoto, position: number): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.photoService.deletePhoto(photo, position),
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }
}