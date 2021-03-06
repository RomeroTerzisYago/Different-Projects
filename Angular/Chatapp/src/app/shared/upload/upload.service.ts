import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Md5 } from 'ts-md5';

@Injectable()
export class UploadService {
  downloadURL: Observable<string>;

  uploads: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {}

  // Sicken von files an Firebase storage
  uploadTask(path, file, meta, uploadType) {
    const nameHash = Md5.hashStr(file.name + new Date().getTime());
    const fileExt = file.type.split('/')[1];
    const name = `${nameHash}.${fileExt}`;

    const newMeta = {
      ...meta,
      someMoreData: 'Moooore data'
    };

    const ref = this.storage.ref(`${path}/${name}`);
    const task = ref.put(file, { customMetadata: newMeta });

    // add the following lines
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL();
        console.log('Image Uploaded!');
      })
    );

    if (uploadType === true) {
      // saves as collection
      this.uploads = this.afs.collection(path);
      this.downloadURL.subscribe(url => {
        const data = { name, url };
        this.uploads.add(data);
      });
    } else {
      // saves as document field
      this.downloadURL.subscribe(url => {
        this.afs.doc(path).update({ url });
      });
    }
  }
}
