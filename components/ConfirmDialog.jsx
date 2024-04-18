import { StyleSheet, Text, View } from 'react-native'
import { Dialog } from '@rneui/themed';
import React from 'react'

const ConfirmDialog = ({visible, toggleDialog, clearAll}) => {
  return (
    <Dialog
    isVisible={visible}
    onBackdropPress={toggleDialog}
  >
    <Dialog.Title title="Warning"/>
    <Text>Are you sure you want to delete all</Text>
    <Dialog.Actions>
      <Dialog.Button
        title="CONFIRM"
        onPress={() => {
          clearAll();
        }}
      />
      <Dialog.Button title="CANCEL" onPress={toggleDialog} />
    </Dialog.Actions>
  </Dialog>
  )
}

export default ConfirmDialog

const styles = StyleSheet.create({})