/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppStep = 'form' | 'generating' | 'preview' | 'checkout' | 'success';

export interface SongFormData {
  recipient: string;
  style: string;
  recipientName: string;
  senderName: string;
  story: string;
  emotions: string;
  occasion: string;
}

export interface SongPreview {
  id: string;
  title: string;
  audioUrl: string;
}

export interface PixData {
  id: string;
  qrCode: string;
  qrCodeBase64: string;
  amount: number;
}
