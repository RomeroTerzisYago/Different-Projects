import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Thread } from './thread.model';
import { Message } from './message.model';

import { AuthService } from '../core/auth.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  threadsCollection: AngularFirestoreCollection<Thread>;
  threadDoc: AngularFirestoreDocument<Thread>;

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private auth: AuthService,
    private messageService: MessageService
  ) { }
  getThreads() {
    this.threadsCollection = this.afs.collection('chats', ref =>
      ref.where(`members.${this.auth.currentUserId}`, '==', true)
    );
    return this.threadsCollection.valueChanges();
  }

  getThread(profileId: string) {
    this.threadDoc = this.afs.doc<Thread>(`chats/${profileId}`);
    return this.threadDoc.valueChanges();
  }

  async createThread(profileId) {
    const currentUserId = this.auth.currentUserId;

    const id
     =
      profileId < currentUserId ? `${profileId}_${currentUserId}` : `${currentUserId}_${profileId}`;
    const avatar = this.auth.authState.photoURL;

    const creator = this.auth.authState.displayName || this.auth.authState.email;
    const lastMessage = null;
    const members = { [profileId]: true, [currentUserId]: true };

    const thread: Thread = { id, avatar, creator, lastMessage, members };
    const threadPath = `chats/${id}`;

    await this.afs
      .doc(threadPath)
      .set(thread, { merge: true });
    return await this.router.navigate([`chat/${id}`]);
  }

  saveLastMessage(channelId, message) {
    const data = {
      lastMessage: message
    };
    return this.afs.doc(`chats/${channelId}`).set(data, { merge: true });
  }


  async deleteThread(threadId: string) {
    const batch = this.afs.firestore.batch();
    const query = await this.afs.collection(`chats/${threadId}/messages`).ref.get();
    query.forEach(doc => {
     console.log(doc);
     console.log(`Deleting: ${doc.ref}`);
     batch.delete(doc.ref);
   });
    batch.commit().then(() => {
    this.afs.doc(`chats/${threadId}`).delete();
  });
  }
}
