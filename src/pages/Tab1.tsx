import React, { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonAlert, IonButton, IonCard, IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonCardContent,
  IonItem, IonIcon, IonLabel, IonBadge, IonList,
  IonItemDivider, IonCheckbox, IonChip, IonAvatar,
  IonGrid, IonRow, IonCol, IonInput, IonToggle,
  IonModal, IonRefresher, IonRefresherContent,
  IonTextarea, IonSelect, IonListHeader,
  IonSelectOption, IonButtons, IonBackButton,
  IonMenuButton, IonSegment, IonSearchbar,
  IonSegmentButton, IonFooter, IonText, IonToast,
  useIonViewDidEnter, useIonViewDidLeave,
  useIonViewWillEnter, useIonViewWillLeave
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {
  person
} from 'ionicons/icons';
import { Plugins } from '@capacitor/core';

const Tab1: React.FC = () => {
  const { Share } = Plugins;

  const shareRet = async () => {
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies'
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Share Examples</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonButton onClick={() => shareRet()}>share</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
