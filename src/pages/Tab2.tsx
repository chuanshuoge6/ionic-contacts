import React, { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonAlert, IonButton, IonCard, IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonCardContent,
  IonItem, IonIcon, IonLabel, IonDatetime, IonFooter,
  IonList, IonItemDivider, IonTextarea, IonAvatar,
  IonText, IonThumbnail, IonSelectOption, IonInput,
  IonSelect, IonCheckbox, IonToggle, IonRange,
  IonNote, IonRadio, IonItemSliding, IonItemOption,
  IonItemOptions, IonListHeader, IonChip, IonImg,
  IonLoading, IonProgressBar, IonSkeletonText,
  IonReorder, IonReorderGroup, IonSlide, IonSlides,
  IonTabBar, IonTabs, IonTabButton, IonBadge,
  IonRouterOutlet
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import {
  calendar, personCircle, map,
  informationCircle
} from 'ionicons/icons';
import { Plugins } from '@capacitor/core';

const Tab2: React.FC = () => {
  const { SplashScreen } = Plugins;

  const showSplash = () => {
    SplashScreen.show({
      showDuration: 2000,
      autoHide: true
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Splash Screen Examples</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem >
            <IonButton onClick={() => showSplash()}>Show Splash</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage >
  )
}

export default Tab2;
