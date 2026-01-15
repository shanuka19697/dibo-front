// src/app/services/appwrite.service.ts

import { Injectable } from '@angular/core';
import { Client, Storage } from 'appwrite';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  client: Client;
  storage: Storage;

  constructor() {
    this.client = new Client()
      .setEndpoint('https://fra.cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
      .setProject('6814c789002ec2505dd6');                    // Replace with your Appwrite project ID

    this.storage = new Storage(this.client);
  }
}
