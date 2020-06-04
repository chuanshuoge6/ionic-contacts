import React, { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonAlert, IonButton, IonCard, IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonCardContent,
  IonItem, IonIcon, IonLabel, IonBadge, IonList,
  IonItemDivider, IonCheckbox, IonFab, IonFabButton,
  IonFabList, IonItemGroup, IonItemSliding,
  IonItemOptions, IonItemOption, IonNote, IonMenu,
  IonRouterOutlet, IonListHeader, IonMenuToggle,
  IonButtons, IonMenuButton, IonInput, IonSplitPane,
  IonPopover, IonSpinner, IonRadioGroup, IonRadio,
  IonRange, IonSearchbar, IonFooter, IonSegmentButton,
  IonSegment, IonToast, IonToggle, IonTextarea, IonText,
  IonSelect, IonSelectOption, IonModal, IonBackButton
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import {
  add, trash, ellipsisHorizontalOutline
} from 'ionicons/icons';
import { Plugins } from '@capacitor/core';

const Tab3: React.FC = () => {
  const { Storage } = Plugins;
  const [contacts, setContacts] = useState<string[]>([])
  const [tempContact, setTempContact] = useState<string>('')
  const [tempName, setTempName] = useState<string>('')
  const [tempGender, setTempGender] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showToast, setShowToast] = useState<boolean>(false)
  const [showToast2, setShowToast2] = useState<boolean>(false)

  useEffect(() => {
    setObject('Bob', JSON.stringify({ name: 'Bob', gender: 'M', contact: '123' }))
    getAll()
  }, []);

  const setObject = async (k: string, v: string) => {
    await Storage.set({
      key: k,
      value: v
    });
  }

  const getAll = async () => {
    const { keys } = await Storage.keys();
    if (keys.length === 0) { setContacts([]); return }

    for (let newContacts: string[] = [], i = 0; i < keys.length; i++) {
      const obj = await Storage.get({ key: keys[i] })
      const v = obj.value!.toString()
      newContacts.push(v)

      if (i === keys.length - 1) {
        setContacts(newContacts)
      }
    }

  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Storage Example</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        {contacts.length > 0 ?
          contacts.map((item, index) => {
            const itemJson = JSON.parse(item)

            return <IonCard key={itemJson.name}>
              {/*-- Delete Contact --*/}
              <IonItem>
                <IonButton fill='outline' slot='start'
                  onClick={() => {
                    const element = document.getElementById(itemJson.name)
                    element!.style.display === 'none' ?
                      element!.style.display = 'block' :
                      element!.style.display = 'none'
                  }}>
                  <IonIcon icon={ellipsisHorizontalOutline}></IonIcon>
                </IonButton>
                <IonLabel>{itemJson.name}</IonLabel>
                <IonButton fill="outline" slot="end"
                  onClick={async () => {
                    await Storage.remove({ key: itemJson.name });
                    getAll()
                  }}>
                  <IonIcon icon={trash}></IonIcon>
                </IonButton>
              </IonItem>
              {/*-- Update Contact --*/}
              <IonCardContent id={itemJson.name} style={{ display: 'none' }}>
                <IonItem lines='none'>
                  <IonLabel>Gender:</IonLabel>
                  <IonSelect value={itemJson.gender}
                    onIonChange={e => {
                      setObject(itemJson.name,
                        JSON.stringify({
                          name: itemJson.name,
                          gender: e.detail.value,
                          contact: itemJson.contact
                        }))
                      getAll()
                    }}>
                    <IonSelectOption value="F">Female</IonSelectOption>
                    <IonSelectOption value="M">Male</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem >
                  <IonLabel>Contact:</IonLabel>
                  <IonInput placeholder={itemJson.contact} class='ion-text-right'
                    onIonChange={e => setTempContact(e.detail.value!)}

                    onIonBlur={e => {
                      if (tempContact !== '') {
                        setObject(itemJson.name,
                          JSON.stringify({
                            name: itemJson.name,
                            gender: itemJson.gender,
                            contact: tempContact
                          }))
                        getAll()
                        setTempContact('')
                      }
                    }}
                  ></IonInput>
                </IonItem>

              </IonCardContent>
            </IonCard>

          }) : null
        }
        {/*-- Add Contact --*/}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton size='small'
            onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonModal isOpen={showModal}>
          <IonToolbar>
            <IonTitle>New Contact</IonTitle>
          </IonToolbar>
          <IonContent >
            <IonItem>
              <IonLabel>Name:</IonLabel>
              <IonInput placeholder='Name' class='ion-text-right'
                onIonChange={e => setTempName(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Gender:</IonLabel>
              <IonSelect value={tempGender}
                onIonChange={e => setTempGender(e.detail.value)}>
                <IonSelectOption value="F">Female</IonSelectOption>
                <IonSelectOption value="M">Male</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Contact:</IonLabel>
              <IonInput placeholder='###' class='ion-text-right'
                onIonChange={e => setTempContact(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem lines='none'>
              <IonButton fill="outline" slot='start' onClick={async () => {
                if (tempName === '' || tempGender === '' || tempContact === '') {
                  setShowToast(true)
                }
                else {
                  const { keys } = await Storage.keys();
                  if (keys.includes(tempName)) {
                    setShowToast2(true)
                  }
                  else {
                    setObject(tempName,
                      JSON.stringify({
                        name: tempName,
                        gender: tempGender,
                        contact: tempContact
                      }))
                    getAll()
                    setTempName('');
                    setTempGender('');
                    setTempContact('');
                    setShowModal(false)
                  }
                }
              }}>Save</IonButton>
              <IonButton fill="outline" slot='end' onClick={() => {
                setTempName('');
                setTempGender('');
                setTempContact('');
                setShowModal(false)
              }}>Cancel</IonButton>
            </IonItem>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Please fill out all fields"
          position='top'
          duration={1000}
        />

        <IonToast
          isOpen={showToast2}
          onDidDismiss={() => setShowToast(false)}
          message="Contact already exists"
          position='top'
          duration={1000}
        />
      </IonContent>
    </IonPage>

  );
};

export default Tab3;
