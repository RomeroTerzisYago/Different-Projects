import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ThreadService } from '../thread.service';
import { Observable } from 'rxjs';
import { Thread } from '../thread.model';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit {
  @ViewChild('scroller', { read: true, static: false })
  private feed: ElementRef;

  threads: Observable<Thread[]>;
  threadId: string;

  constructor(
    public el: ElementRef,
    private threadService: ThreadService) {}

  ngOnInit() {
    this.getThread();
  }
  getThread() {
    this.threads = this.threadService.getThreads();
    this.threads.subscribe(thread => {
      thread.map(data => this.threadId = data.id);
    });
  }
  delete() {
    this.threadService.deleteThread(this.threadId);
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.chat-feed');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }
}
